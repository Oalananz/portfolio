import { useInView } from '../hooks/useInView';

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  const [ref, visible] = useInView();
  const sectionSlug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div
      ref={ref}
      className={`mb-14 transition-all duration-700 ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
      }`}
    >
      <div className="mb-3 flex flex-wrap items-center gap-2.5">
        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-400">section.map</span>
        <span className="h-px w-12 bg-border-soft" />
        <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">{sectionSlug}</span>
      </div>

      <h2 className="text-3xl font-bold tracking-tight text-text-main sm:text-4xl md:text-5xl">
        {title}
        <span className="ml-1 gradient-text">.</span>
      </h2>

      {subtitle && (
        <p className="mt-3 max-w-3xl text-sm leading-relaxed text-text-secondary sm:text-base">
          {subtitle}
        </p>
      )}

      <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
        <span className="mr-1 text-accent-500">$</span>
        render {sectionSlug}
      </p>
    </div>
  );
}
