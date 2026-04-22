import Link from "next/link";
import { notFound } from "next/navigation";
import { ShieldCheck } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { SchoolsBreadcrumbs } from "@/app/schools/_components/SchoolsBreadcrumbs";
import { SchoolsCtaBlock } from "@/app/schools/_components/SchoolsCtaBlock";
import { SchoolsRelatedLinks } from "@/app/schools/_components/SchoolsRelatedLinks";
import { SchoolsSection } from "@/app/schools/_components/SchoolsSection";
import { SchoolTutorLinks } from "@/app/schools/_components/SchoolTutorLinks";
import { getAllSchoolAreaParams, getSchoolAreaSupport, getSchoolConfig, getSchoolTutorProfiles } from "@/app/schools/_data/schools";

interface PageProps {
  params: Promise<{ schoolSlug: string; areaSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSchoolAreaParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug, areaSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  const area = getSchoolAreaSupport(schoolSlug, areaSlug);

  if (!school || !area) return constructMetadata({ title: "School Area Page Not Found", noIndex: true });

  return constructMetadata({
    title: `${school.name} near ${area.name} | BoardPeFocus`,
    description: `${area.description} Explore nearby sectors, societies, and school-aware tutoring relevance.`,
    pathname: `/schools/${school.slug}/areas/${area.slug}`,
  });
}

export default async function SchoolAreaPage({ params }: PageProps) {
  const { schoolSlug, areaSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  const area = getSchoolAreaSupport(schoolSlug, areaSlug);
  if (!school || !area) notFound();
  const tutors = getSchoolTutorProfiles(school);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
    { name: school.name, url: absoluteUrl(`/schools/${school.slug}`) },
    { name: area.name, url: absoluteUrl(`/schools/${school.slug}/areas/${area.slug}`) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <SchoolsBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Schools", href: "/schools" },
              { label: school.name, href: `/schools/${school.slug}` },
              { label: area.name },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-muted/30 px-6 py-16 shadow-sm md:px-10 md:py-18">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative z-10 max-w-4xl">
              <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-2 text-primary">
                {school.shortLabel}
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold text-primary md:text-6xl">
                {school.name} support near {area.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">{area.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={area.href}>
                  <Button className="rounded-xl px-6">Explore Area Hub</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-xl px-6">
                    Request Callback
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <SchoolsSection
              eyebrow="Nearby Sectors"
              title={`Nearby sectors linked to ${school.name} and ${area.name}`}
            >
              <div className="flex flex-wrap gap-3">
                {area.nearbySectors.map((sector) => (
                  <span
                    key={sector}
                    className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary"
                  >
                    {sector}
                  </span>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Nearby Societies"
              title="Society cues that help keep this locality path practical"
            >
              <div className="flex flex-wrap gap-3">
                {area.nearbySocieties.map((society) => (
                  <span
                    key={society}
                    className="rounded-full border border-border/60 bg-muted/20 px-4 py-2 text-sm font-semibold text-muted-foreground"
                  >
                    {society}
                  </span>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Why Locality Still Matters"
              title="Why this area-school connection is commercially useful"
            >
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  area.description,
                  `Nearby sectors: ${area.nearbySectors.join(", ")}`,
                  `Nearby societies: ${area.nearbySocieties.join(", ")}`,
                ].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection eyebrow="Trust" title="What premium area-aware school support should include">
              <div className="grid gap-5 md:grid-cols-3">
                {school.trustPoints.map((point) => (
                  <div key={point} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection eyebrow="Related Tutors" title="Tutor profiles relevant to this locality route">
              <SchoolTutorLinks tutors={tutors} compact viewAllHref="/search" />
            </SchoolsSection>

            <FAQ
              title={`${area.name} FAQs`}
              subtitle={`Visible answers for parents exploring ${school.name} near ${area.name}.`}
              items={school.faq}
              columns={2}
            />

            <SchoolsRelatedLinks
              links={[
                {
                  title: `${school.name} overview`,
                  href: `/schools/${school.slug}`,
                  description: "Move back to the school overview for broader curriculum and subject context.",
                },
                {
                  title: "Area Hub",
                  href: area.href,
                  description: `Open the main ${area.name} page for nearby school and tutoring discovery.`,
                },
                {
                  title: "Boards Hub",
                  href: "/boards",
                  description: "Use the Boards hub to compare curriculum pathways more clearly.",
                },
                {
                  title: "Schools Hub",
                  href: "/schools",
                  description: "Return to the main Schools hub to compare school clusters and localities.",
                },
              ]}
            />

            <SchoolsCtaBlock
              title={`Need the right tutor near ${area.name} for ${school.name}?`}
              description="Tell us the school, board, subject, and Gurgaon area, and we will help you move toward a cleaner one-to-one tutoring match."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
