import { mockSectors, mockTutors } from "@/data/mock";
import { notFound } from "next/navigation";
import { TutorCard } from "@/components/cards/TutorCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Target, GraduationCap, ChevronRight, School as SchoolIcon } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ sector: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { sector: sectorSlug } = await params;
  const sector = mockSectors.find(s => s.slug === sectorSlug);
  
  if (!sector) return constructMetadata({ title: "Sector Not Found", noIndex: true });

  return constructMetadata({
    title: `Premium Home Tutors in ${sector.name}, Gurugram | BoardPeFocus`,
    description: `Find board-specialized home tutors in ${sector.name}, Gurugram. Serving ${sector.societies.join(", ")}. Expert preparation for CBSE, ICSE, and IB.`,
    pathname: `/gurugram/sectors/${sector.slug}`,
  });
}

export default async function SectorPage({ params }: PageProps) {
  const { sector: sectorSlug } = await params;
  const sector = mockSectors.find(s => s.slug === sectorSlug);

  if (!sector) notFound();

  // Find tutors serving this sector (based on mock locations)
  const relatedTutors = mockTutors.filter(t => 
    t.locations.some(loc => loc.toLowerCase() === sector.name.toLowerCase())
  );
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: sector.name, url: absoluteUrl(`/gurugram/sectors/${sector.slug}`) },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm text-primary px-4 py-2 rounded-full text-sm font-bold mb-6 shadow-sm border border-border">
              <MapPin className="w-4 h-4 text-accent" /> Gurugram Localities
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-6 leading-tight">
              Home Tutors in <span className="text-accent">{sector.name}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Personalized board preparation for students living in {sector.societies.join(", ")}.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Tutors List */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-heading font-bold text-primary">Tutors in this Area</h2>
                <Link href="/search">
                  <Button variant="link" className="text-primary font-bold">
                    View all tutors <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>

              {relatedTutors.length > 0 ? (
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {relatedTutors.map((tutor) => (
                    <StaggerItem key={tutor.id}>
                      <TutorCard tutor={{
                        ...tutor,
                        experienceYears: tutor.experienceYrs,
                        studentsTaught: tutor.studentsTaught,
                        areas: tutor.locations,
                        about: tutor.about || "",
                      }} />
                    </StaggerItem>
                  ))}
                </StaggerContainer>
              ) : (
                <div className="p-12 text-center bg-muted/20 rounded-3xl border border-dashed border-border">
                  <p className="text-muted-foreground mb-4">We are currently expanding our network in {sector.name}.</p>
                  <Link href="/search">
                    <Button>Explore All Tutors</Button>
                  </Link>
                </div>
              )}

              {/* Societies Grid */}
              <div className="mt-20">
                <h2 className="text-2xl font-heading font-bold text-primary mb-8 flex items-center gap-3">
                  <MapPin className="w-6 h-6 text-accent" /> Societies We Cover in {sector.name}
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {sector.societies.map(society => (
                    <Link 
                      key={society} 
                      href={`/gurugram/sectors/${sectorSlug}/${society.toLowerCase().replace(/\s+/g, '-')}`}
                    >
                      <div className="p-6 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-md transition-all group">
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">{society}</p>
                        <p className="text-xs text-muted-foreground mt-1">Tutors available</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <LeadForm 
                  title="Request a Tutor" 
                  subtitle={`Get matched with the best tutors in ${sector.name} for your child's board exams.`}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
