import type { Metadata } from 'next';
import { SITE_CONFIG } from './constants';

export const OG_DEFAULT_IMAGE = '/assets/imgs/og-default.png';

export function absoluteUrl(path: string): string {
    return `${SITE_CONFIG.url}${path}`;
}

export function pageMetadata(title: string, description: string, path: string): Metadata {
    const url = absoluteUrl(path);
    return {
        title,
        description,
        alternates: { canonical: path },
        openGraph: {
            title,
            description,
            url,
            type: 'website',
            images: [{ url: OG_DEFAULT_IMAGE, width: 1200, height: 630 }],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [OG_DEFAULT_IMAGE],
        },
    };
}
