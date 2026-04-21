import Link from "next/link";
import { ChevronRight, Sparkles } from "lucide-react";
import { JsonLd } from "@/components/seo/JsonLd";
import { BlogCard } from "@/components/cards/BlogCard";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { blogPosts, featuredBlogPost } from "@/data/blogs";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
} from "@/lib/seo";

export const metadata = constructMetadata({
  title: "BoardPeFocus Blog | Insights for Gurugram Parents",
  description:
    "BoardPeFocus editorial insights on board exams, tutor selection, Gurugram school context, and premium one-to-one academic planning.",
  pathname: "/blog",
});

export default function BlogPage() {
  const latestPosts = blogPosts.slice(1);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Blog", url: absoluteUrl("/blog") },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="relative overflow-hidden bg-primary pt-40 pb-28 text-primary-foreground">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:34px_34px]" />
        <div className="pointer-events-none absolute -right-20 top-16 h-80 w-80 rounded-full bg-accent/15 blur-[120px]" />

        <div className="container mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-accent">
                <Sparkles className="h-3.5 w-3.5" />
                BoardPeFocus Journal
              </div>
              <h1 className="text-4xl md:text-7xl font-heading font-extrabold tracking-tight leading-[1.02] mb-6">
                Practical writing for parents navigating board pressure with more clarity.
              </h1>
              <p className="max-w-3xl text-lg md:text-xl leading-relaxed text-primary-foreground/70">
                Inspired by editorial blog layouts, but built for BoardPeFocus: sharper, calmer, and grounded in Gurugram board tutoring decisions.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mb-10 flex items-end justify-between gap-6 flex-col md:flex-row">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-accent mb-3">Featured article</p>
                <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary">Start with the most useful piece first</h2>
              </div>
              <Link href="/">
                <Button variant="link" className="text-primary hover:text-primary/80 px-0 text-lg group font-bold">
                  Back to home
                  <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <BlogCard post={featuredBlogPost} featured />
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="mb-14 max-w-3xl">
              <h2 className="text-3xl md:text-5xl font-heading font-bold text-primary mb-4">Latest stories</h2>
              <p className="text-lg text-muted-foreground">
                Board-specific strategy, tutor matching guidance, and school-aware thinking for families who want decisions to feel informed, not rushed.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {latestPosts.map((post) => (
              <StaggerItem key={post.slug} className="h-full">
                <div id={post.slug} className="scroll-mt-28 h-full">
                  <BlogCard post={post} />
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="rounded-[2.5rem] border border-border/50 bg-gradient-to-br from-primary to-[#314874] px-8 py-10 md:px-12 md:py-14 text-primary-foreground shadow-[0_24px_80px_rgba(28,53,95,0.15)]">
              <div className="max-w-3xl">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.18em] text-accent mb-4">Need help choosing next?</p>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-5 leading-tight">
                  Read the insight. Then get matched with a tutor who can execute it.
                </h2>
                <p className="text-primary-foreground/70 text-lg leading-relaxed mb-8">
                  The blog helps you think clearly. The BoardPeFocus matching process helps you move with confidence.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="h-14 rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 px-8 font-bold">
                      Request a callback
                    </Button>
                  </Link>
                  <Link href="/search">
                    <Button size="lg" variant="outline" className="h-14 rounded-2xl border-white/20 bg-white/5 px-8 text-white hover:bg-white/10 font-bold">
                      Explore tutors
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
