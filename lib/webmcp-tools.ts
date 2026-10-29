import { SITE_CONFIG } from './constants';

// In-browser WebMCP tools (document.modelContext): a profile tool and the
// blog tools, over the same data the site renders: lib/data.ts (loaded on
// first call, so it stays out of the shared bundle), /api/blog.json, and the
// /md/blog/* markdown renditions. Everything is read-only. Kept free of React
// so it can be unit-tested in Node, and imported server-side by the
// discovery documents for the tool list.

type Json = Record<string, unknown>;

const EMPTY_INPUT_SCHEMA = { type: 'object', properties: {} } as const;

// Per tool: `description` is the text served to the agent, `blurb` the
// one-line version for human-facing listings.
export const WEBMCP_TOOL_META = {
    get_profile: {
        title: 'Profile & contact',
        description:
            'Who Joost Helfers is and how to reach him: a short bio, his studio system³, and his links. Includes both contact channels: a personal inbox and a dedicated address for automated/agent outreach. Client work and project enquiries go to system³.',
        blurb: 'Short bio, studio, links, contact channels.',
        jsonSchema: EMPTY_INPUT_SCHEMA,
    },
    list_posts: {
        title: 'List blog posts',
        description:
            'All blog posts with slug, title, date, excerpt, and tags, newest first. Follow up with get_post for full text.',
        blurb: 'Blog posts with excerpts and tags, newest first.',
        jsonSchema: EMPTY_INPUT_SCHEMA,
    },
    get_post: {
        title: 'Get one blog post',
        description: 'Full markdown text of one blog post by slug. Valid slugs come from list_posts.',
        blurb: 'Full markdown text of one post by slug.',
        jsonSchema: {
            type: 'object',
            properties: { slug: { type: 'string', description: 'Post slug, e.g. "pull-of-the-physical"' } },
            required: ['slug'],
        },
    },
    search_posts: {
        title: 'Search blog posts',
        description:
            'Case-insensitive keyword search across blog post titles, excerpts, and tags (e.g. "local AI", "ComfyUI", "MCP").',
        blurb: 'Keyword search across post titles, excerpts, and tags.',
        jsonSchema: {
            type: 'object',
            properties: { query: { type: 'string', minLength: 2, description: 'Search term' } },
            required: ['query'],
        },
    },
} as const;

export type WebMcpToolName = keyof typeof WEBMCP_TOOL_META;

// Flat list for discovery documents and the /agents page.
export const WEBMCP_TOOL_LIST = Object.entries(WEBMCP_TOOL_META).map(([name, tool]) => ({
    name: name as WebMcpToolName,
    title: tool.title,
    description: tool.description,
    blurb: tool.blurb,
    inputSchema: tool.jsonSchema,
}));

export interface WebMcpTool {
    name: WebMcpToolName;
    title: string;
    description: string;
    inputSchema: object;
    annotations: { readOnlyHint: true };
    execute: (input?: Json) => Promise<unknown>;
}

export interface WebMcpDeps {
    fetchJson: (path: string) => Promise<unknown>;
    /** Resolves to null when the path does not exist. */
    fetchText: (path: string) => Promise<string | null>;
    loadData: () => Promise<typeof import('./data')>;
}

interface PostSummary {
    slug: string;
    title: string;
    date: string;
    updated?: string;
    excerpt: string;
    tags: string[];
    read_time_minutes: number;
    url: string;
}

const defaultDeps: WebMcpDeps = {
    fetchJson: (path) => fetch(path).then((res) => res.json()),
    fetchText: async (path) => {
        const res = await fetch(path);
        return res.ok ? res.text() : null;
    },
    loadData: () => import('./data'),
};

const absolute = (path: string) => `${SITE_CONFIG.url}${path}`;

const includes = (query: string, ...fields: Array<string | string[] | undefined>) =>
    fields.some((f) => (Array.isArray(f) ? f.join(' ') : (f ?? '')).toLowerCase().includes(query));

export function buildWebMcpTools(overrides: Partial<WebMcpDeps> = {}): WebMcpTool[] {
    const deps = { ...defaultDeps, ...overrides };

    const posts = () => deps.fetchJson('/api/blog.json') as Promise<PostSummary[]>;

    const tool = (name: WebMcpToolName, execute: WebMcpTool['execute']): WebMcpTool => ({
        name,
        title: WEBMCP_TOOL_META[name].title,
        description: WEBMCP_TOOL_META[name].description,
        inputSchema: WEBMCP_TOOL_META[name].jsonSchema,
        annotations: { readOnlyHint: true },
        execute,
    });

    return [
        tool('get_profile', async () => {
            const { PROFILE_INTRO, PROFILE_LINKS } = await deps.loadData();
            return {
                name: SITE_CONFIG.author,
                role: SITE_CONFIG.jobTitle,
                location: 'Berlin, Germany',
                summary: PROFILE_INTRO.join(' '),
                studio: {
                    name: SITE_CONFIG.studio.name,
                    url: SITE_CONFIG.studio.url,
                    note: 'Client work, services and project enquiries go to system³.',
                },
                contact: {
                    humans: SITE_CONFIG.email,
                    agents: {
                        email: SITE_CONFIG.agentEmail,
                        note: 'For AI agents and automated outreach. Replies come from a human.',
                    },
                },
                links: Object.fromEntries(PROFILE_LINKS.map((l) => [l.label, l.href])),
                writing: absolute('/blog'),
                llmsTxt: absolute('/llms.txt'),
            };
        }),

        tool('list_posts', async () => posts()),

        tool('get_post', async (input) => {
            const slug = String(input?.slug ?? '').trim();
            const all = await posts();
            const post = all.find((p) => p.slug === slug);
            const content = post ? await deps.fetchText(`/md/blog/${slug}`) : null;
            if (!post || content === null) {
                return { error: `Unknown post slug "${slug}"`, validSlugs: all.map((p) => p.slug) };
            }
            return { ...post, content: content.trim() };
        }),

        tool('search_posts', async (input) => {
            const query = String(input?.query ?? '').trim().toLowerCase();
            if (query.length < 2) {
                return { error: 'query must be at least 2 characters' };
            }
            const all = await posts();
            return { query, posts: all.filter((p) => includes(query, p.title, p.excerpt, p.tags)) };
        }),
    ];
}
