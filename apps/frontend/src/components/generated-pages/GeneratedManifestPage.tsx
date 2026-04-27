import Link from "next/link";
import { CheckCircle2, ChevronRight, Compass, MapPin, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  buildManifestJsonLd,
  getManifestAudienceCards,
  getManifestBreadcrumbs,
  getManifestDescriptorItems,
  getManifestEyebrow,
  getManifestFaqs,
  getManifestFeatureCards,
  getManifestInternalLinks,
  getManifestLeadDefaults,
  getManifestPageTitle,
  getManifestRelatedLinks,
  getManifestRoutePath,
  getManifestSections,
  isEditorialManifestPage,
  ManifestPageRecord,
} from "@/lib/generated-pages";

export function GeneratedManifestPage({ record }: { record: ManifestPageRecord }) {
  const editorial = isEditorialManifestPage(record);
  const title = getManifestPageTitle(record);
  const eyebrow = getManifestEyebrow(record);
  const sections = getManifestSections(record);
  const descriptors = getManifestDescriptorItems(record);
  const featureCards = getManifestFeatureCards(record);
  const audienceCards = getManifestAudienceCards(record);
  const internalLinks = getManifestInternalLinks(record);
  const relatedLinks = getManifestRelatedLinks(record);
  const faqs = getManifestFaqs(record);
  const breadcrumbs = getManifestBreadcrumbs(record);
  const jsonLd = buildManifestJsonLd(record);
  const routePath = getManifestRoutePath(record);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={jsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="mb-8 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            {breadcrumbs.map((crumb, index) => (
              <div key={`${crumb.label}-${index}`} className="flex items-center gap-2">
                {crumb.href ? (
                  <Link href={crumb.href} className="transition-colors hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="font-medium text-primary">{crumb.label}</span>
                )}
                {index < breadcrumbs.length - 1 ? <ChevronRight className="h-4 w-4" /> : null}
              </div>
            ))}
          </div>

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  {eyebrow}
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{title}</h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">
                  {record.contentAngle ??
                    "This page is generated from the BoardPeFocus route manifest so it can slot cleanly into the existing site structure without visual drift."}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  {descriptors.slice(0, 4).map((item) => (
                    <span
                      key={item}
                      className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm font-semibold text-white"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                      Request Callback
                    </Button>
                  </Link>
                  <Link href="/search">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                    >
                      Browse Tutors
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
                {featureCards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{card.title}</p>
                    <p className="mt-3 text-sm leading-7 text-white/85">{card.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="grid gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-16">
              {editorial ? (
                <section className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Answer first</p>
                  <h2 className="mt-3 text-3xl font-bold text-primary">Short answer</h2>
                  <p className="mt-4 text-base leading-8 text-foreground">
                    {record.contentAngle ??
                      "This route is intentionally specific so it can answer the search cleanly, connect to the right internal pages, and preserve the current BoardPeFocus content system."}
                  </p>
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    {audienceCards.map((card) => (
                      <div key={card.title} className="rounded-[1.5rem] border border-primary/10 bg-primary/5 p-4">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" />
                          <div>
                            <p className="text-sm font-semibold text-primary">{card.title}</p>
                            <p className="mt-2 text-sm leading-7 text-foreground">{card.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              ) : null}

              {!editorial ? (
                <section className="grid gap-5 md:grid-cols-3">
                  {audienceCards.map((card) => (
                    <div key={card.title} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                      <p className="text-sm font-semibold text-primary">{card.title}</p>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
                    </div>
                  ))}
                </section>
              ) : null}

              {sections.map((section) => (
                <section key={section.title} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <h2 className="text-3xl font-bold text-primary">{section.title}</h2>
                  <div className="mt-5 space-y-4">
                    {section.paragraphs.map((paragraph) => (
                      <p key={paragraph} className="text-base leading-8 text-foreground/90">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                  {section.bullets.length ? (
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
                </section>
              ))}

              {internalLinks.length ? (
                <section className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <Compass className="h-5 w-5 text-accent" />
                    <h2 className="text-2xl font-bold">Manifest-linked next steps</h2>
                  </div>
                  <div className="mt-6 grid gap-5 md:grid-cols-2">
                    {internalLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                      >
                        <p className="text-lg font-semibold text-primary">{link.title}</p>
                        <p className="mt-3 text-sm leading-7 text-muted-foreground">{link.description}</p>
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}

              <FAQ
                items={faqs}
                title={editorial ? "Resource FAQs" : "Page FAQs"}
                subtitle="The FAQs stay visible and grounded in the route metadata instead of relying on hidden schema or fabricated claims."
                columns={2}
              />
            </div>

            <aside className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <LeadForm
                  title={`Request support for ${title}`}
                  subtitle="Share the board, class, subject, school, or location so the next recommendation feels more precise."
                  defaultValues={getManifestLeadDefaults(record)}
                />

                <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <MapPin className="h-5 w-5 text-accent" />
                    <h2 className="text-xl font-bold">Route snapshot</h2>
                  </div>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                    <p>Path: {routePath}</p>
                    {record.searchIntent ? <p>Intent: {record.searchIntent}</p> : null}
                    {record.wordCountTarget ? <p>Word target: {record.wordCountTarget}</p> : null}
                    {record.indexationAdvice ? <p>Indexation: {record.indexationAdvice}</p> : null}
                  </div>
                </div>

                {relatedLinks.length ? (
                  <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                    <h2 className="text-xl font-bold text-primary">Continue exploring</h2>
                    <div className="mt-4 space-y-3">
                      {relatedLinks.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="block rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-white"
                        >
                          {link.title}
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
