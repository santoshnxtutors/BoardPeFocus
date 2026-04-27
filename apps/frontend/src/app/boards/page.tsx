import Link from "next/link";
import { BookOpen, GraduationCap, MapPin, School, ShieldCheck, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { BoardCard } from "@/app/boards/_components/BoardCard";
import { BoardsBreadcrumbs } from "@/app/boards/_components/BoardsBreadcrumbs";
import { BoardsCtaBlock } from "@/app/boards/_components/BoardsCtaBlock";
import { BoardsRelatedLinks } from "@/app/boards/_components/BoardsRelatedLinks";
import { BoardsSection } from "@/app/boards/_components/BoardsSection";
import {
  boardHubConfigs,
  boardsHubFaqs,
  boardsHubRelatedPages,
  getAreaDetails,
  getBoardClassPath,
  getBoardPath,
  getBoardSubjectCards,
} from "@/app/boards/_data/boards";
import { getClassHubPath } from "@/app/classes/_data/classes";
import { getSchoolHubLink } from "@/app/schools/_data/linking";
import { mockSchools } from "@/data/mock";
import { getLiveContent } from "@/lib/live-content";

export const metadata = constructMetadata({
  title: "Boards Hub | Premium Board Exam Home Tutors in Gurgaon | BoardPeFocus",
  description:
    "Explore premium board-exam home tutors in Gurgaon across CBSE, ICSE, ISC, IGCSE, and IB. Move cleanly from board to class, subject, schools, areas, and the right tutor match.",
  pathname: "/boards",
});

const classPathways = [
  {
    title: "Class 10 Pathways",
    description:
      "Useful for parents who want to start at the class level and then choose the right CBSE, ICSE, or IGCSE route.",
    links: [
      { label: "Explore Class 10 Hub", href: getClassHubPath("class-10") },
      { label: "CBSE Class 10", href: getBoardClassPath("cbse", "class-10") },
      { label: "ICSE Class 10", href: getBoardClassPath("icse", "class-10") },
    ],
  },
  {
    title: "Class 12 Pathways",
    description:
      "Built for premium Gurgaon families who want a clearer Class 12 path before moving into subject-expert board pages.",
    links: [
      { label: "Explore Class 12 Hub", href: getClassHubPath("class-12") },
      { label: "CBSE Class 12", href: getBoardClassPath("cbse", "class-12") },
      { label: "ISC Class 12", href: getBoardClassPath("isc", "class-12") },
    ],
  },
];

const schoolAwareGroups = [
  {
    title: "CBSE families commonly request support from",
    schoolSlugs: ["the-heritage-school", "shiv-nadar-school", "dps-sector-45", "amity-international-sector-46"],
  },
  {
    title: "ICSE / ISC support is often relevant for families from",
    schoolSlugs: ["scottish-high-international-school", "dps-sushant-lok", "lancers-international"],
  },
  {
    title: "IB / IGCSE support is commonly requested by parents from",
    schoolSlugs: ["pathways-world-school", "scottish-high-international-school", "lancers-international", "shiv-nadar-school"],
  },
];

const areaLinks = getAreaDetails([
  "golf-course-road",
  "golf-course-extension-road",
  "dlf-phases",
  "sohna-road",
  "south-city-sushant-lok",
  "palam-vihar",
  "dwarka-expressway",
  "new-gurgaon",
]);

interface LiveBoard {
  id: string;
  slug: string;
  name: string;
  shortDescription?: string | null;
  description?: string | null;
}

export default async function BoardsHubPage() {
  const liveBoards = await getLiveContent<LiveBoard>("/content/boards");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Boards", url: absoluteUrl("/boards") },
  ]);
  const faqJsonLd = generateFaqJsonLd(boardsHubFaqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <BoardsBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Boards" }]} />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <FadeIn direction="up" className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  Gurgaon / Gurugram only
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Board Exam Home Tutors in Gurgaon across CBSE, ICSE, ISC, IGCSE, and IB
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                  Use the Boards hub to move cleanly from board to class, subject, school, area, and the right premium one-to-one tutoring path for your child.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20choosing%20the%20right%20board-specific%20tutor%20in%20Gurgaon." target="_blank" rel="noopener noreferrer">
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
                      Get Matched
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: "Positioning", value: "Premium one-to-one board support" },
                  { label: "Focus", value: "Class 10 and Class 12 families" },
                  { label: "Journey", value: "Boards → Class → Subject → Area / School" },
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
            <BoardsSection
              eyebrow="Boards Overview"
              title="Choose the board path that fits your child's school and exam stage"
              description="Each board card is designed to feel useful in 10–20 seconds, not like a thin category list."
            >
              {liveBoards.length > 0 ? (
                <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {liveBoards.map((board) => (
                    <Link
                      key={board.id}
                      href={getBoardPath(board.slug)}
                      className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-primary">{board.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {board.shortDescription ?? board.description ?? `Explore ${board.name} board support in Gurgaon.`}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {boardHubConfigs.map((board) => (
                  <BoardCard key={board.slug} board={board} />
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Board Selector"
              title="A cleaner parent journey: choose board, then class, then subject"
              description="This block keeps the page highly usable for parents who want the right board pathway without sorting through unnecessary academic clutter."
            >
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    icon: <BookOpen className="h-6 w-6 text-accent" />,
                    title: "Step 1: Pick the board",
                    description: "Start with the board your child studies in so the tutoring language and subject flow stay relevant from the beginning.",
                  },
                  {
                    icon: <GraduationCap className="h-6 w-6 text-accent" />,
                    title: "Step 2: Move into class level",
                    description: "Use Class 10 or Class 12 pathways to narrow the journey into a more practical, exam-stage-specific page.",
                  },
                  {
                    icon: <MapPin className="h-6 w-6 text-accent" />,
                    title: "Step 3: Add school or area context",
                    description: "Connect the right board and subject to Gurgaon school corridors, locality pages, and the final tutor match.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      {item.icon}
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Class Pathways"
              title="Board-to-class routes that feel intentional, not random"
              description="Class pathways sit after board selection so parents can move naturally into the most commercially important decision stage."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {classPathways.map((pathway) => (
                  <div key={pathway.title} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                    <h3 className="text-2xl font-bold text-primary">{pathway.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{pathway.description}</p>
                    <div className="mt-5 flex flex-wrap gap-3">
                      {pathway.links.map((link) => (
                        <Link
                          key={link.href}
                          href={link.href}
                          className="rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
                        >
                          {link.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Subject Clusters"
              title="High-priority subject pathways for board-focused tutoring"
              description="These subject links are arranged as commercial discovery paths, not as a crowded subject directory."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {getBoardSubjectCards().map((subject) => (
                  <Link
                    key={subject.href}
                    href={subject.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-primary">{subject.label}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Board-focused subject support with a clean path into class pages, relevant schools, and Gurgaon areas.
                    </p>
                  </Link>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Board-Specific Support"
              title="Why board-focused tutoring feels different from generic tutoring"
              description="Keep the message commercial, useful, and parent-friendly: this is about structure, pace, and confidence — not noise."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[
                  "Syllabus control that stays aligned to the student's real school pace.",
                  "Structured revision blocks for pre-boards and the final exam window.",
                  "Board pattern familiarity and better answer-writing discipline.",
                  "School-aware pacing that respects workload and premium family schedules.",
                  "Clearer subject confidence across Class 10 and Class 12 pressure points.",
                  "One-to-one home tutoring that keeps feedback direct and calm.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="School Relevance"
              title="School-aware board support for Gurgaon families"
              description="The wording stays safe and useful: support for families studying in these schools and corridors, without implying any affiliation."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {schoolAwareGroups.map((group) => (
                  <div key={group.title} className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      <School className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{group.title}</h3>
                    </div>
                    <div className="mt-5 space-y-3">
                      {group.schoolSlugs.map((slug) => {
                        const school = mockSchools.find((item) => item.slug === slug);
                        if (!school) return null;

                        return (
                          <Link key={slug} href={getSchoolHubLink(slug)} className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary">
                            {school.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Boards by Gurgaon Area"
              title="Popular Gurgaon areas for board support"
              description="This section cross-links the Boards hub with the Areas hub so the site stays disciplined and crawlable."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {areaLinks.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/gurgaon-area/${area.slug}`}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-primary">{area.name}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </BoardsSection>

            <BoardsSection
              eyebrow="Trust & Process"
              title="What premium board support should feel like"
              description="No fake stats, no inflated claims — just a clearer explanation of why parents choose this kind of support."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  "Board-specialized tutors rather than generic tuition matching.",
                  "One-to-one sessions designed for serious Class 10 and Class 12 prep.",
                  "Subject expertise combined with school-aware and locality-aware matching.",
                  "A calmer matching process through WhatsApp, callback, or direct enquiry.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </BoardsSection>

            <FAQ
              title="Boards FAQs"
              subtitle="Visible questions for parents evaluating board-specific tutoring in Gurgaon."
              items={boardsHubFaqs}
              columns={2}
            />

            <BoardsRelatedLinks links={boardsHubRelatedPages} />

            <BoardsCtaBlock
              title="Ready to choose the right board-specific tutoring path?"
              description="Tell us the board, class, subject, school, and Gurgaon area, and we will help you move from discovery to the right tutor match."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
