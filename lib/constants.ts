// Bump when homepage or other static-page copy changes; used for sitemap lastModified.
// (Git dates are unreliable in CI: deploy builds use shallow clones.)
export const SITE_LAST_UPDATED = '2026-10-29';

export const SITE_CONFIG = {
    title: "Joost Helfers",
    author: "Joost Helfers",
    email: "mail@joosthelfers.com",
    // Dedicated address for AI agents and automated outreach. Mail here is
    // expected to come from bots; a human reads it and replies.
    agentEmail: "llms@joosthelfers.com",
    description: "Joost Helfers is a creative technologist in Berlin and the founder of system³. Personal site and writing.",
    url: "https://joosthelfers.com",
    linkedin: "https://linkedin.com/in/joosthel",
    instagram: "https://instagram.com/joosthel",
    github: "https://github.com/joosthel",
    jobTitle: "Founder and Creative Technologist",
    sameAs: [
        "https://linkedin.com/in/joosthel",
        "https://instagram.com/joosthel",
        "https://github.com/joosthel"
    ],
    // Joost's creative technology studio. Client work, services and the
    // portfolio live there. Written system³ in copy, system3 only in URLs.
    studio: {
        name: "system³",
        url: "https://system3.xyz",
    },
};
