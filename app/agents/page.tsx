import type { Metadata } from 'next';
import Link from 'next/link';
import { SITE_CONFIG } from '@/lib/constants';
import { AGENT_ENDPOINTS } from '@/lib/agent-endpoints';
import { WEBMCP_TOOL_LIST } from '@/lib/webmcp-tools';
import { pageMetadata } from '@/lib/metadata';
import { breadcrumbSchema, toJsonLd } from '@/lib/schema';
import Section from '../components/Section';

export const metadata: Metadata = pageMetadata(
    'For AI agents',
    'How AI agents can read this site: llms.txt, JSON endpoints, feeds, markdown, in-browser WebMCP tools, and a contact address for automated outreach.',
    '/agents',
);

export default function AgentsPage() {
    return (
        <div className="wrap page">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(
                        toJsonLd(
                            breadcrumbSchema([
                                { name: 'Home', path: '/' },
                                { name: 'For AI agents', path: '/agents' },
                            ]),
                        ),
                    ),
                }}
            />
            <header className="page__top">
                <p className="bar label">
                    <span>For AI agents</span>
                    <span className="muted">Machine-readable</span>
                </p>
                <h1 className="display page__title">For agents</h1>
                <p className="page__lead">
                    This is my personal site: a short profile, links and my writing. Everything here is also
                    available in machine-readable form. Client work, services and project enquiries go to my
                    studio, <a href={SITE_CONFIG.studio.url}>{SITE_CONFIG.studio.name}</a>. Humans can start
                    on the <Link href="/">home page</Link>.
                </p>
            </header>

            <Section n="01" title="Endpoints" id="endpoints" tight>
                <dl className="spec spec--code">
                    {AGENT_ENDPOINTS.map(([path, desc]) => (
                        <div className="spec__row" key={path}>
                            <dt><a href={path} className="link-quiet">{path}</a></dt>
                            <dd>{desc}</dd>
                        </div>
                    ))}
                </dl>
            </Section>

            <Section n="02" title="Markdown and WebMCP" id="webmcp" tight>
                <div className="prose prose--small">
                    <p>
                        The home page, this page, the blog index and every post return markdown when requested
                        with an <code>Accept: text/markdown</code> header. Browsers keep getting HTML. The imprint
                        and privacy pages are HTML only.
                    </p>
                    <p>
                        In browsers that implement WebMCP (Chrome 149 and Edge 150 during the origin trial, or
                        any Chromium build with the <code>enable-webmcp-testing</code> flag), every page registers
                        these tools through <code>document.modelContext.registerTool()</code>. All are read-only.
                    </p>
                </div>
                <dl className="spec spec--code">
                    {WEBMCP_TOOL_LIST.map((tool) => (
                        <div className="spec__row" key={tool.name}>
                            <dt>{tool.name}</dt>
                            <dd>{tool.blurb}</dd>
                        </div>
                    ))}
                </dl>
            </Section>

            <Section n="03" title="Contact" id="contact" tight>
                <div className="prose prose--small">
                    <p>
                        Automated and agent-initiated mail goes to{' '}
                        <a href={`mailto:${SITE_CONFIG.agentEmail}`}>{SITE_CONFIG.agentEmail}</a>. Mail to this
                        address is expected to come from bots, so no need to pretend otherwise. A human reads
                        everything that arrives.
                    </p>
                    <p>
                        Humans writing directly are better off at{' '}
                        <a href={`mailto:${SITE_CONFIG.email}`}>{SITE_CONFIG.email}</a>.
                    </p>
                </div>
            </Section>
        </div>
    );
}
