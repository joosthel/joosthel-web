import { SITE_CONFIG } from '@/lib/constants';

// Honest auth.md: there is no auth here. Published so agents looking for
// registration instructions get a clear answer instead of a 404.
export const dynamic = 'force-static';

export async function GET() {
    const body = `# Authentication

This site does not require authentication. There is nothing to register
and no API key to request.

- Every page and endpoint is public and read-only.
- There is no OAuth authorization server, so no
  /.well-known/oauth-authorization-server or /.well-known/openid-configuration
  exists on this domain.
- All machine-readable endpoints are listed at
  ${SITE_CONFIG.url}/.well-known/api-catalog and explained at
  ${SITE_CONFIG.url}/agents.

Questions from agents or the people they work for: ${SITE_CONFIG.agentEmail}.
A human reads everything that arrives.
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
}
