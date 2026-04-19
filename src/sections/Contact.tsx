import { useState, type FormEvent } from 'react';
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Send,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { PERSONAL_INFO } from '../utils/constants';

const contactLinks = [
  {
    icon: Mail,
    label: 'Email',
    value: PERSONAL_INFO.email,
    href: `mailto:${PERSONAL_INFO.email}`,
    copyable: true,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'Osamah Alananzeh',
    href: PERSONAL_INFO.linkedin,
    copyable: false,
  },
  {
    icon: Github,
    label: 'GitHub',
    value: '@Oalananz',
    href: PERSONAL_INFO.github,
    copyable: false,
  },
  {
    icon: MapPin,
    label: 'Location',
    value: PERSONAL_INFO.location,
    href: undefined,
    copyable: false,
  },
];

export default function Contact() {
  const [ref, visible] = useInView(0.1);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    // Build mailto link as simple contact method
    const subject = encodeURIComponent(form.subject || 'Portfolio Contact');
    const body = encodeURIComponent(
      `Name: ${form.name}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.open(`mailto:${PERSONAL_INFO.email}?subject=${subject}&body=${body}`, '_self');

    setStatus('success');
    setTimeout(() => {
      setStatus('idle');
      setForm({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <SectionWrapper>
      <div id="contact" className="scroll-mt-20">
        <SectionHeading
          title="Get in Touch"
          subtitle="Have a project in mind or want to connect? I'd love to hear from you."
        />

        <div
          ref={ref}
          className={`grid gap-10 lg:grid-cols-5 transition-all duration-700 ${
            visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-5">
            {contactLinks.map(({ icon: Icon, label, value, href, copyable }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-border-soft bg-bg-surface/86 p-4 card-hover"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-primary-500/25 bg-primary-500/10 text-primary-400">
                  <Icon size={20} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs font-mono uppercase tracking-[0.1em] text-text-muted">{label}</p>
                  {href ? (
                    <a
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-secondary hover:text-primary-300 transition-colors truncate block"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="text-sm text-text-secondary truncate">{value}</p>
                  )}
                </div>
                {copyable && (
                  <button
                    onClick={() => handleCopy(value)}
                    className="p-2 text-text-muted hover:text-primary-300 transition-colors"
                    aria-label="Copy to clipboard"
                  >
                    {copied ? <Check size={16} className="text-accent-400" /> : <Copy size={16} />}
                  </button>
                )}
              </div>
            ))}
          </div>

          {/* Contact form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-3 rounded-2xl border border-border-soft bg-bg-surface/90 p-6 md:p-8 space-y-5"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm text-text-secondary mb-1.5">
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-border-soft bg-bg-elevated/70 px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/45 transition-colors"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm text-text-secondary mb-1.5">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-border-soft bg-bg-elevated/70 px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/45 transition-colors"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm text-text-secondary mb-1.5">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full rounded-lg border border-border-soft bg-bg-elevated/70 px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/45 transition-colors"
                placeholder="What's this about?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-text-secondary mb-1.5">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                required
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-border-soft bg-bg-elevated/70 px-4 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500/45 transition-colors"
                placeholder="Tell me about your project or just say hi..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'sending' || status === 'success'}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-primary-500 bg-primary-500 px-6 py-3 font-semibold text-bg-main hover:bg-primary-400 disabled:opacity-60 transition-all"
            >
              {status === 'success' ? (
                <>
                  <CheckCircle2 size={18} /> Message Sent!
                </>
              ) : status === 'error' ? (
                <>
                  <AlertCircle size={18} /> Try Again
                </>
              ) : (
                <>
                  <Send size={18} /> Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </SectionWrapper>
  );
}
