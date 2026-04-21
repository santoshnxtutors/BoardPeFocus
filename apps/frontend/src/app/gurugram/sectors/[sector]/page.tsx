import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, GraduationCap, MapPin } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { TutorCard } from "@/components/cards/TutorCard";
import { AreaBreadcrumbs } from "@/components/areas/AreaBreadcrumbs";
import { AreaRelatedLinks } from "@/components/areas/AreaRelatedLinks";
import { AreaSection } from "@/components/areas/AreaSection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAreaCluster, getSectorDetail } from "@/data/areas";
import { mockSchools, mockTutors } from "@/data/mock";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ sector: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { sector: sectorSlug } = await params;
  const sector = getSectorDetail(sectorSlug);

  if (!sector) return constructMetadata({ title: "Sector Not Found", noIndex: true });

  return constructMetadata({
    title: `Premium Home Tutors in ${sector.name}, Gurugram | BoardPeFocus`,
    description: `${sector.positioning} Explore nearby societies, school relevance, and board-specialized home tutors in ${sector.name}, Gurugram.`,
    pathname: `/gurugram/sectors/${sector.slug}`,
  });
}

export default async function SectorPage({ params }: PageProps) {
  const { sector: sectorSlug } = await params;
  const sector = getSectorDetail(sectorSlug);

  if (!sector) notFound();

  const cluster = getAreaCluster(sector.clusterSlug);
  const relatedTutors = mockTutors.filter((tutor) =>
    tutor.locations.some((location) => location.toLowerCase() === sector.name.toLowerCase()),
  );
  const nearbySchools = sector.nearbySchoolSlugs
    .map((slug) => mockSchools.find((school) => school.slug === slug))
    .filter((school): school is (typeof mockSchools)[number] => Boolean(school));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurgaon Areas", url: absoluteUrl("/gurgaon-area") },
    ...(cluster ? [{ name: cluster.name, url: absoluteUrl(`/gurgaon-area/${cluster.slug}`) }] : []),
    { name: sector.name, url: absoluteUrl(`/gurugram/sectors/${sector.slug}`) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="container mx-auto max-w-7xl px-4">
          <AreaBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Gurgaon Areas", href: "/gurgaon-area" },
              ...(cluster ? [{ label: cluster.name, href: `/gurgaon-area/${cluster.slug}` }] : []),
              { label: sector.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <FadeIn direction="up">
              <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-2 text-primary">
                <MapPin className="mr-2 h-4 w-4 text-accent" />
                Sector Page
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold text-primary md:text-6xl">{`Home Tutors in ${sector.name}`}</h1>
              <p className="mt-6 max-w-3xl text-lg leading-8 text-muted-foreground md:text-xl">{sector.positioning}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                {sector.boardFocus.map((board) => (
                  <Badge key={board} variant="outline" className="rounded-full border-border/80 bg-white px-4 py-2 text-foreground">
                    {board}
                  </Badge>
                ))}
              </div>
            </FadeIn>

            <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Why this sector matters</p>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{sector.microcopy}</p>
              <div className="mt-5 space-y-3 text-sm text-foreground">
                <p>Adjacent sectors: {sector.adjacentSectors.join(" • ")}</p>
                <p>High-demand subjects: {sector.subjectDemand.join(" • ")}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="space-y-16">
              <AreaSection
                eyebrow="Tutor Matches"
                title={`Tutors currently aligned with ${sector.name}`}
                description="We keep this section grounded in real availability rather than making inflated locality claims."
              >
                {relatedTutors.length > 0 ? (
                  <StaggerContainer className="grid gap-8 md:grid-cols-2">
                    {relatedTutors.map((tutor) => (
                      <StaggerItem key={tutor.id}>
                        <TutorCard
                          tutor={{
                            ...tutor,
                            experienceYears: tutor.experienceYrs,
                            studentsTaught: tutor.studentsTaught,
                            areas: tutor.locations,
                            about: tutor.about || "",
                          }}
                        />
                      </StaggerItem>
                    ))}
                  </StaggerContainer>
                ) : (
                  <div className="rounded-[2rem] border border-dashed border-border bg-muted/20 p-8 text-muted-foreground">
                    We are expanding our tutor roster in {sector.name}. Tell us your preferred subjects and timings and we will shortlist from our active Gurgaon network.
                  </div>
                )}
              </AreaSection>

              <AreaSection
                eyebrow="Society Pages"
                title={`Premium societies in ${sector.name}`}
                description="Move from sector discovery into the society page that best matches your home's access and schedule preferences."
              >
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {sector.societies.map((society) => (
                    <Link
                      key={society.slug}
                      href={`/gurugram/sectors/${sector.slug}/${society.slug}`}
                      className="group rounded-[1.75rem] border border-border/60 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{sector.name}</p>
                      <h3 className="mt-3 text-xl font-bold text-primary">{society.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{society.summary}</p>
                      <div className="mt-5 text-sm font-semibold text-primary">
                        Explore Society <ChevronRight className="ml-1 inline h-4 w-4" />
                      </div>
                    </Link>
                  ))}
                </div>
              </AreaSection>

              <AreaSection
                eyebrow="Nearby Schools"
                title={`School relevance around ${sector.name}`}
                description="These school pages are included only because families in this sector often care about locality-school alignment when choosing a tutor."
              >
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {nearbySchools.map((school) => (
                    <Link
                      key={school.slug}
                      href={`/gurugram/schools/${school.slug}`}
                      className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <GraduationCap className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold">{school.name}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        Relevant for parents who want school-aware tutoring without implying any official tie-up.
                      </p>
                      <p className="mt-4 text-sm font-medium text-foreground">{school.location}</p>
                    </Link>
                  ))}
                </div>
              </AreaSection>

              <AreaRelatedLinks
                links={[
                  {
                    title: cluster ? `${cluster.name} corridor page` : "Back to Gurgaon Areas Hub",
                    description: cluster
                      ? `Move up one level to compare sectors within ${cluster.name}.`
                      : "Return to the main Gurgaon areas page.",
                    href: cluster ? `/gurgaon-area/${cluster.slug}` : "/gurgaon-area",
                  },
                  {
                    title: "Browse tutors",
                    description: "Switch from locality discovery to full tutor profile discovery.",
                    href: "/search",
                  },
                  {
                    title: "CBSE tutors in Gurugram",
                    description: "Useful for families narrowing by board after choosing the right sector.",
                    href: "/gurugram/cbse",
                  },
                  {
                    title: `${sector.subjectDemand[0]} support`,
                    description: "Jump from the sector flow into a subject-specific tutoring page.",
                    href: `/gurugram/cbse/${sector.subjectDemand[0].toLowerCase().replace(/\s+/g, "-")}`,
                  },
                ]}
              />
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <LeadForm
                  title={`Request a Tutor in ${sector.name}`}
                  subtitle={`Tell us your child's board, subjects, and timing preferences for ${sector.name}.`}
                  defaultValues={{ location: sector.name }}
                />

                <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Subject demand</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {sector.subjectDemand.map((subject) => (
                      <Badge key={subject} variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-3 py-1 text-primary">
                        {subject}
                      </Badge>
                    ))}
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
