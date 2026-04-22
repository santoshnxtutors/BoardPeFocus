import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock, GraduationCap, MapPin, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tutor } from "@/types";

export function SchoolTutorLinks({
  tutors,
  title = "Related Tutor Profiles",
  compact = false,
  viewAllHref = "/search",
}: {
  tutors: Tutor[];
  title?: string;
  compact?: boolean;
  viewAllHref?: string;
}) {
  if (!tutors.length) {
    return (
      <div className="rounded-[2rem] border border-dashed border-border/60 bg-muted/20 p-6 text-sm leading-7 text-muted-foreground">
        We do not show a large public tutor roster for every school page. Share the board, class, subject, and Gurgaon area, and we will help you shortlist a relevant tutor match.
      </div>
    );
  }

  const visibleTutors = tutors.slice(0, compact ? 1 : 2);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-2xl font-bold text-primary">{title}</h3>
        <Link
          href={viewAllHref}
          className="inline-flex items-center gap-1.5 text-base font-bold text-primary transition-colors hover:text-accent"
        >
          View all tutors
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className={`mt-6 grid gap-5 ${compact ? "grid-cols-1" : "xl:grid-cols-2"}`}>
        {visibleTutors.map((tutor) => (
          <Link
            key={tutor.slug}
            href={`/tutors/${tutor.slug}`}
            className="group rounded-[2rem] border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-lg"
          >
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
              <div className="relative shrink-0">
                <div className="h-20 w-20 overflow-hidden rounded-2xl border border-border/60 bg-muted shadow-sm">
                  {tutor.photoUrl ? (
                    <Image
                      src={tutor.photoUrl}
                      alt={`${tutor.name}, school-aware home tutor in Gurugram`}
                      width={80}
                      height={80}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-primary/10 text-2xl font-bold text-primary">
                      {tutor.name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="absolute -bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1 rounded-full border border-border/60 bg-white px-2.5 py-1 text-xs font-semibold text-accent shadow-sm">
                  <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                  {tutor.rating}
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="break-words text-xl font-bold text-primary transition-colors group-hover:text-accent">
                      {tutor.name}
                    </h4>
                    <div className="mt-2 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-4 w-4 text-secondary" />
                        {tutor.experienceYears} Yrs Exp.
                      </span>
                      <span className="flex items-center gap-1.5">
                        <GraduationCap className="h-4 w-4 text-secondary" />
                        {tutor.studentsTaught}+ Students
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {tutor.boards.slice(0, 2).map((board) => (
                      <Badge
                        key={board}
                        variant="secondary"
                        className="rounded-full border border-border/50 bg-muted/40 px-2.5 py-1 text-[11px] font-semibold text-muted-foreground"
                      >
                        {board}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-start gap-2 text-sm text-foreground">
                  <BookOpen className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <p className="line-clamp-1">{tutor.subjects.slice(0, compact ? 2 : 3).join(" · ")}</p>
                </div>

                <p className="mt-3 line-clamp-2 text-sm leading-7 text-muted-foreground">{tutor.about}</p>

                {tutor.areas?.length ? (
                  <div className="mt-4 flex items-center gap-2 rounded-full border border-border/50 bg-muted/30 px-3 py-2 text-xs text-muted-foreground">
                    <MapPin className="h-3.5 w-3.5 shrink-0" />
                    <span className="truncate">Serves: {tutor.areas.slice(0, compact ? 2 : 3).join(", ")}</span>
                  </div>
                ) : null}
              </div>
            </div>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-accent">
              View full profile
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
