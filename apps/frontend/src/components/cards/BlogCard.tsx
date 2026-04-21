import Link from "next/link";
import { ArrowUpRight, CalendarDays, Clock3 } from "lucide-react";
import { BlogPost } from "@/data/blogs";

interface BlogCardProps {
  post: BlogPost;
  featured?: boolean;
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  return (
    <Link
      href={`/blog#${post.slug}`}
      className="group block h-full"
    >
      <article
        id={featured ? undefined : post.slug}
        className={`relative h-full overflow-hidden rounded-[2rem] border border-border/50 bg-white transition-all duration-500 ${
          featured
            ? "p-8 md:p-10 shadow-[0_24px_80px_rgba(28,53,95,0.12)] hover:-translate-y-1 hover:shadow-[0_32px_90px_rgba(28,53,95,0.18)]"
            : "p-6 shadow-[0_12px_40px_rgba(28,53,95,0.06)] hover:-translate-y-1 hover:border-primary/20 hover:shadow-[0_22px_70px_rgba(28,53,95,0.12)]"
        }`}
      >
        <div className="pointer-events-none absolute right-0 top-0 h-36 w-36 rounded-full bg-primary/6 blur-3xl transition-colors group-hover:bg-accent/10" />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-6 flex flex-wrap items-center gap-3">
            <span className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-[11px] font-extrabold uppercase tracking-[0.16em] text-primary">
              {post.category}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-accent">
              {post.highlight}
            </span>
          </div>

          <h3
            className={`font-heading font-bold text-primary transition-colors group-hover:text-accent ${
              featured ? "text-3xl md:text-4xl leading-tight mb-5" : "text-2xl leading-snug mb-4"
            }`}
          >
            {post.title}
          </h3>

          <p className={`text-muted-foreground leading-relaxed ${featured ? "text-lg mb-8 max-w-2xl" : "text-sm mb-6"}`}>
            {post.excerpt}
          </p>

          <div className="mt-auto flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <CalendarDays className="h-4 w-4 text-secondary" />
              {post.dateLabel}
            </span>
            <span className="flex items-center gap-2">
              <Clock3 className="h-4 w-4 text-secondary" />
              {post.readTime}
            </span>
          </div>

          <div className="mt-6 flex items-center justify-between border-t border-border/50 pt-5">
            <span className="text-sm font-semibold text-foreground/75">{post.audience}</span>
            <span className="inline-flex items-center gap-2 text-sm font-bold text-primary transition-colors group-hover:text-accent">
              Read article
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
