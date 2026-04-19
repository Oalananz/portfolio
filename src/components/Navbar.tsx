import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { NAV_LINKS, PERSONAL_INFO } from '../utils/constants';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile nav when returning to desktop layout.
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 1280px)');
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsOpen(false);
      }
    };

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  // Track active section
  useEffect(() => {
    const sections = NAV_LINKS.map((l) => l.href.replace('#', ''));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = (href: string) => {
    setIsOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'border-b border-border-soft bg-bg-surface/92 backdrop-blur-sm shadow-[0_10px_24px_rgba(0,0,0,0.35)]'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto w-full max-w-[1200px] px-4 sm:px-6 lg:px-10">
        <div className="flex h-[4.35rem] items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => handleClick('#hero')}
            className="font-mono text-sm font-semibold uppercase tracking-[0.12em] text-text-main transition-colors hover:text-primary-400 sm:text-base sm:tracking-[0.16em]"
          >
            &lt;{PERSONAL_INFO.firstName} /&gt;
          </button>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 xl:flex">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.href.replace('#', '');
              return (
                <button
                  key={link.href}
                  onClick={() => handleClick(link.href)}
                  className={`relative rounded-md px-3 py-2 font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                    isActive
                      ? 'text-primary-400'
                      : 'text-text-muted hover:text-text-main'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute -bottom-0.5 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-primary-500" />
                  )}
                </button>
              );
            })}

            <a
              href={PERSONAL_INFO.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-flex items-center rounded-md border border-primary-500/45 bg-primary-500/10 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[0.16em] text-primary-300 transition-colors hover:border-primary-400 hover:text-primary-200"
            >
              Resume
            </a>
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-md p-2 text-text-muted transition-colors hover:text-primary-300 xl:hidden"
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-nav"
        className={`xl:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${
          isOpen ? 'max-h-[calc(100dvh-4.35rem)] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="max-h-[calc(100dvh-4.35rem)] space-y-1 overflow-y-auto border-t border-border-soft bg-bg-surface/96 px-4 py-3 pb-5 backdrop-blur-sm sm:px-6">
          {NAV_LINKS.map((link) => (
            <button
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={`block w-full rounded-md px-3 py-2.5 text-left font-mono text-xs uppercase tracking-[0.12em] transition-colors ${
                activeSection === link.href.replace('#', '')
                  ? 'bg-primary-500/12 text-primary-400'
                  : 'text-text-muted hover:bg-bg-elevated hover:text-text-main'
              }`}
            >
              {link.label}
            </button>
          ))}

          <a
            href={PERSONAL_INFO.cvUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex w-full items-center justify-center rounded-md border border-primary-500/45 bg-primary-500/10 px-3 py-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-primary-300 transition-colors hover:border-primary-400 hover:text-primary-200"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  );
}
