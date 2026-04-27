import Link from "next/link";
import { BookOpen, GraduationCap, MapPin, School, ShieldCheck, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { SchoolCard } from "@/app/schools/_components/SchoolCard";
import { SchoolsBreadcrumbs } from "@/app/schools/_components/SchoolsBreadcrumbs";
import { SchoolsCtaBlock } from "@/app/schools/_components/SchoolsCtaBlock";
import { SchoolsRelatedLinks } from "@/app/schools/_components/SchoolsRelatedLinks";
import { SchoolsSection } from "@/app/schools/_components/SchoolsSection";
import { getAreaClusterDetail, schoolConfigs, schoolsHubFaqs, schoolsHubRelatedLinks } from "@/app/schools/_data/schools";
import { getBoardPath } from "@/app/boards/_data/boards";
import { getClassHubPath } from "@/app/classes/_data/classes";
import { getLiveContent } from "@/lib/live-content";

export const metadata = constructMetadata({
  title: "Schools Hub | Home Tutors for Leading Gurgaon Schools | BoardPeFocus",
  description:
    "Explore school-aware home tutoring for leading Gurgaon and Gurugram schools. Move from schools to boards, classes, subjects, areas, and the right one-to-one tutor path.",
  pathname: "/schools",
});

const discoveryPathways = [
  {
    title: "Browse by curriculum",
    description: "Start with CBSE, ICSE, ISC, IB, or IGCSE relevance and then move into the school where that route matters most.",
    links: [
      { label: "CBSE", href: getBoardPath("cbse") },
      { label: "ICSE", href: getBoardPath("icse") },
      { label: "ISC", href: getBoardPath("isc") },
      { label: "IB", href: getBoardPath("ib") },
      { label: "IGCSE", href: getBoardPath("igcse") },
    ],
  },
  {
    title: "Browse by class stage",
    description: "Move from school discovery into the right Class 10 or Class 12 pathway before shortlisting subject-specific pages.",
    links: [
      { label: "Class 10", href: getClassHubPath("class-10") },
      { label: "Class 12", href: getClassHubPath("class-12") },
    ],
  },
  {
    title: "Browse by subject focus",
    description: "Use high-priority subject pages for Maths, Science, Physics, Chemistry, Biology, English, Economics, and Accountancy.",
    links: [
      { label: "Maths", href: "/boards/cbse/class-10/maths-home-tutor-gurgaon" },
      { label: "Physics", href: "/boards/cbse/class-12/physics-home-tutor-gurgaon" },
      { label: "Science", href: "/boards/cbse/class-10/science-home-tutor-gurgaon" },
      { label: "Economics", href: "/boards/isc/class-12/economics-home-tutor-gurgaon" },
    ],
  },
];

const curriculumGroups = [
  {
    title: "CISCE, ICSE, and ISC relevance",
    description: "Useful for premium-school families who want stronger written quality, subject depth, and calmer board-season support.",
    schools: ["the-shri-ram-school-aravali", "the-shri-ram-school-moulsari", "scottish-high-international-school"],
  },
  {
    title: "IB and senior international pathways",
    description: "For Gurgaon families who need deeper subject specialists for DP, MYP, and broader IB-aligned support.",
    schools: ["pathways-school-gurgaon", "pathways-world-school", "dps-international-gurugram", "lancers-international"],
  },
  {
    title: "CBSE and mixed-curriculum relevance",
    description: "Useful where families want stronger Class 10 and Class 12 subject control with cleaner revision structure.",
    schools: ["the-heritage-school", "shiv-nadar-school", "gd-goenka-world-school"],
  },
];

const nearbyAreaLinks = [
  "dlf-phases",
  "golf-course-road",
  "golf-course-extension-road",
  "sohna-road",
  "south-city-sushant-lok",
  "dwarka-expressway",
  "new-gurgaon",
];

const areaCards = nearbyAreaLinks
  .map((slug) => getAreaClusterDetail(slug))
  .filter((area): area is NonNullable<ReturnType<typeof getAreaClusterDetail>> => Boolean(area));

interface LiveSchool {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  locality?: string | null;
  curriculumMix?: string | null;
}

export default async function SchoolsHubPage() {
  const liveSchools = await getLiveContent<LiveSchool>("/content/schools");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
  ]);
  const faqJsonLd = generateFaqJsonLd(schoolsHubFaqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <SchoolsBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Schools" }]} />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <FadeIn direction="up" className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  Gurgaon / Gurugram only
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Home tutors for students from leading Gurgaon schools
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                  Use the Schools hub to discover school-aware tutoring by curriculum, class stage, subject focus, and Gurgaon locality without falling into a generic tuition-directory flow.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20with%20school-aware%20board%20tutoring%20in%20Gurgaon." target="_blank" rel="noopener noreferrer">
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
                  { label: "Positioning", value: "Premium one-to-one school-aware tutoring" },
                  { label: "Focus", value: "Class 10 and Class 12 board preparation" },
                  { label: "Journey", value: "School to board to class to subject to area" },
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
            <SchoolsSection
              eyebrow="Priority Schools"
              title="Explore premium Gurgaon school clusters"
              description="These school cards are designed to help parents move naturally into the right school-aware tutoring path without clutter or keyword noise."
            >
              {liveSchools.length > 0 ? (
                <div className="mb-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {liveSchools.map((school) => (
                    <Link
                      key={school.id}
                      href={`/schools/${school.slug}`}
                      className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">
                        {school.curriculumMix ?? school.locality ?? "Gurgaon School"}
                      </p>
                      <h3 className="mt-3 text-xl font-bold text-primary">{school.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {school.description ?? "Explore school-aware tutoring support for this Gurgaon school."}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {schoolConfigs.map((school) => (
                  <SchoolCard key={school.slug} school={school} />
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Discovery Pathways"
              title="Choose the school journey that fits your decision style"
              description="Parents can start from curriculum, area, class stage, or subject focus and still land on a cleaner school-aware page."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {discoveryPathways.map((pathway) => (
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
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Curriculum Relevance"
              title="Curriculum-aware school discovery"
              description="This keeps the Schools hub commercially useful by tying each school cluster to the curriculum patterns parents actually care about."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {curriculumGroups.map((group) => (
                  <div key={group.title} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      <BookOpen className="h-5 w-5 text-accent" />
                      <h3 className="text-2xl font-bold">{group.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{group.description}</p>
                    <div className="mt-5 space-y-3">
                      {group.schools.map((slug) => {
                        const school = schoolConfigs.find((item) => item.slug === slug);
                        if (!school) return null;

                        return (
                          <Link
                            key={slug}
                            href={`/schools/${slug}`}
                            className="block rounded-2xl border border-border/60 bg-muted/20 px-4 py-3 text-sm font-semibold text-primary transition-all hover:border-primary/20 hover:bg-white"
                          >
                            {school.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Nearby Gurgaon Localities"
              title="School support connected to real Gurgaon corridors"
              description="The Schools hub links naturally into the Areas hub so school discovery stays grounded in locality and scheduling reality."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {areaCards.map((area) => (
                  <Link
                    key={area.slug}
                    href={`/gurgaon-area/${area.slug}`}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <MapPin className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{area.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{area.shortDescription}</p>
                  </Link>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Boards and Classes"
              title="Related hubs that keep school discovery connected"
              description="School pages should never feel orphaned, so this section ties them back to boards, classes, and priority subject pathways."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  {
                    title: "Boards Hub",
                    href: "/boards",
                    description: "Compare CBSE, ICSE, ISC, IGCSE, and IB pathways before choosing the school-specific route.",
                    icon: <BookOpen className="h-5 w-5 text-accent" />,
                  },
                  {
                    title: "Class 10 Hub",
                    href: getClassHubPath("class-10"),
                    description: "A cleaner Class 10 discovery path for school-aware board support.",
                    icon: <GraduationCap className="h-5 w-5 text-accent" />,
                  },
                  {
                    title: "Class 12 Hub",
                    href: getClassHubPath("class-12"),
                    description: "The senior-board route for subject specialists and calmer revision planning.",
                    icon: <GraduationCap className="h-5 w-5 text-accent" />,
                  },
                  {
                    title: "High-priority subjects",
                    href: "/boards/cbse/class-12/physics-home-tutor-gurgaon",
                    description: "Move into subject-specific pages for Maths, Science, Physics, Chemistry, Biology, English, Economics, and Accountancy.",
                    icon: <School className="h-5 w-5 text-accent" />,
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      {item.icon}
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </SchoolsSection>

            <SchoolsSection
              eyebrow="Trust and Process"
              title="What premium school-aware tutoring should feel like"
              description="No fake claims, no fake school tie-ups, and no directory-style noise. Just a clearer explanation of why parents look for this kind of support."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  "Board-aware tutoring that respects the school pace and class stage.",
                  "One-to-one attention so subject correction stays precise and parent-friendly.",
                  "Structured revision support for board season, pre-boards, and senior subject pressure.",
                  "A calmer matching journey through WhatsApp, callback, and direct tutor discovery.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </SchoolsSection>

            <FAQ
              title="Schools FAQs"
              subtitle="Visible answers for Gurgaon parents exploring school-aware tutoring."
              items={schoolsHubFaqs}
              columns={2}
            />

            <SchoolsRelatedLinks links={schoolsHubRelatedLinks} />

            <SchoolsCtaBlock
              title="Ready to choose the right school-aware tutoring path?"
              description="Tell us the school, board, class, subject, and Gurgaon area, and we will help you move into the most relevant tutor match."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
