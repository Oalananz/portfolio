interface Props {
  children: React.ReactNode;
  className?: string;
}

export default function SectionWrapper({ children, className = '' }: Props) {
  return (
    <section className={`relative py-20 md:py-28 ${className}`}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
    </section>
  );
}
