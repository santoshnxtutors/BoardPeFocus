import Link from "next/link";
import { notFound } from "next/navigation";
import { GraduationCap, Home, ShieldCheck } from "lucide-react";
import { LeadForm } from "@/components/forms/LeadForm";
import { TutorCard } from "@/components/cards/TutorCard";
import { AreaBreadcrumbs } from "@/components/areas/AreaBreadcrumbs";
import { AreaRelatedLinks } from "@/components/areas/AreaRelatedLinks";
import { AreaSection } from "@/components/areas/AreaSection";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAreaCluster, getSectorDetail, getSocietyDetail } from "@/data/areas";
import { mockSchools, mockTutors } from "@/data/mock";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

interface PageProps {
  params: Promise<{ sector: string; society: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { sector: sectorSlug, society: societySlug } = await params;
  const sector = getSectorDetail(sectorSlug);
  const society = getSocietyDetail(sectorSlug, societySlug);

  if (!sector || !society) return constructMetadata({ title: "Page Not Found", noIndex: true });

  return constructMetadata({
    title: `Premium Home Tutors in ${society.name}, ${sector.name} | BoardPeFocus`,
    description: `${society.summary} Explore premium home tutoring in ${society.name}, ${sector.name}, with nearby school relevance and sector-aware board preparation.`,
    pathname: `/gurugram/sectors/${sectorSlug}/${societySlug}`,
  });
}

export default async function SocietyPage({ params }: PageProps) {
  const { sector: sectorSlug, society: societySlug } = await params;
  const sector = getSectorDetail(sectorSlug);
  const society = getSocietyDetail(sectorSlug, societySlug);

  if (!sector || !society) notFound();

  const cluster = getAreaCluster(sector.clusterSlug);
  const nearbySchools = sector.nearbySchoolSlugs
    .map((slug) => mockSchools.find((school) => school.slug === slug))
    .filter((school): school is (typeof mockSchools)[number] => Boolean(school));
  const filteredTutors = mockTutors.filter((tutor) =>
    tutor.locations.some(
      (location) =>
        location.toLowerCase() === sector.name.toLowerCase() || location.toLowerCase() === society.name.toLowerCase(),
    ),
  );

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurgaon Areas", url: absoluteUrl("/gurgaon-area") },
    ...(cluster ? [{ name: cluster.name, url: absoluteUrl(`/gurgaon-area/${cluster.slug}`) }] : []),
    { name: sector.name, url: absoluteUrl(`/gurugram/sectors/${sector.slug}`) },
    { name: society.name, url: absoluteUrl(`/gurugram/sectors/${sectorSlug}/${societySlug}`) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="relative overflow-hidden pt-32 pb-24">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="container mx-auto max-w-7xl px-4">
          <AreaBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Gurgaon Areas", href: "/gurgaon-area" },
              ...(cluster ? [{ label: cluster.name, href: `/gurgaon-area/${cluster.slug}` }] : []),
              { label: sector.name, href: `/gurugram/sectors/${sector.slug}` },
              { label: society.name },
            ]}
          />

          <FadeIn direction="up" className="max-w-4xl">
            <div className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">Society Page</div>
            <h1 className="mt-5 text-4xl font-extrabold text-primary md:text-6xl">{`Home Tutors in ${society.name}`}</h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">
              {society.summary} This micro-location page stays focused on convenience, school relevance, and premium one-to-one board preparation.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button className="rounded-xl px-6">Get Matched</Button>
              </Link>
              <Link href={`/gurugram/sectors/${sector.slug}`}>
                <Button variant="outline" className="rounded-xl px-6">
                  Back to {sector.name}
                </Button>
              </Link>
            </div>
          </FadeIn>

          <div className="mt-16 grid gap-14 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="space-y-16">
              <AreaSection
                eyebrow="Tutor Matches"
                title={`Tutors aligned with ${society.name}`}
                description="This section stays honest about active public matches while still keeping the premium, locality-led flow intact."
              >
                {filteredTutors.length > 0 ? (
                  <StaggerContainer className="grid gap-8 md:grid-cols-2">
                    {filteredTutors.map((tutor) => (
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
                    We can still match for {society.name} from our broader Gurgaon tutor network. Share your board, subject, and schedule preferences and we will shortlist accordingly.
                  </div>
                )}
              </AreaSection>

              <AreaSection
                eyebrow="Why this micro-location works"
                title={`Why premium families in ${society.name} often prefer home tutoring`}
              >
                <div className="grid gap-5 md:grid-cols-2">
                  <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
                      <Home className="h-5 w-5 text-accent" />
                      Doorstep convenience
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      Tutor visits are easier to sustain when the society access flow is predictable and weekday timing is protected.
                    </p>
                  </div>
                  <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-6">
                    <h3 className="flex items-center gap-2 text-xl font-bold text-primary">
                      <ShieldCheck className="h-5 w-5 text-accent" />
                      Practical matching
                    </h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                      We look at board, subject, tutor quality, and route practicality together so the home-tutoring plan stays stable.
                    </p>
                  </div>
                </div>
              </AreaSection>

              <AreaSection
                eyebrow="Nearby Schools"
                title={`School relevance around ${society.name}`}
                description="These links help parents continue into nearby school pages where locality-school context is useful."
              >
                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {nearbySchools.map((school) => (
                    <Link
                      key={school.slug}
                      href={`/gurugram/schools/${school.slug}`}
                      className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <GraduationCap className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold">{school.name}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">
                        Useful where school commute patterns and internal expectations influence the tutoring conversation.
                      </p>
                      <p className="mt-4 text-sm font-medium text-foreground">{school.location}</p>
                    </Link>
                  ))}
                </div>
              </AreaSection>

              <AreaRelatedLinks
                links={[
                  {
                    title: `Back to ${sector.name}`,
                    description: `Return to the sector page for ${sector.name} and compare nearby societies.`,
                    href: `/gurugram/sectors/${sector.slug}`,
                  },
                  {
                    title: cluster ? `${cluster.name} corridor page` : "Gurgaon Areas hub",
                    description: cluster
                      ? `Move up to the corridor page for broader Gurgaon area discovery.`
                      : "Return to the main Gurgaon areas page.",
                    href: cluster ? `/gurgaon-area/${cluster.slug}` : "/gurgaon-area",
                  },
                  {
                    title: "Nearby school page",
                    description: "Continue into a school-aware page for sharper tutor discovery.",
                    href: `/gurugram/schools/${nearbySchools[0]?.slug ?? "dps-sector-45"}`,
                  },
                  {
                    title: "Browse tutors",
                    description: "Jump straight into the full tutor discovery page if you are ready to compare profiles.",
                    href: "/search",
                  },
                ]}
              />
            </div>

            <div className="space-y-6">
              <div className="sticky top-24 space-y-6">
                <LeadForm
                  title={`Tutor in ${society.name}`}
                  subtitle={`Tell us the board, subject, and timing you need in ${society.name}.`}
                  defaultValues={{ location: society.name }}
                />

                <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Locality snapshot</p>
                  <div className="mt-4 space-y-3 text-sm leading-7 text-muted-foreground">
                    <p>Sector: {sector.name}</p>
                    <p>High-demand subjects: {sector.subjectDemand.join(" • ")}</p>
                    <p>Nearby sectors: {sector.adjacentSectors.join(" • ")}</p>
                  </div>
                  <Link href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20a%20home%20tutor%20in%20my%20society." target="_blank" className="mt-6 inline-block">
                    <Button variant="outline" className="rounded-xl">
                      WhatsApp Us
                    </Button>
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
