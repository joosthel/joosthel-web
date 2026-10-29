import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '../lib/constants';
import { LATEST_POSTS, PROFILE_INTRO, PROFILE_LINKS, STUDIO_LINE } from '../lib/data';
import { getAllPosts } from '@/lib/blog';
import { profilePageSchema, toJsonLd } from '../lib/schema';
import Section, { Spec } from './components/Section';
import PostList from './components/PostList';
import TrackedLink from './components/TrackedLink';

// Canonical set here, not in the root layout, so 404 pages carry none.
export const metadata: Metadata = {
    alternates: { canonical: '/' },
};

export default function Home() {
    const posts = getAllPosts();

    return (
        <div className="wrap">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(toJsonLd(profilePageSchema())) }}
            />

            <header className="home-top">
                <h1 className="display">{SITE_CONFIG.author}</h1>
            </header>

            <Section n="01" title="About" id="about">
                <p className="lead home-intro">{PROFILE_INTRO.join(' ')}</p>
                <div className="studio">
                    <p className="studio__now label muted">
                        <span className="marker marker--signal" aria-hidden="true" />
                        Now
                    </p>
                    <TrackedLink
                        href={SITE_CONFIG.studio.url}
                        className="studio__link"
                        eventName="studio_click"
                        eventParams={{ location: 'home' }}
                    >
                        {SITE_CONFIG.studio.name} ↗
                    </TrackedLink>
                    <p className="studio__line small muted">{STUDIO_LINE}</p>
                </div>
            </Section>

            <Section n="02" title="Links" id="links" tight>
                <Spec
                    rows={PROFILE_LINKS.map((l) => ({
                        k: l.kind,
                        v: l.value,
                        href: l.href,
                        external: !l.href.startsWith('mailto:'),
                    }))}
                />
            </Section>

            <Section
                n="03"
                title="Writing"
                id="writing"
                meta={<Link href="/blog" className="link-quiet">All {posts.length} posts</Link>}
            >
                <PostList posts={posts.slice(0, LATEST_POSTS)} excerpts={false} />
            </Section>
        </div>
    );
}
