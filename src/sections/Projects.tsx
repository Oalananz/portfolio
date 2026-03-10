import { useEffect, useState } from 'react';
import { ExternalLink, Github, Star, GitFork, Loader2 } from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { fetchGitHubRepos } from '../utils/github';
import { FEATURED_PROJECTS, LANGUAGE_COLORS } from '../utils/constants';
import type { GitHubRepo } from '../types';

function FeaturedCard({
  title,
  description,
  technologies,
  github,
  index,
}: {
  title: string;
  description: string;
  technologies: string[];
  github: string;
  index: number;
}) {
  const [ref, visible] = useInView(0.1);

  return (
    <div
      ref={ref}
      className={`group rounded-2xl border border-white/5 bg-surface-900/40 p-6 card-hover transition-all duration-700 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${index * 100}ms` }}
    >
      {/* Header accent */}
      <div className="mb-4 h-1 w-12 rounded-full bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-300 group-hover:w-20" />

      <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
      <p className="text-sm text-gray-400 leading-relaxed mb-4">{description}</p>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {technologies.map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-primary-500/20 bg-primary-500/5 px-3 py-1 text-xs font-medium text-primary-300"
          >
            {tech}
          </span>
        ))}
      </div>

      <a
        href={github}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
      >
        <Github size={16} />
        View Code
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
      className="group rounded-xl border border-white/5 bg-surface-900/30 p-5 card-hover block"
    >
      <h4 className="text-base font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
        {repo.name}
      </h4>
      <p className="mt-1.5 text-sm text-gray-500 line-clamp-2 h-10">
        {repo.description || 'No description'}
      </p>
      <div className="mt-4 flex items-center gap-4 text-xs text-gray-500">
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

export default function Projects() {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGitHubRepos()
      .then((r) => setRepos(r.slice(0, 6)))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <SectionWrapper>
      <div id="projects" className="scroll-mt-20">
        <SectionHeading
          title="Projects"
          subtitle="A selection of projects I've worked on"
        />

        {/* Featured 42 projects */}
        <h3 className="mb-6 text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span className="h-px flex-1 bg-gray-800" />
          <span>Featured Projects</span>
          <span className="h-px flex-1 bg-gray-800" />
        </h3>
        <div className="grid gap-6 sm:grid-cols-2 mb-16">
          {FEATURED_PROJECTS.map((project, i) => (
            <FeaturedCard key={project.title} {...project} index={i} />
          ))}
        </div>

        {/* GitHub repos */}
        <h3 className="mb-6 text-lg font-semibold text-gray-300 flex items-center gap-2">
          <span className="h-px flex-1 bg-gray-800" />
          <span>GitHub Repositories</span>
          <span className="h-px flex-1 bg-gray-800" />
        </h3>

        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-400" />
          </div>
        ) : repos.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {repos.map((repo) => (
              <RepoCard key={repo.id} repo={repo} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 py-8">
            Could not load repositories. Visit my{' '}
            <a
              href="https://github.com/Oalananz"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:underline"
            >
              GitHub profile
            </a>{' '}
            directly.
          </p>
        )}
      </div>
    </SectionWrapper>
  );
}
