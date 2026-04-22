import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, ShieldCheck } from "lucide-react";
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
import {
  getAllSchoolClassParams,
  getSchoolClassSupport,
  getSchoolConfig,
  getSchoolTutorProfiles,
} from "@/app/schools/_data/schools";

interface PageProps {
  params: Promise<{ schoolSlug: string; classLevel: string }>;
}

export async function generateStaticParams() {
  return getAllSchoolClassParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug, classLevel } = await params;
  const school = getSchoolConfig(schoolSlug);
  const classPage = getSchoolClassSupport(schoolSlug, classLevel);

  if (!school || !classPage) return constructMetadata({ title: "School Class Page Not Found", noIndex: true });

  return constructMetadata({
    title: `${classPage.label} for ${school.name} | BoardPeFocus`,
    description: `${classPage.description} ${classPage.focus}`,
    pathname: `/schools/${school.slug}/classes/${classPage.slug}`,
  });
}

export default async function SchoolClassPage({ params }: PageProps) {
  const { schoolSlug, classLevel } = await params;
  const school = getSchoolConfig(schoolSlug);
  const classPage = getSchoolClassSupport(schoolSlug, classLevel);
  if (!school || !classPage) notFound();
  const tutors = getSchoolTutorProfiles(school);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
    { name: school.name, url: absoluteUrl(`/schools/${school.slug}`) },
    { name: classPage.label, url: absoluteUrl(`/schools/${school.slug}/classes/${classPage.slug}`) },
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
              { label: classPage.label },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-muted/30 px-6 py-16 shadow-sm md:px-10 md:py-18">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative z-10 max-w-4xl">
              <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-2 text-primary">
                {school.shortLabel}
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold text-primary md:text-6xl">
                {classPage.label} for students studying in {school.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">{classPage.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={classPage.href}>
                  <Button className="rounded-xl px-6">Explore Class Hub</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-xl px-6">
                    Get Matched
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <SchoolsSection
              eyebrow="Class Stage Fit"
              title={`Why ${classPage.label.toLowerCase()} demand appears on this school page`}
            >
              <div className="grid gap-5 md:grid-cols-3">
                {[classPage.description, classPage.focus, school.overviewSummary].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Relevant Subjects"
              title={`${classPage.label} subject routes for ${school.name}`}
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {school.subjectSupport
                  .filter((subject) => subject.classFit.some((item) => item.toLowerCase().includes(classPage.label.toLowerCase()) || classPage.label.toLowerCase().includes(item.toLowerCase())))
                  .map((subject) => (
                    <Link
                      key={subject.slug}
                      href={`/schools/${school.slug}/subjects/${subject.slug}`}
                      className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-primary">{subject.label}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{subject.description}</p>
                    </Link>
                  ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Nearby Areas"
              title={`${classPage.label} support connected to nearby Gurgaon sectors and societies`}
            >
              <div className="grid gap-5 md:grid-cols-2">
                {school.areaSupport.map((area) => (
                  <div key={area.slug} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      <MapPin className="h-5 w-5 text-accent" />
                      <h3 className="text-2xl font-bold">{area.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {area.nearbySectors.map((sector) => (
                        <span
                          key={sector}
                          className="rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground"
                        >
                          {sector}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection eyebrow="Trust" title="What premium class-stage tutoring should still include here">
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

            <SchoolsSection eyebrow="Related Tutors" title="Tutor profiles relevant to this class-stage route">
              <SchoolTutorLinks tutors={tutors} compact viewAllHref="/search" />
            </SchoolsSection>

            <FAQ
              title={`${classPage.label} FAQs`}
              subtitle={`Visible answers for parents exploring ${classPage.label.toLowerCase()} support from ${school.name}.`}
              items={school.faq}
              columns={2}
            />

            <SchoolsRelatedLinks
              links={[
                {
                  title: `${school.name} overview`,
                  href: `/schools/${school.slug}`,
                  description: "Return to the full school page for curriculum, area, and tutor context.",
                },
                {
                  title: "Class Hub",
                  href: classPage.href,
                  description: `Open the main ${classPage.label.toLowerCase()} hub for broader class-level discovery.`,
                },
                {
                  title: "Boards Hub",
                  href: "/boards",
                  description: "Use the Boards hub to compare the curriculum path more clearly.",
                },
                {
                  title: "FAQ page",
                  href: `/schools/${school.slug}/faq`,
                  description: "Open the dedicated FAQ page for this school family.",
                },
              ]}
            />

            <SchoolsCtaBlock
              title={`Need a cleaner ${classPage.label.toLowerCase()} tutoring plan for ${school.name}?`}
              description="Tell us the school, board, subject, and Gurgaon area, and we will help you move into the right one-to-one tutor match."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
