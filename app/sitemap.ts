import { MetadataRoute } from 'next';
import { SITE_CONFIG, SITE_LAST_UPDATED } from '@/lib/constants';
import { getAllPosts } from '@/lib/blog';

export const dynamic = 'force-static';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const posts = getAllPosts();
    const siteUpdated = new Date(SITE_LAST_UPDATED);
    const newestPostDate = posts.length ? new Date(posts[0].date) : siteUpdated;
    // The home page lists the latest posts, so it changes with them too.
    const homeUpdated = newestPostDate > siteUpdated ? newestPostDate : siteUpdated;

    const routes: MetadataRoute.Sitemap = [
        {
            url: SITE_CONFIG.url,
            lastModified: homeUpdated,
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: `${SITE_CONFIG.url}/blog`,
            lastModified: newestPostDate,
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${SITE_CONFIG.url}/agents`,
            lastModified: siteUpdated,
            changeFrequency: 'yearly',
            priority: 0.4,
        },
        {
            url: `${SITE_CONFIG.url}/imprint`,
            lastModified: siteUpdated,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
        {
            url: `${SITE_CONFIG.url}/privacy`,
            lastModified: siteUpdated,
            changeFrequency: 'yearly',
            priority: 0.2,
        },
    ];

    // Post pages change when the site-wide template does, so lastmod is the
    // later of the post's own date and SITE_LAST_UPDATED.
    const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
        const postDate = new Date(post.updated ?? post.date);
        return {
            url: `${SITE_CONFIG.url}/blog/${post.slug}`,
            lastModified: postDate > siteUpdated ? postDate : siteUpdated,
            changeFrequency: 'monthly',
            priority: 0.7,
        };
    });

    return [...routes, ...blogRoutes];
}
