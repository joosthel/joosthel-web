import { SITE_CONFIG } from './constants';
import { WEBMCP_TOOL_LIST } from './webmcp-tools';

// Canonical source for the published agent skill. The SKILL.md route and
// the index.json digest are both derived from this one string, so the
// sha256 in the index can never drift from the served file.

export const READ_SITE_SKILL_NAME = 'read-joost-helfers';

export const READ_SITE_SKILL_DESCRIPTION =
    'Read the personal site of Joost Helfers (profile, links, blog posts) via llms.txt, JSON endpoints, feeds, markdown content negotiation, or in-browser WebMCP tools.';

export const READ_SITE_SKILL_MD = `---
name: ${READ_SITE_SKILL_NAME}
description: ${READ_SITE_SKILL_DESCRIPTION}
---

# Read the site of Joost Helfers

${SITE_CONFIG.url} is the personal site of Joost Helfers, ${SITE_CONFIG.jobTitle}
at ${SITE_CONFIG.studio.name} in Berlin: a short profile, links, and his writing.
Client work, services and project enquiries are handled by his studio at
${SITE_CONFIG.studio.url}, not here.

## 1. Quick context, one request

Fetch ${SITE_CONFIG.url}/llms.txt for profile, links and the list of posts.
The full text of every blog post is at ${SITE_CONFIG.url}/llms-full.txt.

## 2. Structured data

- Blog posts: GET ${SITE_CONFIG.url}/api/blog.json
- Feeds: ${SITE_CONFIG.url}/feed.xml (RSS), ${SITE_CONFIG.url}/feed.json (JSON Feed, full text)
- Page markdown: request /, /agents, /blog or any /blog/<slug> with the header "Accept: text/markdown"
- Catalog of all endpoints: ${SITE_CONFIG.url}/.well-known/api-catalog

## 3. In the browser

Pages register read-only WebMCP tools through document.modelContext:
${WEBMCP_TOOL_LIST.map((t) => t.name).join(', ')}.

## 4. Contact

Automated or agent-initiated mail: ${SITE_CONFIG.agentEmail}. A human reads
everything that arrives. Humans writing directly are better off at
${SITE_CONFIG.email}.
`;
