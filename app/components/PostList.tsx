import Link from 'next/link';

export interface PostListItem {
    slug: string;
    title: string;
    date: string;
    excerpt: string;
    readTime: number;
}

export function formatDate(date: string, month: 'short' | 'long' = 'short') {
    return new Date(date).toLocaleDateString('en-GB', {
        day: 'numeric',
        month,
        year: 'numeric',
        timeZone: 'UTC',
    });
}

// Document-style post rows: date column, title + excerpt, read time.
export default function PostList({ posts, excerpts = true }: { posts: PostListItem[]; excerpts?: boolean }) {
    return (
        <ul className="post-list">
            {posts.map((post) => (
                <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`} className="post-row">
                        <time className="post-row__date data" dateTime={post.date}>{formatDate(post.date)}</time>
                        <span className="post-row__text">
                            <span className="post-row__title">{post.title}</span>
                            {excerpts && <span className="post-row__excerpt small">{post.excerpt}</span>}
                        </span>
                        <span className="post-row__meta data">{post.readTime} min</span>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
