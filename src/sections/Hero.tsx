import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, FileDown, MapPin } from 'lucide-react';
import { PERSONAL_INFO } from '../utils/constants';

export default function Hero() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center overflow-hidden pb-14 pt-28 sm:pt-32"
    >
      {/* Background atmosphere */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(13,17,23,0.7)_75%)]" />
        <div className="absolute -left-28 top-[12%] h-72 w-72 rounded-full bg-primary-600/12 blur-[120px]" />
        <div className="absolute -right-24 bottom-[12%] h-72 w-72 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-[1200px] px-5 sm:px-7 lg:px-10">
        <div className="grid items-center gap-10 lg:grid-cols-[1.12fr_0.88fr] lg:gap-14">
          <div>
            <div
              className={`mb-6 inline-flex items-center gap-2 rounded-full border border-primary-500/35 bg-primary-500/10 px-4 py-1.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary-300 transition-all duration-700 ${
                loaded ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
              }`}
            >
              <span className="h-2 w-2 rounded-full bg-accent-500" />
              computer engineer and programmer
            </div>

            <h1
              className={`text-5xl font-bold tracking-tight text-text-main transition-all duration-700 delay-150 sm:text-6xl xl:text-7xl ${
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {PERSONAL_INFO.name}
            </h1>

            <p
              className={`mt-4 font-mono text-sm uppercase tracking-[0.16em] text-primary-300 transition-all duration-700 delay-300 sm:text-base ${
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {PERSONAL_INFO.title}
            </p>

            <p
              className={`mt-6 max-w-2xl text-base leading-relaxed text-text-secondary transition-all duration-700 delay-[450ms] sm:text-lg ${
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {PERSONAL_INFO.bio}
            </p>

            <div
              className={`mt-10 flex flex-wrap items-center gap-3.5 transition-all duration-700 delay-[600ms] ${
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              <button
                onClick={() => scrollTo('#projects')}
                className="group inline-flex items-center gap-2 rounded-lg border border-primary-500 bg-primary-500 px-6 py-3 text-sm font-semibold text-bg-main transition-all duration-300 hover:border-primary-400 hover:bg-primary-400"
              >
                View Projects
                <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
              </button>

              <button
                onClick={() => scrollTo('#contact')}
                className="inline-flex items-center gap-2 rounded-lg border border-border-soft bg-bg-surface px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-primary-500/60 hover:text-text-main"
              >
                <Mail size={16} />
                Contact Me
              </button>

              <a
                href={PERSONAL_INFO.cvUrl}
                download="Osamah-Alananzeh-CV.pdf"
                className="inline-flex items-center gap-2 rounded-lg border border-border-soft bg-bg-surface px-6 py-3 text-sm font-semibold text-text-secondary transition-colors hover:border-accent-500/60 hover:text-text-main"
              >
                <FileDown size={16} />
                Download CV
              </a>
            </div>

            <div
              className={`mt-9 flex flex-wrap items-center gap-3 transition-all duration-700 delay-[750ms] ${
                loaded ? 'translate-y-0 opacity-100' : 'translate-y-6 opacity-0'
              }`}
            >
              {[
                { icon: Github, href: PERSONAL_INFO.github, label: 'GitHub' },
                { icon: Linkedin, href: PERSONAL_INFO.linkedin, label: 'LinkedIn' },
                { icon: Mail, href: `mailto:${PERSONAL_INFO.email}`, label: 'Email' },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="inline-flex items-center gap-2 rounded-md border border-border-soft bg-bg-elevated/80 px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] text-text-muted transition-colors hover:border-primary-500/60 hover:text-primary-300"
                >
                  <Icon size={14} />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <aside
            className={`rounded-2xl border border-border-soft bg-bg-surface/92 p-5 shadow-[0_20px_44px_rgba(0,0,0,0.36)] transition-all duration-700 delay-300 sm:p-6 ${
              loaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary-300">identity.card</p>

            <div className="mt-5 space-y-2 rounded-xl border border-border-soft bg-bg-elevated/70 p-3">
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">location</span>
                <span className="inline-flex items-center gap-1.5 text-sm text-text-main">
                  <MapPin size={14} className="text-primary-400" />
                  {PERSONAL_INFO.location}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">status</span>
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-accent-400">open to internships</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">focus</span>
                <span className="font-mono text-xs uppercase tracking-[0.1em] text-primary-300">Backend</span>
              </div>
            </div>

            <div className="mt-4 rounded-xl border border-border-soft bg-bg-elevated/65 px-3 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">command</p>
              <p className="mt-1 font-mono text-xs text-text-secondary">
                <span className="text-accent-500">$</span> build reliable systems and clean APIs
              </p>
            </div>

            <div className="mt-4 rounded-xl border border-border-soft bg-bg-elevated/65 px-3 py-2.5">
              <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">LANGUAGES</p>
              <div className="mt-2 space-y-1 font-mono text-xs text-text-secondary">
                <p>* AR : Native</p>
                <p>* EN : Advanced</p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-text-muted md:flex">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <div className="flex h-8 w-5 justify-center rounded-full border border-border-soft pt-1.5">
          <div className="h-1.5 w-1 animate-bounce rounded-full bg-primary-500" />
        </div>
      </div>
    </section>
  );
}
