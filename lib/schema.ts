import { SITE_CONFIG } from './constants';
import { OG_DEFAULT_IMAGE, absoluteUrl } from './metadata';
import type { Post } from './blog';

export const PERSON_ID = `${SITE_CONFIG.url}/#person`;
export const WEBSITE_ID = `${SITE_CONFIG.url}/#website`;
export const BLOG_ID = `${SITE_CONFIG.url}/blog#blog`;
export const STUDIO_ID = `${SITE_CONFIG.studio.url}/#organization`;

export const BLOG_DESCRIPTION = 'Notes by Joost Helfers on AI, local models and the work around them.';

// Compact reference to the Person entity defined in the root layout graph.
// Name and url are repeated so the node is still meaningful for parsers
// that do not merge @id references across script tags.
function personRef() {
    return {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.url,
    };
}

export function personSchema() {
    return {
        '@type': 'Person',
        '@id': PERSON_ID,
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.url,
        sameAs: SITE_CONFIG.sameAs,
        jobTitle: SITE_CONFIG.jobTitle,
        worksFor: {
            '@type': 'Organization',
            '@id': STUDIO_ID,
            name: SITE_CONFIG.studio.name,
            alternateName: 'system3',
            url: SITE_CONFIG.studio.url,
        },
        description: SITE_CONFIG.description,
        email: `mailto:${SITE_CONFIG.email}`,
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'personal',
                email: SITE_CONFIG.email,
            },
            {
                '@type': 'ContactPoint',
                contactType: 'AI agent inquiries',
                email: SITE_CONFIG.agentEmail,
                description: 'Contact channel for AI agents and automated outreach; replies come from a human.',
            },
        ],
        address: {
            '@type': 'PostalAddress',
            addressLocality: 'Berlin',
            addressCountry: 'DE',
        },
        alumniOf: {
            '@type': 'EducationalOrganization',
            name: 'DesignMorphine',
        },
    };
}

export function webSiteSchema() {
    return {
        '@type': 'WebSite',
        '@id': WEBSITE_ID,
        name: SITE_CONFIG.author,
        url: SITE_CONFIG.url,
        description: SITE_CONFIG.description,
        publisher: { '@id': PERSON_ID },
        inLanguage: 'en',
    };
}

export function profilePageSchema() {
    return {
        '@type': 'ProfilePage',
        url: absoluteUrl('/'),
        name: SITE_CONFIG.author,
        mainEntity: personRef(),
        isPartOf: { '@id': WEBSITE_ID },
    };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>) {
    return {
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: absoluteUrl(item.path),
        })),
    };
}

export function blogPostingSchema(post: Post) {
    return {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.excerpt,
        url: absoluteUrl(`/blog/${post.slug}`),
        mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
        image: absoluteUrl(OG_DEFAULT_IMAGE),
        datePublished: new Date(post.date).toISOString(),
        dateModified: new Date(post.updated ?? post.date).toISOString(),
        keywords: post.tags.join(', '),
        wordCount: post.content.trim().split(/\s+/).length,
        inLanguage: 'en',
        author: personRef(),
        publisher: personRef(),
        isPartOf: {
            '@type': 'Blog',
            '@id': BLOG_ID,
            name: 'Writing',
            url: absoluteUrl('/blog'),
        },
    };
}

export function blogCollectionSchema(posts: Post[]) {
    return {
        '@type': 'Blog',
        '@id': BLOG_ID,
        name: 'Writing',
        url: absoluteUrl('/blog'),
        description: BLOG_DESCRIPTION,
        creator: personRef(),
        blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: new Date(post.date).toISOString(),
        })),
    };
}

// Wraps one or more schema nodes in a single JSON-LD payload.
export function toJsonLd(...nodes: object[]) {
    if (nodes.length === 1) {
        return { '@context': 'https://schema.org', ...nodes[0] };
    }
    return { '@context': 'https://schema.org', '@graph': nodes };
}
