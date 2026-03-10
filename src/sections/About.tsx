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
    <SectionWrapper>
      <div id="about" className="scroll-mt-20">
        <SectionHeading
          title="About Me"
          subtitle="A snapshot of my journey in software engineering"
        />

        <div ref={ref} className="grid gap-12 lg:grid-cols-5">
          {/* Text */}
          <div
            className={`lg:col-span-3 space-y-5 text-gray-300 leading-relaxed transition-all duration-700 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}
          >
            {PERSONAL_INFO.aboutParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}

            {/* CV buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              <a
                href={PERSONAL_INFO.cvUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/20 hover:bg-primary-500 transition-all"
              >
                <Eye size={16} />
                View CV
              </a>
              <a
                href={PERSONAL_INFO.cvUrl}
                download="Osamah-Alananzeh-CV.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:border-primary-500/50 hover:text-white hover:bg-white/5 transition-all"
              >
                <FileDown size={16} />
                Download CV
              </a>
            </div>
          </div>

          {/* Highlights cards */}
          <div
            className={`lg:col-span-2 grid grid-cols-2 gap-4 transition-all duration-700 delay-200 ${
              visible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`}
          >
            {highlights.map(({ icon: Icon, label, detail }) => (
              <div
                key={label}
                className="flex flex-col items-center justify-center text-center rounded-2xl border border-white/5 bg-surface-900/60 p-5 gap-3 card-hover"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary-500/10 text-primary-400">
                  <Icon size={24} />
                </div>
                <p className="text-sm font-semibold text-white whitespace-pre-line">{label}</p>
                <p className="text-xs text-gray-500">{detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
