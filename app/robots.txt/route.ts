import { SITE_CONFIG } from '@/lib/constants';

// Rendered to a static /robots.txt at build time. Replaces the former
// app/robots.ts (MetadataRoute.Robots) because Next's robots metadata
// cannot emit Content-Signal directives (https://contentsignals.org/).
export const dynamic = 'force-static';

// AI crawlers explicitly allowed for Generative Engine Optimization (GEO).
const AI_CRAWLERS = [
    'Googlebot',
    'Google-Extended',
    'Bingbot',
    'GPTBot',
    'OAI-SearchBot',
    'ChatGPT-User',
    'ClaudeBot',
    'Claude-User',
    'Claude-SearchBot',
    'anthropic-ai',
    'PerplexityBot',
    'Perplexity-User',
    'Applebot',
    'Applebot-Extended',
    'CCBot',
    'meta-externalagent',
    'FacebookBot',
    'Amazonbot',
    'DuckAssistBot',
];

// Fully open by choice: this site is built to be read, quoted, and
// learned from by AI systems. See /agents for the full guide.
const CONTENT_SIGNAL = 'search=yes, ai-input=yes, ai-train=yes';

export async function GET() {
    const body = `# Content signals (https://contentsignals.org/): fully open to search,
# AI input, and AI training. Guide for agents: ${SITE_CONFIG.url}/agents

User-agent: *
Content-Signal: ${CONTENT_SIGNAL}
Allow: /
Disallow: /private/

${AI_CRAWLERS.map((ua) => `User-agent: ${ua}`).join('\n')}
Content-Signal: ${CONTENT_SIGNAL}
Allow: /

Sitemap: ${SITE_CONFIG.url}/sitemap.xml
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
