import { notFound } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { ResourceArticleCard } from "@/app/resources/_components/ResourceArticleCard";
import { ResourcesBreadcrumbs } from "@/app/resources/_components/ResourcesBreadcrumbs";
import { ResourcesCtaBlock } from "@/app/resources/_components/ResourcesCtaBlock";
import { ResourcesRelatedLinks } from "@/app/resources/_components/ResourcesRelatedLinks";
import { ResourcesSection } from "@/app/resources/_components/ResourcesSection";
import {
  getAllResourceCategoryParams,
  getResourceCategory,
  resourceBoardsBrowse,
  resourceClassesBrowse,
  resourcesHubRelatedLinks,
} from "@/app/resources/_data/catalog";
import { getResourceArticlesByCategory, getResourceCategoryFromArticle } from "@/app/resources/_data/articles";

export function generateStaticParams() {
  return getAllResourceCategoryParams();
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getResourceCategory(params.category);

  if (!category) {
    return constructMetadata({ title: "Resources | BoardPeFocus", noIndex: true });
  }

  return constructMetadata({
    title: `${category.title} | Resources Hub | BoardPeFocus`,
    description: category.heroDescription,
    pathname: `/resources/${category.slug}`,
  });
}

export default function ResourceCategoryPage({ params }: { params: { category: string } }) {
  const category = getResourceCategory(params.category);

  if (!category) {
    notFound();
  }

  const articles = getResourceArticlesByCategory(category.slug);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Resources", url: absoluteUrl("/resources") },
    { name: category.title, url: absoluteUrl(`/resources/${category.slug}`) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ResourcesBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Resources", href: "/resources" },
              { label: category.title },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <FadeIn direction="up" className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  {category.title}
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{category.heroTitle}</h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">{category.heroDescription}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/resources">
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                      Back to Resources Hub
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                    >
                      Talk to BoardPeFocus
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: "Audience", value: category.audience },
                  { label: "Articles", value: `${articles.length} live guides` },
                  { label: "Purpose", value: "Informational authority with clean next-step links" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{item.label}</p>
                    <p className="mt-3 text-base font-semibold leading-7 text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <ResourcesSection
              eyebrow="Category Guides"
              title={`Explore ${category.title.toLowerCase()}`}
              description="Each guide in this category is written to answer the search intent quickly and then route the user into the most relevant next commercial or support page."
            >
              <div className="grid gap-6 xl:grid-cols-3">
                {articles.map((article) => (
                  <ResourceArticleCard key={article.slug} article={article} category={getResourceCategoryFromArticle(article)} />
                ))}
              </div>
            </ResourcesSection>

            <ResourcesSection
              eyebrow="Connected Hubs"
              title="Keep this category connected to live decision pages"
              description="Resource categories work best when they stay tightly linked to the broader hub system already in place."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-bold text-primary">Browse by board</h2>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {resourceBoardsBrowse.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <h2 className="text-2xl font-bold text-primary">Browse by class</h2>
                  <div className="mt-5 flex flex-wrap gap-3">
                    {resourceClassesBrowse.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </ResourcesSection>

            <ResourcesRelatedLinks links={resourcesHubRelatedLinks.slice(0, 4)} />

            <ResourcesCtaBlock
              title={`Want help after reading these ${category.title.toLowerCase()}?`}
              description="We can help you move from the right resource article into the right board, class, subject, school, area, and tutor path in Gurgaon."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

