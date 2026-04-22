import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, GraduationCap, MapPin, ShieldCheck } from "lucide-react";
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
  getAllSchoolSubjectParams,
  getSchoolConfig,
  getSchoolSubjectSupport,
  getSchoolTutorProfiles,
} from "@/app/schools/_data/schools";

interface PageProps {
  params: Promise<{ schoolSlug: string; subjectSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSchoolSubjectParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug, subjectSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  const subject = getSchoolSubjectSupport(schoolSlug, subjectSlug);

  if (!school || !subject) return constructMetadata({ title: "School Subject Page Not Found", noIndex: true });

  return constructMetadata({
    title: `${subject.label} for ${school.name} | BoardPeFocus`,
    description: `${subject.description} ${subject.schoolNeed}`,
    pathname: `/schools/${school.slug}/subjects/${subject.slug}`,
  });
}

export default async function SchoolSubjectPage({ params }: PageProps) {
  const { schoolSlug, subjectSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  const subject = getSchoolSubjectSupport(schoolSlug, subjectSlug);
  if (!school || !subject) notFound();

  const tutors = getSchoolTutorProfiles(school).filter((tutor) =>
    tutor.subjects.some((item) => subject.label.toLowerCase().includes(item.toLowerCase()) || item.toLowerCase().includes(subject.slug)),
  );
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
    { name: school.name, url: absoluteUrl(`/schools/${school.slug}`) },
    { name: subject.label, url: absoluteUrl(`/schools/${school.slug}/subjects/${subject.slug}`) },
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
              { label: subject.label },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-primary px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-18">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 max-w-4xl">
              <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                {school.shortLabel}
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                {subject.label} support for students studying in {school.name}
              </h1>
              <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">{subject.description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href={subject.href}>
                  <Button className="rounded-xl bg-white px-6 text-primary hover:bg-white/90">Explore Subject Page</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white">
                    Request Callback
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <SchoolsSection
              eyebrow="Why This Subject"
              title={`Why ${subject.label.toLowerCase()} demand often appears on this school page`}
              description="The subject page stays school-aware, class-aware, and commercially useful instead of becoming a thin keyword variation."
            >
              <div className="grid gap-5 md:grid-cols-3">
                {[subject.description, subject.schoolNeed, `Board fit: ${subject.boardFit.join(", ")}`].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Board and Class Fit"
              title="How this subject connects to the wider tutoring journey"
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <h2 className="text-2xl font-bold">Board relevance</h2>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {subject.boardFit.map((board) => (
                      <span
                        key={board}
                        className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-sm font-semibold text-primary"
                      >
                        {board}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    <h2 className="text-2xl font-bold">Class stage relevance</h2>
                  </div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {subject.classFit.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border/60 bg-muted/20 px-3 py-1.5 text-sm font-semibold text-muted-foreground"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Parent Questions"
              title="The questions usually sitting behind this subject enquiry"
            >
              <div className="grid gap-5 md:grid-cols-3">
                {school.parentQueries.map((query) => (
                  <div key={query} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
                    <p className="text-sm leading-7 text-foreground">{query}</p>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Nearby Areas"
              title="Nearby Gurgaon localities connected to this school and subject route"
            >
              <div className="grid gap-5 md:grid-cols-2">
                {school.areaSupport.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/schools/${school.slug}/areas/${area.slug}`}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <MapPin className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{area.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.description}</p>
                  </Link>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection eyebrow="Related Tutors" title="Tutor profiles relevant to this subject route">
              <SchoolTutorLinks tutors={tutors.length ? tutors : getSchoolTutorProfiles(school)} compact viewAllHref="/search" />
            </SchoolsSection>

            <SchoolsSection eyebrow="Trust" title="What premium one-to-one support should still include here">
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

            <FAQ
              title={`${subject.label} FAQs`}
              subtitle={`Visible answers for parents exploring ${subject.label.toLowerCase()} support from ${school.name}.`}
              items={school.faq}
              columns={2}
            />

            <SchoolsRelatedLinks
              links={[
                {
                  title: `${school.name} overview`,
                  href: `/schools/${school.slug}`,
                  description: "Move back to the school overview for broader board, class, and area context.",
                },
                {
                  title: "Class 10 Hub",
                  href: "/classes/class-10",
                  description: "Use the Class 10 hub where the current need is still early board-stage discovery.",
                },
                {
                  title: "Class 12 Hub",
                  href: "/classes/class-12",
                  description: "Use the Class 12 hub for senior subject and revision pathways.",
                },
                {
                  title: "Boards Hub",
                  href: "/boards",
                  description: "Return to the Boards hub for cleaner curriculum-wide discovery.",
                },
              ]}
            />

            <SchoolsCtaBlock
              title={`Need the right ${subject.label.toLowerCase()} tutor for ${school.name}?`}
              description="Tell us the school, board, class stage, subject, and Gurgaon area, and we will help you move toward the most relevant tutor match."
              compact
            />
          </div>
        </div>
      </section>
    </div>
  );
}
