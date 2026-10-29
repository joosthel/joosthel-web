import type { Metadata } from "next";
import { getAllPosts } from "@/lib/blog";
import { OG_DEFAULT_IMAGE } from "@/lib/metadata";
import { BLOG_DESCRIPTION, blogCollectionSchema, toJsonLd } from "@/lib/schema";
import BlogFilter from "./BlogFilter";

export const metadata: Metadata = {
    title: 'Writing',
    description: BLOG_DESCRIPTION,
    alternates: { canonical: '/blog' },
    openGraph: {
        title: 'Writing | Joost Helfers',
        description: BLOG_DESCRIPTION,
        url: '/blog',
        type: 'website',
        images: [{ url: OG_DEFAULT_IMAGE, width: 1200, height: 630 }],
    },
};

export default function BlogIndex() {
    const posts = getAllPosts();
    const tags = Array.from(new Set(posts.flatMap((p) => p.tags))).sort();

    return (
        <div className="wrap page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(toJsonLd(blogCollectionSchema(posts))) }}
            />
            <header className="page__top">
                <p className="bar label">
                    <span>Writing</span>
                    <span className="muted">{posts.length} posts</span>
                </p>
                <h1 className="display page__title">Writing</h1>
                <p className="page__lead muted">{BLOG_DESCRIPTION}</p>
            </header>
            <BlogFilter
                tags={tags}
                posts={posts.map(p => ({
                    slug: p.slug,
                    title: p.title,
                    date: p.date,
                    excerpt: p.excerpt,
                    tags: p.tags,
                    readTime: p.readTime,
                }))}
            />
        </div>
    );
}
