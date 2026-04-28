import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, GraduationCap, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AreaBreadcrumbs } from "@/components/areas/AreaBreadcrumbs";
import { AreaRelatedLinks } from "@/components/areas/AreaRelatedLinks";
import { AreaSection } from "@/components/areas/AreaSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { areaClusters, getAreaCluster, getClusterSectors } from "@/data/areas";
import { mockSchools } from "@/data/mock";
import { getBoardPath } from "@/app/boards/_data/boards";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { getSchoolHubLink } from "@/app/schools/_data/linking";

interface PageProps {
  params: Promise<{ cluster: string }>;
}

export async function generateStaticParams() {
  return areaClusters.map((cluster) => ({ cluster: cluster.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { cluster: clusterSlug } = await params;
  const cluster = getAreaCluster(clusterSlug);

  if (!cluster) return constructMetadata({ title: "Area Not Found", noIndex: true });

  return constructMetadata({
    title: `${cluster.name} Home Tutors in Gurgaon | BoardPeFocus`,
    description: `${cluster.shortDescription} Explore sectors, premium societies, nearby school relevance, and premium board-exam home tutoring across ${cluster.name}.`,
    pathname: `/gurgaon-area/${cluster.slug}`,
  });
}

export default async function AreaClusterPage({ params }: PageProps) {
  const { cluster: clusterSlug } = await params;
  const cluster = getAreaCluster(clusterSlug);

  if (!cluster) notFound();

  const sectors = getClusterSectors(cluster.slug);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurgaon Areas", url: absoluteUrl("/gurgaon-area") },
    { name: cluster.name, url: absoluteUrl(`/gurgaon-area/${cluster.slug}`) },
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
              { label: cluster.name },
            ]}
          />

          <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div className="max-w-3xl">
              <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-4 py-2 text-primary">
                <MapPin className="mr-2 h-4 w-4 text-accent" />
                Gurgaon Corridor
              </Badge>
              <h1 className="mt-6 text-4xl font-extrabold text-primary md:text-6xl">{cluster.name} Home Tutors in Gurgaon</h1>
              <p className="mt-6 text-lg leading-8 text-muted-foreground md:text-xl">{cluster.positioning}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link href="/contact">
                  <Button size="lg" className="rounded-xl px-6">
                    Get Matched
                  </Button>
                </Link>
                <Link href="/gurgaon-area">
                  <Button size="lg" variant="outline" className="rounded-xl px-6">
                    Back to Areas Hub
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Cluster snapshot</p>
              <div className="mt-5 space-y-4 text-sm leading-7 text-muted-foreground">
                <p>{cluster.shortDescription}</p>
                <p>Key sectors: {sectors.map((sector) => sector.name).join(" • ")}</p>
                <p>Premium societies: {cluster.featuredSocieties.join(" • ")}</p>
              </div>
            </div>
          </div>

          <div className="mt-16 space-y-20">
            <AreaSection
              eyebrow="Sector Flow"
              title={`Explore sectors within ${cluster.name}`}
              description="Use these sector pages to move from corridor-level discovery into society-specific tutoring relevance."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {sectors.map((sector) => (
                  <Link
                    key={sector.slug}
                    href={`/gurugram/sectors/${sector.slug}`}
                    className="group rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Sector page</p>
                    <h2 className="mt-3 text-2xl font-bold text-primary">{sector.name}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{sector.microcopy}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {sector.societies.slice(0, 3).map((society) => (
                        <Badge key={society.slug} variant="outline" className="rounded-full border-border/80 bg-muted/30 px-3 py-1 text-foreground">
                          {society.name}
                        </Badge>
                      ))}
                    </div>
                    <div className="mt-5 text-sm font-semibold text-primary">
                      Explore Sector <ArrowRight className="ml-1 inline h-4 w-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </AreaSection>

            <AreaSection
              eyebrow="School Relevance"
              title="Nearby school corridors that often influence tutor demand"
              description="These links help parents move from area discovery into school-aware tutor discovery without implying any endorsement or tie-up."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {cluster.schoolRelevance.map((school) => {
                  const schoolData = mockSchools.find((item) => item.slug === school.slug);

                  return (
                    <Link
                      key={school.slug}
                      href={getSchoolHubLink(school.slug)}
                      className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <GraduationCap className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold">{school.name}</h3>
                      </div>
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">{school.note}</p>
                      {schoolData ? <p className="mt-4 text-sm font-medium text-foreground">{schoolData.location}</p> : null}
                    </Link>
                  );
                })}
              </div>
            </AreaSection>

            <AreaSection
              eyebrow="Premium Society Highlights"
              title={`Micro-areas worth noticing in ${cluster.name}`}
              description="Short society notes make it easier to understand where premium in-home tutoring tends to work especially well."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {sectors.flatMap((sector) =>
                  sector.societies.slice(0, 2).map((society) => (
                    <Link
                      key={`${sector.slug}-${society.slug}`}
                      href={`/gurugram/sectors/${sector.slug}/${society.slug}`}
                      className="rounded-[1.75rem] border border-border/60 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{sector.name}</p>
                      <h3 className="mt-3 text-xl font-bold text-primary">{society.name}</h3>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{society.summary}</p>
                    </Link>
                  )),
                )}
              </div>
            </AreaSection>

            <Card className="rounded-[2rem] border-border/60 bg-primary text-white">
              <CardContent className="p-8 md:p-10">
                <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/60">CTA</p>
                    <h2 className="mt-4 text-3xl font-bold">{`Need a tutor in ${cluster.name}?`}</h2>
                    <p className="mt-4 text-lg leading-8 text-white/75">
                      Tell us the sector, society, board, and subjects. We will use the area flow to match you more intelligently.
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Link href="/contact">
                      <Button className="rounded-xl bg-white px-5 text-primary hover:bg-white/90">Request Callback</Button>
                    </Link>
                    <Link href="https://wa.me/918796367754?text=Hi%20BoardPeFocus%2C%20I%20need%20a%20tutor%20in%20Gurgaon." target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="rounded-xl border-white/20 bg-white/10 px-5 text-white hover:bg-white/15 hover:text-white">
                        WhatsApp Us
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>

            <AreaRelatedLinks
              links={[
                {
                  title: "Back to Gurgaon Areas Hub",
                  description: "Return to the master area page and compare other corridors across Gurugram.",
                  href: "/gurgaon-area",
                },
                {
                  title: "Browse Tutors",
                  description: "Move from location discovery to tutor profile discovery without extra clicks.",
                  href: "/search",
                },
                {
                  title: "CBSE Tutors in Gurgaon",
                  description: "Useful for board-specific parent journeys after locality discovery.",
                  href: getBoardPath("cbse"),
                },
                {
                  title: "Top School Pages",
                  description: "Continue from corridor relevance into school-aware tutoring pages.",
                  href: getSchoolHubLink(cluster.schoolRelevance[0]?.slug ?? "dps-sector-45"),
                },
              ]}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
