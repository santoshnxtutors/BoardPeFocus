import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { ResourceLinkCard } from "@/app/resources/_data/types";

export function ResourcesRelatedLinks({
  title = "Continue Exploring",
  subtitle = "Use these next steps to move from informational content into the right board, class, subject, school, or area page.",
  links,
}: {
  title?: string;
  subtitle?: string;
  links: ResourceLinkCard[];
}) {
  return (
    <section className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-primary">{title}</h2>
        <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group rounded-2xl border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/25 hover:bg-white hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-primary transition-colors group-hover:text-accent">{link.title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{link.description}</p>
              </div>
              <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-colors group-hover:text-primary" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

