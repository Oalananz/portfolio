import { useState } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { TECH_ITEMS, TECH_CATEGORIES } from '../utils/constants';
import type { TechCategory } from '../utils/constants';

function TechCard({ name, iconUrl, index, visible }: { name: string; iconUrl: string; index: number; visible: boolean }) {
  return (
    <div
      className={`group flex flex-col items-center justify-center gap-3 rounded-xl border border-white/[0.06] bg-surface-900/50 p-5 
        hover:border-primary-500/30 hover:bg-surface-800/60 transition-all duration-500 cursor-default
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${Math.min(index * 40, 600)}ms` }}
    >
      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-gray-800/60 p-2.5 group-hover:bg-gray-800 group-hover:scale-110 transition-all duration-300">
        <img
          src={iconUrl}
          alt={name}
          className="h-full w-full object-contain"
          loading="lazy"
        />
      </div>
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors text-center">
        {name}
      </span>
    </div>
  );
}

export default function Skills() {
  const [active, setActive] = useState<TechCategory>('All');
  const [ref, visible] = useInView(0.05);

  const filtered = active === 'All' ? TECH_ITEMS : TECH_ITEMS.filter((t) => t.category === active);

  return (
    <SectionWrapper className="bg-surface-950/50">
      <div id="skills" className="scroll-mt-20">
        <SectionHeading
          title="Skills & Technologies"
          subtitle="The tools and technologies I use to bring ideas to life"
        />

        {/* Filter tabs */}
        <div
          ref={ref}
          className={`flex flex-wrap gap-2 mb-10 transition-all duration-700 delay-100 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          {TECH_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all duration-300 border ${
                active === cat
                  ? 'border-primary-500 bg-primary-500/15 text-primary-300 shadow-lg shadow-primary-500/10'
                  : 'border-white/[0.06] bg-transparent text-gray-400 hover:text-white hover:border-white/10'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
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
    </SectionWrapper>
  );
}
