import { useInView } from '../hooks/useInView';

interface Props {
  title: string;
  subtitle?: string;
}

export default function SectionHeading({ title, subtitle }: Props) {
  const [ref, visible] = useInView();

  return (
    <div ref={ref} className={`mb-14 text-center transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        {title}
        <span className="gradient-text">.</span>
      </h2>
      {subtitle && <p className="mt-3 text-gray-400 max-w-2xl mx-auto">{subtitle}</p>}
      <div className="mt-4 mx-auto h-1 w-16 rounded-full bg-gradient-to-r from-primary-500 to-accent-500" />
    </div>
  );
}
