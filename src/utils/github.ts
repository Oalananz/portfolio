import type { GitHubRepo, GitHubUser } from '../types';

const GITHUB_API = 'https://api.github.com';
const USERNAME = 'Oalananz';

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
