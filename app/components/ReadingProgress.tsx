'use client';

import { useEffect, useRef } from 'react';

// Signal line along the top edge that fills as the reader scrolls: the one
// signal-blue element on post pages.
export default function ReadingProgress() {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        let raf = 0;

        const update = () => {
            raf = 0;
            const doc = document.documentElement;
            const max = doc.scrollHeight - doc.clientHeight;
            const progress = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
            el.style.transform = `scaleX(${progress})`;
        };
        const schedule = () => {
            if (!raf) raf = requestAnimationFrame(update);
        };

        update();
        window.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule);
        return () => {
            if (raf) cancelAnimationFrame(raf);
            window.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
        };
    }, []);

    return <div ref={ref} className="reading-progress" aria-hidden="true" />;
}
