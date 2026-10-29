import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import Footer from './components/Footer';
import JsonLd from './components/JsonLd';
import WebMcpProvider from './components/WebMcpProvider';
import { Analytics } from '@vercel/analytics/next';
import { SITE_CONFIG } from '../lib/constants';
import { OG_DEFAULT_IMAGE } from '../lib/metadata';

// next/font downloads the files at build time and serves them from this
// domain; the browser never contacts Google.
const geist = Geist({
    subsets: ['latin'],
    variable: '--font-geist',
    display: 'swap',
});

// Code in posts only, so no preload.
const geistMono = Geist_Mono({
    subsets: ['latin'],
    variable: '--font-geist-mono',
    display: 'swap',
    preload: false,
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_CONFIG.url),
    title: {
        default: SITE_CONFIG.title,
        template: `%s | ${SITE_CONFIG.author}`,
    },
    description: SITE_CONFIG.description,
    openGraph: {
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        url: SITE_CONFIG.url,
        siteName: SITE_CONFIG.author,
        locale: 'en_US',
        type: 'website',
        images: [{ url: OG_DEFAULT_IMAGE, width: 1200, height: 630 }],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_CONFIG.title,
        description: SITE_CONFIG.description,
        images: [OG_DEFAULT_IMAGE],
    },
};

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    userScalable: true,
    themeColor: '#EFEFEF',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
            <head>
                <link rel="icon" type="image/png" href="/assets/favicon/favicon-96x96.png" sizes="96x96" />
                <link rel="icon" type="image/svg+xml" href="/assets/favicon/favicon.svg" />
                <link rel="shortcut icon" href="/assets/favicon/favicon.ico" />
                <link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon/apple-touch-icon.png" />
                <meta name="apple-mobile-web-app-title" content="JH" />
                <link rel="manifest" href="/assets/favicon/site.webmanifest" />
                {/* WebMCP origin trial (Chrome 149-156, Edge 150+): token from
                    https://developer.chrome.com/origintrials, set at build time. */}
                {process.env.WEBMCP_ORIGIN_TRIAL_TOKEN && (
                    <meta httpEquiv="origin-trial" content={process.env.WEBMCP_ORIGIN_TRIAL_TOKEN} />
                )}
                <link rel="alternate" type="application/rss+xml" title="Joost Helfers. Writing." href="/feed.xml" />
                <link rel="alternate" type="application/feed+json" title="Joost Helfers. Writing." href="/feed.json" />
            </head>
            <body>
                <a className="skip label" href="#main">Skip to content</a>
                <Analytics />
                <JsonLd />
                <WebMcpProvider />
                <Header />
                <main id="main">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
