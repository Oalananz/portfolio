import { useEffect, useState } from 'react';
import { Award, ExternalLink, Calendar, X } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { CERTIFICATIONS } from '../utils/constants';

export default function Certifications() {
  const [ref, visible] = useInView(0.05);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [previewTitle, setPreviewTitle] = useState<string>('');

  useEffect(() => {
    if (!previewImage) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setPreviewImage(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [previewImage]);

  const openPreview = (image: string, title: string) => {
    setPreviewImage(image);
    setPreviewTitle(title);
  };

  const closePreview = () => {
    setPreviewImage(null);
  };

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
              className={`card-hover group relative rounded-2xl border border-border-soft bg-bg-surface/86 p-6 transition-all duration-600 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}
              style={{ transitionDelay: `${Math.min(i * 80, 500)}ms` }}
            >
              {/* Highlight badge for awards */}
              {cert.highlight && (
                <div className="absolute -top-3 right-4 rounded-full border border-accent-500/45 bg-accent-500/12 px-3 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-[0.14em] text-accent-400">
                  {cert.highlight}
                </div>
              )}

              <div className="flex items-start gap-4">
                <div
                  className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                    cert.highlight
                      ? 'border border-accent-500/35 bg-accent-500/10 text-accent-400'
                      : 'border border-primary-500/25 bg-primary-500/10 text-primary-400'
                  } transition-transform duration-300 group-hover:scale-105`}
                >
                  <Award size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">certification</p>
                  <h3 className="text-sm font-semibold leading-snug text-text-main transition-colors group-hover:text-primary-300">
                    {cert.title}
                  </h3>
                  <p className="mt-1 text-xs text-text-muted">{cert.issuer}</p>

                  <div className="mt-3 flex items-center gap-3 text-xs text-text-muted">
                    <span className="flex items-center gap-1">
                      <Calendar size={12} />
                      {cert.date}
                    </span>
                    {cert.link && (
                      <a
                        href={cert.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-primary-400/80 transition-colors hover:text-primary-300"
                      >
                        <ExternalLink size={12} />
                        Verify
                      </a>
                    )}
                    {!cert.link && cert.image && (
                      <button
                        type="button"
                        onClick={() => {
                          if (cert.image) {
                            openPreview(cert.image, cert.title);
                          }
                        }}
                        className="flex items-center gap-1 text-primary-400/80 transition-colors hover:text-primary-300"
                      >
                        <ExternalLink size={12} />
                        Verify
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {previewImage && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4"
            onClick={closePreview}
          >
            <div
              className="relative max-h-[90vh] w-full max-w-5xl rounded-2xl border border-border-soft bg-bg-surface/95 p-3"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={closePreview}
                className="absolute right-3 top-3 rounded-md border border-border-soft bg-bg-main/80 p-1 text-text-main transition-colors hover:text-primary-300"
                aria-label="Close preview"
              >
                <X size={18} />
              </button>

              <img
                src={previewImage}
                alt={`${previewTitle} certificate preview`}
                className="max-h-[82vh] w-full rounded-xl bg-white object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
