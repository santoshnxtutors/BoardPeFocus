import { ReactNode } from "react";

export function ProcessSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <section className="space-y-6">
      <div className="max-w-3xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">{eyebrow}</p>
        ) : null}
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
        {description ? (
          <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
