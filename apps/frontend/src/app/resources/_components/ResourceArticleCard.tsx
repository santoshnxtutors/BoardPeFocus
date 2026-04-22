import Link from "next/link";
import { ArrowRight, Clock3 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { ResourceArticle, ResourceCategory } from "@/app/resources/_data/types";

export function ResourceArticleCard({
  article,
  category,
}: {
  article: ResourceArticle;
  category: ResourceCategory;
}) {
  return (
    <Link
      href={`/resources/${article.categorySlug}/${article.slug}`}
      className="block h-full rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex items-center justify-between gap-4">
        <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-3 py-1 text-primary">
          {category.title}
        </Badge>
        <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
          <Clock3 className="h-3.5 w-3.5" />
          {article.readTime}
        </span>
      </div>

      <h3 className="mt-5 text-2xl font-bold tracking-tight text-primary">{article.title}</h3>
      <p className="mt-3 text-sm leading-7 text-muted-foreground">{article.excerpt}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {article.tags.slice(0, 3).map((tag) => (
          <span key={tag} className="rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-primary">
            {tag}
          </span>
        ))}
      </div>

      <div className="mt-6 text-sm font-semibold text-primary">
        Read guide <ArrowRight className="ml-1 inline h-4 w-4" />
      </div>
    </Link>
  );
}

