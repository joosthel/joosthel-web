import { NextRequest, NextResponse } from 'next/server';

// Markdown for agents: page requests carrying "Accept: text/markdown" are
// rewritten to the prerendered /md/* renditions (lib/markdown.ts); browsers
// never send that Accept value, so HTML stays the default. The matcher
// enumerates page routes only; /_next, /api, the .txt/.xml/.json routes,
// /.well-known, /imprint, /privacy, and /md itself are untouched; the
// redirected legacy paths (/about, /projects/*, ...) never reach it. Keep the
// matcher and getMarkdownParams() in lib/markdown.ts in step.
export const config = {
    matcher: ['/', '/agents', '/blog', '/blog/:slug'],
};

export default function proxy(req: NextRequest) {
    const wantsMarkdown = (req.headers.get('accept') ?? '').includes('text/markdown');

    if (wantsMarkdown) {
        const { pathname } = req.nextUrl;
        const target = new URL(`/md${pathname === '/' ? '' : pathname}`, req.url);
        const res = NextResponse.rewrite(target);
        res.headers.set('Vary', 'Accept');
        return res;
    }

    const res = NextResponse.next();
    res.headers.set('Vary', 'Accept');
    return res;
}
