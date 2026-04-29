import Link from "next/link";
import { notFound } from "next/navigation";
import { GraduationCap, MapPin, School } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { BoardsBreadcrumbs } from "@/app/boards/_components/BoardsBreadcrumbs";
import { BoardsCtaBlock } from "@/app/boards/_components/BoardsCtaBlock";
import { BoardsRelatedLinks } from "@/app/boards/_components/BoardsRelatedLinks";
import { BoardsSection } from "@/app/boards/_components/BoardsSection";
import { BoardsTutorLinks } from "@/app/boards/_components/BoardsTutorLinks";
import { fetchBackend } from "@/lib/backend-api";
import { getLiveFaqs } from "@/lib/live-content";
import {
  getAreaDetails,
  getBoardConfig,
  getBoardClassPath,
  getBoardPath,
  getBoardSubjectPath,
  getBoardTutors,
  getSchoolDetails,
  getAllBoardParams,
} from "@/app/boards/_data/boards";
import { getSchoolHubLink } from "@/app/schools/_data/linking";

interface PageProps {
  params: Promise<{ board: string }>;
}

interface LiveBoard {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  shortDescription?: string | null;
  longDescription?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
}

async function getLiveBoard(slug: string) {
  const response = await fetchBackend(`/content/boards/${encodeURIComponent(slug)}`);
  if (!response.ok) return null;
  return (await response.json()) as LiveBoard;
}

export async function generateStaticParams() {
  return getAllBoardParams();
}

export async function getBoardPageMetadata(boardSlug: string) {
  const liveBoard = await getLiveBoard(boardSlug);
  if (liveBoard) {
    return constructMetadata({
      title: liveBoard.seoTitle ?? `${liveBoard.name} Home Tutors in Gurgaon | BoardPeFocus`,
      description: liveBoard.metaDescription ?? liveBoard.shortDescription ?? liveBoard.description ?? undefined,
      pathname: getBoardPath(liveBoard.slug),
    });
  }

  const board = getBoardConfig(boardSlug);

  if (!board) {
    return constructMetadata({ title: "Board Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `${board.name} Home Tutors in Gurgaon | BoardPeFocus`,
    description: `${board.shortDescription} Explore class pathways, subject support, school relevance, area links, and premium one-to-one board tutoring in Gurgaon.`,
    pathname: getBoardPath(board.slug),
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { board: boardSlug } = await params;
  return getBoardPageMetadata(boardSlug);
}

export async function renderBoardPage(boardSlug: string) {
  const liveBoard = await getLiveBoard(boardSlug);
  const board = getBoardConfig(boardSlug);
  if (!board) {
    if (!liveBoard) notFound();
    return (
      <LiveEntityPage
        title={`${liveBoard.name} Home Tutors in Gurgaon`}
        eyebrow="Board"
        description={liveBoard.longDescription ?? liveBoard.description ?? liveBoard.shortDescription ?? ""}
        pathname={getBoardPath(liveBoard.slug)}
        parent={{ label: "Boards", href: "/boards" }}
      />
    );
  }

  const liveFaqs =
    liveBoard?.id ? await getLiveFaqs({ entityType: "BOARD", entityId: liveBoard.id }) : [];
  const faqItems = liveFaqs.length > 0 ? liveFaqs : board.faq;
  const heroDescription =
    liveBoard?.longDescription ??
    liveBoard?.description ??
    liveBoard?.shortDescription ??
    board.heroDescription;

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Boards", url: absoluteUrl("/boards") },
    { name: board.name, url: absoluteUrl(getBoardPath(board.slug)) },
  ]);
  const faqJsonLd = generateFaqJsonLd(faqItems);
  const boardTutors = getBoardTutors(board);
  const allSubjects = board.classes.flatMap((classConfig) =>
    classConfig.subjects.map((subject) => ({
      ...subject,
      classSlug: classConfig.slug,
      classLabel: classConfig.label,
    })),
  );
  const schools = getSchoolDetails(board.schoolReferences.map((school) => school.slug));
  const areas = getAreaDetails(board.areaReferences.map((area) => area.slug));

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
              { label: board.name },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-muted/30 px-6 py-16 shadow-sm md:px-10 md:py-18">
            <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-2 text-primary">
                  {board.name} Board Hub
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold text-primary md:text-6xl">{`${board.name} Home Tutors in Gurgaon`}</h1>
                <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">{heroDescription}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="https://wa.me/918796367754?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20with%20board-specific%20tutoring%20in%20Gurgaon." target="_blank" rel="noopener noreferrer">
                    <Button className="rounded-xl px-6">Talk on WhatsApp</Button>
                  </Link>
                  <Link href="/contact">
                    <Button variant="outline" className="rounded-xl px-6">
                      Request Callback
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Board selector guidance</p>
                <p className="mt-4 text-sm leading-7 text-muted-foreground">{board.selectorCopy}</p>
                <div className="mt-5 space-y-3">
                  {board.supportPoints.map((item) => (
                    <div key={item} className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm text-foreground">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <BoardsSection
              eyebrow="Classes Served"
              title={`Move from ${board.name} into the right class pathway`}
              description="These cards help parents move from board authority into the class-level page that actually matches the exam stage."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {board.classes.map((classConfig) => (
                  <Link
                    key={classConfig.slug}
                    href={getBoardClassPath(board.slug, classConfig.slug)}
                    className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <GraduationCap className="h-5 w-5 text-accent" />
                      <h2 className="text-2xl font-bold">{classConfig.label}</h2>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{classConfig.heroDescription}</p>
                  </Link>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Subjects Covered"
              title={`${board.name} subject pathways that feel commercially useful`}
              description="Strong board pages should help parents move naturally into the right subject page without dumping every possible option at once."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {allSubjects.map((subject) => (
                  <Link
                    key={`${subject.classSlug}-${subject.slug}`}
                    href={getBoardSubjectPath(board.slug, subject.classSlug, subject.slug)}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{subject.classLabel}</p>
                    <h3 className="mt-3 text-xl font-bold text-primary">{subject.shortLabel}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{subject.heroDescription}</p>
                  </Link>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Pain Points"
              title={`Why families usually seek ${board.name}-specific tutoring`}
            >
              <div className="grid gap-5 md:grid-cols-3">
                {board.painPoints.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="School-Aware Relevance"
              title={`${board.name} support for families studying in relevant Gurgaon schools`}
              description="The wording stays careful and parent-friendly: these are school-linked relevance points, not claims of affiliation."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {schools.map((school) => {
                  const note = board.schoolReferences.find((item) => item.slug === school.slug)?.note;

                  return (
                    <Link
                      key={school.slug}
                      href={getSchoolHubLink(school.slug)}
                      className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <School className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold">{school.name}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">{note}</p>
                    </Link>
                  );
                })}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Related Areas"
              title={`${board.name} support across key Gurgaon corridors`}
              description="Board pages should connect naturally into the Areas hub so parents can refine tutoring decisions by locality as well."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {areas.map((area) => {
                  const note = board.areaReferences.find((item) => item.slug === area.slug)?.note;

                  return (
                    <Link
                      key={area.slug}
                      href={`/gurgaon-area/${area.slug}`}
                      className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <MapPin className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold">{area.name}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">{note}</p>
                    </Link>
                  );
                })}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Tutor Relevance"
              title={`${board.name} tutor profiles worth exploring`}
            >
              <BoardsTutorLinks
                tutors={boardTutors.map((tutor) => ({
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
                title="Related Tutor Profiles"
                viewAllHref={`/search?board=${board.slug === "ib" ? "ibdp" : board.slug}`}
              />
            </BoardsSection>

            <FAQ title={`${board.name} FAQs`} subtitle={`Useful parent questions about ${board.name} tutoring in Gurgaon.`} items={faqItems} columns={2} />

            <BoardsRelatedLinks
              links={[
                {
                  title: "Boards Hub",
                  href: "/boards",
                  description: "Move back to the main boards hub to compare board pathways more clearly.",
                },
                ...board.classes.map((classConfig) => ({
                  title: `${board.name} ${classConfig.label}`,
                  href: getBoardClassPath(board.slug, classConfig.slug),
                  description: `Continue into the ${classConfig.label} page for class-specific subject and revision pathways.`,
                })),
                {
                  title: "Gurgaon Areas Hub",
                  href: "/gurgaon-area",
                  description: "Connect the board journey with local area and corridor discovery.",
                },
              ].slice(0, 4)}
            />

            <BoardsCtaBlock
              title={`Want the right ${board.name} tutoring path for your child?`}
              description={`Tell us the class, subject, school, and Gurgaon area, and we will help you move into a premium ${board.name}-specific tutor match.`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function LiveEntityPage({
  title,
  eyebrow,
  description,
  pathname,
  parent,
}: {
  title: string;
  eyebrow: string;
  description: string;
  pathname: string;
  parent: { label: string; href: string };
}) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: parent.label, url: absoluteUrl(parent.href) },
    { name: title, url: absoluteUrl(pathname) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="pt-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{eyebrow}</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl">{title}</h1>
            {description ? <p className="mt-6 text-lg leading-8 text-muted-foreground">{description}</p> : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={parent.href}>
                <Button variant="outline" className="rounded-xl px-6">Back to {parent.label}</Button>
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
