# joosthel-web — joosthelfers.com

Personal site of Joost Helfers, Founder and Creative Technologist at system³
(https://system3.xyz), his creative technology studio in Berlin. The site holds
only: who he is, his links, a link to system³, and his blog. Client work,
services and the portfolio live at system³, not here. Do not add projects,
services, packages, prices, client lists or a brand-credits line.

## Stack & deployment

- Next.js App Router, TypeScript, plain CSS (no Tailwind). Deployed to **Vercel**;
  pushes to `main` go to production, other branches get preview deployments.
- All pages and endpoints are statically prerendered. The only runtime is
  `proxy.ts` (markdown negotiation). There is no MCP server any more (removed
  2026-10 at Joost's request; `/api/mcp` is gone).
- Build: `npm run build`. Lint: `npm run lint`. Local dev: `npm run dev`.

## Where content lives

- Profile copy and links: `lib/data.ts` (`PROFILE_INTRO`, `STUDIO_LINE`,
  `PROFILE_LINKS`). Single source for the home page, its markdown rendition,
  llms.txt, llms-full.txt and the WebMCP `get_profile` tool.
- Blog posts: `content/blog/*.mdx` (frontmatter: title, date, optional `updated`,
  excerpt, tags, optional relatedPosts). Keep slugs stable.
- Site config: `lib/constants.ts` (`SITE_CONFIG`, incl. `studio`). Bump
  `SITE_LAST_UPDATED` when static-page copy changes.
- Redirects for the removed portfolio pages (`/about`, `/projects/*`,
  `/packages`, `/pipelines`) live in `next.config.js` `redirects()`. `/about`
  goes to `/` (308). The others go to `/` with 307s while `SYSTEM3_LIVE` is
  false; once system3.xyz serves the new site, set it to true and they become
  308s to system3.xyz (`/projects/souly-boondawg` to `/work/souly-boondawg`,
  other projects to `/#work`, `/packages` and `/pipelines` to the root).

## Design system

`app/globals.css`: the system³ design system, reduced. Tokens from the system³
brand handoff (`~/Documents/Projects/System3-Rebranding/System³ brand
identity/design_handoff_system3_brand/`): ink #131313, paper #EFEFEF, grey 1
#6B6B6B, grey 2 #C8C8C8, signal #2F6BFF. Geist + Geist Mono (code only),
self-hosted through `next/font` in `app/layout.tsx`. Document-style layout:
full width, 40px gutters (16px on phones), numbered sections opened by a 1px
ink rule, a 240-340px label column beside the content column, spec rows with
grey 2 hairlines. Components: `app/components/Section.tsx` (Section, Spec),
`PostList.tsx`.

- No system³ wordmark, s³ mark or field graphic. Joost's name in Geist 500,
  -0.045em is the wordmark (`.wordmark`).
- Signal blue at most once per page and only for state: the "Now" marker on
  the home page, the reading-progress line on posts.
- No rounded corners, shadows, gradients or scroll animations.
- Write system³ with the elevated ³ in copy; system3 only in URLs. Inside
  uppercase labels use `.nocase` so it never reads SYSTEM³.
- OG image: `public/assets/imgs/og-default.png`, rendered from
  `scripts/og-default.html`.

## Generated endpoints — never hand-edit the output

`/llms.txt`, `/llms-full.txt`, `/feed.xml`, `/feed.json`, `/api/blog.json`,
`/sitemap.xml`, `/robots.txt` are build-time route handlers under `app/` (with
`export const dynamic = 'force-static'`). They regenerate from `lib/data.ts`,
`lib/constants.ts` and `content/blog` on every build. To change them, edit the
route handler or the source data, never a file in `public/`. A route-handler
path must not collide with a `public/` file of the same name.

JSON-LD schema builders live in `lib/schema.ts` (Person: jobTitle "Founder and
Creative Technologist", worksFor system³, sameAs LinkedIn, Instagram, GitHub);
per-page metadata helpers in `lib/metadata.ts`.

## Agent surfaces

`/agents` page (human+machine guide), `/llms.txt` + `/llms-full.txt`,
`/.well-known/agent.json` (hand-maintained in `public/`), `/api/blog.json`, and
feeds. Generated discovery surfaces: `/.well-known/api-catalog`,
`/.well-known/agent-skills/*` (from `lib/agent-skills.ts`), `/openapi.json`,
`/api/health`, `/auth.md`. The endpoint list on `/agents` and in llms.txt comes
from `lib/agent-endpoints.ts`. `robots.txt` carries Content-Signal directives;
Link headers live in `next.config.js` `headers()`.
Markdown negotiation: `proxy.ts` rewrites page requests with
`Accept: text/markdown` to `/md/*` routes built by `lib/markdown.ts`; update
`lib/markdown.ts` when static-page copy changes, and `proxy.ts` + the `/md`
params (plus the `negotiated` list in `next.config.js`) when pages are added.
WebMCP: `app/components/WebMcpProvider.tsx` registers four read-only tools
(`get_profile`, `list_posts`, `get_post`, `search_posts`) in-browser via
`document.modelContext.registerTool()`; tools and their metadata live in
`lib/webmcp-tools.ts`. Chrome 149-156 needs an origin-trial token in
`WEBMCP_ORIGIN_TRIAL_TOKEN` to expose tools without a flag.
`llms@joosthelfers.com` (`SITE_CONFIG.agentEmail`) is the contact address for AI
agents and automated outreach; `mail@` stays the human channel. When links,
contact details or WebMCP tools change, keep the hand-maintained `agent.json`
consistent with `lib/data.ts`, `lib/constants.ts` and `lib/webmcp-tools.ts`.

## Voice rules for all site copy

Authentic and down to earth. Direct, modest, concrete sentences, first person on
the home page. No hype words (transformative, cutting-edge, passionate), no em
dashes, no rule-of-three flourishes, no AI-sounding filler. Technical terms only
where they are earned. Use the personal-voice skill for new copy.

## Facts that are easy to get wrong

- XD Network was removed from all site copy in June 2026 (Joost is unsure about
  staying in the collective). Do not re-add it anywhere without asking him.
- Three.js is not a core skill. Never put it in bio or profile copy.
- No client names on this site. Some past work is under NDA.
- promptenhancer.joosthelfers.com is a separate deployment; leave it alone.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
