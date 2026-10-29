import Link from 'next/link';
import { SITE_CONFIG } from '../../lib/constants';

export default function Footer() {
    return (
        <footer className="wrap">
            <div className="site-footer">
                <Link href="/" className="site-footer__name wordmark">{SITE_CONFIG.author}</Link>
                <ul className="site-footer__links label">
                    <li><span className="muted">© {new Date().getFullYear()}</span></li>
                    <li><a className="link-quiet" href="/feed.xml">RSS</a></li>
                    <li><Link className="link-quiet" href="/agents">For agents</Link></li>
                    <li><Link className="link-quiet" href="/imprint">Imprint</Link></li>
                    <li><Link className="link-quiet" href="/privacy">Privacy</Link></li>
                </ul>
            </div>
        </footer>
    );
}
