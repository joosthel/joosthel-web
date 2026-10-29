import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = pageMetadata('Imprint', 'Legal information for joosthelfers.com.', '/imprint');

export default function Imprint() {
    return (
        <div className="wrap page">
            <header className="page__top">
                <p className="bar label">
                    <span>Legal</span>
                    <span className="muted">Imprint</span>
                </p>
                <h1 className="display page__title">Imprint</h1>
            </header>
            <div className="section section--tight">
                <article className="prose prose--small">
                    <h2>Information according to § 5 DDG</h2>
                    <p>
                        Joost Helfers<br />
                        Friedenauer Höhe<br />
                        12159 Berlin<br />
                        Germany
                    </p>

                    <h2>Contact</h2>
                    <p>
                        Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a><br />
                        Instagram: <a href={SITE_CONFIG.instagram}>@joosthel</a><br />
                        LinkedIn: <a href={SITE_CONFIG.linkedin}>in/joosthel</a>
                    </p>

                    <h2>VAT ID</h2>
                    <p>VAT identification number according to § 27a UStG: DE451239713</p>

                    <h2>Responsible for content</h2>
                    <p>
                        Responsible for the content according to § 18 (2) MStV: Joost Helfers, address as above.
                    </p>

                    <h2>Liability for content</h2>
                    <p>
                        I create the content of this website with care, but I cannot guarantee that it is accurate,
                        complete or up to date. I am responsible for my own content on these pages under the general
                        laws. I am not obliged to monitor transmitted or stored third-party information, or to look
                        for circumstances that indicate illegal activity (Art. 8 of the Digital Services Act,
                        Regulation (EU) 2022/2065). Obligations to remove or block information under the general
                        laws remain unaffected. If I become aware of a legal violation, I will remove the content
                        in question promptly.
                    </p>

                    <h2>Liability for links</h2>
                    <p>
                        This website links to external websites, such as LinkedIn, Instagram, GitHub and system³. I
                        have no influence on their content, so I cannot accept liability for it. The respective
                        provider or operator is always responsible for the content of linked pages. If I become
                        aware of a legal violation on a linked page, I will remove the link promptly.
                    </p>

                    <h2>Copyright</h2>
                    <p>
                        The content and works on this website are subject to German copyright law. Reproduction,
                        editing, distribution and any kind of use beyond the limits of copyright law require my
                        prior written consent. Copies of this website are permitted for private, non-commercial
                        use only.
                    </p>
                </article>
            </div>
        </div>
    );
}
