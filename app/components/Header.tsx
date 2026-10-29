"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SITE_CONFIG } from '../../lib/constants';
import TrackedLink from './TrackedLink';

// The name in Geist is the wordmark. On the home page the h1 carries it,
// so the header shows only the nav there. aria-current only on the exact
// /blog path: the prerendered 404 for an unknown /blog/<slug> renders with
// a different pathname on the server, and a prefix match would mismatch on
// hydration.
export default function Header() {
    const pathname = usePathname();
    const onHome = pathname === '/';
    const onBlogIndex = pathname === '/blog';

    return (
        <header className="wrap site-header">
            {!onHome && (
                <Link href="/" className="site-header__home wordmark">
                    {SITE_CONFIG.author}
                </Link>
            )}
            <nav aria-label="Primary">
                <ul className="site-header__nav label">
                    <li>
                        <Link href="/blog" className="link-quiet" aria-current={onBlogIndex ? 'page' : undefined}>
                            Writing
                        </Link>
                    </li>
                    <li>
                        <TrackedLink
                            href={SITE_CONFIG.studio.url}
                            className="link-quiet nocase"
                            eventName="studio_click"
                            eventParams={{ location: 'header' }}
                        >
                            {SITE_CONFIG.studio.name} ↗
                        </TrackedLink>
                    </li>
                </ul>
            </nav>
        </header>
    );
}
