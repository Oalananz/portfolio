import type { GitHubActivity, GitHubRepo, GitHubUser } from '../types';
import { PERSONAL_INFO } from './constants';

const GITHUB_API = 'https://api.github.com';
const USERNAME = PERSONAL_INFO.githubUsername;

interface GitHubEventPayload {
  action?: string;
  ref_type?: string;
  ref?: string;
  commits?: Array<{ message: string }>;
  pull_request?: { merged?: boolean };
  release?: { tag_name?: string };
}

interface GitHubApiEvent {
  id: string;
  type: string;
  repo: {
    name: string;
    url: string;
  };
  payload: GitHubEventPayload;
  created_at: string;
}

function mapEventToAction(event: GitHubApiEvent): string {
  if (event.type === 'PushEvent') {
    const commitCount = event.payload.commits?.length ?? 0;
    if (commitCount <= 1) {
      return 'Pushed 1 commit to';
    }
    return `Pushed ${commitCount} commits to`;
  }

  if (event.type === 'CreateEvent') {
    const refType = event.payload.ref_type ?? 'resource';
    const ref = event.payload.ref ? ` ${event.payload.ref}` : '';
    return `Created ${refType}${ref} in`;
  }

  if (event.type === 'WatchEvent') {
    return 'Starred';
  }

  if (event.type === 'ForkEvent') {
    return 'Forked';
  }

  if (event.type === 'PullRequestEvent') {
    const action = event.payload.action ?? 'updated';
    if (action === 'closed' && event.payload.pull_request?.merged) {
      return 'Merged a pull request in';
    }
    return `${action} a pull request in`;
  }

  if (event.type === 'IssuesEvent') {
    const action = event.payload.action ?? 'updated';
    return `${action} an issue in`;
  }

  if (event.type === 'IssueCommentEvent') {
    const action = event.payload.action ?? 'commented on';
    return `${action} an issue in`;
  }

  if (event.type === 'ReleaseEvent') {
    const tag = event.payload.release?.tag_name;
    return tag ? `Published release ${tag} in` : 'Published a release in';
  }

  const fallback = event.type.replace(/Event$/, '').replace(/([A-Z])/g, ' $1').trim();
  return `${fallback} in`;
}

export async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`${GITHUB_API}/users/${USERNAME}`);
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  return res.json();
}

export async function fetchGitHubRepos(): Promise<GitHubRepo[]> {
  const res = await fetch(
    `${GITHUB_API}/users/${USERNAME}/repos?per_page=100&sort=updated&direction=desc`
  );
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
  const repos: GitHubRepo[] = await res.json();
  return repos.filter((r) => !r.fork);
}

export async function fetchGitHubActivity(limit = 8): Promise<GitHubActivity[]> {
  const perPage = Math.max(limit, 12);
  const res = await fetch(`${GITHUB_API}/users/${USERNAME}/events/public?per_page=${perPage}`, {
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);

  const events: GitHubApiEvent[] = await res.json();
  return events
    .filter((event) => Boolean(event.repo?.name))
    .slice(0, limit)
    .map((event) => ({
      id: event.id,
      type: event.type,
      action: mapEventToAction(event),
      repoName: event.repo.name,
      repoUrl: `https://github.com/${event.repo.name}`,
      createdAt: event.created_at,
    }));
}

export function getTopRepos(repos: GitHubRepo[], count = 6): GitHubRepo[] {
  return [...repos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
    .slice(0, count);
}

export function getLanguageStats(repos: GitHubRepo[]): { name: string; count: number; percentage: number }[] {
  const langMap: Record<string, number> = {};
  repos.forEach((r) => {
    if (r.language) {
      langMap[r.language] = (langMap[r.language] || 0) + 1;
    }
  });
  const total = Object.values(langMap).reduce((a, b) => a + b, 0);
  return Object.entries(langMap)
    .map(([name, count]) => ({ name, count, percentage: Math.round((count / total) * 100) }))
    .sort((a, b) => b.count - a.count);
}
