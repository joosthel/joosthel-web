import { READ_SITE_SKILL_MD } from '@/lib/agent-skills';

// Serves the canonical skill markdown from lib/agent-skills.ts. The
// digest in ../index.json is computed from the same string.
export const dynamic = 'force-static';

export async function GET() {
    return new Response(READ_SITE_SKILL_MD, {
        headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
    });
}
