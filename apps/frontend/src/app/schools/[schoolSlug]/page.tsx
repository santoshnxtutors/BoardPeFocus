import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, MapPin, ShieldCheck } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { SchoolsBreadcrumbs } from "@/app/schools/_components/SchoolsBreadcrumbs";
import { SchoolsCtaBlock } from "@/app/schools/_components/SchoolsCtaBlock";
import { SchoolsRelatedLinks } from "@/app/schools/_components/SchoolsRelatedLinks";
import { SchoolsSection } from "@/app/schools/_components/SchoolsSection";
import { SchoolTutorLinks } from "@/app/schools/_components/SchoolTutorLinks";
import { getSchoolConfig, getAllSchoolParams, getSchoolTutorProfiles } from "@/app/schools/_data/schools";
import { fetchBackend } from "@/lib/backend-api";
import { getLiveFaqs } from "@/lib/live-content";

interface PageProps {
  params: Promise<{ schoolSlug: string }>;
}

interface LiveSchool {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  safeSupportWording?: string | null;
  locality?: string | null;
  curriculumMix?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
}

async function getLiveSchool(slug: string) {
  const response = await fetchBackend(`/content/schools/${encodeURIComponent(slug)}`);
  if (!response.ok) return null;
  return (await response.json()) as LiveSchool;
}

export async function generateStaticParams() {
  return getAllSchoolParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug } = await params;
  const liveSchool = await getLiveSchool(schoolSlug);
  if (liveSchool) {
    return constructMetadata({
      title: liveSchool.seoTitle ?? `${liveSchool.name} Home Tutors in Gurgaon | BoardPeFocus`,
      description: liveSchool.metaDescription ?? liveSchool.safeSupportWording ?? liveSchool.description ?? undefined,
      pathname: `/schools/${liveSchool.slug}`,
    });
  }

  const school = getSchoolConfig(schoolSlug);

  if (!school) {
    return constructMetadata({ title: "School Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `${school.name} Home Tutors in Gurgaon | BoardPeFocus`,
    description: school.heroDescription,
    pathname: `/schools/${school.slug}`,
  });
}

export default async function SchoolOverviewPage({ params }: PageProps) {
  const { schoolSlug } = await params;
  const liveSchool = await getLiveSchool(schoolSlug);
  const school = getSchoolConfig(schoolSlug);
  if (!school) {
    if (!liveSchool) notFound();
    return <LiveSchoolPage school={liveSchool} />;
  }

  const liveFaqs =
    liveSchool?.id ? await getLiveFaqs({ entityType: "SCHOOL", entityId: liveSchool.id }) : [];
  const faqItems = liveFaqs.length > 0 ? liveFaqs : school.faq;
  const heroDescription =
    liveSchool?.safeSupportWording ?? liveSchool?.description ?? school.heroDescription;
  const tutors = getSchoolTutorProfiles(school);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
    { name: school.name, url: absoluteUrl(`/schools/${school.slug}`) },
  ]);
  const faqJsonLd = generateFaqJsonLd(faqItems);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <SchoolsBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Schools", href: "/schools" },
              { label: school.name },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  {school.shortLabel}
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Home tutors for students studying in {school.name}
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">{heroDescription}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20with%20this%20school-aware%20tutoring%20path%20in%20Gurgaon." target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                      Talk on WhatsApp
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                    >
                      Request Callback
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">School-aware positioning</p>
                <div className="mt-5 space-y-3">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white/85">
                    {school.overviewSummary}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white/85">
                    Curricula: {school.curricula.join(", ")}
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white/85">
                    Locality cue: {school.localityCue}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <SchoolsSection
              eyebrow="School-Sensitive Positioning"
              title={`Why tutoring demand from ${school.name} is usually curriculum-specific`}
              description="The wording stays careful and useful: support for families studying in this school, without implying official endorsement or affiliation."
            >
              <div className="grid gap-5 md:grid-cols-3">
                {school.positioningPoints.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Board and Curriculum Support"
              title={`${school.name} board pathways`}
              description="Use these board routes to move cleanly from the school overview into the right curriculum-specific support page."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {school.boardSupport.map((board) => (
                  <Link
                    key={board.slug}
                    href={`/schools/${school.slug}/boards/${board.slug}`}
                    className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <BookOpen className="h-5 w-5 text-accent" />
                      <h2 className="text-2xl font-bold">{board.label}</h2>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{board.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {board.keySubjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Subject Support"
              title={`Subject pages commonly requested by parents from ${school.name}`}
              description="This section routes directly into the most commercially useful subject pages without turning the school page into a directory wall."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {school.subjectSupport.map((subject) => (
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
              title="What parents usually want solved on this school page"
              description="This keeps the page commercially useful by surfacing the real school-aware concerns behind tutoring enquiries."
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
              eyebrow="Nearby Sectors and Societies"
              title={`${school.name} connected to nearby Gurgaon localities`}
              description="This is mandatory in the school journey because locality still shapes tutor access, schedule fit, and family convenience."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {school.areaSupport.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/schools/${school.slug}/areas/${area.slug}`}
                    className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
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
                  </Link>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection eyebrow="Related Tutors" title="Tutor profiles relevant to this school context">
              <SchoolTutorLinks tutors={tutors} viewAllHref="/search" />
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Trust and Process"
              title="What premium school-aware support should include"
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
              title={`${school.name} FAQs`}
              subtitle="Visible answers for parents exploring school-aware tutoring in Gurgaon."
              items={faqItems}
              columns={2}
            />

            <SchoolsRelatedLinks
              links={[
                {
                  title: "Schools Hub",
                  href: "/schools",
                  description: "Move back to the main Schools hub to compare major school clusters more clearly.",
                },
                ...school.boardSupport.slice(0, 2).map((board) => ({
                  title: board.label,
                  href: `/schools/${school.slug}/boards/${board.slug}`,
                  description: `Continue into the ${board.label.toLowerCase()} page for more focused curriculum support.`,
                })),
                {
                  title: "FAQ page",
                  href: `/schools/${school.slug}/faq`,
                  description: "Open the dedicated FAQ page for this school route and related parent questions.",
                },
              ]}
            />

            <SchoolsCtaBlock
              title={`Need the right tutoring path for ${school.name}?`}
              description={`Tell us the board, class, subject, school, and Gurgaon area, and we will help you move into the most relevant one-to-one tutor match.`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function LiveSchoolPage({ school }: { school: LiveSchool }) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
    { name: school.name, url: absoluteUrl(`/schools/${school.slug}`) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="pt-32">
        <div className="container mx-auto max-w-4xl px-4">
          <SchoolsBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Schools", href: "/schools" },
              { label: school.name },
            ]}
          />
          <div className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">
              {school.curriculumMix ?? school.locality ?? "School"}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
              Home tutors for students studying in {school.name}
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              {school.safeSupportWording ?? school.description ?? "Explore school-aware tutoring support for this Gurgaon school."}
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/schools">
                <Button variant="outline" className="rounded-xl px-6">Back to Schools</Button>
              </Link>
              <Link href="/contact">
                <Button className="rounded-xl px-6">Request Callback</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
