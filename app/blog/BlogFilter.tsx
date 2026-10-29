"use client";

import { useState } from "react";
import PostList, { type PostListItem } from "../components/PostList";

interface BlogPost extends PostListItem {
    tags: string[];
}

export default function BlogFilter({ posts, tags }: { posts: BlogPost[]; tags: string[] }) {
    const [activeTag, setActiveTag] = useState<string | null>(null);

    const filtered = activeTag
        ? posts.filter((p) => p.tags.includes(activeTag))
        : posts;

    return (
        <section className="section" aria-label="Posts">
            <div className="section__head">
                <div className="section__meta">
                    <h2 className="label"><span className="muted">Filter</span></h2>
                    <span className="label muted">{filtered.length} shown</span>
                </div>
                <div className="filter label" role="group" aria-label="Filter by tag">
                    <button
                        type="button"
                        onClick={() => setActiveTag(null)}
                        className="filter__btn"
                        aria-pressed={!activeTag}
                    >
                        All
                    </button>
                    {tags.map((tag) => (
                        <button
                            type="button"
                            key={tag}
                            onClick={() => setActiveTag(activeTag === tag ? null : tag)}
                            className="filter__btn"
                            aria-pressed={activeTag === tag}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>
            <div className="section__body">
                {filtered.length > 0 ? (
                    <PostList posts={filtered} />
                ) : (
                    <p className="small muted">No posts found for this tag.</p>
                )}
            </div>
        </section>
    );
}
