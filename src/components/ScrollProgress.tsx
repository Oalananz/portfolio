import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div className="fixed left-0 right-0 top-0 z-[60] h-px bg-transparent">
      <div
        className="h-full bg-gradient-to-r from-primary-500 via-primary-400 to-accent-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
