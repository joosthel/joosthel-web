import { SITE_CONFIG } from './constants';
import { OG_DEFAULT_IMAGE, absoluteUrl } from './metadata';
import type { Project } from './data';
import type { Post } from './blog';
import type { ServicePackage } from './data';

export const PERSON_ID = `${SITE_CONFIG.url}/#person`;
export const WEBSITE_ID = `${SITE_CONFIG.url}/#website`;
export const BLOG_ID = `${SITE_CONFIG.url}/blog#blog`;

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
        description: SITE_CONFIG.description,
        email: `mailto:${SITE_CONFIG.email}`,
        contactPoint: [
            {
                '@type': 'ContactPoint',
                contactType: 'business inquiries',
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
        knowsAbout: [
            'Generative AI',
            'Local Generative AI Pipelines',
            'Self-Hosted AI',
            'Local LLM Inference',
            'ComfyUI',
            'LoRA Training',
            'AI Visual Production',
            'Prompt Engineering',
            'Workflow Automation',
            'Custom AI Solutions',
            'Agentic Workflows',
            'Generative Engine Optimization',
            'Model Context Protocol',
            'Digital Twins',
            'Creative Technology',
            'AI Film',
            'AI Systems',
            'Next.js',
            'Python',
            'Computational Design',
        ],
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

const VISUAL_ARTWORK_IDS = ['souly-boondawg', 'inyo-viz', 'msc-arcadia'];

export function projectSchema(project: Project) {
    return {
        '@type': VISUAL_ARTWORK_IDS.includes(project.id) ? 'VisualArtwork' : 'CreativeWork',
        name: project.title,
        description: project.description,
        url: absoluteUrl(project.url),
        image: absoluteUrl(project.image),
        ...(project.date ? { dateCreated: project.date } : {}),
        ...(project.tags ? { keywords: project.tags.join(', ') } : {}),
        author: personRef(),
        creator: personRef(),
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

export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
    return {
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    };
}

export function serviceSchema(service: { id: string; title: string; description: string }) {
    return {
        '@type': 'Service',
        '@id': `${SITE_CONFIG.url}/pipelines#${service.id}`,
        name: service.title,
        description: service.description,
        url: `${SITE_CONFIG.url}/pipelines#${service.id}`,
        serviceType: service.title,
        provider: personRef(),
        areaServed: [
            { '@type': 'City', name: 'Berlin' },
            { '@type': 'Country', name: 'Germany' },
            { '@type': 'AdministrativeArea', name: 'Worldwide (remote and on-site)' },
        ],
    };
}

export function packageOfferSchema(pkg: ServicePackage) {
    const url = `${SITE_CONFIG.url}/packages#${pkg.id}`;
    return {
        '@type': 'Offer',
        '@id': url,
        name: pkg.name,
        description: `${pkg.tagline} ${pkg.description}`,
        url,
        itemOffered: {
            '@type': 'Service',
            name: pkg.name,
            description: pkg.description,
            serviceType: pkg.name,
            provider: personRef(),
            areaServed: [
                { '@type': 'City', name: 'Berlin' },
                { '@type': 'Country', name: 'Germany' },
                { '@type': 'AdministrativeArea', name: 'Worldwide (remote and on-site)' },
            ],
        },
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
        publisher: {
            '@type': 'Organization',
            name: SITE_CONFIG.author,
            url: SITE_CONFIG.url,
            logo: {
                '@type': 'ImageObject',
                url: absoluteUrl(OG_DEFAULT_IMAGE),
            },
        },
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
        description:
            'Notes on AI visual production, agentic workflows, and how brands show up for AI agents.',
        creator: personRef(),
        blogPost: posts.map((post) => ({
            '@type': 'BlogPosting',
            headline: post.title,
            url: absoluteUrl(`/blog/${post.slug}`),
            datePublished: new Date(post.date).toISOString(),
        })),
    };
}

export function profilePageSchema() {
    return {
        '@type': 'ProfilePage',
        url: absoluteUrl('/about'),
        name: `About ${SITE_CONFIG.author}`,
        mainEntity: personRef(),
        isPartOf: {
            '@type': 'WebSite',
            '@id': WEBSITE_ID,
            name: SITE_CONFIG.author,
            url: SITE_CONFIG.url,
        },
    };
}

// Wraps one or more schema nodes in a single JSON-LD payload.
export function toJsonLd(...nodes: object[]) {
    if (nodes.length === 1) {
        return { '@context': 'https://schema.org', ...nodes[0] };
    }
    return { '@context': 'https://schema.org', '@graph': nodes };
}
