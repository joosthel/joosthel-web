# joosthel-web — joosthelfers.com

Personal portfolio of Joost Helfers, Berlin-based creative technologist and AI artist
(AI visuals and film, generative pipelines, agentic systems).

## Stack & deployment

- Next.js App Router, TypeScript, Tailwind CSS. Deployed to **Vercel**; pushes to
  `main` go to production, other branches get preview deployments.
- All pages are statically prerendered. The only server runtime is the public,
  read-only **MCP server** at `app/api/[transport]/route.ts` (`/api/mcp`,
  Streamable HTTP via `mcp-handler`, no auth, SSE disabled). It reads
  `lib/data.ts` and `content/blog` directly; `next.config.js` bundles the MDX
  files into that function via `outputFileTracingIncludes`.
- Build: `npm run build`. Local dev: `npm run dev`.

## Where content lives

- Projects + services: `lib/data.ts` (single source of truth — home project index,
  sitemap, JSON endpoints, and llms.txt all derive from it).
- Blog posts: `content/blog/*.mdx` (frontmatter: title, date, optional `updated`,
  excerpt, tags, optional relatedPosts).
- Site config: `lib/constants.ts`. Bump `SITE_LAST_UPDATED` when static-page copy changes.
- Design system: `app/globals.css` — five neutrals, one blue accent (#0057ff),
  Doto display + Inter body, zero border radii. Reuse existing classes before adding new ones.

## Generated endpoints — never hand-edit the output

`/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/feed.json`, `/api/projects.json`,
`/api/blog.json` are build-time route handlers under `app/` (with
`export const dynamic = 'force-static'`). They regenerate from `lib/data.ts` and
`content/blog` on every build. To change them, edit the route handler or the source
data, never a file in `public/`. A route-handler path must not collide with a
`public/` file of the same name.

JSON-LD schema builders live in `lib/schema.ts`; per-page metadata helpers in
`lib/metadata.ts`.

## Agent surfaces

The site is positioned as a reference for agent-readable portfolios. The surfaces:
MCP server (`/api/mcp`), `/agents` page (human+machine guide), `/llms.txt` +
`/llms-full.txt`, `/.well-known/agent.json` (hand-maintained in `public/`),
JSON endpoints, and feeds. Discovery surfaces generated from `lib/mcp-tools.ts`,
`lib/agent-skills.ts`, and `lib/constants.ts`: `/.well-known/api-catalog`,
`/.well-known/mcp/server-card.json`, `/.well-known/agent-card.json`,
`/.well-known/agent-skills/*`, `/openapi.json`, `/api/health`, `/auth.md`.
`robots.txt` is a route handler (`app/robots.txt/route.ts`) carrying
Content-Signal directives; Link headers live in `next.config.js` `headers()`.
Markdown negotiation: `proxy.ts` rewrites page requests with
`Accept: text/markdown` to `/md/*` routes built by `lib/markdown.ts` — update
`lib/markdown.ts` when static-page copy changes, and `proxy.ts` + the `/md`
params when pages are added. WebMCP: `app/components/WebMcpProvider.tsx` registers the
same seven tools in-browser via `document.modelContext.registerTool()`, built
by `lib/webmcp-tools.ts`; tool metadata lives zod-free in
`lib/mcp-tool-meta.ts` (`lib/mcp-tools.ts` adds the zod shapes). Chrome
149-156 needs an origin-trial token in `WEBMCP_ORIGIN_TRIAL_TOKEN`
to expose tools without a flag. `llms@joosthelfers.com` (in
`SITE_CONFIG.agentEmail`) is the contact address for AI agents and automated
outreach; `mail@` stays the human channel. When projects, services, contact
details, or MCP tools change, `lib/mcp-tools.ts` and the hand-maintained
`agent.json` must stay consistent with `lib/data.ts` and `lib/constants.ts`.

## Voice rules for all site copy

Authentic and down to earth. Direct, modest, concrete sentences. No hype words
(transformative, cutting-edge, passionate), no em dashes, no rule-of-three flourishes,
no AI-sounding filler. Technical terms only where they are earned. When naming brand
credits, keep the honest qualifier: some work shipped via agencies that held the contract.

## Facts that are easy to get wrong

- Brand credits line (Lindt, Zeiss, Google, Bosch, CADFEM, Souly) is "direct and via
  agencies" — do not phrase as direct client relationships.
- XD Network was removed from all site copy in June 2026 (Joost is unsure about
  staying in the collective). Do not re-add it anywhere without asking him.
- Three.js is not a core skill: it was used on one project (INYO digital twin). It may
  appear as a tag on the INYO project pages only, never in bio, stack, or service copy.
- Two projects are NDA ("NDA. Process only.") — never name those clients.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
