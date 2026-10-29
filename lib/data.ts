import { SITE_CONFIG } from './constants';

// Profile copy and links: single source for the home page, its markdown
// rendition, llms.txt, JSON-LD and the WebMCP get_profile tool. Projects and
// services moved to system³ (https://system3.xyz).

export const PROFILE_INTRO = [
    "I'm Joost, a creative technologist based in Berlin.",
    'I studied architecture and computational design and have worked between design and technology ever since.',
    "These days I run system³, my studio, and that's where my client work lives.",
    'Here I keep my writing, mostly on AI and how I work with it.',
];

/** Posts listed on the home page (HTML and markdown). */
export const LATEST_POSTS = 4;

export const STUDIO_LINE = 'Creative technology studio in Berlin. Client work and enquiries go there.';

export interface ProfileLink {
    label: string;
    /** Row label on the home page; set in caps, so never the brand name. */
    kind: string;
    value: string;
    href: string;
}

export const PROFILE_LINKS: ProfileLink[] = [
    { label: 'system³', kind: 'Studio', value: 'system3.xyz', href: SITE_CONFIG.studio.url },
    { label: 'LinkedIn', kind: 'LinkedIn', value: 'in/joosthel', href: SITE_CONFIG.linkedin },
    { label: 'Instagram', kind: 'Instagram', value: '@joosthel', href: SITE_CONFIG.instagram },
    { label: 'GitHub', kind: 'GitHub', value: 'joosthel', href: SITE_CONFIG.github },
    { label: 'Email', kind: 'Email', value: SITE_CONFIG.email, href: `mailto:${SITE_CONFIG.email}` },
];
