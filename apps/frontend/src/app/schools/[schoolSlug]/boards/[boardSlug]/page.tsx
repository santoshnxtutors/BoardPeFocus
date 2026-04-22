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
  getAllSchoolBoardParams,
  getSchoolBoardSupport,
  getSchoolConfig,
  getSchoolTutorProfiles,
} from "@/app/schools/_data/schools";

interface PageProps {
  params: Promise<{ schoolSlug: string; boardSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSchoolBoardParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug, boardSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  const board = getSchoolBoardSupport(schoolSlug, boardSlug);

  if (!school || !board) return constructMetadata({ title: "School Board Page Not Found", noIndex: true });

  return constructMetadata({
    title: `${board.label} for ${school.name} | BoardPeFocus`,
    description: `${board.description} ${board.schoolFit}`,
    pathname: `/schools/${school.slug}/boards/${board.slug}`,
  });
}

export default async function SchoolBoardPage({ params }: PageProps) {
  const { schoolSlug, boardSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  const board = getSchoolBoardSupport(schoolSlug, boardSlug);
  if (!school || !board) notFound();

  const tutors = getSchoolTutorProfiles(school);
  const relevantSubjects = school.subjectSupport.filter((subject) =>
    subject.boardFit.some((item) => item.toLowerCase().includes(board.label.split(" ")[0].toLowerCase())),
  );
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
    { name: school.name, url: absoluteUrl(`/schools/${school.slug}`) },
    { name: board.label, url: absoluteUrl(`/schools/${school.slug}/boards/${board.slug}`) },
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
              { label: board.label },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-muted/30 px-6 py-16 shadow-sm md:px-10 md:py-18">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-2 text-primary">
                  {school.shortLabel}
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold text-primary md:text-6xl">
                  {board.label} for students studying in {school.name}
                </h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">{board.description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href={board.href}>
                    <Button className="rounded-xl px-6">Explore Board Hub</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="rounded-xl px-6">
                      Request Callback
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">School fit</p>
                <div className="mt-5 grid gap-4">
                  <div className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm leading-7 text-foreground">
                    {board.schoolFit}
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-white p-4 text-sm leading-7 text-muted-foreground">
                    Key subjects: {board.keySubjects.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <SchoolsSection
              eyebrow="Curriculum Fit"
              title={`Why ${board.label.toLowerCase()} tutoring is relevant for ${school.name}`}
              description="This block keeps the messaging safe, useful, and school-aware instead of sounding like generic curriculum text."
            >
              <div className="grid gap-5 md:grid-cols-3">
                {[board.description, board.schoolFit, school.overviewSummary].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Subject Routes"
              title={`${board.label} subject pathways for this school`}
              description="These subject pages create the most useful next step once the school and curriculum path are clear."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {relevantSubjects.map((subject) => (
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
              eyebrow="Common Parent Queries"
              title="The questions usually driving this school and curriculum combination"
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
              title={`${board.label} support connected to nearby Gurgaon localities`}
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

            <SchoolsSection eyebrow="Related Tutors" title="Tutor profiles worth exploring on this route">
              <SchoolTutorLinks tutors={tutors} compact viewAllHref="/search" />
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Trust and Process"
              title="What parents should expect from this curriculum path"
            >
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
              title={`${board.label} FAQs`}
              subtitle={`Visible answers for parents exploring ${board.label.toLowerCase()} support from ${school.name}.`}
              items={school.faq}
              columns={2}
            />

            <SchoolsRelatedLinks
              links={[
                {
                  title: `${school.name} overview`,
                  href: `/schools/${school.slug}`,
                  description: "Move back to the school overview page for broader curriculum, area, and tutor context.",
                },
                {
                  title: "Boards Hub",
                  href: board.href,
                  description: `Open the main ${board.label.toLowerCase()} hub for broader board-specific discovery.`,
                },
                {
                  title: "Class 10 Hub",
                  href: "/classes/class-10",
                  description: "Use the Class 10 hub if the current need is still foundation-board discovery.",
                },
                {
                  title: "Class 12 Hub",
                  href: "/classes/class-12",
                  description: "Use the Class 12 hub for senior-board subject and revision pathways.",
                },
              ]}
            />

            <SchoolsCtaBlock
              title={`Need the right ${board.label.toLowerCase()} tutor for ${school.name}?`}
              description="Tell us the school, board, class stage, subject, and Gurgaon area, and we will help you move into a more relevant tutor match."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
