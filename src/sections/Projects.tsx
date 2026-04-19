import { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { fetchGitHubRepos } from '../utils/github';
import { FEATURED_PROJECTS, LANGUAGE_COLORS } from '../utils/constants';
import type { GitHubRepo } from '../types';

const EXCLUDED_REPO_URL = 'https://github.com/Oalananz/Minishell-42';
const REPLACEMENT_REPO_URL = 'https://github.com/Oalananz/Inception-42';
const EXCLUDED_REPO_NAME = 'minishell-42';
const REPLACEMENT_REPO_NAME = 'inception-42';

function normalizeRepoUrl(url: string): string {
  return url.trim().toLowerCase().replace(/\/$/, '');
}

function selectReposForGrid(allRepos: GitHubRepo[], limit = 9): GitHubRepo[] {
  const excludedUrl = normalizeRepoUrl(EXCLUDED_REPO_URL);
  const replacementUrl = normalizeRepoUrl(REPLACEMENT_REPO_URL);

  const withoutExcluded = allRepos.filter(
    (repo) =>
      normalizeRepoUrl(repo.html_url) !== excludedUrl &&
      repo.name.trim().toLowerCase() !== EXCLUDED_REPO_NAME
  );

  const replacement = withoutExcluded.find(
    (repo) =>
      normalizeRepoUrl(repo.html_url) === replacementUrl ||
      repo.name.trim().toLowerCase() === REPLACEMENT_REPO_NAME
  );

  const remainder = withoutExcluded.filter(
    (repo) =>
      normalizeRepoUrl(repo.html_url) !== replacementUrl &&
      repo.name.trim().toLowerCase() !== REPLACEMENT_REPO_NAME
  );

  if (replacement) {
    return [replacement, ...remainder].slice(0, limit);
  }

  // Ensure Inception-42 still appears even if it is not returned in the fetched list.
  const fallbackInception: GitHubRepo = {
    id: -42042,
    name: 'Inception-42',
    description: 'Docker infrastructure project from the 42 curriculum.',
    html_url: REPLACEMENT_REPO_URL,
    homepage: null,
    language: 'Dockerfile',
    stargazers_count: 0,
    forks_count: 0,
    topics: [],
    updated_at: new Date().toISOString(),
    pushed_at: new Date().toISOString(),
    fork: false,
  };

  return [fallbackInception, ...remainder].slice(0, limit);
}

function FeaturedCard({
  title,
  description,
  technologies,
  github,
  linkLabel,
  index,
  className = '',
}: {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  linkLabel?: string;
  index: number;
  className?: string;
}) {
  const [ref, visible] = useInView(0.1);
  const isGitHubLink = /^(https?:\/\/)?(www\.)?github\.com/i.test(github);
  const ctaLabel = linkLabel ?? (isGitHubLink ? 'View Code' : 'Open Project');

  return (
    <div
      ref={ref}
      className={`card-hover group rounded-2xl border border-border-soft bg-bg-surface/88 p-6 transition-all duration-700 ${className} ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Header accent */}
      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-primary-400">featured.project</p>
      <div className="mb-4 h-px w-20 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-28" />

      <h3 className="mb-2 text-2xl font-bold text-text-main">{title}</h3>
      <p className="mb-4 text-sm leading-relaxed text-text-secondary">{description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-md border border-primary-500/30 bg-primary-500/10 px-2.5 py-1 font-mono text-[11px] uppercase tracking-[0.1em] text-primary-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-text-muted transition-colors hover:text-primary-300"
      >
        {isGitHubLink ? <Github size={16} /> : <ExternalLink size={16} />}
        {ctaLabel}
        <ExternalLink size={14} />
      </a>
    </div>
  );
}

function RepoCard({ repo }: { repo: GitHubRepo }) {
  const color = LANGUAGE_COLORS[repo.language ?? ''] ?? '#6b7280';

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className="card-hover group block rounded-xl border border-border-soft bg-bg-surface/76 p-5"
    >
      <p className="mb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">repository</p>
      <h4 className="truncate text-base font-semibold text-text-main transition-colors group-hover:text-primary-300">
        {repo.name}
      </h4>
      <p className="mt-1.5 h-10 line-clamp-2 text-sm text-text-muted">
        {repo.description || 'No description'}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-text-muted">
        {repo.language && (
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ background: color }} />
            {repo.language}
          </span>
        )}
        {repo.stargazers_count > 0 && (
          <span className="flex items-center gap-1">
            <Star size={12} /> {repo.stargazers_count}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className="flex items-center gap-1">
            <GitFork size={12} /> {repo.forks_count}
          </span>
        )}
      </div>
    </a>
  );
}

function ProjectTelemetry({ repos, loading }: { repos: GitHubRepo[]; loading: boolean }) {
  const totalStars = repos.reduce((sum, repo) => sum + repo.stargazers_count, 0);
  const totalForks = repos.reduce((sum, repo) => sum + repo.forks_count, 0);
  const languageCount = new Set(repos.map((repo) => repo.language).filter(Boolean)).size;
  const mostStarred = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];

  return (
    <aside className="h-fit rounded-2xl border border-border-soft bg-bg-surface/84 p-5">
      <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-400">project.telemetry</p>
      <a
        href="https://github.com/Oalananz"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-2 inline-flex items-center gap-2 text-sm text-text-main transition-colors hover:text-primary-300"
      >
        <Github size={16} className="text-primary-400" />
        @Oalananz
      </a>

      <div className="mt-5 space-y-2 rounded-xl border border-border-soft bg-bg-elevated/70 p-3">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">status</span>
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-accent-400">active</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">repos loaded</span>
          <span className="text-sm text-text-main">{loading ? '--' : repos.length}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">total stars</span>
          <span className="text-sm text-text-main">{loading ? '--' : totalStars}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">total forks</span>
          <span className="text-sm text-text-main">{loading ? '--' : totalForks}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">languages</span>
          <span className="text-sm text-text-main">{loading ? '--' : languageCount}</span>
        </div>
      </div>

      {mostStarred && !loading && (
        <div className="mt-4 rounded-xl border border-border-soft bg-bg-elevated/60 p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">most starred</p>
          <a
            href={mostStarred.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 inline-flex items-center gap-2 text-sm text-primary-300 hover:text-primary-200"
          >
            {mostStarred.name}
            <span className="inline-flex items-center gap-1 text-xs text-text-secondary">
              <Star size={12} />
              {mostStarred.stargazers_count}
            </span>
          </a>
        </div>
      )}

      <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
        <span className="mr-1 text-accent-500">$</span>
        git fetch --all --prune
      </p>
    </aside>
  );
}

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos()
      .then((r) => setRepos(selectReposForGrid(r, 9)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper shellLabel="osamah@portfolio:~/projects" shellCommand="git log --oneline --graph">
      <div id="projects" className="scroll-mt-20">
        <SectionHeading
          title="Projects"
          subtitle="A selection of projects I've worked on"
        />

        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary-400">featured.index</p>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text-secondary">
              {FEATURED_PROJECTS.length} curated builds focused on systems programming, backend engineering, and production reliability.
            </p>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-text-muted">
            <span className="mr-1 text-accent-500">$</span>
            cat projects.json | jq '.featured'
          </p>
        </div>

        <div className="mb-14 grid gap-5 md:grid-cols-2">
          {FEATURED_PROJECTS.map((project, i) => (
            <FeaturedCard key={project.title} {...project} index={i} className="h-full" />
          ))}
        </div>

        <div className="grid gap-6 xl:grid-cols-[1fr_280px]">
          <div>
            <h3 className="mb-6 flex items-center gap-3 font-mono text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
              <span className="h-px flex-1 bg-border-soft" />
              <span>GitHub Repositories</span>
              <span className="h-px flex-1 bg-border-soft" />
            </h3>

            {loading ? (
              <div className="flex justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-primary-400" />
              </div>
            ) : repos.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {repos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            ) : (
              <p className="py-8 text-center text-text-muted">
                Could not load repositories. Visit my{' '}
                <a
                  href="https://github.com/Oalananz"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-400 hover:text-primary-300 hover:underline"
                >
                  GitHub profile
                </a>{' '}
                directly.
              </p>
            )}
          </div>

          <ProjectTelemetry repos={repos} loading={loading} />
        </div>
      </div>
    </SectionWrapper>
  );
}
