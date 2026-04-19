import {
  BrainCircuit,
  CheckCircle2,
  Clock3,
  ExternalLink,
  Target,
  TerminalSquare,
  Users,
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';

type StageStatus = 'completed' | 'in-progress' | 'next';

interface JourneyStage {
  title: string;
  period: string;
  status: StageStatus;
  projects: string[];
  summary: string;
}

interface RepoSpotlight {
  name: string;
  url: string;
  summary: string;
}

const JOURNEY_STAGES: JourneyStage[] = [
  {
    title: 'Foundation and Core C',
    period: 'Early Curriculum',
    status: 'completed',
    projects: ['Libft', 'ft_printf', 'get_next_line', 'Born2beRoot'],
    summary: 'Built the base for memory handling, C fundamentals, and disciplined Unix development workflows.',
  },
  {
    title: 'Algorithmic and Systems Practice',
    period: 'Core Progression',
    status: 'completed',
    projects: ['push_swap', 'pipex', 'so_long', 'philosophers'],
    summary: 'Improved algorithm design, process orchestration, and concurrency thinking through practical challenges.',
  },
  {
    title: 'Advanced Engineering Projects',
    period: 'Upper Core',
    status: 'completed',
    projects: ['Minishell', 'Cub3D', 'WebServ', 'NetPractice'],
    summary: 'Delivered production-style projects across shells, networking, graphics, and HTTP server architecture.',
  },
  {
    title: 'Containerized Infrastructure',
    period: 'Current Focus',
    status: 'in-progress',
    projects: ['Inception'],
    summary: 'Designing a Docker-based service stack with operational reliability and deployment discipline.',
  },
  {
    title: 'Final Full-Stack Challenge',
    period: 'Upcoming',
    status: 'next',
    projects: ['ft_transcendence'],
    summary: 'Preparing for the capstone experience that combines backend, frontend, auth, and real-time features.',
  },
];

const REPO_SPOTLIGHT: RepoSpotlight[] = [
  {
    name: 'Minishell-42',
    url: 'https://github.com/Oalananz/Minishell-42',
    summary: 'Custom shell implementation with parsing, redirection, pipes, and signal handling.',
  },
  {
    name: 'Cub3d',
    url: 'https://github.com/Oalananz/Cub3d',
    summary: 'Raycasting engine project focused on rendering performance and low-level graphics concepts.',
  },
  {
    name: 'Inception-42',
    url: 'https://github.com/Oalananz/Inception-42',
    summary: 'Current infrastructure milestone based on Docker Compose and service orchestration.',
  },
];

const STATUS_STYLES: Record<StageStatus, { label: string; badgeClass: string; dotClass: string }> = {
  completed: {
    label: 'Completed',
    badgeClass: 'border-primary-500/35 bg-primary-500/10 text-primary-300',
    dotClass: 'bg-primary-400',
  },
  'in-progress': {
    label: 'In Progress',
    badgeClass: 'border-accent-500/45 bg-accent-500/12 text-accent-400',
    dotClass: 'bg-accent-400',
  },
  next: {
    label: 'Next Milestone',
    badgeClass: 'border-border-soft bg-bg-elevated/70 text-text-secondary',
    dotClass: 'bg-text-muted',
  },
};

export default function HolyGraph() {
  const [ref, visible] = useInView(0.05);
  const completedProjects = JOURNEY_STAGES
    .filter((stage) => stage.status === 'completed')
    .reduce((sum, stage) => sum + stage.projects.length, 0);
  const totalProjects = JOURNEY_STAGES.reduce((sum, stage) => sum + stage.projects.length, 0);
  const progressPct = Math.round((completedProjects / totalProjects) * 100);

  return (
    <SectionWrapper
      shellLabel="osamah@portfolio:~/42-journey"
      shellCommand="status --program 42amman"
    >
      <div id="holygraph" className="scroll-mt-20">
        <SectionHeading
          title="42 Journey"
          subtitle="A systems-first path through 42 Amman, from core C foundations to advanced infrastructure projects"
        />

        <div ref={ref} className="space-y-8">
          <div
            className={`grid gap-4 sm:grid-cols-2 xl:grid-cols-4 transition-all duration-700 ${
              visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
            }`}
          >
            <div className="rounded-xl border border-border-soft bg-bg-surface/86 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Completed Projects</p>
              <p className="mt-2 text-2xl font-bold text-text-main">{completedProjects}</p>
              <p className="mt-1 text-xs text-text-secondary">through 42 core curriculum</p>
            </div>
            <div className="rounded-xl border border-border-soft bg-bg-surface/86 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Progress</p>
              <p className="mt-2 text-2xl font-bold text-text-main">{progressPct}%</p>
              <p className="mt-1 text-xs text-text-secondary">of listed milestones completed</p>
            </div>
            <div className="rounded-xl border border-border-soft bg-bg-surface/86 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Current Milestone</p>
              <p className="mt-2 text-2xl font-bold text-text-main">Inception</p>
              <p className="mt-1 text-xs text-text-secondary">containerized infrastructure track</p>
            </div>
            <div className="rounded-xl border border-border-soft bg-bg-surface/86 p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted">Learning Model</p>
              <p className="mt-2 text-2xl font-bold text-text-main">42 Peer Model</p>
              <p className="mt-1 text-xs text-text-secondary">project-driven and collaborative</p>
            </div>
          </div>

          <div className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
            <div
              className={`rounded-2xl border border-border-soft bg-bg-surface/86 p-6 transition-all duration-700 delay-100 ${
                visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
              }`}
            >
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-text-main">Program Timeline</h3>
                <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
                  <span className="mr-1 text-accent-500">$</span>
                  journey --42amman
                </p>
              </div>

              <div className="space-y-4">
                {JOURNEY_STAGES.map((stage, index) => {
                  const style = STATUS_STYLES[stage.status];
                  return (
                    <article
                      key={stage.title}
                      className={`rounded-xl border border-border-soft bg-bg-elevated/66 p-4 transition-all duration-500 ${
                        visible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                      }`}
                      style={{ transitionDelay: `${Math.min(index * 90, 420)}ms` }}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h4 className="text-sm font-semibold text-text-main">{stage.title}</h4>
                        <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.12em] ${style.badgeClass}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${style.dotClass}`} />
                          {style.label}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-text-muted">{stage.period}</p>
                      <p className="mt-2 text-sm leading-relaxed text-text-secondary">{stage.summary}</p>

                      <div className="mt-3 flex flex-wrap gap-2">
                        {stage.projects.map((project) => (
                          <span
                            key={project}
                            className="rounded-md border border-primary-500/25 bg-primary-500/10 px-2 py-1 font-mono text-[10px] uppercase tracking-[0.08em] text-primary-300"
                          >
                            {project}
                          </span>
                        ))}
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>

            <div className="space-y-6">
              <div
                className={`rounded-2xl border border-border-soft bg-bg-surface/86 p-6 transition-all duration-700 delay-150 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <h3 className="text-lg font-semibold text-text-main">42 Growth Focus</h3>
                <div className="mt-4 space-y-3">
                  <div className="flex items-start gap-3 rounded-lg border border-border-soft bg-bg-elevated/60 p-3">
                    <TerminalSquare size={18} className="mt-0.5 text-primary-400" />
                    <div>
                      <p className="text-sm font-semibold text-text-main">Systems Depth</p>
                      <p className="text-xs text-text-secondary">Building low-level confidence through C/C++ and Unix-centric projects.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border-soft bg-bg-elevated/60 p-3">
                    <Users size={18} className="mt-0.5 text-primary-400" />
                    <div>
                      <p className="text-sm font-semibold text-text-main">Peer Collaboration</p>
                      <p className="text-xs text-text-secondary">Improving code quality and communication through peer evaluation cycles.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border-soft bg-bg-elevated/60 p-3">
                    <BrainCircuit size={18} className="mt-0.5 text-primary-400" />
                    <div>
                      <p className="text-sm font-semibold text-text-main">Problem Solving</p>
                      <p className="text-xs text-text-secondary">Approaching complex problems with structured debugging and performance reasoning.</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 rounded-lg border border-border-soft bg-bg-elevated/60 p-3">
                    <Target size={18} className="mt-0.5 text-accent-400" />
                    <div>
                      <p className="text-sm font-semibold text-text-main">Current Target</p>
                      <p className="text-xs text-text-secondary">Complete Inception and prepare architecture planning for ft_transcendence.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div
                className={`rounded-2xl border border-border-soft bg-bg-surface/86 p-6 transition-all duration-700 delay-200 ${
                  visible ? 'translate-y-0 opacity-100' : 'translate-y-5 opacity-0'
                }`}
              >
                <h3 className="text-lg font-semibold text-text-main">42 Repo Spotlight</h3>
                <div className="mt-4 space-y-3">
                  {REPO_SPOTLIGHT.map((repo) => (
                    <a
                      key={repo.name}
                      href={repo.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block rounded-lg border border-border-soft bg-bg-elevated/62 p-3 transition-all hover:border-primary-500/40"
                    >
                      <p className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-300 transition-colors group-hover:text-primary-200">
                        {repo.name}
                        <ExternalLink size={13} />
                      </p>
                      <p className="mt-1 text-xs leading-relaxed text-text-secondary">{repo.summary}</p>
                    </a>
                  ))}
                </div>

                <div className="mt-4 rounded-lg border border-border-soft bg-bg-elevated/58 px-3 py-2.5">
                  <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
                    <Clock3 size={12} className="text-accent-500" />
                    current state
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm text-text-main">
                    <CheckCircle2 size={14} className="text-primary-400" />
                    42 path is active with ongoing infrastructure and systems milestones.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
