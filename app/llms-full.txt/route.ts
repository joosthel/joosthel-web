import { getAllPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';
import { PROFILE_INTRO, PROFILE_LINKS } from '@/lib/data';

// Extended companion to /llms.txt: profile, links, and every blog post in
// full text. Generated at build time from site data.
export const dynamic = 'force-static';

export async function GET() {
    const links = PROFILE_LINKS.map((l) => `- ${l.label}: ${l.href.replace(/^mailto:/, '')}`).join('\n');

    const posts = getAllPosts()
        .map((post) => {
            const header = [
                `### ${post.title}`,
                `URL: ${SITE_CONFIG.url}/blog/${post.slug}`,
                `Published: ${post.date}`,
                ...(post.updated ? [`Updated: ${post.updated}`] : []),
                `Keywords: ${post.tags.join(', ')}`,
            ].join('\n');
            // Demote post-internal headings (## -> ####) so the markdown
            // outline stays monotonic under the ### post title.
            const body = post.content.trim().replace(/^(#{2,4})/gm, '##$1');
            return `${header}\n\n${body}`;
        })
        .join('\n\n---\n\n');

    const body = `# ${SITE_CONFIG.author}: full content for LLMs

> Personal site of ${SITE_CONFIG.author}, ${SITE_CONFIG.jobTitle} at ${SITE_CONFIG.studio.name} (${SITE_CONFIG.studio.url}), Berlin. This file contains the profile and the full text of every blog post at ${SITE_CONFIG.url}. A shorter overview lives at ${SITE_CONFIG.url}/llms.txt.

## About
${PROFILE_INTRO.join(' ')}

Client work, services and project enquiries are handled by ${SITE_CONFIG.studio.name}: ${SITE_CONFIG.studio.url}

## Links
${links}
- Email for AI agents and automated outreach: ${SITE_CONFIG.agentEmail}

## Blog posts (full text)

${posts}
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
