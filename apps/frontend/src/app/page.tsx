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
  title: "Premium Home Tutors in Gurugram | BoardPeFocus",
  description: "Board-focused home tutors for Class 10 and 12 students in Gurugram. Explore expert tutors for CBSE, ICSE, IGCSE, and IB preparation.",
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
      description: "Class 10 and 12 support with structured board revision in Gurgaon.",
    },
    {
      name: "ICSE",
      href: getBoardPath("icse"),
      description: "Premium Class 10 guidance for strong concepts and board writing.",
    },
    {
      name: "ISC",
      href: getBoardPath("isc"),
      description: "Senior-school support for Physics, Chemistry, Maths, and English.",
    },
    {
      name: "IGCSE",
      href: getBoardPath("igcse"),
      description: "Subject-specific tutoring for Cambridge learners in Gurugram.",
    },
    {
      name: "IB",
      href: getBoardPath("ib"),
      description: "Focused MYP and DP support with one-to-one planning.",
    },
  ];
  const classDiscovery = [
    {
      name: "Class 10",
      href: getClassHubPath("class-10"),
      description: "Board-year tutoring across Maths, Science, English, and revision support.",
    },
    {
      name: "Class 12",
      href: getClassHubPath("class-12"),
      description: "Premium support for PCM, PCB, commerce, and international board pathways.",
    },
  ];
  const prioritySubjects = [
    {
      name: "Maths",
      href: "/boards/cbse/class-10/maths-home-tutor-gurgaon",
      cue: "CBSE / ICSE / IGCSE",
      description: "Board-led one-to-one Maths support with structured revision and paper confidence.",
    },
    {
      name: "Physics",
      href: "/boards/cbse/class-12/physics-home-tutor-gurgaon",
      cue: "Class 12 board prep",
      description: "Focused Physics support for numericals, derivations, and answer-writing discipline.",
    },
    {
      name: "Chemistry",
      href: "/boards/cbse/class-12/chemistry-home-tutor-gurgaon",
      cue: "CBSE / ISC / IB relevance",
      description: "Clearer reaction flow, organic revision, and steadier board-paper execution.",
    },
    {
      name: "Biology",
      href: "/boards/cbse/class-12/biology-home-tutor-gurgaon",
      cue: "PCB and senior boards",
      description: "One-to-one Biology support for diagrams, theory recall, and exam writing.",
    },
    {
      name: "Class 10 Science",
      href: "/boards/cbse/class-10/science-home-tutor-gurgaon",
      cue: "Board foundation year",
      description: "Integrated Science help across Physics, Chemistry, and Biology for Class 10.",
    },
    {
      name: "English",
      href: "/boards/icse/class-10/english-home-tutor-gurgaon",
      cue: "ICSE-led language support",
      description: "Better answer framing, literature support, and cleaner written expression.",
    },
    {
      name: "Economics",
      href: "/boards/isc/class-12/economics-home-tutor-gurgaon",
      cue: "ISC / senior board demand",
      description: "Premium Economics support for concepts, structured answers, and exam readiness.",
    },
    {
      name: "Accountancy",
      href: "/boards/cbse/class-12/accountancy-home-tutor-gurgaon",
      cue: "Commerce board support",
      description: "Stronger ledger flow, problem accuracy, and chapter-wise exam preparation.",
    },
    {
      name: "Computer Science",
      href: "/boards/cbse/class-12/computer-science-home-tutor-gurgaon",
      cue: "Class 12 specialist support",
      description: "Coding logic, theory coverage, and practical-style revision in one path.",
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
      description: "A premium tutoring corridor with strong family demand for school-aware, one-to-one support in established residential pockets.",
    },
    {
      name: "Golf Course Road",
      href: "/gurgaon-area/golf-course-road",
      description: "A high-intent premium zone where families usually want senior-board depth, polished matching, and efficient in-home scheduling.",
    },
    {
      name: "Golf Course Extension Road",
      href: "/gurgaon-area/golf-course-extension-road",
      description: "A fast-growing premium corridor where Class 10 and 12 home tutoring demand is tied to schools, sectors, and societies.",
    },
    {
      name: "Sohna Road and South City",
      href: "/gurgaon-area/sohna-road",
      description: "A strong Gurgaon demand cluster mixing established families, premium communities, and steady board-year tutoring needs.",
    },
    {
      name: "Ambience and NH-8 belt",
      href: "/gurgaon-area/ambience-nh8-belt",
      description: "A premium micro-market for families who want home tutoring without turning the school week into a commute-heavy schedule.",
    },
    {
      name: "Dwarka Expressway and New Gurgaon",
      href: "/gurgaon-area/dwarka-expressway",
      description: "A growing family corridor where parents often want structured support close to home with clear board and subject matching.",
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
              <Badge variant="outline" className="mb-3 border-primary/20 bg-primary/5 text-primary text-xs px-3 py-1 rounded-full shadow-sm font-bold">
                Gurugram's Premium Home Tutors
              </Badge>

              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-heading font-extrabold tracking-tight mb-6 text-primary leading-[1.15]">
                Board-exam home tutors in Gurgaon for <span className="relative inline-block text-[#b56a00]">
                  CBSE, ICSE, ISC, IGCSE, and IB students.
                  <svg className="absolute w-full h-2 -bottom-1 left-0 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                  </svg>
                </span>
              </h1>

              <p className="mb-8 max-w-3xl text-base leading-relaxed text-slate-700 md:text-xl lg:mx-0 mx-auto">
                BoardPeFocus offers specialized, premium one-to-one home tutoring for CBSE, ICSE, IGCSE, and IB students in Gurugram, matching families with top 2% educators for a focused, local, school-aware learning experience designed to achieve 95%.
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
                    desc: "Built around board prep, syllabus control, revision structure, and paper confidence."
                  },
                  {
                    title: "SCHOOL-AWARE",
                    desc: "Navigate by school, corridor, sector, and society instead of starting with a directory dump."
                  },
                  {
                    title: "ONE-TO-ONE",
                    desc: "Positioning stays premium and one-to-one so families can brief us around the exact academic context."
                  }
                ].map((item) => (
                  <div key={item.title} className="p-5 rounded-[1.25rem] bg-white border border-border/40 shadow-sm hover:shadow-md transition-all h-full flex flex-col">
                    <p className="text-[10px] font-extrabold tracking-[0.12em] text-emerald-800 uppercase mb-3">{item.title}</p>
                    <p className="text-[13px] text-slate-600 leading-relaxed font-medium">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:pl-8 lg:mt-0 mt-12">
              <LeadForm
                title="Request for Matching"
                subtitle="Find the perfect board-specialized tutor for your child."
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
                  <h3 className="text-2xl md:text-[2rem] font-heading font-bold text-primary mb-3">Start with your board</h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-2xl leading-relaxed">
                    The fastest way to find a relevant path is to start with the board first, then move into class, subject, school, and area.
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
                        <p className="text-sm leading-7 text-muted-foreground">{board.description}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div>
                <div className="mb-7">
                  <h3 className="text-2xl md:text-[2rem] font-heading font-bold text-primary mb-3">Or go straight to the board year</h3>
                  <p className="text-sm md:text-base text-muted-foreground max-w-xl leading-relaxed">
                    Class 10 and Class 12 stay central because that is where the highest-intent board demand lives.
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
                        <p className="text-sm leading-7 text-muted-foreground">{item.description}</p>
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
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">High-priority subject pages</h2>
              <p className="text-muted-foreground text-base md:text-lg max-w-4xl leading-relaxed">
                Use these subject routes when you already know the main academic pressure point and want to move straight into the most relevant board-led support path.
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
                    <p className="text-sm leading-7 text-muted-foreground">{subject.description}</p>
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
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">School-aware entry points</h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-4xl leading-relaxed">
                  Parents often think in terms of school context first. These overview pages make it easier to move from school into the right board, subject, and Gurgaon support path.
                </p>
              </div>
              <Link href="/schools" className="group inline-flex items-center text-sm md:text-base font-bold text-primary hover:text-accent transition-colors">
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
                    <p className="text-sm leading-7 text-muted-foreground">{school.cue}</p>
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
                <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Gurgaon top areas</h2>
                <p className="text-muted-foreground text-base md:text-lg max-w-4xl leading-relaxed">
                  The local strategy follows corridor to sector to society so families can navigate by where support actually needs to happen.
                </p>
              </div>
              <Link href="/gurgaon-area" className="group inline-flex items-center text-sm md:text-base font-bold text-primary hover:text-accent transition-colors">
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
                    <p className="text-sm leading-7 text-muted-foreground">{area.description}</p>
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
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">Premium Tutors in Gurugram</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Rigorous selection process. Only the most experienced board-specialized educators make it to BoardPeFocus.
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
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">How Matching Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A seamless 3-step process to find the perfect board-specialized tutor for your child.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-primary/10 -z-10" />

            {[
              {
                step: "01",
                title: "Share Requirements",
                desc: "Tell us about your child's board, class, subject, and school."
              },
              {
                step: "02",
                title: "Expert Matching",
                desc: "Our advisors handpick the best-fit tutor from our verified top 2% roster."
              },
              {
                step: "03",
                title: "Free Demo Class",
                desc: "Schedule a demo to ensure the perfect teaching compatibility."
              }
            ].map((item) => (
              <StaggerItem key={item.step} className="text-center group">
                <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary text-2xl font-bold mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
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
                Not a marketplace. <br /> A curated excellence program.
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Top 2% Vetting", desc: "Only the most capable educators pass our rigorous 5-step screening process." },
                  { title: "School-Aware Mapping", desc: "Tutors who understand the internal assessment patterns of top Gurugram schools." },
                  { title: "Board-Specific Rubrics", desc: "Preparation focused on the exact marking schemes of CBSE, IB, and IGCSE." },
                  { title: "Personalized Support", desc: "Dedicated academic advisors to track progress and ensure satisfaction." }
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
                    <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Our Results</p>
                    <p className="text-6xl font-heading font-extrabold">95%+</p>
                    <p className="text-primary-foreground/60">Target Score for Board Students</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-sm italic">"The tutor's understanding of the IB DP Chemistry rubric was exceptional. My son's score jumped from 4 to 7 in just 4 months."</p>
                      <p className="mt-2 text-xs font-bold text-accent">— Parent, Nirvana Country</p>
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
            subtitle="Everything you need to know about our premium home tutoring service in Gurugram."
            items={[
              {
                question: "How does BoardPeFocus tutor matching work?",
                answer: "We analyze your student's board (CBSE, IB, etc.), current performance, and learning style. Then, our advisors hand-match you with an elite tutor from our top 2% roster who has a proven track record for that specific board."
              },
              {
                question: "Which classes and boards are supported?",
                answer: "We specialize exclusively in Class 10 and 12 boards: CBSE, ICSE/ISC, IGCSE, and IB DP/MYP. This focus ensures we remain the best in board-specific preparation."
              },
              {
                question: "Are tutors verified on BoardPeFocus?",
                answer: "Absolutely. Every tutor undergoes a rigorous vetting process including technical interviews on board rubrics, teaching demonstrations, and background checks."
              },
              {
                question: "What are the typical fees for tutors?",
                answer: "Fees depend on the tutor's experience and the complexity of the board. As we provide premium, board-specialized educators, our rates reflect this high level of expertise."
              },
              {
                question: "Can we book a trial class before committing?",
                answer: "Yes. We can arrange an initial interaction or trial session so you can evaluate the tutor's teaching style, subject command, and fit with your student's goals."
              },
              {
                question: "Do you provide home tutors across Gurugram?",
                answer: "Yes. BoardPeFocus works with families across key Gurugram sectors and communities, including Golf Course Road, DLF phases, South City, Nirvana Country, Sohna Road, and nearby areas."
              },
              {
                question: "Can tutoring focus on board exams and school tests together?",
                answer: "Yes. Tutors align regular school support with board-specific preparation, including concepts, homework, chapter tests, past papers, and exam-writing practice."
              },
              {
                question: "How quickly can a tutor start after matching?",
                answer: "Timelines depend on subject, board, location, and schedule fit, but shortlisted tutors are usually shared promptly after the parent consultation."
              }
            ]}
          />
        </div>
      </section>

      <BlogSection />

      {/* CTA SECTION */}
      <section className="py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-primary leading-tight">Ready to elevate your board preparation?</h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of parents in Gurugram who trust BoardPeFocus for targeted, premium home tutoring.
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
