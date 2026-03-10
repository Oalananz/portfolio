import { Award, ExternalLink, Calendar } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { CERTIFICATIONS } from '../utils/constants';

export default function Certifications() {
  const [ref, visible] = useInView(0.05);

  return (
    <SectionWrapper>
      <div id="certifications" className="scroll-mt-20">
        <SectionHeading
          title="Certifications"
          subtitle="Professional certifications and achievements"
        />

        <div ref={ref} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {CERTIFICATIONS.map((cert, i) => (
            <div
              key={cert.title}
              className={`group relative rounded-2xl border border-white/[0.06] bg-surface-900/40 p-6 card-hover transition-all duration-600 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${Math.min(i * 80, 500)}ms` }}
            >
              {/* Highlight badge for awards */}
              {cert.highlight && (
                <div className="absolute -top-3 right-4 rounded-full bg-yellow-500/90 px-3 py-0.5 text-xs font-bold text-gray-900 shadow-lg shadow-yellow-500/20">
                  {cert.highlight}
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    cert.highlight
                      ? 'bg-yellow-500/15 text-yellow-400'
                      : 'bg-primary-500/10 text-primary-400'
                  } group-hover:scale-110 transition-transform duration-300`}
                >
                  <Award size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-semibold text-white leading-snug group-hover:text-primary-300 transition-colors">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500">{cert.issuer}</p>

                  <div className="mt-3 flex items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {cert.date}
                    </span>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary-400/70 hover:text-primary-400 transition-colors"
                      >
                        <ExternalLink size={12} />
                        Verify
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
