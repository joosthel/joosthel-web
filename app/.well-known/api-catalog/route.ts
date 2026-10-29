import { SITE_CONFIG } from '@/lib/constants';

// API catalog per RFC 9727, as a linkset (RFC 9264): the plain JSON, text
// and feed endpoints under the site root.
export const dynamic = 'force-static';

export async function GET() {
    const url = SITE_CONFIG.url;

    const linkset = {
        linkset: [
            {
                anchor: `${url}/`,
                'service-desc': [{ href: `${url}/openapi.json`, type: 'application/openapi+json' }],
                'service-doc': [
                    { href: `${url}/llms.txt`, type: 'text/plain' },
                    { href: `${url}/agents`, type: 'text/html' },
                ],
                status: [{ href: `${url}/api/health`, type: 'application/health+json' }],
                item: [
                    { href: `${url}/api/blog.json`, type: 'application/json' },
                    { href: `${url}/llms-full.txt`, type: 'text/plain' },
                    { href: `${url}/feed.xml`, type: 'application/rss+xml' },
                    { href: `${url}/feed.json`, type: 'application/feed+json' },
                ],
            },
        ],
    };

    return Response.json(linkset, {
        headers: { 'Content-Type': 'application/linkset+json; charset=utf-8' },
    });
}
