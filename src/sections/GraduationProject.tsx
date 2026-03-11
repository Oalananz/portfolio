import {
  Globe,
  Github,
  ExternalLink,
  LayoutDashboard,
  Bot,
  FileText,
  Users,
  Smartphone,
  ShieldCheck,
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';

const TECH_TAGS = [
  'React',
  'TypeScript',
  'Vite',
  'Tailwind CSS',
  'React Router',
  'Recharts',
  'Lottie',
];

const FEATURES = [
  {
    icon: LayoutDashboard,
    title: 'Firewall Dashboard',
    description: 'Interactive monitoring with real-time styled charts and activity visualizations',
  },
  {
    icon: Bot,
    title: 'AI Chatbot Assistant',
    description: 'Built-in chatbot for firewall-related interaction and user support',
  },
  {
    icon: ShieldCheck,
    title: 'Authentication',
    description: 'Structured login interface with smooth entry into the dashboard',
  },
  {
    icon: FileText,
    title: 'Reports Section',
    description: 'Dedicated area for project reports and presentation materials',
  },
  {
    icon: Users,
    title: 'About Us Section',
    description: 'Interactive presentation of team members and contributors',
  },
  {
    icon: Smartphone,
    title: 'Responsive Design',
    description: 'Modern UI adapting across different devices and screen sizes',
  },
];

function FeatureCard({
  icon: Icon,
  title,
  description,
  index,
  visible,
}: {
  icon: typeof LayoutDashboard;
  title: string;
  description: string;
  index: number;
  visible: boolean;
}) {
  return (
    <div
      className={`rounded-xl border border-white/5 bg-surface-900/40 p-5 transition-all duration-600 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionDelay: `${300 + index * 80}ms` }}
    >
      <div className="flex items-center gap-3 mb-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary-500/10 text-primary-400">
          <Icon size={18} />
        </div>
        <h4 className="text-sm font-semibold text-white">{title}</h4>
      </div>
      <p className="text-xs text-gray-500 leading-relaxed">{description}</p>
    </div>
  );
}

export default function GraduationProject() {
  const [ref, visible] = useInView(0.05);

  return (
    <SectionWrapper>
      <div id="graduation" className="scroll-mt-20">
        <SectionHeading
          title="Graduation Project"
          subtitle="Firewall Dashboard — a smart firewall management dashboard for monitoring network activity and AI-assisted interaction"
        />

        <div ref={ref}>
          {/* Main project card */}
          <div
            className={`rounded-2xl border border-white/[0.06] bg-surface-900/50 p-6 sm:p-8 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            {/* Badge + buttons row */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                {/* Badge */}
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3.5 py-1 text-xs font-semibold text-emerald-400 mb-4">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                  </span>
                  Graduation Project
                </span>

                {/* Title */}
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  Firewall Dashboard
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-400 leading-relaxed max-w-2xl">
                  A smart firewall management dashboard developed as a graduation project, designed
                  to provide an interactive and user-friendly interface for monitoring network
                  activity, exploring firewall-related insights, and demonstrating AI-assisted user
                  interaction. Built to showcase practical frontend development, interface design,
                  and system organization in a cybersecurity-related application.
                </p>
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3 shrink-0">
                <a
                  href="https://grad-project-rosy.vercel.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-primary-600/25 hover:bg-primary-500 hover:shadow-primary-500/30 transition-all duration-300"
                >
                  <Globe size={16} />
                  Live Demo
                </a>
                <a
                  href="https://github.com/Oalananz/Grad_project"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-gray-700 px-5 py-2.5 text-sm font-semibold text-gray-300 hover:border-primary-500/50 hover:text-white hover:bg-white/5 transition-all duration-300"
                >
                  <Github size={16} />
                  Source Code
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* Tech tags */}
            <div
              className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-150 ${
                visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {TECH_TAGS.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-primary-500/20 bg-primary-500/5 px-3.5 py-1 text-xs font-medium text-primary-300"
                >
                  {tech}
                </span>
              ))}
            </div>

            {/* Feature grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {FEATURES.map((feature, i) => (
                <FeatureCard
                  key={feature.title}
                  {...feature}
                  index={i}
                  visible={visible}
                />
              ))}
            </div>
          </div>

          {/* Published version note */}
          <p
            className={`mt-4 text-center text-xs text-gray-500 transition-all duration-700 delay-500 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="font-semibold text-gray-400">Note:</span> The published version is for
            visual demonstration only — full backend features work in the development environment.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
