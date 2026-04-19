import { Github, Linkedin, Mail, Heart } from 'lucide-react';
import { PERSONAL_INFO, NAV_LINKS } from '../utils/constants';

export default function Footer() {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border-soft bg-bg-main py-12">
      <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-7 lg:px-10">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Brand */}
          <div>
            <p className="font-mono text-base font-semibold uppercase tracking-[0.16em] text-primary-400">
              &lt;{PERSONAL_INFO.firstName} /&gt;
            </p>
            <p className="mt-2 text-sm text-text-muted max-w-xs">
              Computer Engineer & 42 Amman Student passionate about building great software.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-sm font-semibold font-mono uppercase tracking-[0.14em] text-text-secondary mb-3">Quick Links</h4>
            <div className="grid grid-cols-2 gap-2">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.href}
                  onClick={() => scrollTo(link.href)}
                  className="text-left text-sm text-text-muted hover:text-primary-300 transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-semibold font-mono uppercase tracking-[0.14em] text-text-secondary mb-3">Connect</h4>
            <div className="flex gap-3">
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
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-soft bg-bg-surface/80 text-text-muted hover:text-primary-300 hover:border-primary-500/40 transition-all"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border-soft pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-text-muted">
            &copy; {new Date().getFullYear()} {PERSONAL_INFO.name}. All rights reserved.
          </p>
          <p className="text-xs text-text-muted flex items-center gap-1">
            Built with <Heart size={12} className="text-accent-500" /> using React & Tailwind
          </p>
        </div>
      </div>
    </footer>
  );
}
