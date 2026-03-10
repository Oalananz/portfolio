import { useEffect, useState } from 'react';
import {
  Github,
  Users,
  BookOpen,
  Star,
  Loader2,
  ExternalLink,
  Calendar,
  Code2,
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { fetchGitHubUser, fetchGitHubRepos, getLanguageStats, getTopRepos } from '../utils/github';
import { LANGUAGE_COLORS, PERSONAL_INFO } from '../utils/constants';
import type { GitHubRepo, GitHubUser } from '../types';

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-white/5 bg-surface-900/40 p-5 card-hover">
      <Icon size={24} className="text-primary-400 mb-2" />
      <p className="text-2xl font-bold text-white">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{label}</p>
    </div>
  );
}

/** Repo highlights: summary stats from repos */
function RepoHighlights({ repos }: { repos: GitHubRepo[] }) {
  const totalForks = repos.reduce((a, r) => a + r.forks_count, 0);
  const totalStars = repos.reduce((a, r) => a + r.stargazers_count, 0);
  const languages = new Set(repos.map((r) => r.language).filter(Boolean));
  const newest = [...repos].sort((a, b) => new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime())[0];
  const mostStarred = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count)[0];

  const highlights = [
    { label: 'Total Forks', value: totalForks, icon: '🍴' },
    { label: 'Languages Used', value: languages.size, icon: '🌐' },
    { label: 'Total Stars', value: totalStars, icon: '⭐' },
    { label: 'Repositories', value: repos.length, icon: '📦' },
  ];

  return (
    <div className="rounded-2xl border border-white/5 bg-surface-900/40 p-6">
      <h3 className="text-lg font-semibold text-white mb-5 flex items-center gap-2">
        <Calendar size={18} className="text-primary-400" />
        Repo Highlights
      </h3>
      <div className="grid grid-cols-2 gap-3 mb-5">
        {highlights.map((h) => (
          <div key={h.label} className="rounded-xl bg-gray-800/30 border border-white/5 p-3 text-center">
            <span className="text-lg">{h.icon}</span>
            <p className="text-xl font-bold text-white mt-1">{h.value}</p>
            <p className="text-xs text-gray-500">{h.label}</p>
          </div>
        ))}
      </div>
      {newest && (
        <div className="space-y-2 text-sm">
          <div className="flex items-center justify-between rounded-lg bg-gray-800/20 px-3 py-2">
            <span className="text-gray-400">Most Recent</span>
            <a href={newest.html_url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-medium truncate ml-2">
              {newest.name}
            </a>
          </div>
          {mostStarred && mostStarred.stargazers_count > 0 && (
            <div className="flex items-center justify-between rounded-lg bg-gray-800/20 px-3 py-2">
              <span className="text-gray-400">Most Starred</span>
              <a href={mostStarred.html_url} target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 font-medium truncate ml-2">
                {mostStarred.name} ({mostStarred.stargazers_count}⭐)
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/** Recent repos timeline */
function RecentActivity({ repos }: { repos: GitHubRepo[] }) {
  const recent = [...repos]
    .sort((a, b) => new Date(b.pushed_at || b.updated_at).getTime() - new Date(a.pushed_at || a.updated_at).getTime())
    .slice(0, 5);

  const timeAgo = (dateStr: string) => {
    const diff = Date.now() - new Date(dateStr).getTime();
    const days = Math.floor(diff / 86400000);
    if (days === 0) return 'today';
    if (days === 1) return '1 day ago';
    if (days < 30) return `${days} days ago`;
    const months = Math.floor(days / 30);
    return months === 1 ? '1 month ago' : `${months} months ago`;
  };

  return (
    <div className="rounded-2xl border border-white/5 bg-surface-900/40 p-6">
      <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
        <Code2 size={18} className="text-primary-400" />
        Recent Activity
      </h3>
      <div className="space-y-3">
        {recent.map((repo) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-3 rounded-lg p-3 hover:bg-gray-800/30 transition-all group"
          >
            <div className="mt-1 h-2 w-2 rounded-full bg-primary-400 shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-white group-hover:text-primary-400 transition-colors truncate">
                Pushed to <span className="font-semibold">{repo.name}</span>
              </p>
              <p className="text-xs text-gray-500 mt-0.5">
                {timeAgo(repo.pushed_at || repo.updated_at)}
                {repo.language && (
                  <span className="ml-2 inline-flex items-center gap-1">
                    <span
                      className="inline-block h-2 w-2 rounded-full"
                      style={{ background: LANGUAGE_COLORS[repo.language] ?? '#6b7280' }}
                    />
                    {repo.language}
                  </span>
                )}
              </p>
            </div>
            <ExternalLink size={12} className="text-gray-600 group-hover:text-primary-400 transition-colors mt-1 shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}

export default function GitHubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [ref, visible] = useInView(0.1);

  const loadData = () => {
    setLoading(true);
    setError(null);
    Promise.all([fetchGitHubUser(), fetchGitHubRepos()])
      .then(([u, r]) => {
        setUser(u);
        setRepos(r);
      })
      .catch((err) => {
        console.error('GitHub API error:', err);
        setError(
          err.message?.includes('403')
            ? 'GitHub API rate limit reached. Please try again in a few minutes.'
            : 'Failed to load GitHub data. Please try again.'
        );
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => { loadData(); }, []);

  const langStats = getLanguageStats(repos);
  const topRepos = getTopRepos(repos, 4);

  return (
    <SectionWrapper className="bg-surface-950/50">
      <div id="github" className="scroll-mt-20">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open source contributions and coding activity"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary-400" />
          </div>
        ) : error ? (
          <div
            ref={ref}
            className={`flex flex-col items-center justify-center py-16 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Github size={48} className="text-gray-600 mb-4" />
            <p className="text-gray-400 mb-4 text-center">{error}</p>
            <button
              onClick={loadData}
              className="inline-flex items-center gap-2 rounded-full border border-primary-500/50 bg-primary-500/10 px-6 py-2.5 text-sm font-medium text-primary-300 hover:bg-primary-500/20 transition-all"
            >
              <Loader2 size={14} />
              Retry
            </button>

            <div className="mt-6 text-center">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-primary-400 transition-colors"
              >
                <Github size={16} />
                View Full GitHub Profile
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ) : (
          <div
            ref={ref}
            className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
          >
            {/* Stats row */}
            {user && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                <StatCard icon={BookOpen} label="Public Repos" value={user.public_repos} />
                <StatCard icon={Users} label="Followers" value={user.followers} />
                <StatCard icon={Star} label="Total Stars" value={repos.reduce((a, r) => a + r.stargazers_count, 0)} />
                <StatCard icon={Github} label="Following" value={user.following} />
              </div>
            )}

            <div className="grid gap-8 lg:grid-cols-2">
              {/* Language breakdown */}
              <div className="rounded-2xl border border-white/5 bg-surface-900/40 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Top Languages</h3>
                <div className="space-y-4">
                  {langStats.slice(0, 7).map((lang) => (
                    <div key={lang.name}>
                      <div className="flex justify-between mb-1.5">
                        <span className="flex items-center gap-2 text-sm text-gray-300">
                          <span
                            className="h-2.5 w-2.5 rounded-full"
                            style={{ background: LANGUAGE_COLORS[lang.name] ?? '#6b7280' }}
                          />
                          {lang.name}
                        </span>
                        <span className="text-xs text-gray-500 font-mono">
                          {lang.count} repo{lang.count > 1 ? 's' : ''} · {lang.percentage}%
                        </span>
                      </div>
                      <div className="h-2 rounded-full bg-gray-800 overflow-hidden">
                        <div
                          className="h-full rounded-full skill-bar-fill"
                          style={{
                            width: visible ? `${lang.percentage}%` : '0%',
                            background: LANGUAGE_COLORS[lang.name] ?? '#6b7280',
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Top repos */}
              <div className="rounded-2xl border border-white/5 bg-surface-900/40 p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Top Repositories</h3>
                <div className="space-y-3">
                  {topRepos.map((repo) => (
                    <a
                      key={repo.id}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between rounded-xl bg-gray-800/30 border border-white/5 p-4 hover:border-primary-500/30 hover:bg-gray-800/50 transition-all group"
                    >
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-white group-hover:text-primary-400 transition-colors truncate">
                          {repo.name}
                        </p>
                        <p className="mt-0.5 text-xs text-gray-500 truncate">
                          {repo.description || 'No description'}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-gray-500 ml-4 shrink-0">
                        {repo.language && (
                          <span className="flex items-center gap-1">
                            <span
                              className="h-2 w-2 rounded-full"
                              style={{ background: LANGUAGE_COLORS[repo.language] ?? '#6b7280' }}
                            />
                            {repo.language}
                          </span>
                        )}
                        {repo.stargazers_count > 0 && (
                          <span className="flex items-center gap-1">
                            <Star size={12} /> {repo.stargazers_count}
                          </span>
                        )}
                        <ExternalLink size={14} className="text-gray-600 group-hover:text-primary-400 transition-colors" />
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Repo highlights & recent activity */}
            <div className="grid gap-8 lg:grid-cols-2 mt-8">
              <RepoHighlights repos={repos} />
              <RecentActivity repos={repos} />
            </div>

            <div className="mt-8 text-center">
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-primary-500/50 bg-primary-500/10 px-6 py-2.5 text-sm font-medium text-primary-300 hover:bg-primary-500/20 transition-all"
              >
                <Github size={16} />
                View Full GitHub Profile
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
