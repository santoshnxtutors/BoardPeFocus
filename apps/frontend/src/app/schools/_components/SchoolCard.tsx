import Link from "next/link";
import { ArrowRight, BookOpen, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SchoolConfig } from "@/app/schools/_data/schools";

export function SchoolCard({ school }: { school: SchoolConfig }) {
  return (
    <Link
      href={`/schools/${school.slug}`}
      className="group rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lg"
    >
      <div className="flex flex-wrap items-center gap-3">
        <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-1.5 text-primary">
          {school.shortLabel}
        </Badge>
        <span className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-muted/20 px-3 py-1.5 text-xs font-semibold text-muted-foreground">
          <MapPin className="h-3.5 w-3.5" />
          {school.locationCue}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold text-primary transition-colors group-hover:text-accent">{school.name}</h3>
      <p className="mt-4 text-sm leading-7 text-muted-foreground">{school.cardDescription}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {school.curricula.map((curriculum) => (
          <span
            key={curriculum}
            className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
          >
            {curriculum}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center gap-2 text-sm font-medium text-muted-foreground">
        <BookOpen className="h-4 w-4 text-accent" />
        {school.localityCue}
      </div>

      <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-accent">
        Explore school
        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  );
}
