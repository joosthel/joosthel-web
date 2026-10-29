import { getAllPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';
import { BLOG_DESCRIPTION } from '@/lib/schema';

// JSON Feed 1.1 with full post text in content_text — the friendliest
// format for feed readers and LLM agents alike. Static at build time.
export const dynamic = 'force-static';

export async function GET() {
    const feed = {
        version: 'https://jsonfeed.org/version/1.1',
        title: 'Joost Helfers. Writing.',
        home_page_url: `${SITE_CONFIG.url}/blog`,
        feed_url: `${SITE_CONFIG.url}/feed.json`,
        description: BLOG_DESCRIPTION,
        authors: [{ name: SITE_CONFIG.author, url: SITE_CONFIG.url }],
        language: 'en',
        items: getAllPosts().map((post) => ({
            id: `${SITE_CONFIG.url}/blog/${post.slug}`,
            url: `${SITE_CONFIG.url}/blog/${post.slug}`,
            title: post.title,
            summary: post.excerpt,
            content_text: post.content.trim(),
            date_published: new Date(post.date).toISOString(),
            ...(post.updated ? { date_modified: new Date(post.updated).toISOString() } : {}),
            tags: post.tags,
        })),
    };

    return Response.json(feed, {
        headers: { 'Content-Type': 'application/feed+json; charset=utf-8' },
    });
}
