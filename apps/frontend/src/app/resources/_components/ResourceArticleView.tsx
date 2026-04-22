import Link from "next/link";
import { CheckCircle2, Clock3, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { FadeIn } from "@/lib/animations";
import { ResourceArticle, ResourceCategory } from "@/app/resources/_data/types";
import { ResourcesBreadcrumbs } from "@/app/resources/_components/ResourcesBreadcrumbs";
import { ResourcesCtaBlock } from "@/app/resources/_components/ResourcesCtaBlock";
import { ResourcesRelatedLinks } from "@/app/resources/_components/ResourcesRelatedLinks";
import { ResourceArticleCard } from "@/app/resources/_components/ResourceArticleCard";

export function ResourceArticleView({
  article,
  category,
  relatedArticles,
}: {
  article: ResourceArticle;
  category: ResourceCategory;
  relatedArticles: Array<{ article: ResourceArticle; category: ResourceCategory }>;
}) {
  return (
    <section className="pt-32">
      <div className="container mx-auto max-w-7xl px-4">
        <ResourcesBreadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Resources", href: "/resources" },
            { label: category.title, href: `/resources/${category.slug}` },
            { label: article.title },
          ]}
        />

        <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
          <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <FadeIn direction="up" className="max-w-3xl">
              <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                <Sparkles className="mr-2 h-4 w-4 text-accent" />
                {article.heroEyebrow}
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{article.title}</h1>
              <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">{article.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {article.contextualLinks.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/15"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </FadeIn>

            <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Read time</p>
                <p className="mt-3 inline-flex items-center gap-2 text-base font-semibold leading-7 text-white">
                  <Clock3 className="h-4 w-4 text-accent" />
                  {article.readTime}
                </p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Category</p>
                <p className="mt-3 text-base font-semibold leading-7 text-white">{category.title}</p>
              </div>
              <div className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Audience</p>
                <p className="mt-3 text-base font-semibold leading-7 text-white">{article.audience}</p>
              </div>
            </div>
          </div>
        </section>

        <div className="space-y-24 py-24">
          <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_22rem]">
            <div className="space-y-8">
              <section className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Answer first</p>
                <h2 className="mt-3 text-3xl font-bold text-primary">Short answer</h2>
                <p className="mt-4 text-base leading-8 text-foreground">{article.answerFirst}</p>
                <div className="mt-6 grid gap-4 md:grid-cols-3">
                  {article.keyTakeaways.map((item) => (
                    <div key={item} className="rounded-[1.5rem] border border-primary/10 bg-primary/5 p-4">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                        <p className="text-sm leading-7 text-foreground">{item}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              {article.sections.map((section, index) => (
                <section key={section.title} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <h2 className="text-3xl font-bold text-primary">{section.title}</h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-foreground/90">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets?.length ? (
                    <div className="mt-6 grid gap-4">
                      {section.bullets.map((bullet) => (
                        <div key={bullet} className="rounded-[1.5rem] border border-border/60 bg-muted/20 p-4">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                            <p className="text-sm leading-7 text-foreground">{bullet}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : null}

                  {index === 1 ? (
                    <div className="mt-8">
                      <ResourcesCtaBlock
                        compact
                        title={article.midCta.title}
                        description={article.midCta.description}
                      />
                    </div>
                  ) : null}
                </section>
              ))}

              <ResourcesRelatedLinks title="Related money pages" links={article.moneyPageLinks} />
            </div>

            <aside className="space-y-6 xl:sticky xl:top-28 xl:self-start">
              <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                <h2 className="text-xl font-bold text-primary">On this page</h2>
                <div className="mt-4 space-y-3">
                  {article.sections.map((section) => (
                    <div key={section.title} className="rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-semibold text-primary">
                      {section.title}
                    </div>
                  ))}
                </div>
              </div>

              <ResourcesRelatedLinks
                title="Continue exploring"
                subtitle="These are the cleanest next pages if you want to move from reading into the right Gurgaon support path."
                links={article.continueLinks}
              />
            </aside>
          </div>

          <FAQ
            items={article.faq}
            title="Resource FAQs"
            subtitle="The FAQs stay visible and practical so the page answers real parent and student questions."
          />

          {relatedArticles.length ? (
            <section className="space-y-10">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Related Reads</p>
                <h2 className="mt-3 text-3xl font-bold text-primary md:text-4xl">Continue with the next most relevant guide</h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                  These linked resources keep the journey clean and connected to the right board, class, subject, school, and area context.
                </p>
              </div>
              <div className="grid gap-6 xl:grid-cols-3">
                {relatedArticles.map(({ article: relatedArticle, category: relatedCategory }) => (
                  <ResourceArticleCard key={relatedArticle.slug} article={relatedArticle} category={relatedCategory} />
                ))}
              </div>
            </section>
          ) : null}

          <ResourcesCtaBlock
            title="Want a clearer Gurgaon tutoring plan after reading?"
            description="Tell us the board, class, subject, school, and area, and we will help you move from research into the right premium one-to-one tutoring path."
          />
        </div>
      </div>
    </section>
  );
}
