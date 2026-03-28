import type { NavLink, SkillCategory, TechItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Osamah Alananzeh',
  firstName: 'Osamah',
  title: 'Computer Engineer | 42 Amman Student',
  email: 'osamahalananzeh@gmail.com',
  github: 'https://github.com/Oalananz',
  githubUsername: 'Oalananz',
  linkedin: 'https://www.linkedin.com/in/osamah-alananzeh',
  location: 'Amman, Jordan',
  cvUrl: '/Osamah-Alananzeh-CV.pdf',
  bio: `I'm a Computer Engineer and 42 Amman student passionate about building efficient, elegant software solutions. My journey spans from low-level systems programming in C to modern web development, with a deep focus on algorithmic thinking and clean architecture.`,
  aboutParagraphs: [
    `As a Computer Engineering graduate and current student at 42 Amman, I bring a unique blend of academic foundation and practical, project-based learning. At 42, I've embraced the peer-to-peer methodology — mastering complex concepts through collaboration, code review, and real-world challenges.`,
    `My expertise lies in systems programming, where I've built everything from custom shells (Minishell) to raycasting engines (Cub3D) and multi-threaded synchronization solutions (Dining Philosophers). I'm equally passionate about web technologies, database systems, and creating tools that solve real problems.`,
    `I won 1st place at Shadow Code, a competitive programming event, and I hold certifications from Google, IBM, and other industry leaders. I'm always looking to push boundaries and learn new technologies.`,
  ],
};

export const NAV_LINKS: NavLink[] = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Projects', href: '#projects' },
  { label: '42 Graph', href: '#holygraph' },
  { label: 'Graduation', href: '#graduation' },
  { label: 'GitHub', href: '#github' },
  { label: 'Contact', href: '#contact' },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: 'Programming Languages',
    icon: 'Code2',
    skills: [
      { name: 'C', level: 95 },
      { name: 'C++', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'Java', level: 70 },
      { name: 'JavaScript', level: 75 },
      { name: 'TypeScript', level: 70 },
      { name: 'SQL', level: 75 },
    ],
  },
  {
    title: 'Systems & Unix',
    icon: 'Terminal',
    skills: [
      { name: 'Linux / Unix', level: 90 },
      { name: 'Shell Scripting', level: 85 },
      { name: 'Process Management', level: 85 },
      { name: 'Multi-threading', level: 80 },
      { name: 'Memory Management', level: 85 },
      { name: 'Networking (TCP/IP)', level: 75 },
    ],
  },
  {
    title: 'Web & Frameworks',
    icon: 'Globe',
    skills: [
      { name: 'React', level: 75 },
      { name: 'HTML / CSS', level: 80 },
      { name: 'Tailwind CSS', level: 75 },
      { name: 'Node.js', level: 65 },
      { name: 'REST APIs', level: 75 },
    ],
  },
  {
    title: 'Tools & Technologies',
    icon: 'Wrench',
    skills: [
      { name: 'Git / GitHub', level: 90 },
      { name: 'Docker', level: 70 },
      { name: 'VS Code', level: 90 },
      { name: 'Vim / Neovim', level: 80 },
      { name: 'Makefile / CMake', level: 85 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'MongoDB', level: 65 },
    ],
  },
];

export const FEATURED_PROJECTS = [
  {
    title: 'Minishell',
    description:
      'A custom Unix shell built from scratch in C, implementing parsing, piping, redirections, environment variables, and signal handling — replicating core bash behavior.',
    technologies: ['C', 'Unix', 'Processes', 'Pipes', 'Signals'],
    github: 'https://github.com/Oalananz/Minishell-42',
  },
  {
    title: 'Cub3D',
    description:
      'A raycasting engine inspired by Wolfenstein 3D, rendering a 3D maze from a 2D map using the MiniLibX graphics library with texture mapping and sprite rendering.',
    technologies: ['C', 'Raycasting', 'MiniLibX', 'Graphics', 'Math'],
    github: 'https://github.com/Oalananz/Cub3d',
  },
  {
    title: 'Philosophers',
    description:
      'An implementation of the classic Dining Philosophers problem using POSIX threads and mutexes, demonstrating synchronization and deadlock prevention strategies.',
    technologies: ['C', 'Threads', 'Mutexes', 'Concurrency'],
    github: 'https://github.com/Oalananz/philosophers',
  },
  {
    title: 'WebServ',
    description:
      'An event-driven HTTP server in C++ built from scratch, featuring request parsing, static file serving, CGI support, file upload and deletion, and concurrent client handling using poll().',
    technologies: ['C++', 'HTTP', 'poll()', 'CGI', 'Sockets'],
    github: 'https://github.com/Qhatahet/WebServ',
  },
];

// ── Icon-grid tech items (matching screenshot design) ──────────
const DI = 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons';

export const TECH_ITEMS: TechItem[] = [
  // Languages
  { name: 'C',          iconUrl: '/c-logo.svg',                                    category: 'Languages' },
  { name: 'C++',        iconUrl: `${DI}/cplusplus/cplusplus-original.svg`,          category: 'Languages' },
  { name: 'C#',         iconUrl: `${DI}/csharp/csharp-original.svg`,               category: 'Languages' },
  { name: 'Python',     iconUrl: `${DI}/python/python-original.svg`,               category: 'Languages' },
  { name: 'Java',       iconUrl: `${DI}/java/java-original.svg`,                   category: 'Languages' },
  { name: 'Assembly',   iconUrl: `https://img.icons8.com/color/96/assembly.png`,    category: 'Languages' },
  { name: 'JavaScript', iconUrl: `${DI}/javascript/javascript-original.svg`,        category: 'Languages' },
  { name: 'TypeScript', iconUrl: `${DI}/typescript/typescript-original.svg`,        category: 'Languages' },

  // Systems & Unix
  { name: 'Linux',      iconUrl: `${DI}/linux/linux-original.svg`,                 category: 'Systems & Unix' },
  { name: 'Bash',       iconUrl: `${DI}/bash/bash-original.svg`,                   category: 'Systems & Unix' },
  { name: 'Unix',       iconUrl: `${DI}/unix/unix-original.svg`,                   category: 'Systems & Unix' },
  { name: 'Docker',     iconUrl: `${DI}/docker/docker-original.svg`,               category: 'Systems & Unix' },

  // Tools & Frameworks
  { name: 'Git',        iconUrl: `${DI}/git/git-original.svg`,                     category: 'Tools & Frameworks' },
  { name: 'GitHub',     iconUrl: `${DI}/github/github-original.svg`,               category: 'Tools & Frameworks' },
  { name: '.NET',       iconUrl: `${DI}/dot-net/dot-net-original.svg`,             category: 'Tools & Frameworks' },
  { name: 'VS Code',    iconUrl: `${DI}/vscode/vscode-original.svg`,               category: 'Tools & Frameworks' },
  { name: 'Vim',        iconUrl: `${DI}/vim/vim-original.svg`,                     category: 'Tools & Frameworks' },
  { name: 'React',      iconUrl: `${DI}/react/react-original.svg`,                 category: 'Tools & Frameworks' },
  { name: 'Tailwind',   iconUrl: `${DI}/tailwindcss/tailwindcss-original.svg`,     category: 'Tools & Frameworks' },
  { name: 'Node.js',    iconUrl: `${DI}/nodejs/nodejs-original.svg`,               category: 'Tools & Frameworks' },
  { name: 'Visual Studio', iconUrl: `${DI}/visualstudio/visualstudio-original.svg`, category: 'Tools & Frameworks' },
  { name: 'PyCharm',    iconUrl: `${DI}/pycharm/pycharm-original.svg`,             category: 'Tools & Frameworks' },
  { name: 'IntelliJ IDEA', iconUrl: `${DI}/intellij/intellij-original.svg`,         category: 'Tools & Frameworks' },
  { name: 'SSMS',        iconUrl: '/ssms-logo.svg',                                category: 'Tools & Frameworks' },

  // Databases
  { name: 'PostgreSQL', iconUrl: `${DI}/postgresql/postgresql-original.svg`,        category: 'Databases' },
  { name: 'MongoDB',    iconUrl: `${DI}/mongodb/mongodb-original.svg`,             category: 'Databases' },
  { name: 'MySQL',      iconUrl: `${DI}/mysql/mysql-original.svg`,                 category: 'Databases' },
  { name: 'SQL',        iconUrl: `${DI}/azuresqldatabase/azuresqldatabase-original.svg`, category: 'Databases' },
  { name: 'SQL Server', iconUrl: `${DI}/microsoftsqlserver/microsoftsqlserver-original.svg`, category: 'Databases' },
];

export const TECH_CATEGORIES = ['All', 'Languages', 'Systems & Unix', 'Tools & Frameworks', 'Databases'] as const;

export type TechCategory = typeof TECH_CATEGORIES[number];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link?: string;
  highlight?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Shadow Code — Problem Solving Track',
    issuer: 'IEEE Student Branch, Al-Balqa Applied University',
    date: 'May 2025',
    highlight: '1st Place',
  },
  {
    title: 'Foundational C# with Microsoft',
    issuer: 'freeCodeCamp + Microsoft',
    date: 'Nov 2025',
  },
  {
    title: 'C# Level 1',
    issuer: 'ProgrammingAdvices',
    date: 'Dec 2025',
  },
  {
    title: 'Database Level 1 — SQL (Concepts & Practice)',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
  },
  {
    title: 'OOP As It Should Be In C#',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
  },
  {
    title: 'Database — SQL (Projects & Practice)',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
  },
  {
    title: 'C# & Database Connectivity',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
  },
];

export const LANGUAGE_COLORS: Record<string, string> = {
  C: '#555555',
  'C++': '#f34b7d',
  Python: '#3572a5',
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Java: '#b07219',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Shell: '#89e051',
  Makefile: '#427819',
  Dockerfile: '#384d54',
  Vim: '#199f4b',
};
