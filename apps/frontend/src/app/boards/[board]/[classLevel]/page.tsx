import Link from "next/link";
import { notFound } from "next/navigation";
import { MapPin, School } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { BoardsBreadcrumbs } from "@/app/boards/_components/BoardsBreadcrumbs";
import { BoardsCtaBlock } from "@/app/boards/_components/BoardsCtaBlock";
import { BoardsRelatedLinks } from "@/app/boards/_components/BoardsRelatedLinks";
import { BoardsSection } from "@/app/boards/_components/BoardsSection";
import {
  getAllClassParams,
  getAreaDetails,
  getBoardClassConfig,
  getBoardClassPath,
  getBoardConfig,
  getSchoolDetails,
  getBoardSubjectPath,
} from "@/app/boards/_data/boards";
import { getSchoolHubLink } from "@/app/schools/_data/linking";

interface PageProps {
  params: Promise<{ board: string; classLevel: string }>;
}

export async function generateStaticParams() {
  return getAllClassParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { board: boardSlug, classLevel } = await params;
  const board = getBoardConfig(boardSlug);
  const classConfig = getBoardClassConfig(boardSlug, classLevel);

  if (!board || !classConfig) return constructMetadata({ title: "Page Not Found", noIndex: true });

  return constructMetadata({
    title: `${board.name} ${classConfig.label} Home Tutors in Gurgaon | BoardPeFocus`,
    description: `${classConfig.heroDescription} Explore subjects, revision support, school relevance, and premium one-to-one tutoring in Gurgaon.`,
    pathname: getBoardClassPath(board.slug, classConfig.slug),
  });
}

export default async function BoardClassPage({ params }: PageProps) {
  const { board: boardSlug, classLevel } = await params;
  const board = getBoardConfig(boardSlug);
  const classConfig = getBoardClassConfig(boardSlug, classLevel);

  if (!board || !classConfig) notFound();

  const schools = getSchoolDetails(board.schoolReferences.map((school) => school.slug).slice(0, 3));
  const areas = getAreaDetails(board.areaReferences.map((area) => area.slug).slice(0, 3));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Boards", url: absoluteUrl("/boards") },
    { name: board.name, url: absoluteUrl(`/boards/${board.slug}`) },
    { name: classConfig.label, url: absoluteUrl(getBoardClassPath(board.slug, classConfig.slug)) },
  ]);
  const faqJsonLd = generateFaqJsonLd(classConfig.faq);

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
              { label: classConfig.label },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-muted/30 px-6 py-16 shadow-sm md:px-10 md:py-18">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative z-10 max-w-4xl">
              <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-2 text-primary">
                {board.name} · {classConfig.label}
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold text-primary md:text-6xl">{`${board.name} ${classConfig.label} Home Tutors in Gurgaon`}</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">{classConfig.heroDescription}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button className="rounded-xl px-6">Get Matched</Button>
                </Link>
                <Link href={`https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20${encodeURIComponent(`${board.name} ${classConfig.label}`)}%20support%20in%20Gurgaon.`} target="_blank">
                  <Button variant="outline" className="rounded-xl px-6">
                    Talk on WhatsApp
                  </Button>
                </Link>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <BoardsSection
              eyebrow="Student Pain Points"
              title={`${classConfig.label} pressure points parents usually want solved`}
            >
              <div className="grid gap-5 md:grid-cols-3">
                {classConfig.painPoints.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Subject Cards"
              title={`${classConfig.label} subject pathways`}
              description="Use these subject pages to move from the class view into a more commercially useful subject-specific page."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {classConfig.subjects.map((subject) => (
                  <Link
                    key={subject.slug}
                    href={getBoardSubjectPath(board.slug, classConfig.slug, subject.slug)}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{classConfig.label}</p>
                    <h3 className="mt-3 text-xl font-bold text-primary">{subject.shortLabel}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{subject.heroDescription}</p>
                  </Link>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Board Pattern"
              title={`${board.name} ${classConfig.label} exam context`}
            >
              <div className="grid gap-5 md:grid-cols-3">
                {classConfig.examContext.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Revision Support"
              title={`What premium ${classConfig.label} support should include`}
            >
              <div className="grid gap-5 md:grid-cols-3">
                {classConfig.revisionSupport.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection eyebrow="Sample Paper Help" title="Paper practice that feels disciplined, not noisy">
              <div className="grid gap-5 md:grid-cols-3">
                {classConfig.samplePaperHelp.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Relevant Schools & Areas"
              title="Keep the class page connected to real Gurgaon discovery paths"
              description="This keeps Class 10 / Class 12 pages from becoming isolated or thin."
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

            <FAQ title={`${board.name} ${classConfig.label} FAQs`} subtitle="Quick answers for parents exploring the right class-specific support path." items={classConfig.faq} columns={2} />

            <BoardsRelatedLinks
              links={[
                {
                  title: `${board.name} board hub`,
                  href: `/boards/${board.slug}`,
                  description: `Move up one level to compare classes, schools, areas, and subject routes within ${board.name}.`,
                },
                ...classConfig.subjects.slice(0, 2).map((subject) => ({
                  title: `${subject.shortLabel} subject page`,
                  href: getBoardSubjectPath(board.slug, classConfig.slug, subject.slug),
                  description: `Continue from ${classConfig.label} into the subject-specific money page for ${subject.shortLabel}.`,
                })),
                {
                  title: "Gurgaon Areas Hub",
                  href: "/gurgaon-area",
                  description: "Connect board and class discovery with local area relevance.",
                },
              ]}
            />

            <BoardsCtaBlock
              title={`Need ${board.name} ${classConfig.label} tutoring that feels more structured?`}
              description={`Tell us the board, school, subject, and Gurgaon area, and we will help you move into the most relevant ${classConfig.label} tutor match.`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
