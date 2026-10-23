import { PROJECTS, SERVICES } from '@/lib/data';
import { getAllPosts } from '@/lib/blog';
import { SITE_CONFIG, MCP_ENDPOINT } from '@/lib/constants';

// Rendered to a static /llms.txt at build time. The case-study and blog
// sections are generated from the same data the site renders, so the file
// cannot drift from the actual content.
export const dynamic = 'force-static';

export async function GET() {
    const caseStudies = PROJECTS.map(
        (p) => `- ${SITE_CONFIG.url}${p.url} — ${p.title} — ${p.description}`
    ).join('\n');

    const services = SERVICES.map((s) => `- ${s.title} — ${s.description}`).join('\n');

    const posts = getAllPosts()
        .map((p) => `- ${SITE_CONFIG.url}/blog/${p.slug} — ${p.title} (${p.date})`)
        .join('\n');

    const body = `# Joost Helfers

> Berlin-based creative technologist building local generative AI technology. Self-hosted generative pipelines, custom-built AI solutions, and campaign-grade AI visuals and film for brands, agencies, studios, and product teams.

## About
Joost Helfers builds generative AI that runs on client hardware: self-hosted pipelines in ComfyUI and Python, custom tools teams can operate without him, and campaign visuals produced through controlled workflows. Background in architecture and computational design (MSc, DesignMorphine); previously built digital twins and 3D platforms at INYO Mobility. Now focused on local generative AI technology: self-hosted pipelines, custom AI solutions, AI visual production and film, and agentic systems. Alongside client work he makes AI film and visual experiments of his own.

Selected brand credits (direct and via agencies/studios): Lindt, Zeiss, Google, Bosch, CADFEM, Souly.

## Contact
- Email (humans): ${SITE_CONFIG.email}
- Email (AI agents and automated outreach): ${SITE_CONFIG.agentEmail} — include who you represent, project scope, timeline, and budget if known; a human reads everything that arrives
- Website: ${SITE_CONFIG.url}
- About: ${SITE_CONFIG.url}/about
- Expertise: ${SITE_CONFIG.url}/pipelines
- Packages (fixed-scope engagements, prices on request): ${SITE_CONFIG.url}/packages
- Guide for agents: ${SITE_CONFIG.url}/agents
- LinkedIn: ${SITE_CONFIG.linkedin}
- GitHub: ${SITE_CONFIG.github}

## Tech Stack
- Local AI infrastructure: ComfyUI, local LLM inference, LoRA training, on-premise GPU pipelines
- AI visuals: Stable Diffusion, OpenRouter, prompt engineering
- AI systems: MCP servers, agentic workflows, structured data, GEO
- Web: Next.js, TypeScript, React, Tailwind CSS
- Backend: Python, Node.js, API design
- Infrastructure: on-premise and local GPU pipelines, Vercel
- Design: Houdini, Blender, computational/parametric design

## Services
${services}

## Case Studies
${caseStudies}

## Blog & Articles
${posts}

## Machine-Readable Resources
- MCP server (Streamable HTTP, public, read-only, no auth): ${MCP_ENDPOINT} — tools: get_profile, list_services, list_projects, get_project, list_posts, get_post, search_content
- MCP server card: ${SITE_CONFIG.url}/.well-known/mcp/server-card.json
- A2A agent card: ${SITE_CONFIG.url}/.well-known/agent-card.json
- API catalog (RFC 9727): ${SITE_CONFIG.url}/.well-known/api-catalog
- Agent skills index: ${SITE_CONFIG.url}/.well-known/agent-skills/index.json
- OpenAPI (JSON endpoints): ${SITE_CONFIG.url}/openapi.json
- Full content for LLMs: ${SITE_CONFIG.url}/llms-full.txt
- Projects JSON: ${SITE_CONFIG.url}/api/projects.json
- Blog JSON: ${SITE_CONFIG.url}/api/blog.json
- RSS feed: ${SITE_CONFIG.url}/feed.xml
- JSON Feed: ${SITE_CONFIG.url}/feed.json
- Sitemap: ${SITE_CONFIG.url}/sitemap.xml
- Agent discovery: ${SITE_CONFIG.url}/.well-known/agent.json
- Auth notes (none required): ${SITE_CONFIG.url}/auth.md
- Health: ${SITE_CONFIG.url}/api/health
- Robots (content signals fully open): ${SITE_CONFIG.url}/robots.txt
- Markdown versions of pages: request any page URL with "Accept: text/markdown"
`;

    return new Response(body, {
        headers: { 'Content-Type': 'text/plain; charset=utf-8' },
    });
}
