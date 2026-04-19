import { useCallback, useEffect, useState } from 'react';
import {
  Github,
  Users,
  BookOpen,
  Star,
  Loader2,
  ExternalLink,
  BarChart3,
  Clock3,
  Code2,
  RefreshCw,
} from 'lucide-react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import {
  fetchGitHubUser,
  fetchGitHubRepos,
  fetchGitHubActivity,
  getLanguageStats,
} from '../utils/github';
import { LANGUAGE_COLORS, PERSONAL_INFO } from '../utils/constants';
import type { GitHubActivity, GitHubRepo, GitHubUser } from '../types';

function StatCard({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string | number }) {
  return (
    <div className="flex flex-col items-center rounded-xl border border-border-soft bg-bg-surface/86 p-5 card-hover">
      <Icon size={24} className="text-primary-400 mb-2" />
      <p className="text-2xl font-bold text-text-main">{value}</p>
      <p className="text-xs font-mono uppercase tracking-[0.1em] text-text-muted mt-1">{label}</p>
    </div>
  );
}

function timeAgo(dateStr: string) {
  const timestamp = new Date(dateStr).getTime();
  if (Number.isNaN(timestamp)) return 'just now';
  const diffMs = Date.now() - timestamp;
  if (diffMs < 0) return 'just now';

  const minutes = Math.floor(diffMs / 60000);
  if (minutes < 1) return 'just now';
  if (minutes === 1) return '1 minute ago';
  if (minutes < 60) return `${minutes} minutes ago`;

  const hours = Math.floor(minutes / 60);
  if (hours === 1) return '1 hour ago';
  if (hours < 24) return `${hours} hours ago`;

  const days = Math.floor(hours / 24);
  if (days === 1) return '1 day ago';
  if (days < 30) return `${days} days ago`;

  const months = Math.floor(days / 30);
  return months === 1 ? '1 month ago' : `${months} months ago`;
}

function ActivityBreakdown({ activities, lastUpdated }: { activities: GitHubActivity[]; lastUpdated: string | null }) {
  const counts = activities.reduce<Record<string, number>>((acc, activity) => {
    const key = activity.type.replace(/Event$/, '');
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

  const entries = Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6);

  return (
    <div className="rounded-2xl border border-border-soft bg-bg-surface/86 p-6">
      <h3 className="mb-5 flex items-center gap-2 text-lg font-semibold text-text-main">
        <BarChart3 size={18} className="text-primary-400" />
        Activity Breakdown
      </h3>

      {entries.length === 0 ? (
        <p className="rounded-lg border border-border-soft bg-bg-elevated/55 px-3 py-4 text-sm text-text-secondary">
          No public events available to summarize.
        </p>
      ) : (
        <div className="space-y-2">
          {entries.map(([name, count]) => (
            <div
              key={name}
              className="flex items-center justify-between rounded-lg border border-border-soft bg-bg-elevated/60 px-3 py-2"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-text-secondary">{name}</span>
              <span className="text-sm font-semibold text-text-main">{count}</span>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 rounded-lg border border-border-soft bg-bg-elevated/55 px-3 py-2.5">
        <p className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
          <Clock3 size={12} className="text-accent-500" />
          last sync
        </p>
        <p className="mt-1 text-sm text-text-main">{lastUpdated ? timeAgo(lastUpdated) : 'pending'}</p>
      </div>
    </div>
  );
}

/** Live event timeline */
function RecentActivity({
  activities,
  refreshing,
  lastUpdated,
  onRefresh,
}: {
  activities: GitHubActivity[];
  refreshing: boolean;
  lastUpdated: string | null;
  onRefresh: () => void;
}) {
  const items = activities.slice(0, 6);

  return (
    <div className="rounded-2xl border border-border-soft bg-bg-surface/86 p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <h3 className="text-lg font-semibold text-text-main flex items-center gap-2">
          <Code2 size={18} className="text-primary-400" />
          Recent Activity
        </h3>
        <button
          onClick={onRefresh}
          disabled={refreshing}
          className="inline-flex items-center gap-1.5 rounded-md border border-border-soft bg-bg-elevated/80 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] text-text-secondary transition-colors hover:border-primary-500/45 hover:text-primary-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <RefreshCw size={12} className={refreshing ? 'animate-spin' : ''} />
          Refresh
        </button>
      </div>

      <p className="mb-3 font-mono text-[10px] uppercase tracking-[0.12em] text-text-muted">
        <span className="mr-1 text-accent-500">$</span>
        users/events/public --limit={items.length}
        {lastUpdated && (
          <span className="ml-2 normal-case tracking-normal text-text-secondary">updated {timeAgo(lastUpdated)}</span>
        )}
      </p>

      {items.length === 0 ? (
        <p className="rounded-lg border border-border-soft bg-bg-elevated/55 px-3 py-4 text-sm text-text-secondary">
          No recent public activity found right now.
        </p>
      ) : (
        <div className="space-y-3">
          {items.map((activity) => (
            <a
              key={activity.id}
              href={activity.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-3 rounded-lg p-3 transition-all hover:bg-bg-elevated/62"
            >
              <div className="mt-1 h-2 w-2 shrink-0 rounded-full bg-accent-500" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-text-main transition-colors group-hover:text-primary-300">
                  {activity.action}{' '}
                  <span className="font-semibold">{activity.repoName}</span>
                </p>
                <p className="mt-0.5 text-xs text-text-muted">
                  {timeAgo(activity.createdAt)}
                  <span className="ml-2 font-mono">{activity.type.replace(/Event$/, '')}</span>
                </p>
              </div>
              <ExternalLink size={12} className="mt-1 shrink-0 text-text-muted transition-colors group-hover:text-primary-300" />
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default function GitHubSection() {
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [activities, setActivities] = useState<GitHubActivity[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasRequestedInitialLoad, setHasRequestedInitialLoad] = useState(false);
  const [refreshingActivity, setRefreshingActivity] = useState(false);
  const [lastActivityUpdate, setLastActivityUpdate] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [ref, visible] = useInView(0.1);

  const loadData = useCallback(async (mode: 'initial' | 'refresh') => {
    if (mode === 'initial') {
      setLoading(true);
    } else {
      setRefreshingActivity(true);
    }
    setError(null);

    try {
      const [u, r, a] = await Promise.all([fetchGitHubUser(), fetchGitHubRepos(), fetchGitHubActivity(8)]);
      setUser(u);
      setRepos(r);
      setActivities(a);
      setLastActivityUpdate(new Date().toISOString());
    } catch (err: unknown) {
      console.error('GitHub API error:', err);
      const message = err instanceof Error ? err.message : '';
      setError(
        message.includes('403')
          ? 'GitHub API rate limit reached. Please try again in a few minutes.'
          : 'Failed to load GitHub data. Please try again.'
      );
    } finally {
      setLoading(false);
      setRefreshingActivity(false);
    }
  }, []);

  useEffect(() => {
    if (!visible || hasRequestedInitialLoad) {
      return;
    }

    setHasRequestedInitialLoad(true);
    void loadData('initial');
  }, [visible, hasRequestedInitialLoad, loadData]);

  const langStats = getLanguageStats(repos);

  return (
    <SectionWrapper
      className="bg-bg-surface/40"
      shellLabel="osamah@portfolio:~/github"
      shellCommand="fetch --on-open --manual-refresh"
    >
      <div id="github" ref={ref} className="scroll-mt-20">
        <SectionHeading
          title="GitHub Activity"
          subtitle="My open source contributions and coding activity"
        />

        {(!hasRequestedInitialLoad || loading) ? (
          <div className="flex justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary-400" />
          </div>
        ) : error ? (
          <div
            className={`flex flex-col items-center justify-center py-16 transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <Github size={48} className="text-text-muted mb-4" />
            <p className="text-text-secondary mb-4 text-center">{error}</p>
            <button
              onClick={() => {
                void loadData('initial');
              }}
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
                className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-primary-300 transition-colors"
              >
                <Github size={16} />
                View Full GitHub Profile
                <ExternalLink size={14} />
              </a>
            </div>
          </div>
        ) : (
          <div
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
              <div className="rounded-2xl border border-border-soft bg-bg-surface/86 p-6">
                <h3 className="text-lg font-semibold text-text-main mb-6">Top Languages</h3>
                {langStats.length === 0 ? (
                  <p className="rounded-lg border border-border-soft bg-bg-elevated/55 px-3 py-4 text-sm text-text-secondary">
                    No language stats are available right now.
                  </p>
                ) : (
                  <div className="space-y-4">
                    {langStats.slice(0, 7).map((lang) => (
                      <div key={lang.name}>
                        <div className="mb-1.5 flex justify-between">
                          <span className="flex items-center gap-2 text-sm text-text-secondary">
                            <span
                              className="h-2.5 w-2.5 rounded-full"
                              style={{ background: LANGUAGE_COLORS[lang.name] ?? '#6b7280' }}
                            />
                            {lang.name}
                          </span>
                          <span className="font-mono text-xs text-text-muted">
                            {lang.count} repo{lang.count > 1 ? 's' : ''} · {lang.percentage}%
                          </span>
                        </div>
                        <div className="h-2 overflow-hidden rounded-full bg-bg-elevated">
                          <div
                            className="skill-bar-fill h-full rounded-full"
                            style={{
                              width: visible ? `${lang.percentage}%` : '0%',
                              background: LANGUAGE_COLORS[lang.name] ?? '#6b7280',
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <ActivityBreakdown activities={activities} lastUpdated={lastActivityUpdate} />
            </div>

            <div className="mt-8">
              <RecentActivity
                activities={activities}
                refreshing={refreshingActivity}
                lastUpdated={lastActivityUpdate}
                onRefresh={() => {
                  void loadData('refresh');
                }}
              />
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
