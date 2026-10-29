import { getAllPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';
import { PROFILE_INTRO, PROFILE_LINKS } from '@/lib/data';
import { AGENT_ENDPOINTS } from '@/lib/agent-endpoints';
import { WEBMCP_TOOL_LIST } from '@/lib/webmcp-tools';

// Rendered to a static /llms.txt at build time. Profile and blog sections
// are generated from the same data the site renders, so the file cannot
// drift from the actual content.
export const dynamic = 'force-static';

export async function GET() {
    const posts = getAllPosts()
        .map((p) => `- ${SITE_CONFIG.url}/blog/${p.slug}: ${p.title} (${p.date})`)
        .join('\n');

    const links = PROFILE_LINKS.map((l) => `- ${l.label}: ${l.href.replace(/^mailto:/, '')}`).join('\n');

    const endpoints = AGENT_ENDPOINTS.map(([path, desc]) => `- ${SITE_CONFIG.url}${path}: ${desc}`).join('\n');

    const body = `# ${SITE_CONFIG.author}

> Personal site of ${SITE_CONFIG.author}, ${SITE_CONFIG.jobTitle} at ${SITE_CONFIG.studio.name} (${SITE_CONFIG.studio.url}), Berlin. Short profile, links and writing.

## About
${PROFILE_INTRO.join(' ')}

Client work, services and project enquiries are handled by ${SITE_CONFIG.studio.name}, his creative technology studio: ${SITE_CONFIG.studio.url}. This site has no portfolio or services.

## Links
${links}
- Email for AI agents and automated outreach: ${SITE_CONFIG.agentEmail} (a human reads everything that arrives)
- Guide for agents: ${SITE_CONFIG.url}/agents

## Writing
${posts}

## Machine-readable resources
${endpoints}
- In-browser WebMCP tools (document.modelContext, read-only): ${WEBMCP_TOOL_LIST.map((t) => t.name).join(', ')}
- Markdown versions of pages: request /, /agents, /blog or any /blog/<slug> with "Accept: text/markdown"
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
