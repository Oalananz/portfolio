import { Award, GraduationCap, Code, Trophy, FileDown, Eye } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { PERSONAL_INFO } from '../utils/constants';

const highlights = [
  { icon: GraduationCap, label: 'Computer\nEngineer', detail: "Bachelor's Degree" },
  { icon: Code, label: '42 Amman\nStudent', detail: 'Peer-to-Peer Learning' },
  { icon: Trophy, label: '1st Place', detail: 'Shadow Code' },
  { icon: Award, label: 'Certified', detail: 'Microsoft · ProgrammingAdvices · More' },
];

export default function About() {
  const [ref, visible] = useInView();

  return (
    <SectionWrapper shellLabel="osamah@portfolio:~/about" shellCommand="cat profile.md">
      <div id="about" className="scroll-mt-20">
        <SectionHeading
          title="About Me"
          subtitle="A snapshot of my journey in software engineering"
        />

        <div
          ref={ref}
          className={`space-y-6 transition-all duration-700 delay-100 ${
            visible ? 'translate-x-0 opacity-100' : 'translate-x-8 opacity-0'
          }`}
        >
            <div className="rounded-2xl border border-border-soft bg-bg-surface/86 p-6 sm:p-7">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-400">profile.summary</p>
                <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">
                  <span className="mr-1 text-accent-500">$</span>
                  whoami
                </p>
              </div>

              <div className="mt-4 space-y-4">
                {PERSONAL_INFO.aboutParagraphs.map((p, i) => (
                  <p key={i} className="leading-relaxed text-text-secondary">{p}</p>
                ))}
              </div>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={PERSONAL_INFO.cvUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary-500 bg-primary-500 px-4 py-2.5 text-sm font-semibold text-bg-main transition-colors hover:bg-primary-400"
                >
                  <Eye size={15} />
                  View CV
                </a>
                <a
                  href={PERSONAL_INFO.cvUrl}
                  download="Osamah-Alananzeh-CV.pdf"
                  className="inline-flex items-center gap-2 rounded-lg border border-border-soft bg-bg-elevated px-4 py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:border-primary-500/60 hover:text-text-main"
                >
                  <FileDown size={15} />
                  Download CV
                </a>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {highlights.map(({ icon: Icon, label, detail }) => (
                <div
                  key={label}
                  className="card-hover flex items-start gap-3 rounded-2xl border border-border-soft bg-bg-surface/85 p-5"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary-500/25 bg-primary-500/10 text-primary-400">
                    <Icon size={22} />
                  </div>
                  <div>
                    <p className="whitespace-pre-line text-sm font-semibold text-text-main">{label}</p>
                    <p className="mt-1 text-xs font-mono uppercase tracking-[0.08em] text-text-muted">{detail}</p>
                  </div>
                </div>
              ))}
            </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
