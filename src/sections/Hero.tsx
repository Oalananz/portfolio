import { useEffect, useState } from 'react';
import { ArrowDown, Github, Linkedin, Mail, FileDown } from 'lucide-react';
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      {/* Background grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />
        <div className="absolute top-1/4 -left-32 h-72 w-72 rounded-full bg-primary-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-32 h-72 w-72 rounded-full bg-accent-500/10 blur-[120px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        {/* Greeting chip */}
        <div
          className={`inline-flex items-center gap-2 rounded-full border border-primary-500/20 bg-primary-500/5 px-4 py-1.5 text-sm text-primary-300 mb-6 transition-all duration-700 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
          }`}
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary-500" />
          </span>
          Available for opportunities
        </div>

        {/* Name */}
        <h1
          className={`text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight transition-all duration-700 delay-150 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          Hi, I'm{' '}
          <span className="gradient-text">{PERSONAL_INFO.name}</span>
        </h1>

        {/* Title */}
        <p
          className={`mt-4 font-mono text-lg md:text-xl text-gray-400 transition-all duration-700 delay-300 ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {PERSONAL_INFO.title}
        </p>

        {/* Bio */}
        <p
          className={`mx-auto mt-6 max-w-2xl text-gray-400 leading-relaxed transition-all duration-700 delay-[450ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {PERSONAL_INFO.bio}
        </p>

        {/* CTA Buttons */}
        <div
          className={`mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-[600ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <button
            onClick={() => scrollTo('#projects')}
            className="group relative inline-flex items-center gap-2 rounded-xl bg-primary-600 px-7 py-3.5 font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-500 hover:shadow-primary-500/30 transition-all duration-300"
          >
            View Projects
            <ArrowDown size={16} className="transition-transform group-hover:translate-y-0.5" />
          </button>
          <button
            onClick={() => scrollTo('#contact')}
            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-7 py-3.5 font-semibold text-gray-300 hover:border-primary-500/50 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <Mail size={16} />
            Contact Me
          </button>
          <a
            href={PERSONAL_INFO.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-7 py-3.5 font-semibold text-gray-300 hover:border-accent-500/50 hover:text-white hover:bg-white/5 transition-all duration-300"
          >
            <FileDown size={16} />
            Download CV
          </a>
        </div>

        {/* Social icons */}
        <div
          className={`mt-10 flex items-center justify-center gap-5 transition-all duration-700 delay-[750ms] ${
            loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
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
              className="p-2.5 rounded-lg text-gray-500 hover:text-primary-400 hover:bg-primary-500/10 transition-all duration-300"
            >
              <Icon size={20} />
            </a>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600">
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <div className="h-8 w-5 rounded-full border-2 border-gray-700 flex justify-center pt-1.5">
          <div className="h-1.5 w-1 rounded-full bg-gray-500 animate-bounce" />
        </div>
      </div>
    </section>
  );
}
