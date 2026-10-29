import Link from 'next/link';
import { SITE_CONFIG } from '../lib/constants';

export default function NotFound() {
    return (
        <div className="wrap page page--short">
            <header className="page__top">
                <p className="bar label">
                    <span>404</span>
                    <span className="muted">Not found</span>
                </p>
                <h1 className="display page__title">Page not found.</h1>
                <p className="page__lead">
                    This page does not exist, or it moved. Client work and projects are now
                    at <a href={SITE_CONFIG.studio.url} target="_blank" rel="noopener noreferrer">{SITE_CONFIG.studio.name}</a>. <Link href="/">Back to the home page</Link>.
                </p>
            </header>
        </div>
    );
}
