export interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    url: string;
    date?: string;
    tags?: string[];
    badge?: string;
    /** Short label for the home page project index, e.g. 'AI Film' */
    category?: string;
}

export const PROJECTS: Project[] = [
    {
        id: 'prompt-engine',
        title: 'Prompt Enhancement Engine',
        description: 'A live AI tool that turns a creative brief and reference images into a full set of optimised, consistent prompts.',
        image: '/assets/imgs/proj_prompt-engine/promptenhancer_screenshot.png',
        url: '/projects/prompt-engine',
        date: '2025-03-01',
        tags: ['Next.js', 'TypeScript', 'OpenRouter', 'Gemini', 'DeepSeek', 'Vercel', 'Prompt Engineering', 'AI Product'],
        badge: 'Live Project',
        category: 'AI Product'
    },
    {
        id: 'ai-video-campaign',
        title: 'AI Video Production for a Global Brand Campaign',
        description: 'A generative AI visual pipeline from storyboard to edited campaign video.',
        image: '/assets/imgs/proj_ai-video-campaign/cover.webp',
        url: '/projects/ai-video-campaign',
        date: '2025-01-15',
        tags: ['AI Visuals', 'Generative Video', 'ComfyUI', 'Prompt Engineering', 'Video Editing'],
        badge: 'NDA. Process only.',
        category: 'AI Film'
    },
    {
        id: 'ai-pipeline-backend',
        title: 'AI Pipeline Backend & Interactive Segmentation Tool',
        description: 'Custom ComfyUI workflows and a web-based segmentation interface for an AI asset platform.',
        image: '/assets/imgs/proj_ai-pipeline-backend/cover.webp',
        url: '/projects/ai-pipeline-backend',
        date: '2024-11-01',
        tags: ['ComfyUI', 'Python', 'Computer Vision', 'API Design', 'Prototyping', 'Full Stack'],
        badge: 'NDA. Process only.',
        category: 'AI Pipeline'
    },
    {
        id: 'souly-boondawg',
        title: 'Souly & Boondawg. I got this feeling.',
        description: 'A hybrid AI music video that turns greenscreen footage into a finished visual through Stable Diffusion and VFX compositing.',
        image: '/assets/imgs/proj_Souly-Boondawg-igotthisfeelling/Souly-Boondawg_igotthisfeeling-02.webp',
        url: '/projects/souly-boondawg',
        date: '2023-11-20',
        tags: ['AI Video Generation', 'Video-to-Video', 'ComfyUI', 'Visual Storytelling'],
        category: 'AI Music Video'
    },
    {
        id: 'inyo-digital-twin',
        title: 'INYO Mobility. Digital Twin Platform.',
        description: 'An interactive 3D platform for vehicle design optimisation, built full-stack with React and Three.js.',
        image: '/assets/imgs/proj_INYO-Digital-Twin/Screenshot_3D-View.webp',
        url: '/projects/inyo-digital-twin',
        date: '2023-09-01',
        tags: ['Digital Twin', '3D Visualization', 'Real-time Rendering', 'Data Integration', 'Full Stack Development'],
        category: 'Digital Twin'
    },
    {
        id: 't-cell',
        title: 'T-Cell AG. Explainer Videos.',
        description: 'A series of videos for T-Cell AG explaining their hydrogen fuel cell technology and the impact it can have on the energy transition.',
        image: '/assets/imgs/proj_T-Cell/T-Cell_Hero.webp',
        url: '/projects/t-cell',
        date: '2023-05-01',
        tags: ['Video Production', 'Motion Graphics', 'Scientific Visualization', 'Hydrogen Technology'],
        category: 'Explainer Film'
    },
    {
        id: 'inyo-viz',
        title: 'INYO Mobility. Various Visualizations.',
        description: '3D visualisations and digital marketing materials for INYO Mobility\'s electric vehicle ecosystem.',
        image: '/assets/imgs/proj_INYO-Viz/INYO-Viz_06.webp',
        url: '/projects/inyo-viz',
        date: '2023-05-01',
        tags: ['3D Visualization', 'Product Rendering', 'Marketing Design', 'Motion Graphics'],
        category: '3D Visualization'
    },
    {
        id: 'msc-arcadia',
        title: 'DesignMorphine MSc. Project Arcadia.',
        description: 'My final project for the MSc in Computational and Advanced Design. A deep exploration of parametric architecture.',
        image: '/assets/imgs/proj_MSc-CAD/MSc-CAD_04.webp',
        url: '/projects/msc-arcadia',
        date: '2022-09-01',
        tags: ['Grasshopper', 'Rhino', 'Python', 'Computational Design', 'Parametric Architecture'],
        category: 'Computational Design'
    }
];

export interface ActiveProject {
    id: string;
    title: string;
    description: string;
    status: 'Live' | 'In Progress' | 'Exploring';
    url?: string;
}

export const ACTIVE_PROJECTS: ActiveProject[] = [
    {
        id: 'prompt-engine',
        title: 'Prompt Enhancement Engine',
        description: 'An AI tool that turns a creative brief and reference images into a full set of optimised, consistent prompts.',
        status: 'Live',
        url: 'https://promptenhancer.joosthelfers.com'
    }
];

export interface Service {
    id: string;
    title: string;
    /** Short version for the home page capability rows and listings. */
    description: string;
    /** Longer paragraphs for the /pipelines expertise page. */
    longDescription?: string[];
    tags?: string[];
}

export interface ServicePackage {
    id: string;
    name: string;
    /** One-line hook shown under the name. */
    tagline: string;
    duration: string;
    description: string;
    deliverables: string[];
    bestFor: string;
}

export const PACKAGES: ServicePackage[] = [
    {
        id: 'readiness-audit',
        name: 'Readiness Audit',
        tagline: 'Find out what could run locally, and what it would cost.',
        duration: '2–3 days',
        description: 'A structured look at your workflows, assets, and requirements that ends with a concrete answer: which parts of your production could run generative AI, what should stay local versus hosted, which hardware fits, and what the realistic budget is. No build included, no obligation to continue.',
        deliverables: [
            'Workflow assessment against your actual production volume',
            'Local-versus-hosted recommendation with reasoning',
            'Hardware and cost scoping',
            'Written roadmap you can act on with anyone',
        ],
        bestFor: 'Teams exploring AI adoption who need numbers before committing.',
    },
    {
        id: 'pilot-pipeline',
        name: 'Pilot Pipeline',
        tagline: 'One workflow, running on your hardware, in two weeks.',
        duration: '2 weeks',
        description: 'A single production workflow built end to end: generation pipeline or local LLM setup, installed on your machines, documented, and handed over working. The pilot proves the concept on real briefs instead of demo cases, and gives you something concrete to evaluate before a larger commitment.',
        deliverables: [
            'One production workflow built and installed on your hardware',
            'Controlled inputs and repeatable settings, versioned',
            'Documentation your team can follow',
            'Handover session with your operators',
        ],
        bestFor: 'Teams past the research stage who want proof on their own use case.',
    },
    {
        id: 'production-build',
        name: 'Production Build',
        tagline: 'The full system: pipeline, interface, team training.',
        duration: '4–8 weeks',
        description: 'Complete AI infrastructure for your production: engineered pipelines, custom interfaces where needed, LoRAs or fine-tuning where base models fall short, and training until your team runs everything independently. Scoped in detail after an audit or pilot, quoted as a fixed price before work starts.',
        deliverables: [
            'Production pipelines engineered and installed',
            'Custom interfaces where off-the-shelf falls short',
            'Custom models or LoRAs where base models fall short',
            'Team training and full handover documentation',
        ],
        bestFor: 'Teams ready to make local AI part of daily production.',
    },
    {
        id: 'agent-ready-sprint',
        name: 'Agent-Ready Sprint',
        tagline: 'Make your company findable by ChatGPT, Claude, and Perplexity.',
        duration: '1 week',
        description: 'A one-week sprint that makes your content readable and queryable for AI agents: llms.txt, structured data, machine-readable feeds, and a public MCP server so assistants can pull facts about your business straight from the source. Runs in production on this very website first, so the reference is inspectable.',
        deliverables: [
            'llms.txt and structured data across your site',
            'Machine-readable feeds and endpoints',
            'Public MCP server for direct agent queries',
            'Markdown content negotiation for every page',
        ],
        bestFor: 'Companies that want to show up when buying decisions start as a question to an assistant.',
    },
];

export const SERVICES: Service[] = [
    {
        id: 'local-pipelines',
        title: 'Local Generative AI Pipelines',
        description: 'Self-hosted generative pipelines and local LLM systems, engineered to run on your GPU hardware. Assets stay in-house, output repeats reliably, your team owns the system at handover.',
        longDescription: [
            'A local pipeline runs AI models on hardware you control: your workstation, an on-premise server, or a rented dedicated GPU. Nothing is sent to a hosted API. For brand work that means assets under NDA never leave the building, there is no per-request meter running, and a system you validated last quarter still behaves the same this quarter.',
            'Systems get built end to end: generative image and video pipelines in ComfyUI, self-hosted language models for drafting, extraction, classification, and internal assistants, and the Python automation layer that ties them into production. Inputs are controlled, settings are versioned, and every step from raw input to delivered result repeats reliably.',
            'Where the cloud is genuinely the better tool, that gets said plainly. But the default setup keeps the work on your side of the network line.',
        ],
        tags: ['On-Premise GPUs', 'ComfyUI', 'Local LLM Inference', 'Custom Nodes', 'LoRA Training', 'Python', 'Workflow Automation']
    },
    {
        id: 'custom-solutions',
        title: 'Custom AI Solutions & Creative Tooling',
        description: 'Off-the-shelf tools rarely fit real production. Purpose-built web apps, internal tooling, and interfaces shaped around how a team actually works.',
        longDescription: [
            'Most AI tools are generic because they were built for everyone. Production teams need the opposite: a tool shaped around their briefs, their approval loops, and their asset formats.',
            'Tools like these get designed and built end to end, from interface to model plumbing. Examples from real projects: a prompt enhancement engine that turns creative briefs into consistent production prompts, and segmentation interfaces that let non-engineers direct computer-vision models in the browser. Built with Next.js, TypeScript, and Python.',
            'Everything ships documented well enough that a team can run it without outside help. Deliberately: tools you depend on should not depend on anyone else.',
        ],
        tags: ['Next.js', 'TypeScript', 'Python', 'API Design', 'Internal Tools', 'Creative Tooling', 'Full Stack']
    },
    {
        id: 'ai-visuals',
        title: 'AI Visual Production & AI Film',
        description: 'Campaign-grade AI visuals and film, produced through controlled pipelines: product consistency across shots, readable text in frame, art direction that survives client review.',
        longDescription: [
            'Campaign imagery has requirements a one-off generation cannot meet: the product looks like the product in every shot, typography in frame is correct, and the edit holds together. Getting there is a pipeline problem before it is a prompting problem.',
            'Visuals and film come out of controlled workflows: reference-locked generation, controlled inputs, and real post-work. The result is imagery that holds up under a brand name, delivered at campaign speed.',
            'This work runs on the same infrastructure as every other build here, locally where the project demands it.',
        ],
        tags: ['AI Visuals', 'AI Film', 'Generative Video', 'Campaign Imagery', 'Brand Consistency', 'Video Production', 'Post-Production']
    },
    {
        id: 'agentic-presence',
        title: 'Agentic Systems & GEO',
        description: 'Brands made readable for AI agents: structured data, llms.txt, machine-readable feeds, and MCP servers. So buying decisions that start as a question to ChatGPT or Claude end with you in the answer.',
        longDescription: [
            'More and more buying decisions start as a question to ChatGPT, Claude, or Perplexity instead of a search box. Showing up in the answer requires content machines can parse and trust: clean structured data, agent-readable formats, and interfaces agents can query directly.',
            'The setup covers llms.txt, JSON-LD, machine-readable feeds, and MCP servers that let assistants pull facts about a business straight from the source. Everything on offer here runs in production on this site first, so you can inspect exactly what you would be getting.',
        ],
        tags: ['GEO', 'llms.txt', 'MCP Servers', 'Structured Data', 'JSON-LD', 'Agentic Workflows', 'Agent Discovery']
    }
];
