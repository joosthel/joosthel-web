# Roadmap — joosthelfers.com

> Historical (June 2026). Since October 2026 the site is a small personal page;
> client work, services and the portfolio moved to system³ (https://system3.xyz)
> and the MCP server was removed. See CLAUDE.md for the current state.

Where the site and the positioning go next. Written June 2026, after the
positioning + GEO upgrade (about page, brand credits, XD Network, structured
data, feeds, llms.txt/llms-full.txt, machine-readable JSON endpoints).

## 1. MCP server — shipped June 2026, in-app

The plan changed from the original separate-repo idea: the whole site moved
from GitHub Pages to Vercel, so the MCP server lives in this repo at
`app/api/[transport]/route.ts` (`/api/mcp`, Streamable HTTP via `mcp-handler`,
public, read-only, no auth). It imports `lib/data.ts` and `content/blog`
directly; no fetch layer, no content duplication. Tools instead of resources
(broader client support): get_profile, list_services, list_projects,
get_project, list_posts, get_post, search_content. Linked from
`/.well-known/agent.json`, llms.txt, and the `/agents` page.

**Still open from the launch checklist**
- Telegram channel for human and agent requests: deferred, planned. Once it
  exists, add the link to `/agents`, `agent.json`, and `SITE_CONFIG`.
- Write the build up as a blog post (see cluster c below). Self-demonstrating.
- Small cleanups: disable GitHub Pages in the repo settings (DNS no longer
  points there), delete the leftover `_github-pages-challenge-joosthel` TXT
  record at Hostinger, and set www → apex redirect in the Vercel dashboard
  (Project → Settings → Domains; canonicals already point at the apex).

**Done June 2026**
- `llms@joosthelfers.com` receives mail (catch-all on the domain, iCloud MX).
- joosthelfers.com and www serve from Vercel over HTTPS. The blocker was a
  hidden `@ ALIAS joosthel.github.io` record at Hostinger that synthesized
  GitHub Pages AAAA answers; deleted 2026-06-10 via the Hostinger API.
- Agent-readiness pass 2026-06-11: Link headers, api-catalog, MCP server
  card, A2A agent card, agent-skills index, Content-Signal robots.txt,
  auth.md, markdown content negotiation (proxy.ts), WebMCP tools.
- DNS-AID (draft-mozleywilliams-dnsop-dnsaid): not implementable as
  specified. Hostinger DNS supports no SVCB/HTTPS record types (API enum:
  A, AAAA, CNAME, ALIAS, MX, TXT, NS, SOA, SRV, CAA) and no DNSSEC signing
  control via the API, so ServiceMode records under `_agents` cannot be
  published or authenticated. Fallback shipped 2026-06-11: TXT records at
  `_agents` and `_index._agents` pointing at the agent card and MCP
  endpoint (non-standard pointer). Revisit if the zone moves to a DNS host
  with SVCB + DNSSEC support.
- The leftover `_github-pages-challenge-joosthel` TXT record is still in
  the zone: the Hostinger MCP delete tool does not expose name/type
  filters safely. Delete it by hand in hPanel at some point; it is inert.

## 2. Editorial calendar (~1 post per month)

Three clusters that match the positioning. Cross-link new posts through the
`relatedPosts` frontmatter field.

**a. AI visual production for brands**
- Product consistency across generated shots: what actually works.
- Training brand LoRAs: when it pays off and when it does not.
- AI vs CGI for campaign work: honest cost and turnaround comparison.
- What "campaign-grade" requires that demos never show.

**b. Shipping AI systems / agentic workflows**
- ComfyUI from prototype to production.
- How I use coding agents on client work.
- Evaluating creative pipelines: quality gates that scale.

**c. GEO / agentic web presence** (continues the MCP-apps post)
- "How I rebuilt my portfolio for AI agents": this upgrade as a case study
  (llms.txt, schema graph, feeds, agent.json). Self-demonstrating.
- Building the portfolio MCP server (phase 2 write-up).
- What LLMs actually read: practical notes on llms.txt, feeds, and schemas.

## 3. Positioning arc

- **Now** (updated June 2026): "AI visuals, pipelines, and agents. Built to
  ship." Identity: creative technologist & AI artist. Proof: portfolio,
  brand credits line, live Prompt Enhancement Engine.
- **Next 6 months**: accumulate named proof. More public case studies in the
  T-Cell mold, testimonials where clients allow it.
- **12 months**: the GEO/agentic-presence cluster positions Joost as someone
  who builds and explains agent-readable brand presence. That feeds directly
  into an "agentic presence" service offer (MCP apps, GEO audits) on top of
  the existing three capabilities.

## 4. Site backlog (small, non-urgent)

- Portrait photo for the Person schema `image` property and the about page.
- A "Lab" page for generative experiments (the 28 unused images in
  `public/assets/imgs/lab/` were deleted in October 2026).
- JPG copies of project hero images if LinkedIn previews of webp ever
  cause trouble.
- Consider `next/image` with `unoptimized` for lazy-loading wins (current
  `<img>` warnings from lint are accepted for now).
