import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { OG_DEFAULT_IMAGE, absoluteUrl } from "@/lib/metadata";
import { SITE_CONFIG } from "@/lib/constants";
import { blogPostingSchema, breadcrumbSchema, toJsonLd } from "@/lib/schema";
import { MDXRemote } from "next-mdx-remote/rsc";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReadingProgress from "@/app/components/ReadingProgress";
import Section, { Spec } from "@/app/components/Section";
import PostList, { formatDate } from "@/app/components/PostList";

export async function generateStaticParams() {
    return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Only the prerendered posts exist; without this Vercel provisions an
// SSR fallback function for unknown slugs.
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    try {
        const { slug } = await params;
        const post = getPostBySlug(slug);
        const image = absoluteUrl(OG_DEFAULT_IMAGE);
        return {
            title: post.title,
            description: post.excerpt,
            alternates: { canonical: `/blog/${post.slug}` },
            openGraph: {
                title: post.title,
                description: post.excerpt,
                url: absoluteUrl(`/blog/${post.slug}`),
                type: 'article',
                publishedTime: new Date(post.date).toISOString(),
                authors: [SITE_CONFIG.author],
                tags: post.tags,
                images: [{ url: image }],
            },
            twitter: {
                card: 'summary_large_image',
                title: post.title,
                description: post.excerpt,
                images: [image],
            },
        };
    } catch {
        return {};
    }
}

function loadPost(slug: string) {
    try {
        return getPostBySlug(slug);
    } catch {
        return null;
    }
}

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const post = loadPost(slug);
    if (!post) {
        notFound();
    }

    const relatedPosts = (post.relatedPosts ?? [])
        .map((relSlug) => loadPost(relSlug))
        .filter((rp) => rp !== null);

    const meta = [
        { k: 'Published', v: <time dateTime={post.date}>{formatDate(post.date, 'long')}</time> },
        ...(post.updated
            ? [{ k: 'Updated', v: <time dateTime={post.updated}>{formatDate(post.updated, 'long')}</time> }]
            : []),
        { k: 'Reading', v: `${post.readTime} min` },
        ...(post.tags.length > 0 ? [{ k: 'Tags', v: post.tags.join(', ') }] : []),
    ];

    return (
        <article className="wrap page">
            <ReadingProgress />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(toJsonLd(
                        blogPostingSchema(post),
                        breadcrumbSchema([
                            { name: 'Home', path: '/' },
                            { name: 'Writing', path: '/blog' },
                            { name: post.title, path: `/blog/${post.slug}` },
                        ])
                    ))
                }}
            />
            <header className="page__top">
                <p className="bar label">
                    <Link href="/blog" className="link-quiet">← Writing</Link>
                    <span className="muted">{post.readTime} min read</span>
                </p>
                <h1 className="post-title">{post.title}</h1>
            </header>

            <div className="section">
                <div className="section__head">
                    <Spec rows={meta} />
                </div>
                <div className="section__body">
                    <div className="prose">
                        <MDXRemote source={post.content} />
                    </div>
                </div>
            </div>

            {relatedPosts.length > 0 && (
                <Section title="Related" id="related" tight>
                    <PostList posts={relatedPosts} excerpts={false} />
                </Section>
            )}
        </article>
    );
}
