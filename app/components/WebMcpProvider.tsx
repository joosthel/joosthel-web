'use client';

import { useEffect } from 'react';
import { buildWebMcpTools, type WebMcpTool } from '@/lib/webmcp-tools';

// WebMCP: register the site's read-only tools with the browser so an
// in-page agent (Gemini in Chrome, Edge Copilot, ChatGPT Desktop, ...) can
// query the site without scraping it. Current spec and Chrome 149+ expose
// document.modelContext.registerTool(); early-preview builds exposed
// navigator.modelContext.provideContext(), which is kept as a fallback.
// Hard no-op everywhere else. Production exposure in Chrome 149-156 needs
// an origin-trial token (WEBMCP_ORIGIN_TRIAL_TOKEN, see layout).

type ModelContextLike = {
    registerTool?: (tool: WebMcpTool, options?: { signal?: AbortSignal }) => Promise<void>;
    provideContext?: (context: { tools: unknown[] }) => void;
};

function getModelContext(): ModelContextLike | undefined {
    const doc = document as Document & { modelContext?: ModelContextLike };
    const nav = navigator as Navigator & { modelContext?: ModelContextLike };
    return doc.modelContext ?? nav.modelContext;
}

export default function WebMcpProvider() {
    useEffect(() => {
        const context = getModelContext();
        if (!context) return;
        const tools = buildWebMcpTools();

        if (typeof context.registerTool === 'function') {
            const controller = new AbortController();
            for (const tool of tools) {
                // NotAllowedError when a Permissions-Policy disables `tools`.
                context.registerTool(tool, { signal: controller.signal }).catch(() => undefined);
            }
            return () => controller.abort();
        }

        if (typeof context.provideContext === 'function') {
            context.provideContext({
                tools: tools.map((tool) => ({
                    ...tool,
                    execute: async (input?: Record<string, unknown>) => ({
                        content: [{ type: 'text', text: JSON.stringify(await tool.execute(input), null, 2) }],
                    }),
                })),
            });
        }
    }, []);

    return null;
}
