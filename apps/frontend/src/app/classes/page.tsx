import Link from "next/link";
import { BookOpen, GraduationCap, MapPin, School, ShieldCheck, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { ClassCard } from "@/app/classes/_components/ClassCard";
import { ClassesBreadcrumbs } from "@/app/classes/_components/ClassesBreadcrumbs";
import { ClassesCtaBlock } from "@/app/classes/_components/ClassesCtaBlock";
import { ClassesRelatedLinks } from "@/app/classes/_components/ClassesRelatedLinks";
import { ClassesSection } from "@/app/classes/_components/ClassesSection";
import {
  classHubConfigs,
  classesHubFaqs,
  classesHubRelatedLinks,
  getAreaDetails,
  getClassHubPath,
  getSchoolDetails,
} from "@/app/classes/_data/classes";
import { getSchoolHubLink } from "@/app/schools/_data/linking";
import { getLiveContent } from "@/lib/live-content";

export const metadata = constructMetadata({
  title: "Classes Hub | Class 10 & Class 12 Home Tutors in Gurgaon | BoardPeFocus",
  description:
    "Explore premium Class 10 and Class 12 home tutoring in Gurgaon. Move from class to board, subject, schools, areas, and the right one-to-one tutor pathway.",
  pathname: "/classes",
});

const classesHubAreas = getAreaDetails([
  "golf-course-road",
  "golf-course-extension-road",
  "south-city-sushant-lok",
  "sohna-road",
  "dlf-phases",
  "new-gurgaon",
]);

const classesHubSchools = getSchoolDetails([
  "dps-sector-45",
  "the-heritage-school",
  "shiv-nadar-school",
  "pathways-world-school",
  "lancers-international",
  "scottish-high-international-school",
]);

interface LiveClassLevel {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
}

export default async function ClassesHubPage() {
  const liveClasses = await getLiveContent<LiveClassLevel>("/content/classes");
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Classes", url: absoluteUrl("/classes") },
  ]);
  const faqJsonLd = generateFaqJsonLd(classesHubFaqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ClassesBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Classes" }]} />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <FadeIn direction="up" className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  Gurgaon / Gurugram only
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Class 10 and Class 12 home tutors in Gurgaon for board-focused preparation
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                  Use the Classes hub to move from Class 10 or Class 12 into the right board, subject, school, area, and premium one-to-one tutoring path.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20choosing%20the%20right%20Class%2010%20or%20Class%2012%20tutor%20in%20Gurgaon." target="_blank" rel="noopener noreferrer">
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
              </FadeIn>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: "Core focus", value: "Class 10 and Class 12 only" },
                  { label: "Positioning", value: "Premium one-to-one board support" },
                  { label: "Journey", value: "Class → Board → Subject → School / Area" },
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
            <ClassesSection
              eyebrow="Class Hubs"
              title="Choose the class path that matches your child’s board stage"
              description="These class cards are built to feel premium, clear, and commercially useful within a few seconds."
            >
              {liveClasses.length > 0 ? (
                <div className="mb-8 grid gap-5 lg:grid-cols-2">
                  {liveClasses.map((classLevel) => (
                    <Link
                      key={classLevel.id}
                      href={getClassHubPath(classLevel.slug)}
                      className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <h3 className="text-xl font-bold text-primary">{classLevel.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        {classLevel.description ?? `Explore ${classLevel.name} tutoring pathways in Gurgaon.`}
                      </p>
                    </Link>
                  ))}
                </div>
              ) : null}
              <div className="grid gap-6 lg:grid-cols-2">
                {classHubConfigs.map((classHub) => (
                  <ClassCard key={classHub.slug} classHub={classHub} />
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Class Identity"
              title="Why class-specific tutoring matters so much in Gurgaon"
              description="Class 10 and Class 12 both need structure, but the pressure pattern is different. The hub keeps that distinction clear."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {classHubConfigs.map((classHub) => (
                  <div key={classHub.slug} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      <GraduationCap className="h-5 w-5 text-accent" />
                      <h2 className="text-2xl font-bold">{classHub.label}</h2>
                    </div>
                    <div className="mt-5 grid gap-4">
                      {classHub.identityPoints.map((item) => (
                        <div key={item} className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm leading-7 text-foreground">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Board Pathways"
              title="Board-wise routes from each class hub"
              description="Parents should be able to start with class level and still move cleanly into the right board-specific page."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {classHubConfigs.map((classHub) => (
                  <div key={classHub.slug} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                    <h3 className="text-2xl font-bold text-primary">{classHub.label} board pathways</h3>
                    <div className="mt-6 space-y-4">
                      {classHub.boardPathways.map((pathway) => (
                        <Link
                          key={pathway.href}
                          href={pathway.href}
                          className="block rounded-[1.5rem] border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/20 hover:bg-white hover:shadow-md"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h4 className="text-lg font-bold text-primary">{pathway.board}</h4>
                              <p className="mt-2 text-sm leading-7 text-muted-foreground">{pathway.description}</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                {pathway.keySubjects.map((subject) => (
                                  <span
                                    key={subject}
                                    className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                                  >
                                    {subject}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <BookOpen className="mt-1 h-5 w-5 shrink-0 text-accent" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Subject Discovery"
              title="High-priority subjects across Class 10 and Class 12"
              description="These cards keep the class journey tied to real subject demand instead of turning into a crowded directory."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {classHubConfigs.flatMap((classHub) =>
                  classHub.subjectCards.slice(0, classHub.slug === "class-10" ? 4 : 4).map((subject) => (
                    <Link
                      key={`${classHub.slug}-${subject.title}`}
                      href={subject.href}
                      className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{classHub.label}</p>
                      <h3 className="mt-3 text-xl font-bold text-primary">{subject.title}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{subject.description}</p>
                    </Link>
                  )),
                )}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="School-Aware Relevance"
              title="Class pathways that stay connected to real Gurgaon school contexts"
              description="The wording remains careful and parent-friendly: support for families studying in these schools, without implying affiliation."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {classesHubSchools.map((school) => (
                  <Link
                    key={school.slug}
                    href={getSchoolHubLink(school.slug)}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <School className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{school.name}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Useful for Gurgaon families who want class-specific board support tied more closely to school pace and subject pressure.
                    </p>
                  </Link>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Popular Gurgaon Areas"
              title="Class 10 and Class 12 support across key Gurgaon corridors"
              description="This keeps the class hub connected to the locality-led flow you already use in the Areas section."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {classesHubAreas.map((area) => (
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
            </ClassesSection>

            <ClassesSection
              eyebrow="Trust & Process"
              title="What premium class-specific support should feel like"
              description="The message stays premium and realistic: no fake proof, just a clearer explanation of what parents are actually looking for."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {[
                  "Class-aware planning instead of generic tutoring language.",
                  "Board-specific subject support that reflects real exam pressure.",
                  "School-aware and Gurgaon-aware matching for one-to-one home tutoring.",
                  "Cleaner paths into WhatsApp, callback, and tutor discovery without clutter.",
                ].map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ClassesSection>

            <FAQ
              title="Classes FAQs"
              subtitle="Visible questions for parents exploring Class 10 and Class 12 tutoring in Gurgaon."
              items={classesHubFaqs}
              columns={2}
            />

            <ClassesRelatedLinks links={classesHubRelatedLinks} />

            <ClassesCtaBlock
              title="Ready to choose the right class-specific tutoring path?"
              description="Tell us the class, board, subject, school, and Gurgaon area, and we will help you move toward the most relevant tutor match."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
