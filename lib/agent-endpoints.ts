// Machine-readable endpoints, listed on /agents (HTML and markdown) and in
// llms.txt. All are build-time route handlers except agent.json (public/).
export const AGENT_ENDPOINTS: Array<[path: string, description: string]> = [
    ['/llms.txt', 'Short overview: profile, links, writing.'],
    ['/llms-full.txt', 'The same plus the full text of every blog post.'],
    ['/api/blog.json', 'Blog posts as JSON.'],
    ['/feed.xml', 'RSS feed.'],
    ['/feed.json', 'JSON Feed with full post text.'],
    ['/sitemap.xml', 'Sitemap with content dates.'],
    ['/.well-known/agent.json', 'Agent discovery file pointing at everything on this list.'],
    ['/.well-known/api-catalog', 'API catalog (RFC 9727).'],
    ['/.well-known/agent-skills/index.json', 'Agent skills index with a how-to-read skill.'],
    ['/openapi.json', 'OpenAPI 3.1 description of the JSON endpoints.'],
    ['/api/health', 'Static health endpoint; a 200 means the deployment serves.'],
    ['/auth.md', 'Authentication notes. There is none, everything is public.'],
    ['/robots.txt', 'AI crawlers are allowed; content signals are fully open.'],
];
