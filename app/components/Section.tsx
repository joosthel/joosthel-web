import type { ReactNode } from 'react';

// Numbered document section: 1px ink rule opens it, the text column carries
// the number and title as a label (meta right) plus an optional intro, the
// content column holds the rest.
export default function Section({
    n,
    title,
    id,
    meta,
    intro,
    tight = false,
    children,
}: {
    n?: string;
    title: string;
    id?: string;
    meta?: ReactNode;
    intro?: ReactNode;
    tight?: boolean;
    children: ReactNode;
}) {
    const titleId = `${id ?? title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-title`;
    return (
        <section id={id} className={`section${tight ? ' section--tight' : ''}`} aria-labelledby={titleId}>
            <div className="section__head">
                <div className="section__meta">
                    <h2 id={titleId} className="label">{n && <span className="muted">{n} </span>}{title}</h2>
                    {meta && <span className="label muted">{meta}</span>}
                </div>
                {intro}
            </div>
            <div className="section__body">{children}</div>
        </section>
    );
}

export interface SpecRow {
    k: string;
    v: ReactNode;
    href?: string;
    external?: boolean;
}

// Spec rows: 96px label column, value 13/1.5, grey 2 hairlines.
export function Spec({ rows, className = '' }: { rows: SpecRow[]; className?: string }) {
    return (
        <dl className={`spec ${className}`.trim()}>
            {rows.map((r) => (
                <div className="spec__row" key={r.k}>
                    <dt className="label">{r.k}</dt>
                    <dd>
                        {r.href ? (
                            <a href={r.href} {...(r.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                                {r.v}
                            </a>
                        ) : (
                            r.v
                        )}
                    </dd>
                </div>
            ))}
        </dl>
    );
}
