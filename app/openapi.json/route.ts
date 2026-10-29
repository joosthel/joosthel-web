import { SITE_CONFIG } from '@/lib/constants';

// Minimal, honest OpenAPI 3.1 description of the public GET endpoints.
// Referenced as rel="service-desc" from /.well-known/api-catalog.
export const dynamic = 'force-static';

export async function GET() {
    const spec = {
        openapi: '3.1.0',
        info: {
            title: 'joosthelfers.com public JSON endpoints',
            description:
                'Read-only JSON endpoints for the personal site and blog of Joost Helfers. Public, no authentication.',
            version: '2.0.0',
            contact: {
                name: SITE_CONFIG.author,
                email: SITE_CONFIG.agentEmail,
                url: `${SITE_CONFIG.url}/agents`,
            },
        },
        servers: [{ url: SITE_CONFIG.url }],
        paths: {
            '/api/blog.json': {
                get: {
                    operationId: 'listPosts',
                    summary: 'All blog posts',
                    responses: {
                        '200': {
                            description: 'Array of blog posts, newest first.',
                            content: {
                                'application/json': {
                                    schema: {
                                        type: 'array',
                                        items: {
                                            type: 'object',
                                            properties: {
                                                slug: { type: 'string' },
                                                title: { type: 'string' },
                                                date: { type: 'string' },
                                                updated: { type: 'string' },
                                                excerpt: { type: 'string' },
                                                tags: { type: 'array', items: { type: 'string' } },
                                                read_time_minutes: { type: 'integer' },
                                                url: { type: 'string', format: 'uri' },
                                            },
                                            required: ['slug', 'title', 'date', 'excerpt', 'url'],
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            '/api/health': {
                get: {
                    operationId: 'getHealth',
                    summary: 'Deployment health',
                    responses: {
                        '200': {
                            description: 'Static health document; 200 means the deployment serves.',
                            content: {
                                'application/health+json': {
                                    schema: {
                                        type: 'object',
                                        properties: {
                                            status: { type: 'string' },
                                            service: { type: 'string' },
                                            version: { type: 'string' },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
    };

    return Response.json(spec, {
        headers: { 'Content-Type': 'application/openapi+json; charset=utf-8' },
    });
}
