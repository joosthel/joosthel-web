// Mirrors SITE_CONFIG.url and SITE_CONFIG.studio.url in lib/constants.ts
// (this file cannot import TS).
const SITE_URL = 'https://joosthelfers.com';
const STUDIO_URL = 'https://system3.xyz';
// Flip to true once system3.xyz serves the new studio site (check that
// https://system3.xyz/work/souly-boondawg returns 200). Until then the old
// portfolio paths go to / with temporary redirects, so browsers and search
// engines cache nothing that would point at a missing page later.
const SYSTEM3_LIVE = false;
const studio = (path) => (SYSTEM3_LIVE ? `${STUDIO_URL}${path}` : '/');

/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        unoptimized: true,
    },
    // Client work, services and the portfolio moved to system³. The about
    // page was folded into the home page.
    async redirects() {
        return [
            { source: '/about', destination: '/', permanent: true },
            { source: '/projects/souly-boondawg', destination: studio('/work/souly-boondawg'), permanent: SYSTEM3_LIVE },
            { source: '/projects/:slug*', destination: studio('/#work'), permanent: SYSTEM3_LIVE },
            { source: '/packages', destination: studio('/'), permanent: SYSTEM3_LIVE },
            { source: '/pipelines', destination: studio('/'), permanent: SYSTEM3_LIVE },
        ];
    },
    // RFC 8288 Link headers for agent discovery (registered IANA rels only),
    // plus Vary: Accept on the pages that content-negotiate markdown via
    // proxy.ts (matcher list mirrored there).
    async headers() {
        const linkHeader = {
            key: 'Link',
            value: [
                `<${SITE_URL}/.well-known/api-catalog>; rel="api-catalog"; type="application/linkset+json"`,
                `<${SITE_URL}/llms.txt>; rel="service-doc"; type="text/plain"`,
                `<${SITE_URL}/.well-known/agent.json>; rel="describedby"; type="application/json"`,
            ].join(', '),
        };
        const negotiated = ['/', '/agents', '/blog', '/blog/:slug'];
        return [
            { source: '/:path*', headers: [linkHeader] },
            ...negotiated.map((source) => ({
                source,
                headers: [{ key: 'Vary', value: 'Accept' }],
            })),
        ];
    },
};

module.exports = nextConfig;
