import Link from "next/link";
import { ArrowRight, BookOpen, GraduationCap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { BoardConfig, getBoardPath } from "@/app/boards/_data/boards";

export function BoardCard({ board }: { board: BoardConfig }) {
  return (
    <Link href={getBoardPath(board.slug)} className="block h-full">
      <Card className="h-full rounded-[2rem] border-border/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="flex h-full flex-col p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-3 py-1 text-primary">
              <GraduationCap className="mr-1 h-3.5 w-3.5" />
              Board Hub
            </Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">
              Gurgaon
            </span>
          </div>

          <h3 className="text-2xl font-bold text-primary">{board.name}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{board.cardDescription}</p>

          <div className="mt-6 space-y-4">
            <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary">
                <BookOpen className="h-4 w-4 text-accent" />
                Class relevance
              </div>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{board.classRelevance}</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Subject relevance</p>
              <p className="mt-2 text-sm text-foreground">{board.subjectRelevance}</p>
            </div>
          </div>

          <div className="mt-auto pt-6 text-sm font-semibold text-primary">
            Explore Board <ArrowRight className="ml-1 inline h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
