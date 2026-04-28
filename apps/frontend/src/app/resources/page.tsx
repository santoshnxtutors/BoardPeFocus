import Link from "next/link";
import { BookOpen, Compass, GraduationCap, MapPin, School, ShieldCheck, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { ResourceArticleCard } from "@/app/resources/_components/ResourceArticleCard";
import { ResourceCategoryCard } from "@/app/resources/_components/ResourceCategoryCard";
import { ResourcesBreadcrumbs } from "@/app/resources/_components/ResourcesBreadcrumbs";
import { ResourcesCtaBlock } from "@/app/resources/_components/ResourcesCtaBlock";
import { ResourcesRelatedLinks } from "@/app/resources/_components/ResourcesRelatedLinks";
import { ResourcesSection } from "@/app/resources/_components/ResourcesSection";
import {
  parentHelpLinks,
  resourceBoardsBrowse,
  resourceClassesBrowse,
  resourceEntryPoints,
  resourceSubjectsBrowse,
  resourcesHubFaqs,
  resourcesHubRelatedLinks,
  resourcesHubTrustPoints,
  resourceCategories,
} from "@/app/resources/_data/catalog";
import { getFeaturedArticlesWithCategories } from "@/app/resources/_data/articles";
import { getLiveContent } from "@/lib/live-content";

export const metadata = constructMetadata({
  title: "Resources Hub | Board Exam Guides and Revision Support in Gurgaon | BoardPeFocus",
  description:
    "Explore premium board-exam resources, revision guides, parent FAQs, and study strategy pages for Gurgaon students across boards, classes, subjects, schools, and areas.",
  pathname: "/resources",
});

const featuredResources = getFeaturedArticlesWithCategories();

interface LiveResource {
  id: string;
  slug: string;
  title: string;
  category?: string | null;
  summary?: string | null;
}

function toRouteSlug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default async function ResourcesHubPage() {
  const liveResources = await getLiveContent<LiveResource>("/content/resources");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Resources", url: absoluteUrl("/resources") },
  ]);
  const faqJsonLd = generateFaqJsonLd(resourcesHubFaqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ResourcesBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Resources" }]} />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <FadeIn direction="up" className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  Gurgaon / Gurugram only
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Board exam resources, revision guides, and expert study support for Gurgaon students
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                  The Resources hub is built to support premium board-exam tutoring journeys with stronger board, class, subject, school, and Gurgaon-area context rather than generic blog clutter.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/resources/board-guides">
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                      Explore Board Guides
                    </Button>
                  </Link>
                  <Link href="https://wa.me/918796367754?text=Hi%20BoardPeFocus%2C%20I%20want%20help%20after%20reading%20your%20resources." target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                    >
                      Talk on WhatsApp
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: "Positioning", value: "Premium, board-focused authority content" },
                  { label: "Use case", value: "Research → decision → tutoring path" },
                  { label: "Journey", value: "Resource → Board / Class / Subject / School / Area" },
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
              eyebrow="Resource Categories"
              title="Choose the content lane that matches the family’s actual question"
              description="These categories are built for commercial usefulness: clear enough for parents, strong enough for board-specific authority, and easy to connect back into live service pages."
            >
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {resourceCategories.map((category) => (
                  <ResourceCategoryCard key={category.slug} category={category} />
                ))}
              </div>
            </ResourcesSection>

            <ResourcesSection
              eyebrow="Featured Guides"
              title="Start with the highest-priority resources"
              description="This featured set covers the most commercially important board, class, subject, parent, and Gurgaon-locality questions first."
            >
              {liveResources.length > 0 ? (
                <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {liveResources.slice(0, 9).map((resource) => (
                    <Link
                      key={resource.id}
                      href={`/resources/${toRouteSlug(resource.category ?? "guides")}/${resource.slug}`}
                      className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">
                        {resource.category ?? "Resource"}
                      </p>
                      <h3 className="mt-3 text-xl font-bold text-primary">{resource.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {resource.summary ?? "Read this BoardPeFocus resource guide."}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="grid gap-6 xl:grid-cols-3">
                {featuredResources.slice(0, 9).map(({ article, category }) => (
                  <ResourceArticleCard key={article.slug} article={article} category={category} />
                ))}
              </div>
            </ResourcesSection>

            <ResourcesSection
              eyebrow="Browse Pathways"
              title="Browse by board, class, or subject"
              description="These pathways keep the resource center tied to the decision layers already established elsewhere on the site."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {[
                  {
                    title: "Browse by board",
                    description: "Move into CBSE, ICSE, ISC, IGCSE, and IB pages when the main decision is curriculum-specific.",
                    links: resourceBoardsBrowse,
                    icon: <BookOpen className="h-5 w-5 text-accent" />,
                  },
                  {
                    title: "Browse by class",
                    description: "Use Class 10 and Class 12 hubs when the exam-stage decision matters most.",
                    links: resourceClassesBrowse,
                    icon: <GraduationCap className="h-5 w-5 text-accent" />,
                  },
                  {
                    title: "Browse by subject",
                    description: "Move directly into high-intent subject pages if the academic bottleneck is already obvious.",
                    links: resourceSubjectsBrowse,
                    icon: <Compass className="h-5 w-5 text-accent" />,
                  },
                ].map((group) => (
                  <div key={group.title} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      {group.icon}
                      <h3 className="text-2xl font-bold">{group.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {group.links.map((item) => (
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
                ))}
              </div>
            </ResourcesSection>

            <ResourcesSection
              eyebrow="School & Locality Relevance"
              title="School-aware and area-aware entry points that stay commercially useful"
              description="This module links the resource center back into school pages, area hubs, and Gurgaon-specific support routes instead of letting resources become orphaned."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {resourceEntryPoints.map((item, index) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      {index % 2 === 0 ? <School className="h-5 w-5 text-accent" /> : <MapPin className="h-5 w-5 text-accent" />}
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </ResourcesSection>

            <ResourcesSection
              eyebrow="Parent Help"
              title="Start with the questions parents ask most often"
              description="These parent-first pages answer timing, frequency, and study-phase questions without burying the answer in filler content."
            >
              <div className="grid gap-5 lg:grid-cols-3">
                {parentHelpLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </ResourcesSection>

            <ResourcesSection
              eyebrow="Trust & Authority"
              title="Why this resource center exists alongside the commercial pages"
              description="The purpose here is to build useful authority and guide parents and students into the right next page — not to create thin content that feels separate from the actual tutoring system."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {resourcesHubTrustPoints.map((point) => (
                  <div key={point} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ResourcesSection>

            <FAQ
              items={resourcesHubFaqs}
              title="Resources FAQs"
              subtitle="The resource center should answer the practical parent questions before they turn into uncertainty."
            />

            <ResourcesRelatedLinks links={resourcesHubRelatedLinks} />

            <ResourcesCtaBlock
              title="Ready to turn research into the right tutoring path?"
              description="Tell us the board, class, subject, school, and Gurgaon area, and we’ll help you move from resources into a premium one-to-one support plan."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
