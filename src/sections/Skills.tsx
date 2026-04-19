import { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { TECH_ITEMS, TECH_CATEGORIES } from '../utils/constants';
import type { TechCategory } from '../utils/constants';

function TechCard({ name, iconUrl, index, visible }: { name: string; iconUrl: string; index: number; visible: boolean }) {
  return (
    <div
      className={`group flex cursor-default flex-col items-center justify-center gap-3 rounded-xl border border-border-soft bg-bg-surface/82 p-5 transition-all duration-500 hover:border-primary-500/45 hover:bg-bg-elevated/85
        ${visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'}`}
      style={{ transitionDelay: `${Math.min(index * 40, 600)}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg border border-border-soft bg-bg-elevated/75 p-2.5 transition-all duration-300 group-hover:scale-105 group-hover:border-primary-500/45">
        <img
          src={iconUrl}
          alt={name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-center text-sm font-medium text-text-secondary transition-colors group-hover:text-text-main">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<TechCategory>('All');
  const [ref, visible] = useInView(0.05);

  const filtered = active === 'All' ? TECH_ITEMS : TECH_ITEMS.filter((t) => t.category === active);
  const activeSlug = active.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  return (
    <SectionWrapper
      className="bg-bg-surface/30"
      shellLabel="osamah@portfolio:~/skills"
      shellCommand="ls stack --grouped"
    >
      <div id="skills" className="scroll-mt-20">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life"
        />

        <div
          ref={ref}
          className={`grid gap-8 transition-all duration-700 delay-100 lg:grid-cols-[270px_1fr] ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
          }`}
        >
          <aside className="rounded-2xl border border-border-soft bg-bg-surface/86 p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-400">terminal.filters</p>
            <div className="mt-4 space-y-2">
              {TECH_CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActive(cat)}
                  className={`flex w-full items-center justify-between rounded-md border px-3 py-2.5 font-mono text-[11px] uppercase tracking-[0.12em] transition-all duration-300 ${
                    active === cat
                      ? 'border-primary-500 bg-primary-500/15 text-primary-300'
                      : 'border-border-soft bg-bg-main/20 text-text-muted hover:border-primary-500/45 hover:text-text-main'
                  }`}
                >
                  <span>{cat}</span>
                  <span>{cat === 'All' ? TECH_ITEMS.length : TECH_ITEMS.filter((t) => t.category === cat).length}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-xl border border-border-soft bg-bg-elevated/70 p-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">active filter</p>
              <p className="mt-1 text-sm text-text-main">{active}</p>
              <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-accent-400">
                {filtered.length} modules loaded
              </p>
            </div>
          </aside>

          <div className="min-w-0">
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                <span className="mr-1 text-accent-500">$</span>
                ls /stack/{activeSlug}
              </p>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-primary-300">
                {filtered.length} technologies
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
              {filtered.map((tech, i) => (
                <TechCard
                  key={tech.name}
                  name={tech.name}
                  iconUrl={tech.iconUrl}
                  index={i}
                  visible={visible}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
