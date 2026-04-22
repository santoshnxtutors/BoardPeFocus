import { ReactNode } from "react";

export function BoardsSection({
  eyebrow,
  title,
  description,
  children,
  className = "",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-10 max-w-3xl">
        {eyebrow ? (
          <div className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">{eyebrow}</div>
        ) : null}
        <h2 className="text-3xl font-bold text-primary md:text-4xl">{title}</h2>
        {description ? <p className="mt-4 text-lg leading-8 text-muted-foreground">{description}</p> : null}
      </div>
      {children}
    </section>
  );
}
