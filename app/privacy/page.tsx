import type { Metadata } from 'next';
import { pageMetadata } from '@/lib/metadata';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = pageMetadata('Privacy Policy', 'How joosthelfers.com handles personal data.', '/privacy');

export default function Privacy() {
    return (
        <div className="wrap page">
            <header className="page__top">
                <p className="bar label">
                    <span>Legal</span>
                    <span className="muted">Privacy</span>
                </p>
                <h1 className="display page__title">Privacy Policy</h1>
            </header>
            <div className="section section--tight">
                <article className="prose prose--small">
                    <p>
                        This policy explains which personal data is processed when you visit joosthelfers.com or
                        write to me, why, and what rights you have. You can use this website without telling me
                        anything about yourself. There are no accounts, forms or comments, and the website sets
                        no cookies.
                    </p>

                    <h2>1. Controller</h2>
                    <p>
                        The controller under the General Data Protection Regulation (GDPR) is:
                    </p>
                    <p>
                        Joost Helfers<br />
                        Friedenauer Höhe<br />
                        12159 Berlin<br />
                        Germany<br />
                        Email: <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>
                    </p>

                    <h2>2. Hosting and server logs</h2>
                    <p>
                        This website is hosted by Vercel Inc., 440 N Barranca Avenue #4133, Covina, CA 91723, USA.
                        When you open a page, your browser sends technical data that the server needs to deliver
                        it: your IP address, the date and time, the page requested, the referring page, and your
                        browser and operating system. Vercel processes this data on my behalf to deliver the
                        website and keep it secure, and keeps it in log files for a limited time.
                    </p>
                    <p>
                        The legal basis is Art. 6 (1) (f) GDPR. My legitimate interest is a website that works and
                        is protected against misuse. Vercel may process data in the USA. Vercel is certified under
                        the EU-U.S. Data Privacy Framework, for which the European Commission has adopted an
                        adequacy decision (Art. 45 GDPR).
                    </p>

                    <h2>3. Vercel Web Analytics</h2>
                    <p>
                        To see which pages are read, I use Vercel Web Analytics, provided by Vercel Inc. (address
                        above). It does not use cookies. Visits are
                        counted through an anonymised hash that cannot identify you and is discarded after 24
                        hours. What I see is aggregated: page views, referrers, country, browser and device type.
                        No data is shared for advertising and there is no tracking across websites.
                    </p>
                    <p>
                        The legal basis is Art. 6 (1) (f) GDPR. My legitimate interest is understanding, in
                        aggregate, how the website is used.
                    </p>

                    <h2>4. Fonts, embeds and links</h2>
                    <p>
                        The fonts on this website are served from this domain. The website does not embed
                        third-party content such as videos or maps, and it loads no scripts or files from other
                        servers. It links to other websites, such as LinkedIn, Instagram, GitHub and system³. When
                        you follow such a link, the privacy policy of that website applies.
                    </p>

                    <h2>5. Email</h2>
                    <p>
                        If you write to me by email, I process your email address, your message and any other
                        details you include, in order to reply. Email for this domain is handled by Apple (iCloud
                        Mail), provided in the EU by Apple Distribution International Ltd., Ireland. The legal
                        basis is Art. 6 (1) (b) GDPR if your message relates to a contract or its preparation, and
                        Art. 6 (1) (f) GDPR otherwise; my legitimate interest is answering your message. I delete
                        the correspondence once it is no longer needed, unless legal retention periods apply.
                    </p>

                    <h2>6. Your rights</h2>
                    <p>Under the GDPR you have the right to:</p>
                    <ul>
                        <li>access the personal data I process about you (Art. 15),</li>
                        <li>have inaccurate data corrected (Art. 16),</li>
                        <li>have your data erased (Art. 17),</li>
                        <li>restrict the processing (Art. 18),</li>
                        <li>receive your data in a portable format (Art. 20),</li>
                        <li>
                            object at any time to processing based on Art. 6 (1) (f) GDPR, on grounds relating to
                            your particular situation (Art. 21).
                        </li>
                    </ul>
                    <p>
                        To use these rights, email me. You also have the right to lodge a complaint with a data
                        protection supervisory authority (Art. 77 GDPR). The authority responsible for me is the
                        Berlin Commissioner for Data Protection and Freedom of Information (Berliner Beauftragte
                        für Datenschutz und Informationsfreiheit).
                    </p>

                    <h2>7. Automated decisions</h2>
                    <p>I do not use automated decision-making or profiling.</p>

                    <h2>8. Changes</h2>
                    <p>
                        I update this policy when the website or the law changes. Last updated: October 2026.
                    </p>

                    <p className="muted">(͡ ° ͜ʖ ͡ °)</p>
                </article>
            </div>
        </div>
    );
}
