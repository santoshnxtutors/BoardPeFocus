import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ClassHubConfig, getClassHubPath } from "@/app/classes/_data/classes";

export function ClassCard({ classHub }: { classHub: ClassHubConfig }) {
  return (
    <Link
      href={getClassHubPath(classHub.slug)}
      className="group rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lg"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-1.5 text-primary">
          {classHub.label}
        </Badge>
        <div className="flex flex-wrap gap-2">
          {classHub.boardPathways.slice(0, 3).map((pathway) => (
            <span
              key={pathway.href}
              className="rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground"
            >
              {pathway.board}
            </span>
          ))}
        </div>
      </div>

      <h3 className="mt-5 text-3xl font-bold text-primary transition-colors group-hover:text-accent">{classHub.heroTitle}</h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{classHub.heroDescription}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {classHub.subjectCards.slice(0, 4).map((subject) => (
          <span key={subject.title} className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary">
            {subject.title}
          </span>
        ))}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-accent">
        Explore class hub
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
