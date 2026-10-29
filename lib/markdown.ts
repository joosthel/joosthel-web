import { getAllPosts } from './blog';
import { SITE_CONFIG } from './constants';
import { LATEST_POSTS, PROFILE_INTRO, PROFILE_LINKS, STUDIO_LINE } from './data';
import { WEBMCP_TOOL_LIST } from './webmcp-tools';
import { AGENT_ENDPOINTS } from './agent-endpoints';

// Markdown renditions of the HTML pages, served from /md/* and reached via
// content negotiation in proxy.ts (Accept: text/markdown). Profile copy comes
// from lib/data.ts and posts from content/blog; the rest mirrors the JSX
// pages. Update it when page copy changes.

function page(canonicalPath: string, body: string): string {
    return `<!-- Markdown rendition. Canonical HTML: ${SITE_CONFIG.url}${canonicalPath} -->\n\n${body}`;
}

function postLine(post: ReturnType<typeof getAllPosts>[number]): string {
    return `- [${post.title}](${SITE_CONFIG.url}/blog/${post.slug}) (${post.date}): ${post.excerpt}`;
}

const linkLines = () => PROFILE_LINKS.map((l) => `- ${l.label}: ${l.href.replace(/^mailto:/, '')}`).join('\n');

function homeMarkdown(): string {
    return page(
        '/',
        `# ${SITE_CONFIG.author}

${PROFILE_INTRO.join(' ')}

## ${SITE_CONFIG.studio.name}

${SITE_CONFIG.studio.url}

${STUDIO_LINE}

## Links

${linkLines()}

## Writing

${getAllPosts().slice(0, LATEST_POSTS).map(postLine).join('\n')}

All posts: ${SITE_CONFIG.url}/blog
`,
    );
}

function agentsMarkdown(): string {
    const tools = WEBMCP_TOOL_LIST.map((t) => `- \`${t.name}\`: ${t.blurb}`).join('\n');
    const endpoints = AGENT_ENDPOINTS.map(([path, desc]) => `- ${SITE_CONFIG.url}${path}: ${desc}`).join('\n');

    return page(
        '/agents',
        `# For AI agents

This is the personal site of ${SITE_CONFIG.author}: a short profile, links and his writing. Everything here is also available in machine-readable form. Client work, services and project enquiries are handled by his studio, ${SITE_CONFIG.studio.name}: ${SITE_CONFIG.studio.url}

## Endpoints

${endpoints}

## Markdown

The home page, /agents, /blog and every post return markdown when requested with \`Accept: text/markdown\`. The imprint and privacy pages are HTML only.

## In-browser tools (WebMCP)

In browsers that implement WebMCP (Chrome 149 and Edge 150 during the origin trial, or the enable-webmcp-testing flag), every page registers these read-only tools through document.modelContext.registerTool():

${tools}

## Contact

Automated and agent-initiated mail goes to ${SITE_CONFIG.agentEmail}. A human reads everything that arrives. Humans writing directly are better off at ${SITE_CONFIG.email}.
`,
    );
}

function blogIndexMarkdown(): string {
    return page(
        '/blog',
        `# Writing

${getAllPosts().map(postLine).join('\n')}
`,
    );
}

function postMarkdown(slug: string): string | null {
    const post = getAllPosts().find((p) => p.slug === slug);
    if (!post) return null;

    const meta = [
        `Published: ${post.date}`,
        ...(post.updated ? [`Updated: ${post.updated}`] : []),
        `Tags: ${post.tags.join(', ')}`,
        `Author: ${SITE_CONFIG.author}`,
    ].join('  \n');

    return page(`/blog/${post.slug}`, `# ${post.title}\n\n${meta}\n\n${post.content.trim()}\n`);
}

// One entry per /md path, used by generateStaticParams. Keep in step with
// the proxy.ts matcher.
export function getMarkdownParams(): Array<string[]> {
    return [
        [],
        ['agents'],
        ['blog'],
        ...getAllPosts().map((p) => ['blog', p.slug]),
    ];
}

export function renderMarkdown(segments: string[]): string | null {
    if (segments.length === 0) return homeMarkdown();
    if (segments.length === 1) {
        if (segments[0] === 'agents') return agentsMarkdown();
        if (segments[0] === 'blog') return blogIndexMarkdown();
        return null;
    }
    if (segments.length === 2 && segments[0] === 'blog') return postMarkdown(segments[1]);
    return null;
}
