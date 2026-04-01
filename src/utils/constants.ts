import type { NavLink, SkillCategory, TechItem } from '../types';

export const PERSONAL_INFO = {
  name: 'Osamah Alananzeh',
  firstName: 'Osamah',
  title: 'Computer Engineer | Backend Developer',
  email: 'osamahalananzeh@gmail.com',
  github: 'https://github.com/Oalananz',
  githubUsername: 'Oalananz',
  linkedin: 'https://www.linkedin.com/in/osamah-alananzeh',
  location: 'Amman, Jordan',
  cvUrl: '/Osamah-Alananzeh-CV.pdf',
  bio: `I'm a Computer Engineering graduate and backend/systems engineer focused on building reliable, high-performance software. I work across low-level systems programming, networking, concurrent applications, and backend architecture with a strong focus on performance and clean design.`,
  aboutParagraphs: [
    `As a Computer Engineering graduate from Al-Balqa Applied University and a current 42 Amman student, I combine academic depth with intensive project-based training. At 42, I use the peer-to-peer model to sharpen collaboration, code review, and problem solving through real engineering challenges.`,
    `My core focus is backend and systems engineering. I build high-performance software in C/C++, including Unix shells (Minishell), raycasting engines (Cub3D), HTTP servers (Webserv), and multithreaded systems (Dining Philosophers), while also designing REST APIs and scalable backend workflows.`,
    `I earned 1st place in Shadow Code and hold certifications from KodeKloud, freeCodeCamp + Microsoft, and ProgrammingAdvices. I enjoy solving complex system-level problems and continuously learning technologies that improve reliability, speed, and developer experience.`,
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
      { name: 'Postman', level: 80 },
      { name: 'cURL', level: 80 },
      { name: 'Siege', level: 70 },
      { name: 'VS Code', level: 90 },
      { name: 'Vim / Neovim', level: 80 },
      { name: 'Makefile / CMake', level: 85 },
      { name: 'PostgreSQL', level: 70 },
      { name: 'pgAdmin 4', level: 75 },
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
  { name: 'Postman',    iconUrl: `${DI}/postman/postman-original.svg`,             category: 'Tools & Frameworks' },
  { name: 'cURL',       iconUrl: `https://cdn.simpleicons.org/curl/073551`,         category: 'Tools & Frameworks' },
  { name: 'Siege',      iconUrl: `https://img.icons8.com/fluency/96/console.png`,   category: 'Tools & Frameworks' },
  { name: 'Visual Studio', iconUrl: `${DI}/visualstudio/visualstudio-original.svg`, category: 'Tools & Frameworks' },
  { name: 'PyCharm',    iconUrl: `${DI}/pycharm/pycharm-original.svg`,             category: 'Tools & Frameworks' },
  { name: 'IntelliJ IDEA', iconUrl: `${DI}/intellij/intellij-original.svg`,         category: 'Tools & Frameworks' },
  { name: 'SSMS',        iconUrl: '/ssms-logo.svg',                                category: 'Tools & Frameworks' },

  // Databases
  { name: 'PostgreSQL', iconUrl: `${DI}/postgresql/postgresql-original.svg`,        category: 'Databases' },
  { name: 'MongoDB',    iconUrl: `${DI}/mongodb/mongodb-original.svg`,             category: 'Databases' },
  { name: 'MySQL',      iconUrl: `${DI}/mysql/mysql-original.svg`,                 category: 'Databases' },
  { name: 'pgAdmin 4',  iconUrl: '/pgadmin4-logo.svg',                                category: 'Databases' },
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
  image?: string;
  highlight?: string;
}

export const CERTIFICATIONS: Certification[] = [
  {
    title: 'Shadow Code — Problem Solving Track',
    issuer: 'IEEE BAU Computer Society',
    date: 'May 2025',
    image: '/ieee-shadow-code.jpg',
    highlight: '1st Place',
  },
  {
    title: 'Docker Training Course for the Absolute Beginner',
    issuer: 'KodeKloud',
    date: '2026',
    link: 'https://learn.kodekloud.com/user/certificate/c19fc122-0e46-4740-bc6e-e2d72b929a10',
  },
  {
    title: 'Foundational C# with Microsoft',
    issuer: 'freeCodeCamp + Microsoft',
    date: 'Nov 2025',
    link: 'https://freecodecamp.org/certification/fcc-20995f0d-6358-4b91-8075-56a1209c0a79/foundational-c-sharp-with-microsoft',
  },
  {
    title: 'C# Level 1',
    issuer: 'ProgrammingAdvices',
    date: 'Dec 2025',
    link: 'https://programmingadvices.com/courses/2100316/certificate',
  },
  {
    title: 'Database Level 1 — SQL (Concepts & Practice)',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
    link: 'https://programmingadvices.com/courses/2076120/certificate',
  },
  {
    title: 'OOP As It Should Be In C#',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
    link: 'https://programmingadvices.com/courses/2057756/certificate',
  },
  {
    title: 'Database — SQL (Projects & Practice)',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
    link: 'https://programmingadvices.com/courses/2040664/certificate',
  },
  {
    title: 'C# & Database Connectivity',
    issuer: 'ProgrammingAdvices',
    date: 'Feb 2026',
    link: 'https://programmingadvices.com/courses/2012538/certificate',
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
