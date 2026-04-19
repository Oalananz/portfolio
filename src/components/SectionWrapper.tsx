interface Props {
  children: React.ReactNode;
  className?: string;
  shellLabel?: string;
  shellCommand?: string;
}

export default function SectionWrapper({
  children,
  className = '',
  shellLabel = 'osamah@portfolio:~/sections',
  shellCommand = 'render --optimized',
}: Props) {
  return (
    <section className={`relative py-20 md:py-28 ${className}`}>
      <div className="mx-auto w-full max-w-[1240px] px-5 sm:px-7 lg:px-10">
        <div className="terminal-shell">
          <div className="terminal-shell__header">
            <div className="terminal-shell__controls" aria-hidden="true">
              <span className="terminal-shell__dot terminal-shell__dot--red" />
              <span className="terminal-shell__dot terminal-shell__dot--yellow" />
              <span className="terminal-shell__dot terminal-shell__dot--green" />
            </div>
            <p className="terminal-shell__label">{shellLabel}</p>
            <p className="terminal-shell__command">{shellCommand}</p>
          </div>
          <div className="terminal-shell__body">{children}</div>
        </div>
      </div>
    </section>
  );
}
