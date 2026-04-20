import { mockSectors, mockTutors } from "@/data/mock";
import { notFound } from "next/navigation";
import { TutorCard } from "@/components/cards/TutorCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, ChevronRight, Home, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ sector: string; society: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { sector: sectorSlug, society: societySlug } = await params;
  const sector = mockSectors.find(s => s.slug === sectorSlug);
  const society = societySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  
  if (!sector) return constructMetadata({ title: "Page Not Found", noIndex: true });

  return constructMetadata({
    title: `Premium Home Tutors in ${society}, ${sector.name} | BoardPeFocus`,
    description: `Find board-specialized home tutors serving ${society}, Gurugram. Expert home tutoring for CBSE, ICSE, and IB students in ${sector.name}.`,
    pathname: `/gurugram/sectors/${sectorSlug}/${societySlug}`,
  });
}

export default async function SocietyPage({ params }: PageProps) {
  const { sector: sectorSlug, society: societySlug } = await params;
  const sector = mockSectors.find(s => s.slug === sectorSlug);
  const society = societySlug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');

  if (!sector) notFound();

  // Find tutors serving this sector/society
  const filteredTutors = mockTutors.filter(t => 
    t.locations.some(loc => loc.toLowerCase() === sector.name.toLowerCase() || loc.toLowerCase() === society.toLowerCase())
  ).slice(0, 6);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: sector.name, url: absoluteUrl(`/gurugram/sectors/${sector.slug}`) },
    { name: society, url: absoluteUrl(`/gurugram/sectors/${sectorSlug}/${societySlug}`) },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="flex items-center gap-2 mb-6 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <Link href={`/gurugram/sectors/${sectorSlug}`} className="hover:text-primary transition-colors">{sector.name}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary">{society}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-6 leading-tight">
              Home Tutors in <br /> <span className="text-accent">{society}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Elite board-focused home tutoring for students residing in {society}. Premium educators delivered to your doorstep.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-20">
              
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-10">Top Tutors in Your Neighborhood</h2>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {filteredTutors.map((tutor) => (
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
                {filteredTutors.length === 0 && (
                  <div className="p-12 text-center bg-muted/20 rounded-3xl border border-dashed border-border">
                    <p className="text-muted-foreground">We are currently matching new specialists for {society}.</p>
                    <Link href="/contact" className="mt-4 inline-block">
                      <Button>Request a Local Match</Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <Home className="w-6 h-6 text-accent" /> Doorstep Convenience
                  </h3>
                  <p className="text-muted-foreground">Our tutors come to your home in {society}, saving travel time and providing a comfortable learning environment.</p>
                </div>
                <div className="p-8 rounded-3xl bg-primary/5 border border-primary/10">
                  <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-6 h-6 text-accent" /> Safe & Verified
                  </h3>
                  <p className="text-muted-foreground">Every tutor serving {society} undergoes strict background checks and academic vetting for your peace of mind.</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <LeadForm 
                  title={`Tutor in ${society}`} 
                  subtitle={`Connect with the best home tutors available in ${society} today.`}
                  defaultValues={{ location: society }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
