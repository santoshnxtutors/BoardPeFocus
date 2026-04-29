import Link from "next/link";
import { notFound } from "next/navigation";
import { BookOpen, MapPin, School, ShieldCheck } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { GeneratedManifestPage } from "@/components/generated-pages/GeneratedManifestPage";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import {
  buildGeneratedMetadata,
  getClassFallbackParams,
  getManifestPage,
} from "@/lib/generated-pages";
import { fetchBackend } from "@/lib/backend-api";
import { getLiveFaqs } from "@/lib/live-content";
import { ClassesBreadcrumbs } from "@/app/classes/_components/ClassesBreadcrumbs";
import { ClassesCtaBlock } from "@/app/classes/_components/ClassesCtaBlock";
import { ClassesRelatedLinks } from "@/app/classes/_components/ClassesRelatedLinks";
import { ClassesSection } from "@/app/classes/_components/ClassesSection";
import {
  getAllClassHubParams,
  getAreaDetails,
  getClassHubConfig,
  getClassHubPath,
  getSchoolDetails,
} from "@/app/classes/_data/classes";
import { getSchoolHubLink } from "@/app/schools/_data/linking";

interface PageProps {
  params: Promise<{ classLevel: string }>;
}

interface LiveClassLevel {
  id: string;
  slug: string;
  name: string;
  description?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
}

async function getLiveClass(slug: string) {
  const response = await fetchBackend(`/content/classes/${encodeURIComponent(slug)}`);
  if (!response.ok) return null;
  return (await response.json()) as LiveClassLevel;
}

export async function generateStaticParams() {
  return [...getAllClassHubParams(), ...getClassFallbackParams()];
}

export async function getClassHubPageMetadata(classLevel: string) {
  const liveClass = await getLiveClass(classLevel);
  if (liveClass) {
    return constructMetadata({
      title: liveClass.seoTitle ?? `${liveClass.name} Home Tutors in Gurgaon | BoardPeFocus`,
      description: liveClass.metaDescription ?? liveClass.description ?? undefined,
      pathname: getClassHubPath(liveClass.slug),
    });
  }

  const classHub = getClassHubConfig(classLevel);
  const generatedPage = getManifestPage(`/classes/${classLevel}`);

  if (!classHub && !generatedPage) {
    return constructMetadata({ title: "Class Page Not Found", noIndex: true });
  }
  if (!classHub) return constructMetadata(buildGeneratedMetadata(generatedPage!));

  return constructMetadata({
    title: `${classHub.label} Home Tutors in Gurgaon | BoardPeFocus`,
    description: classHub.heroDescription,
    pathname: getClassHubPath(classHub.slug),
  });
}

export async function generateMetadata({ params }: PageProps) {
  const { classLevel } = await params;
  return getClassHubPageMetadata(classLevel);
}

export async function renderClassHubDetailPage(classLevel: string) {
  const liveClass = await getLiveClass(classLevel);
  const classHub = getClassHubConfig(classLevel);
  const generatedPage = getManifestPage(`/classes/${classLevel}`);

  if (!classHub && !generatedPage) {
    if (!liveClass) notFound();
    return <LiveClassPage classLevel={liveClass} />;
  }
  if (!classHub) {
    return <GeneratedManifestPage record={generatedPage!} />;
  }

  const liveFaqs =
    liveClass?.id ? await getLiveFaqs({ entityType: "CLASS", entityId: liveClass.id }) : [];
  const faqItems = liveFaqs.length > 0 ? liveFaqs : classHub.faq;
  const heroDescription = liveClass?.description ?? classHub.heroDescription;

  const schools = getSchoolDetails(classHub.schoolReferences.map((school) => school.slug));
  const areas = getAreaDetails(classHub.areaReferences.map((area) => area.slug));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Classes", url: absoluteUrl("/classes") },
    { name: classHub.label, url: absoluteUrl(getClassHubPath(classHub.slug)) },
  ]);
  const faqJsonLd = generateFaqJsonLd(faqItems);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ClassesBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Classes", href: "/classes" },
              { label: classHub.label },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  {classHub.label} Hub
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{classHub.heroTitle}</h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">{heroDescription}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="https://wa.me/918796367754?text=Hi%20BoardPeFocus%2C%20I%20need%20help%20with%20this%20class-specific%20board%20tutoring%20path%20in%20Gurgaon." target="_blank" rel="noopener noreferrer">
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
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Class identity</p>
                <div className="mt-5 space-y-3">
                  {classHub.identityPoints.map((item) => (
                    <div key={item} className="rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white/85">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <ClassesSection
              eyebrow="Board Pathways"
              title={`${classHub.label} board routes that feel clear and commercially useful`}
              description="These board cards let parents start with class level and still move into the correct board-specific page without confusion."
            >
              <div className="grid gap-6 lg:grid-cols-3">
                {classHub.boardPathways.map((pathway) => (
                  <Link
                    key={pathway.href}
                    href={pathway.href}
                    className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-primary/15 hover:shadow-lg"
                  >
                    <h2 className="text-2xl font-bold text-primary">{pathway.board}</h2>
                    <p className="mt-4 text-sm leading-7 text-muted-foreground">{pathway.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {pathway.keySubjects.map((subject) => (
                        <span
                          key={subject}
                          className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                    <div className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      Explore board path
                      <BookOpen className="h-4 w-4 text-accent" />
                    </div>
                  </Link>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Subject Cards"
              title={`${classHub.label} subject pathways`}
              description="The subject grid stays focused on the combinations parents actually search for, without turning into a directory wall."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {classHub.subjectCards.map((subject) => (
                  <Link
                    key={subject.href}
                    href={subject.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-primary">{subject.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{subject.description}</p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      {subject.boards.map((board) => (
                        <span
                          key={board}
                          className="rounded-full border border-border/60 bg-muted/20 px-3 py-1 text-xs font-semibold text-muted-foreground"
                        >
                          {board}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Student Pain Points"
              title={`${classHub.label} pressure points families usually want solved`}
              description="This section keeps the copy parent-friendly, premium, and close to what actually drives tutoring decisions."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {classHub.painPoints.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
                    <p className="text-sm leading-7 text-foreground">{item}</p>
                  </div>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Exam Support"
              title={`${classHub.label} board-prep support should feel more structured than generic tuition`}
              description="The point is clarity: board pattern familiarity, revision planning, sample papers, and cleaner one-to-one correction."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {classHub.examSupport.map((item) => (
                  <div key={item} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{item}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="Subject Cluster Mapping"
              title={`${classHub.label} subject clusters mapped against board pathways`}
              description="This helps parents connect subjects with the correct board route without overloading the page."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                {classHub.mappingCards.map((card) => (
                  <div key={card.title} className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                    <h3 className="text-2xl font-bold text-primary">{card.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{card.description}</p>
                    <div className="mt-6 space-y-4">
                      {card.items.map((item) => (
                        <Link
                          key={`${card.title}-${item.subject}`}
                          href={item.href}
                          className="block rounded-[1.5rem] border border-border/60 bg-muted/20 p-4 transition-all duration-300 hover:border-primary/20 hover:bg-white hover:shadow-sm"
                        >
                          <div className="flex flex-wrap items-center justify-between gap-4">
                            <div>
                              <p className="font-semibold text-primary">{item.subject}</p>
                              <div className="mt-2 flex flex-wrap gap-2">
                                {item.boards.map((board) => (
                                  <span
                                    key={board}
                                    className="rounded-full border border-primary/10 bg-primary/5 px-3 py-1 text-xs font-semibold text-primary"
                                  >
                                    {board}
                                  </span>
                                ))}
                              </div>
                            </div>
                            <BookOpen className="h-5 w-5 shrink-0 text-accent" />
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </ClassesSection>

            <ClassesSection
              eyebrow="School-Aware Relevance"
              title={`${classHub.label} support for families studying in relevant Gurgaon schools`}
              description="The wording stays careful and useful: school-aware relevance, not affiliation claims."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {schools.map((school) => {
                  const note = classHub.schoolReferences.find((item) => item.slug === school.slug)?.note;

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
            </ClassesSection>

            <ClassesSection
              eyebrow="Related Gurgaon Areas"
              title={`${classHub.label} support across key Gurgaon corridors`}
              description="This keeps the class hub linked to the Areas system so locality still informs tutor matching."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {areas.map((area) => {
                  const note = classHub.areaReferences.find((item) => item.slug === area.slug)?.note;

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
            </ClassesSection>

            <FAQ
              title={`${classHub.label} FAQs`}
              subtitle={`Visible answers for parents exploring ${classHub.label.toLowerCase()} tutoring in Gurgaon.`}
              items={faqItems}
              columns={2}
            />

            <ClassesRelatedLinks links={classHub.relatedLinks} />

            <ClassesCtaBlock title={classHub.ctaTitle} description={classHub.ctaDescription} />
          </div>
        </div>
      </section>
    </div>
  );
}

function LiveClassPage({ classLevel }: { classLevel: LiveClassLevel }) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Classes", url: absoluteUrl("/classes") },
    { name: classLevel.name, url: absoluteUrl(getClassHubPath(classLevel.slug)) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="pt-32">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Class</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
              {classLevel.name} Home Tutors in Gurgaon
            </h1>
            {classLevel.description ? (
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{classLevel.description}</p>
            ) : null}
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/classes">
                <Button variant="outline" className="rounded-xl px-6">Back to Classes</Button>
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
