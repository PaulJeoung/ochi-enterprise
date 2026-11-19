import type { ReactNode } from 'react';

type Props = { eyebrow?: string; title: string; children?: ReactNode; id?: string };

export default function SectionTitle({ eyebrow, title, children, id }: Props) {
  return (
    <div className="mb-6">
      {eyebrow && <div className="text-xs font-semibold uppercase tracking-wider text-ochi-amber-600">{eyebrow}</div>}
      <h2 id={id} className="mt-1 text-xl font-bold text-ochi-navy-800 sm:text-2xl">
        {title}
      </h2>
      {children && <p className="mt-2 text-sm leading-relaxed text-slate-600">{children}</p>}
    </div>
  );
}
