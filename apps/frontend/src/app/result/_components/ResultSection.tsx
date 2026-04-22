import { ReactNode } from "react";

export function ResultSection({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section>
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{eyebrow}</p>
        <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">{title}</h2>
        <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">{description}</p>
      </div>
      <div className="mt-10">{children}</div>
    </section>
  );
}

