import { useState, useEffect } from 'react';
import SectionWrapper from '../components/SectionWrapper';
import SectionHeading from '../components/SectionHeading';
import { useInView } from '../hooks/useInView';
import { ExternalLink } from 'lucide-react';

// ── 42 Project node definition ─────────────────────────────────
interface GraphNode {
  id: string;
  name: string;
  circle: number; // 0-based ring in the holy graph
  status: 'completed' | 'in-progress' | 'locked';
  grade?: number;
  description: string;
  language: string;
  github?: string;
  dependencies: string[]; // ids of prerequisite projects
}

// ── Your 42 projects data (matching real holy graph structure) ──
const GRAPH_NODES: GraphNode[] = [
  // Circle 0 — Foundation
  {
    id: 'libft',
    name: 'Libft',
    circle: 0,
    status: 'completed',
    grade: 125,
    description: 'Your very first own library — recreating standard C functions from scratch.',
    language: 'C',
    github: 'https://github.com/Oalananz/libft-42',
    dependencies: [],
  },
  // Circle 1
  {
    id: 'ft_printf',
    name: 'ft_printf',
    circle: 1,
    status: 'completed',
    description: 'Reimplementation of the printf function with variadic arguments.',
    language: 'C',
    dependencies: ['libft'],
  },
  {
    id: 'get_next_line',
    name: 'get_next_line',
    circle: 1,
    status: 'completed',
    description: 'A function that reads a line from a file descriptor, one at a time.',
    language: 'C',
    dependencies: ['libft'],
  },
  {
    id: 'born2beroot',
    name: 'Born2beRoot',
    circle: 1,
    status: 'completed',
    description: 'System administration — setting up a virtual machine with strict security rules.',
    language: 'Shell',
    dependencies: ['libft'],
  },
  // Circle 2
  {
    id: 'pipex',
    name: 'Pipex',
    circle: 2,
    status: 'completed',
    description: 'Recreating Unix pipe behavior — handling multiple commands and redirections.',
    language: 'C',
    github: 'https://github.com/Oalananz/Pipex',
    dependencies: ['ft_printf', 'get_next_line'],
  },
  {
    id: 'so_long',
    name: 'so_long',
    circle: 2,
    status: 'completed',
    description: '2D game with MiniLibX — tile-based map, collectibles, and pathfinding.',
    language: 'C',
    github: 'https://github.com/Oalananz/so_long',
    dependencies: ['ft_printf', 'get_next_line'],
  },
  {
    id: 'push_swap',
    name: 'Push_swap',
    circle: 2,
    status: 'completed',
    description: 'Sorting algorithm challenge — sort a stack using the minimum number of operations.',
    language: 'C',
    github: 'https://github.com/Oalananz/Push_Swap',
    dependencies: ['ft_printf', 'get_next_line'],
  },
  // Circle 3
  {
    id: 'minishell',
    name: 'Minishell',
    circle: 3,
    status: 'completed',
    description: 'Building a custom Unix shell with parsing, piping, redirections, and signals.',
    language: 'C',
    github: 'https://github.com/Oalananz/Minishell-42',
    dependencies: ['pipex'],
  },
  {
    id: 'philosophers',
    name: 'Philosophers',
    circle: 3,
    status: 'completed',
    description: 'Dining Philosophers problem — threads, mutexes, and deadlock prevention.',
    language: 'C',
    github: 'https://github.com/Oalananz/philosophers',
    dependencies: ['pipex'],
  },
  // Circle 4
  {
    id: 'cub3d',
    name: 'Cub3D',
    circle: 4,
    status: 'completed',
    description: 'Raycasting engine inspired by Wolfenstein 3D — rendering a 3D maze from a 2D map.',
    language: 'C',
    github: 'https://github.com/Oalananz/Cub3d',
    dependencies: ['minishell'],
  },
  {
    id: 'cpp_modules',
    name: 'WebServ',
    circle: 4,
    status: 'completed',
    description: 'An event-driven HTTP server in C++ built from scratch with request parsing, CGI support, file handling, and concurrent client management using poll().',
    language: 'C++',
    github: 'https://github.com/Qhatahet/WebServ',
    dependencies: ['minishell'],
  },
  {
    id: 'netpractice',
    name: 'NetPractice',
    circle: 4,
    status: 'completed',
    description: 'Networking fundamentals — configuring small networks with TCP/IP addressing.',
    language: 'Networking',
    dependencies: ['minishell'],
  },
  // Circle 5
  {
    id: 'inception',
    name: 'Inception',
    circle: 5,
    status: 'in-progress',
    description: 'Docker infrastructure — setting up a complete web stack with Docker Compose.',
    language: 'Docker',
    dependencies: ['cub3d', 'cpp_modules', 'netpractice'],
  },
  {
    id: 'webserv',
    name: 'WebServ',
    circle: 5,
    status: 'completed',
    description: 'HTTP server implementation in C++ with request parsing, static file serving, CGI handling, and concurrent client management.',
    language: 'C++',
    github: 'https://github.com/Qhatahet/WebServ',
    dependencies: ['cpp_modules', 'netpractice'],
  },
  // Circle 6
  {
    id: 'ft_transcendence',
    name: 'ft_transcendence',
    circle: 6,
    status: 'locked',
    description: 'The final project — a full-stack multiplayer Pong game with auth and chat.',
    language: 'Full Stack',
    dependencies: ['inception', 'webserv'],
  },
];

const CIRCLE_LABELS = [
  'Circle 0', 'Circle 1', 'Circle 2', 'Circle 3',
  'Circle 4', 'Circle 5', 'Circle 6',
];

const STATUS_STYLES = {
  completed: {
    bg: 'bg-violet-500/20',
    border: 'border-violet-500/60',
    ring: 'ring-violet-500/30',
    text: 'text-violet-400',
    glow: 'shadow-violet-500/20',
    dot: 'bg-violet-400',
    label: 'Completed',
  },
  'in-progress': {
    bg: 'bg-cyan-500/20',
    border: 'border-cyan-500/60',
    ring: 'ring-cyan-500/30',
    text: 'text-cyan-400',
    glow: 'shadow-cyan-500/20',
    dot: 'bg-cyan-400',
    label: 'In Progress',
  },
  locked: {
    bg: 'bg-gray-800/40',
    border: 'border-gray-700/40',
    ring: 'ring-gray-700/20',
    text: 'text-gray-500',
    glow: 'shadow-none',
    dot: 'bg-gray-600',
    label: 'Locked',
  },
};

function NodeCard({
  node,
  onClick,
  visible,
  index,
}: {
  node: GraphNode;
  onClick: () => void;
  visible: boolean;
  index: number;
}) {
  const s = STATUS_STYLES[node.status];
  return (
    <button
      onClick={onClick}
      className={`relative group text-left w-full rounded-xl border p-3.5 transition-all duration-500 cursor-pointer
        ring-1 ${s.border} ${s.bg} ${s.ring} hover:scale-[1.03] hover:shadow-lg ${s.glow}
        ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
      style={{ transitionDelay: `${Math.min(index * 60, 800)}ms` }}
    >
      <div className="flex items-center gap-2.5">
        <div className={`h-2.5 w-2.5 rounded-full ${s.dot} shrink-0 ${node.status === 'in-progress' ? 'animate-pulse' : ''}`} />
        <span className="text-sm font-semibold text-white truncate">{node.name}</span>
      </div>
      <div className="mt-1.5 flex items-center gap-2">
        <span className={`text-[11px] font-medium ${s.text}`}>{s.label}</span>
        {node.grade && (
          <span className="text-[11px] font-mono text-gray-400">
            {node.grade}%
          </span>
        )}
      </div>
      <span className="text-[10px] text-gray-500 mt-0.5 block">{node.language}</span>
    </button>
  );
}

function NodeDetail({ node, onClose }: { node: GraphNode; onClose: () => void }) {
  const s = STATUS_STYLES[node.status];
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`relative max-w-md w-full rounded-2xl border ${s.border} bg-surface-900 p-6 shadow-2xl`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white text-lg">✕</button>

        <div className="flex items-center gap-3 mb-3">
          <div className={`h-3 w-3 rounded-full ${s.dot} ${node.status === 'in-progress' ? 'animate-pulse' : ''}`} />
          <h3 className="text-xl font-bold text-white">{node.name}</h3>
        </div>

        <div className="flex items-center gap-3 mb-4">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${s.bg} ${s.text} border ${s.border}`}>
            {s.label}
          </span>
          <span className="text-xs text-gray-400">{CIRCLE_LABELS[node.circle]}</span>
          <span className="text-xs text-gray-500">{node.language}</span>
          {node.grade && (
            <span className="text-xs font-mono text-emerald-400">{node.grade}%</span>
          )}
        </div>

        <p className="text-sm text-gray-300 leading-relaxed mb-4">{node.description}</p>

        {node.dependencies.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-1.5">Prerequisites</p>
            <div className="flex flex-wrap gap-1.5">
              {node.dependencies.map((depId) => {
                const dep = GRAPH_NODES.find((n) => n.id === depId);
                return dep ? (
                  <span key={depId} className="text-[11px] px-2 py-0.5 rounded-full bg-gray-800 border border-white/5 text-gray-400">
                    {dep.name}
                  </span>
                ) : null;
              })}
            </div>
          </div>
        )}

        {node.github && (
          <a
            href={node.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm text-primary-400 hover:text-primary-300 transition-colors"
          >
            View on GitHub <ExternalLink size={14} />
          </a>
        )}
      </div>
    </div>
  );
}

export default function HolyGraph() {
  const [ref, visible] = useInView(0.05);
  const [selected, setSelected] = useState<GraphNode | null>(null);
  const [filter, setFilter] = useState<'all' | 'completed' | 'in-progress' | 'locked'>('all');

  // Close modal on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelected(null);
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Group nodes by circle for filtered view
  const completedCount = GRAPH_NODES.filter((n) => n.status === 'completed').length;
  const totalCount = GRAPH_NODES.length;
  const progressPct = Math.round((completedCount / totalCount) * 100);

  const filtered = filter === 'all' ? GRAPH_NODES : GRAPH_NODES.filter((n) => n.status === filter);
  const filteredCircles = CIRCLE_LABELS.map((_, i) => filtered.filter((n) => n.circle === i));

  let nodeIndex = 0;

  return (
    <SectionWrapper>
      <div id="holygraph" className="scroll-mt-20">
        <SectionHeading
          title="42 Holy Graph"
          subtitle="My journey through the 42 curriculum — circle by circle"
        />

        <div ref={ref}>
          {/* Progress bar */}
          <div
            className={`mb-8 transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-400">
                Overall Progress — <span className="text-white font-semibold">{completedCount}/{totalCount}</span> projects
              </span>
              <span className="text-sm font-mono text-primary-400">{progressPct}%</span>
            </div>
            <div className="h-3 rounded-full bg-gray-800 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-primary-600 to-accent-400 skill-bar-fill"
                style={{ width: visible ? `${progressPct}%` : '0%' }}
              />
            </div>
          </div>

          {/* Filter */}
          <div
            className={`flex flex-wrap gap-2 mb-8 transition-all duration-700 delay-100 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
          >
            {(['all', 'completed', 'in-progress', 'locked'] as const).map((f) => {
              const labels = { all: 'All', completed: 'Completed', 'in-progress': 'In Progress', locked: 'Locked' };
              const counts = {
                all: totalCount,
                completed: GRAPH_NODES.filter((n) => n.status === 'completed').length,
                'in-progress': GRAPH_NODES.filter((n) => n.status === 'in-progress').length,
                locked: GRAPH_NODES.filter((n) => n.status === 'locked').length,
              };
              return (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all duration-300 border ${
                    filter === f
                      ? 'border-primary-500 bg-primary-500/15 text-primary-300 shadow-lg shadow-primary-500/10'
                      : 'border-white/[0.06] bg-transparent text-gray-400 hover:text-white hover:border-white/10'
                  }`}
                >
                  {labels[f]} ({counts[f]})
                </button>
              );
            })}
          </div>

          {/* Graph — rows by circle */}
          <div className="space-y-6">
            {filteredCircles.map((nodes, circleIdx) => {
              if (nodes.length === 0) return null;
              return (
                <div key={circleIdx}>
                  {/* Circle label */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-xs font-bold uppercase tracking-wider text-gray-500">
                      {CIRCLE_LABELS[circleIdx]}
                    </span>
                    <div className="flex-1 h-px bg-gradient-to-r from-white/10 to-transparent" />
                  </div>
                  {/* Nodes */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {nodes.map((node) => {
                      const idx = nodeIndex++;
                      return (
                        <NodeCard
                          key={node.id}
                          node={node}
                          onClick={() => setSelected(node)}
                          visible={visible}
                          index={idx}
                        />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div
            className={`flex flex-wrap items-center gap-4 mt-8 text-xs text-gray-500 transition-all duration-700 delay-300 ${
              visible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-violet-400" /> Completed
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 animate-pulse" /> In Progress
            </span>
            <span className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-gray-600" /> Locked
            </span>
          </div>
        </div>
      </div>

      {/* Detail modal */}
      {selected && <NodeDetail node={selected} onClose={() => setSelected(null)} />}
    </SectionWrapper>
  );
}
