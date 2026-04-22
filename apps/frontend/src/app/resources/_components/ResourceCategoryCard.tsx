import Link from "next/link";
import { ArrowRight, FolderOpen } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ResourceCategory } from "@/app/resources/_data/types";

export function ResourceCategoryCard({ category }: { category: ResourceCategory }) {
  return (
    <Link href={`/resources/${category.slug}`} className="block h-full">
      <Card className="h-full rounded-[2rem] border-border/60 bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
        <CardContent className="flex h-full flex-col p-7">
          <div className="mb-5 flex items-center justify-between gap-4">
            <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-3 py-1 text-primary">
              <FolderOpen className="mr-1 h-3.5 w-3.5" />
              Resource Category
            </Badge>
            <span className="text-xs font-semibold uppercase tracking-[0.22em] text-muted-foreground">Gurgaon</span>
          </div>

          <h3 className="text-2xl font-bold text-primary">{category.title}</h3>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">{category.description}</p>

          <div className="mt-6 rounded-2xl border border-primary/10 bg-primary/5 p-4">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-primary/70">Best fit</p>
            <p className="mt-2 text-sm leading-6 text-foreground">{category.audience}</p>
          </div>

          <div className="mt-auto pt-6 text-sm font-semibold text-primary">
            {category.ctaLabel} <ArrowRight className="ml-1 inline h-4 w-4" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

