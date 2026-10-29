import { createHash } from 'node:crypto';
import {
    READ_SITE_SKILL_DESCRIPTION,
    READ_SITE_SKILL_MD,
    READ_SITE_SKILL_NAME,
} from '@/lib/agent-skills';
import { SITE_CONFIG } from '@/lib/constants';

// Agent Skills Discovery index (RFC v0.2.0). The digest is computed at
// build time from the same string the SKILL.md route serves.
export const dynamic = 'force-static';

export async function GET() {
    const digest = createHash('sha256')
        .update(READ_SITE_SKILL_MD, 'utf8')
        .digest('hex');

    return Response.json({
        $schema: 'https://schemas.agentskills.io/discovery/0.2.0/schema.json',
        skills: [
            {
                name: READ_SITE_SKILL_NAME,
                type: 'skill-md',
                description: READ_SITE_SKILL_DESCRIPTION,
                url: `${SITE_CONFIG.url}/.well-known/agent-skills/${READ_SITE_SKILL_NAME}/SKILL.md`,
                digest: `sha256:${digest}`,
            },
        ],
    });
}
