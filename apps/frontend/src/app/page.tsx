import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import {
  constructMetadata,
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
} from "@/lib/seo";
import { ChevronRight, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/faq/FAQ";
import { getBoardPath } from "@/app/boards/_data/boards";
import { getClassHubPath } from "@/app/classes/_data/classes";
import { platformStats } from "@/data/stats";
import { TutorCard } from "@/components/cards/TutorCard";
import { LeadForm } from "@/components/forms/LeadForm";
import { BlogSection } from "@/components/blog/BlogSection";
import { getPublicTutorCards } from "@/lib/tutors";

export const metadata = constructMetadata({
  title: "Best Home Tutors in Gurgaon | BoardPeFocus",
  description:
    "BoardPeFocus provides trusted one-to-one home tutors in Gurgaon for CBSE, ICSE, ISC, IGCSE, and IB students. Get school-aware home tuition for Class 10, Class 12, and key subjects across Gurugram.",
  pathname: "/",
});

export default async function HomePage() {
  const organizationJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();
  const featuredTutors = (await getPublicTutorCards()).slice(0, 3);

  const boardDiscovery = [
    {
      name: "CBSE",
      href: getBoardPath("cbse"),
      description:
        "CBSE home tutors in Gurgaon for Class 10, Class 12, Maths, Science, English, Commerce, and board exam preparation.",
    },
    {
      name: "ICSE",
      href: getBoardPath("icse"),
      description:
        "ICSE home tuition in Gurgaon for strong concepts, regular practice, literature support, and exam-focused answer writing.",
    },
    {
      name: "ISC",
      href: getBoardPath("isc"),
      description:
        "ISC home tutors for senior-school subjects including Physics, Chemistry, Maths, Biology, English, Economics, and Accountancy.",
    },
    {
      name: "IGCSE",
      href: getBoardPath("igcse"),
      description:
        "IGCSE home tutors in Gurgaon for Cambridge students who need subject clarity, structured practice, and personalized guidance.",
    },
    {
      name: "IB",
      href: getBoardPath("ib"),
      description:
        "IB home tutors for MYP and DP students who need concept-based learning, assignment support, and planned exam preparation.",
    },
  ];

  const classDiscovery = [
    {
      name: "Class 10",
      href: getClassHubPath("class-10"),
      description:
        "Class 10 home tutors in Gurgaon for Maths, Science, English, Social Science, regular school support, and board preparation.",
    },
    {
      name: "Class 12",
      href: getClassHubPath("class-12"),
      description:
        "Class 12 home tutors in Gurgaon for Science, Commerce, Humanities, board exams, competitive foundations, and subject-specific revision.",
    },
  ];

  const prioritySubjects = [
    {
      name: "Maths",
      href: "/boards/cbse/class-10/maths-home-tutor-gurgaon",
      cue: "CBSE / ICSE / IGCSE",
      description:
        "One-to-one Maths home tuition in Gurgaon for stronger concepts, regular practice, doubt-solving, and exam confidence.",
    },
    {
      name: "Physics",
      href: "/boards/cbse/class-12/physics-home-tutor-gurgaon",
      cue: "Class 11 and Class 12 support",
      description:
        "Physics home tutors for students who need help with numericals, derivations, concepts, and board preparation.",
    },
    {
      name: "Chemistry",
      href: "/boards/cbse/class-12/chemistry-home-tutor-gurgaon",
      cue: "CBSE / ISC / IB relevance",
      description:
        "Chemistry home tuition for organic, inorganic, and physical chemistry with clear explanations and structured revision.",
    },
    {
      name: "Biology",
      href: "/boards/cbse/class-12/biology-home-tutor-gurgaon",
      cue: "PCB and senior boards",
      description:
        "Biology home tutors for diagrams, theory, terminology, chapter-wise revision, and board-focused answer writing.",
    },
    {
      name: "Class 10 Science",
      href: "/boards/cbse/class-10/science-home-tutor-gurgaon",
      cue: "Board foundation year",
      description:
        "Class 10 Science home tuition covering Physics, Chemistry, and Biology with concept clarity and exam practice.",
    },
    {
      name: "English",
      href: "/boards/icse/class-10/english-home-tutor-gurgaon",
      cue: "Grammar, literature, and writing",
      description:
        "English home tutors for grammar, literature, writing skills, comprehension, and board exam answer presentation.",
    },
    {
      name: "Economics",
      href: "/boards/isc/class-12/economics-home-tutor-gurgaon",
      cue: "ISC / senior board demand",
      description:
        "Economics home tuition for concepts, diagrams, definitions, case-based questions, and structured exam answers.",
    },
    {
      name: "Accountancy",
      href: "/boards/cbse/class-12/accountancy-home-tutor-gurgaon",
      cue: "Commerce board support",
      description:
        "Accountancy home tutors for journal entries, ledgers, final accounts, company accounts, and regular practice.",
    },
    {
      name: "Computer Science",
      href: "/boards/cbse/class-12/computer-science-home-tutor-gurgaon",
      cue: "Class 11 and Class 12 support",
      description:
        "Computer Science home tuition for programming logic, theory, practical concepts, and exam preparation.",
    },
  ];

  const schoolEntryPoints = [
    {
      name: "The Shri Ram School Aravali",
      href: "/schools/the-shri-ram-school-aravali",
      cue: "DLF Phase 4, Gurgaon • ICSE, ISC",
    },
    {
      name: "The Shri Ram School Moulsari",
      href: "/schools/the-shri-ram-school-moulsari",
      cue: "DLF Phase 3, Gurgaon • ICSE, ISC",
    },
    {
      name: "Heritage Xperiential Learning School",
      href: "/schools/the-heritage-school",
      cue: "Sector 62, Gurgaon • CBSE, IGCSE",
    },
    {
      name: "Pathways School Gurgaon",
      href: "/schools/pathways-school-gurgaon",
      cue: "Golf Course Extension belt, Gurgaon • IB, IGCSE",
    },
    {
      name: "Pathways World School Gurgaon",
      href: "/schools/pathways-world-school",
      cue: "Aravali zone, Gurgaon • IB, IGCSE",
    },
    {
      name: "GD Goenka World School",
      href: "/schools/gd-goenka-world-school",
      cue: "Sohna Road region, Gurgaon • IB, IGCSE",
    },
  ];

  const topAreaCoverage = [
    {
      name: "DLF Phases and MG Road belt",
      href: "/gurgaon-area/dlf-phases",
      description:
        "Home tutors for families in DLF Phase 1, 2, 3, 4, 5, MG Road, and nearby premium residential areas.",
    },
    {
      name: "Golf Course Road",
      href: "/gurgaon-area/golf-course-road",
      description:
        "Experienced home tutors near Golf Course Road for CBSE, ICSE, ISC, IB, and IGCSE students.",
    },
    {
      name: "Golf Course Extension Road",
      href: "/gurgaon-area/golf-course-extension-road",
      description:
        "Home tuition support for students living near Golf Course Extension Road, Sector 56, Sector 57, Sector 62, Sector 65, and nearby societies.",
    },
    {
      name: "Sohna Road and South City",
      href: "/gurgaon-area/sohna-road",
      description:
        "Home tutors for students in Sohna Road, South City, Malibu Town, Nirvana Country, and surrounding Gurgaon areas.",
    },
    {
      name: "Ambience and NH-8 belt",
      href: "/gurgaon-area/ambience-nh8-belt",
      description:
        "Personalized home tuition for families near Ambience Island, NH-8, Cyber City, and nearby residential communities.",
    },
    {
      name: "Dwarka Expressway and New Gurgaon",
      href: "/gurgaon-area/dwarka-expressway",
      description:
        "Home tutors for growing Gurgaon communities near Dwarka Expressway, New Gurgaon, Sector 82, Sector 83, Sector 84, and nearby sectors.",
    },
  ];

  return (
    <div className="bg-background">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-muted/30 pt-24 pb-24">
        <div className="pointer-events-none absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 -mb-20 -ml-20 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="grid lg:grid-cols-[1.2fr_0.8fr] gap-12 items-center">
            <div className="text-center lg:text-left">
              <Badge
                variant="outline"
                className="mb-3 border-primary/20 bg-primary/5 text-primary text-xs px-3 py-1 rounded-full shadow-sm font-bold"
              >
                Trusted Home Tutors in Gurgaon
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-extrabold tracking-tight mb-6 text-primary leading-[1.15]">
                Board-exam home tutions in Gurgaon for{" "}
                <span className="relative inline-block text-[#b56a00]">
                  CBSE, ICSE, ISC, IGCSE, and IB students.
                  <svg
                    className="absolute w-full h-2 -bottom-1 left-0 text-accent/30"
                    viewBox="0 0 100 10"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M0 5 Q 50 10 100 5"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                    />
                  </svg>
                </span>
              </h1>

              <p className="mb-8 max-w-3xl text-base leading-relaxed text-slate-700 md:text-xl lg:mx-0 mx-auto">
                BoardPeFocus provides trusted one-to-one home tuition in Gurgaon for students who need clear concepts, regular academic support, and focused exam preparation. We match families with experienced home tutors across Gurugram based on the child’s board, class, subject, school, learning style, and location.
              </p>

              <div className="mb-12 flex items-center justify-center gap-3 sm:flex-row flex-col lg:justify-start">
                <ButtonLink
                  href="/contact"
                  size="lg"
                  className="h-12 w-full rounded-xl bg-primary px-6 text-base font-bold shadow-xl transition-all duration-300 hover:bg-primary/90 sm:w-auto"
                >
                  Get Matched with a Tutor
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover/button:translate-x-1" />
                </ButtonLink>
                <ButtonLink
                  href="/search"
                  size="lg"
                  variant="outline"
                  className="h-12 w-full rounded-xl border-primary/20 px-6 text-base font-bold text-primary hover:bg-primary/5 sm:w-auto"
                >
                  Explore Tutors
                </ButtonLink>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:max-w-3xl items-stretch">
                {[
                  {
                    title: "BOARD-FOCUSED",
                    desc: "Home tuition planned around board syllabus, school tests, revision needs, and exam-writing practice.",
                  },
                  {
                    title: "LOCAL GURGAON ",
                    desc: "Find suitable home tutors across DLF, Golf Course Road, Sohna Road, South City, and New Gurgaon etc.",
                  },
                  {
                    title: "ONE-TO-ONE SUPPORT",
                    desc: "Personalized home tutoring with individual attention, better doubt-solving, and pace-based learning.",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="p-5 rounded-[1.25rem] bg-white border border-border/40 shadow-sm hover:shadow-md transition-all h-full flex flex-col"
                  >
                    <p className="text-[10px] font-extrabold tracking-[0.12em] text-emerald-800 uppercase mb-3">
                      {item.title}
                    </p>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-8 lg:mt-0 mt-12">
              <LeadForm
                title="Request a Home Tutor"
                subtitle="Tell us your child's class, board, subject, and Gurgaon location. We will help you find a suitable home tutor."
              />
            </div>
          </div>
        </div>
      </section>

      {/* WHY US / PROOF STRIP */}
      <section className="border-y border-border/50 bg-white py-14 relative z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
            {platformStats.map((stat) => (
              <StaggerItem key={stat.id}>
                <Link
                  href={`/transparency#${stat.id}`}
                  className="group block transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 drop-shadow-sm group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider group-hover:text-primary transition-colors">
                    {stat.label}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* BOARD + CLASS DISCOVERY */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <StaggerContainer className="grid gap-10 lg:grid-cols-[1.55fr_0.95fr] items-start">
            <StaggerItem>
              <div>
                <div className="mb-7">
                  <h3 className="text-2xl md:text-[2rem] font-heading font-bold text-primary mb-3">
                    Find home tutors by board
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    Start with your child&apos;s board so we can match the
                    right tutor for the syllabus, school expectations, exam
                    pattern, and subject difficulty.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                  {boardDiscovery.map((board) => (
                    <Link key={board.name} href={board.href} className="group">
                      <div className="h-full rounded-[1.75rem] border border-border/60 bg-white px-5 py-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-lg">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <p className="text-xl font-heading font-bold text-primary transition-colors group-hover:text-accent">
                            {board.name}
                          </p>
                          <ChevronRight className="h-4 w-4 shrink-0 text-primary/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </div>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {board.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div>
                <div className="mb-7">
                  <h3 className="text-2xl md:text-[2rem] font-heading font-bold text-primary mb-3">
                    Or choose your child&apos;s class
                  </h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                    Class 10 and Class 12 are important academic years, so our
                    home tuition support focuses on syllabus completion,
                    revision, school tests, and final exam readiness.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {classDiscovery.map((item) => (
                    <Link key={item.name} href={item.href} className="group">
                      <div className="h-full rounded-[1.85rem] border border-border/60 bg-white px-5 py-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-lg">
                        <div className="mb-4 flex items-start justify-between gap-3">
                          <p className="text-xl font-heading font-bold text-primary transition-colors group-hover:text-accent">
                            {item.name}
                          </p>
                          <ChevronRight className="h-4 w-4 shrink-0 text-primary/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                        </div>
                        <p className="text-sm leading-7 text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* PRIORITY SUBJECTS */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeIn>
            <div className="mb-10">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                Popular home tuition subjects in Gurgaon
              </h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-4xl leading-relaxed">
                Choose the subject where your child needs the most support.
                BoardPeFocus helps families find experienced home tutors for
                school learning, exam preparation, and regular academic
                improvement.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {prioritySubjects.map((subject) => (
              <StaggerItem key={subject.name}>
                <Link href={subject.href} className="group">
                  <div className="h-full rounded-[1.75rem] border border-border/60 bg-white px-5 py-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-lg">
                    <div className="mb-3 flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xl font-heading font-bold text-primary transition-colors group-hover:text-accent">
                          {subject.name}
                        </p>
                        <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.12em] text-primary/55">
                          {subject.cue}
                        </p>
                      </div>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {subject.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* SCHOOL-AWARE ENTRY POINTS */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeIn>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                  Home tutors for top Gurgaon schools
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-4xl leading-relaxed">
                  Many parents want tutors who understand the child&apos;s
                  school, board, homework pattern, test schedule, and academic
                  expectations. BoardPeFocus helps match tutors with that school
                  context in mind.
                </p>
              </div>
              <Link
                href="/schools"
                className="group inline-flex items-center text-sm md:text-base font-bold text-primary hover:text-accent transition-colors"
              >
                View all schools
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {schoolEntryPoints.map((school) => (
              <StaggerItem key={school.name}>
                <Link href={school.href} className="group">
                  <div className="h-full rounded-[1.75rem] border border-border/60 bg-white px-5 py-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <p className="text-xl font-heading font-bold text-primary transition-colors group-hover:text-accent">
                        {school.name}
                      </p>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {school.cue}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* GURGAON TOP AREAS */}
      <section className="pb-24 bg-white">
        <div className="container mx-auto px-4 max-w-7xl">
          <FadeIn>
            <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">
                  Home tutors across Gurgaon
                </h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-4xl leading-relaxed">
                  We help families find home tutors across key Gurgaon sectors,
                  societies, and residential corridors, so students can learn
                  comfortably at home without adding extra travel stress.
                </p>
              </div>
              <Link
                href="/gurgaon-area"
                className="group inline-flex items-center text-sm md:text-base font-bold text-primary hover:text-accent transition-colors"
              >
                View all areas
                <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {topAreaCoverage.map((area) => (
              <StaggerItem key={area.name}>
                <Link href={area.href} className="group">
                  <div className="h-full rounded-[1.75rem] border border-border/60 bg-white px-5 py-5 shadow-sm transition-all duration-300 group-hover:-translate-y-1 group-hover:border-primary/20 group-hover:shadow-lg">
                    <div className="mb-4 flex items-start justify-between gap-3">
                      <p className="text-xl font-heading font-bold text-primary transition-colors group-hover:text-accent">
                        {area.name}
                      </p>
                      <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-primary/55 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                    </div>
                    <p className="text-sm leading-7 text-muted-foreground">
                      {area.description}
                    </p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FEATURED TUTORS */}
      <section className="py-32 bg-muted/20 relative">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">
                  Experienced home tutors in Gurgaon
                </h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  BoardPeFocus works with carefully reviewed tutors who
                  understand school academics, board preparation, subject
                  improvement, and one-to-one home teaching.
                </p>
              </div>
              <ButtonLink
                href="/search"
                variant="link"
                className="mt-4 px-0 text-lg font-bold text-primary hover:text-primary/80 md:mt-0"
              >
                View all tutors
                <ChevronRight className="ml-1 h-5 w-5 transition-transform group-hover/button:translate-x-1" />
              </ButtonLink>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTutors.map((tutor) => (
              <StaggerItem key={tutor.id}>
                <TutorCard tutor={tutor} />
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">
                How we help you find the right home tutor
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A simple process to understand your child&apos;s needs and
                connect your family with a suitable tutor in Gurgaon.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-primary/10 -z-10" />

            {[
              {
                step: "01",
                title: "Share Requirements",
                desc: "Tell us your child's class, board, subject, school, current challenges, and Gurgaon location.",
              },
              {
                step: "02",
                title: "Tutor Shortlisting",
                desc: "We shortlist suitable home tutors based on subject expertise, board experience, teaching style, and schedule fit.",
              },
              {
                step: "03",
                title: "Start with Confidence",
                desc: "Speak with the tutor, plan the first session, and begin personalized one-to-one home tuition.",
              },
            ].map((item) => (
              <StaggerItem key={item.step} className="text-center group">
                <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary text-2xl font-bold mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">
                  {item.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* WHY BOARDPEFOCUS */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                Not just a tutor listing. <br /> A focused home tuition
                matching service.
              </h2>
              <div className="space-y-6">
                {[
                  {
                    title: "Verified Tutor Matching",
                    desc: "We help families connect with tutors who are reviewed for subject knowledge, communication, and teaching experience.",
                  },
                  {
                    title: "School-Aware Support",
                    desc: "We consider the student's school, board, class level, exam schedule, and academic pressure before suggesting a tutor.",
                  },
                  {
                    title: "Board-Specific Preparation",
                    desc: "Tuition can be aligned with CBSE, ICSE, ISC, IGCSE, or IB requirements, including school tests and final exams.",
                  },
                  {
                    title: "Personalized Attention",
                    desc: "One-to-one home tuition gives students space to ask questions, revise properly, and learn at a pace that suits them.",
                  },
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-primary-foreground/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>

            <FadeIn direction="left" className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
                <div className="relative bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
                  <div className="text-center mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">
                      Our Focus
                    </p>
                    <p className="text-6xl font-heading font-extrabold">
                      Better Learning
                    </p>
                    <p className="text-primary-foreground/60">
                      Clear concepts, regular practice, and confident exam
                      preparation
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-sm italic">
                        &quot;The tutor understood my child&apos;s school
                        pattern and helped build confidence through regular
                        practice and clear explanations.&quot;
                      </p>
                      <p className="mt-2 text-xs font-bold text-accent">
                        — Parent, Gurgaon
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <FAQ
            showViewMore={true}
            columns={2}
            title="Frequently asked questions"
            subtitle="Everything you need to know about our home tuition service in Gurgaon."
            items={[
              {
                question:
                  "How does BoardPeFocus help me find a home tutor in Gurgaon?",
                answer:
                  "We understand your child's class, board, subject, school, learning needs, location, and preferred schedule. Based on this, we help you connect with a suitable home tutor for one-to-one learning at home.",
              },
              {
                question: "Which boards do you provide home tutors for?",
                answer:
                  "We provide home tutors in Gurgaon for CBSE, ICSE, ISC, IGCSE, and IB students. Tutors can support regular school learning, concept clarity, revision, homework, tests, and board exam preparation.",
              },
              {
                question:
                  "Do you provide home tutors for Class 10 and Class 12?",
                answer:
                  "Yes. BoardPeFocus provides Class 10 and Class 12 home tutors in Gurgaon for important subjects such as Maths, Science, Physics, Chemistry, Biology, English, Economics, Accountancy, and Computer Science.",
              },
              {
                question: "Are the tutors verified?",
                answer:
                  "We review tutors for subject knowledge, teaching experience, communication skills, and suitability for the student's board and class before suggesting them to families.",
              },
              {
                question: "Can I get a home tutor near my area in Gurgaon?",
                answer:
                  "Yes. We help families find home tutors across Gurgaon, including DLF phases, Golf Course Road, Golf Course Extension Road, Sohna Road, South City, Nirvana Country, New Gurgaon, and Dwarka Expressway.",
              },
              {
                question:
                  "Can tutoring cover both school tests and board exams?",
                answer:
                  "Yes. Home tuition can cover school homework, chapter tests, concept revision, previous papers, sample papers, and board-specific exam preparation.",
              },
              {
                question: "How soon can a home tutor start?",
                answer:
                  "The timeline depends on the subject, board, location, schedule, and tutor availability. Once we understand your requirement, we try to share suitable options as quickly as possible.",
              },
              {
                question: "Do you offer one-to-one home tuition only?",
                answer:
                  "BoardPeFocus focuses on personalized one-to-one home tuition so that each student gets individual attention, proper doubt-solving, and a learning plan based on their needs.",
              },
            ]}
          />
        </div>
      </section>

      <BlogSection />

      {/* CTA SECTION */}
      <section className="py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-primary leading-tight">
              Looking for the best home tutor in Gurgaon?
            </h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Tell us your child&apos;s class, board, subject, school, and
              location. BoardPeFocus will help you find a suitable one-to-one
              home tutor for focused learning at home.
            </p>
            <ButtonLink
              href="/contact"
              size="lg"
              className="h-16 rounded-2xl px-12 text-lg font-bold shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              Request a Callback
            </ButtonLink>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}