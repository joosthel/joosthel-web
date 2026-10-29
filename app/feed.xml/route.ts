import { getAllPosts } from '@/lib/blog';
import { SITE_CONFIG } from '@/lib/constants';
import { BLOG_DESCRIPTION } from '@/lib/schema';

// RSS 2.0 feed for the blog, rendered to a static /feed.xml at build time.
export const dynamic = 'force-static';

function escapeXml(value: string): string {
    return value
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

export async function GET() {
    const posts = getAllPosts();
    const newestDate = posts.length ? new Date(posts[0].date) : new Date(0);

    const items = posts
        .map((post) => {
            const url = `${SITE_CONFIG.url}/blog/${post.slug}`;
            const categories = post.tags
                .map((tag) => `      <category>${escapeXml(tag)}</category>`)
                .join('\n');
            return `    <item>
      <title>${escapeXml(post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <description>${escapeXml(post.excerpt)}</description>
${categories}
    </item>`;
        })
        .join('\n');

    const body = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Joost Helfers. Writing.</title>
    <link>${SITE_CONFIG.url}/blog</link>
    <description>${escapeXml(BLOG_DESCRIPTION)}</description>
    <language>en</language>
    <lastBuildDate>${newestDate.toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_CONFIG.url}/feed.xml" rel="self" type="application/rss+xml"/>
${items}
  </channel>
</rss>
`;

    return new Response(body, {
        headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' },
    });
}
