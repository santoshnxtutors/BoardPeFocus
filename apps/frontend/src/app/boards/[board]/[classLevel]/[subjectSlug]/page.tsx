import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, GraduationCap, MapPin, School } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { LeadForm } from "@/components/forms/LeadForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { BoardsBreadcrumbs } from "@/app/boards/_components/BoardsBreadcrumbs";
import { BoardsCtaBlock } from "@/app/boards/_components/BoardsCtaBlock";
import { BoardsRelatedLinks } from "@/app/boards/_components/BoardsRelatedLinks";
import { BoardsSection } from "@/app/boards/_components/BoardsSection";
import { BoardsTutorLinks } from "@/app/boards/_components/BoardsTutorLinks";
import {
  getAllSubjectParams,
  getAreaDetails,
  getBoardClassConfig,
  getBoardConfig,
  getBoardSubjectConfig,
  getBoardSubjectPath,
  getSchoolDetails,
  getSubjectTutors,
} from "@/app/boards/_data/boards";
import { getSchoolHubLink } from "@/app/schools/_data/linking";

interface PageProps {
  params: Promise<{ board: string; classLevel: string; subjectSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSubjectParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { board: boardSlug, classLevel, subjectSlug } = await params;
  const board = getBoardConfig(boardSlug);
  const classConfig = getBoardClassConfig(boardSlug, classLevel);
  const subject = getBoardSubjectConfig(boardSlug, classLevel, subjectSlug);

  if (!board || !classConfig || !subject) {
    return constructMetadata({ title: "Page Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `${subject.heroTitle} | BoardPeFocus`,
    description: `${subject.heroDescription} Explore school links, Gurgaon areas, related tutor pages, and premium one-to-one support.`,
    pathname: getBoardSubjectPath(board.slug, classConfig.slug, subject.slug),
  });
}

export default async function BoardSubjectPage({ params }: PageProps) {
  const { board: boardSlug, classLevel, subjectSlug } = await params;
  const board = getBoardConfig(boardSlug);
  const classConfig = getBoardClassConfig(boardSlug, classLevel);
  const subject = getBoardSubjectConfig(boardSlug, classLevel, subjectSlug);

  if (!board || !classConfig || !subject) notFound();

  const schools = getSchoolDetails(subject.relatedSchoolSlugs);
  const areas = getAreaDetails(subject.relatedAreaSlugs);
  const tutors = getSubjectTutors(board, subject);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Boards", url: absoluteUrl("/boards") },
    { name: board.name, url: absoluteUrl(`/boards/${board.slug}`) },
    { name: classConfig.label, url: absoluteUrl(`/boards/${board.slug}/${classConfig.slug}`) },
    { name: subject.shortLabel, url: absoluteUrl(getBoardSubjectPath(board.slug, classConfig.slug, subject.slug)) },
  ]);
  const faqJsonLd = generateFaqJsonLd(subject.faq);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <BoardsBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Boards", href: "/boards" },
              { label: board.name, href: `/boards/${board.slug}` },
              { label: classConfig.label, href: `/boards/${board.slug}/${classConfig.slug}` },
              { label: subject.shortLabel },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-primary px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-18">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 max-w-4xl">
              <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                {board.name} · {classConfig.label}
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{subject.heroTitle}</h1>
              <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">{subject.heroDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20with%20this%20board%20subject%20in%20Gurgaon." target="_blank">
                  <Button className="rounded-xl bg-white px-6 text-primary hover:bg-white/90">Talk on WhatsApp</Button>
                </Link>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white">
                    Request Callback
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="grid gap-14 py-24 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="space-y-24">
              <BoardsSection eyebrow="Why This Subject Feels Hard" title="The pressure points this page is built to solve">
                <div className="grid gap-5 md:grid-cols-3">
                  {subject.whyHard.map((item) => (
                    <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </BoardsSection>

              <BoardsSection eyebrow="Who It Is For" title="Who usually benefits from this kind of one-to-one support">
                <div className="grid gap-5 md:grid-cols-3">
                  {subject.forStudents.map((item) => (
                    <div key={item} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </BoardsSection>

              <BoardsSection eyebrow="Board-Specific Problems" title={`${board.name} issues parents usually want solved on this page`}>
                <div className="grid gap-5 md:grid-cols-3">
                  {subject.boardProblems.map((item) => (
                    <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </BoardsSection>

              <BoardsSection eyebrow="Tutoring Format" title="How the support is structured">
                <div className="grid gap-5 md:grid-cols-3">
                  {subject.tutoringFormat.map((item) => (
                    <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </BoardsSection>

              <div className="rounded-[2rem] border border-primary/10 bg-primary/5 p-8">
                <div className="flex items-center gap-3 text-primary">
                  <GraduationCap className="h-5 w-5 text-accent" />
                  <h2 className="text-2xl font-bold">Trust block</h2>
                </div>
                <div className="mt-6 grid gap-5 md:grid-cols-3">
                  {subject.trustPoints.map((item) => (
                    <div key={item} className="rounded-[1.5rem] border border-primary/10 bg-white p-5">
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              <BoardsCtaBlock
                title={`Want the right ${subject.shortLabel} tutor match without wasting time?`}
                description="Tell us the board, class, school, and Gurgaon area, and we will help you move to a cleaner subject-specific tutoring path."
                compact
              />

              <BoardsSection
                eyebrow="School, Area, and Tutor Links"
                title="This subject page stays connected to the wider Gurgaon discovery flow"
                description="That means cleaner internal linking into schools, areas, and tutor profiles instead of leaving the page isolated."
              >
                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      <School className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">Related school pages</h3>
                    </div>
                    <div className="mt-5 space-y-3">
                      {schools.map((school) => (
                        <Link key={school.slug} href={getSchoolHubLink(school.slug)} className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                          {school.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      <MapPin className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">Related Gurgaon areas</h3>
                    </div>
                    <div className="mt-5 space-y-3">
                      {areas.map((area) => (
                        <Link key={area.slug} href={`/gurgaon-area/${area.slug}`} className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                          {area.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>
              </BoardsSection>

              <BoardsTutorLinks
                tutors={tutors.map((tutor) => ({
                  id: tutor.id,
                  slug: tutor.slug,
                  name: tutor.name,
                  photoUrl: tutor.photoUrl,
                  rating: tutor.rating,
                  experienceYears: tutor.experienceYrs,
                  studentsTaught: tutor.studentsTaught,
                  boards: tutor.boards,
                  subjects: tutor.subjects,
                  about: tutor.about || tutor.tagline,
                  areas: tutor.locations,
                }))}
                compact
                viewAllHref={`/search?board=${board.slug === "ib" ? "ibdp" : board.slug}`}
              />

              <FAQ title={`${subject.shortLabel} FAQs`} subtitle="Visible answers for parents evaluating this subject pathway." items={subject.faq} columns={2} />

              <BoardsRelatedLinks
                links={[
                  {
                    title: `${board.name} ${classConfig.label}`,
                    href: `/boards/${board.slug}/${classConfig.slug}`,
                    description: "Move up one step to the class page for broader subject and revision context.",
                  },
                  {
                    title: `${board.name} board hub`,
                    href: `/boards/${board.slug}`,
                    description: "Return to the full board page for class, school, and area pathways.",
                  },
                  {
                    title: "Gurgaon Areas Hub",
                    href: "/gurgaon-area",
                    description: "Connect the subject journey with local corridor, sector, and society discovery.",
                  },
                  {
                    title: "Browse Tutors",
                    href: "/search",
                    description: "Continue from subject discovery into the full tutor search flow.",
                  },
                ]}
              />
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <LeadForm
                  title={`Request a ${subject.shortLabel} Tutor`}
                  subtitle={`Tell us the board, class, school, and Gurgaon area for a more relevant subject match.`}
                  defaultValues={{
                    board: board.name,
                    class: classConfig.label,
                    subject: subject.shortLabel,
                  }}
                />

                <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <h3 className="text-xl font-bold">Page summary</h3>
                  </div>
                  <div className="mt-5 space-y-3 text-sm leading-7 text-muted-foreground">
                    <p>Board: {board.name}</p>
                    <p>Class level: {classConfig.label}</p>
                    <p>Subject: {subject.shortLabel}</p>
                  </div>
                  <Link href="/contact" className="mt-6 inline-block">
                    <Button className="rounded-xl">Request Callback</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
