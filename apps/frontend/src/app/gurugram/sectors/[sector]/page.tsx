import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { mockSectors, mockBoards, mockTutors } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, CheckCircle2, Building2, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";

export async function generateMetadata({ params }: { params: { sector: string } }) {
  const sector = mockSectors.find(s => s.slug === params.sector);
  if (!sector) return {};
  
  return constructMetadata({
    title: `Premium Home Tutors in ${sector.name}, Gurugram | BoardPeFocus`,
    description: `Find top-rated home tutors covering CBSE, ICSE, and IB DP near ${sector.name} and surrounding societies like ${sector.societies[0]}.`,
  });
}

export default function SectorLandingPage({ params }: { params: { sector: string } }) {
  const sector = mockSectors.find(s => s.slug === params.sector);
  if (!sector) notFound();

  // Find tutors serving this location
  const relevantTutors = mockTutors.filter(t => t.locations.includes(sector.name));

  return (
    <div className="bg-background min-h-screen">
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 text-white bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <FadeIn direction="up">
            <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-md px-3 py-1 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4 mr-2 inline" /> Local Gurugram Tutors
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 tracking-tight leading-tight">
              Home Tutors in <br className="hidden md:block" /> <span className="text-accent">{sector.name}</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Skip the commute. Get Gurugram's top 2% board-focused educators delivered directly to your home in {sector.name}.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4 text-primary-foreground/80 text-sm mb-10">
              <span className="flex items-center gap-1 font-medium bg-white/10 px-3 py-1.5 rounded-full"><Building2 className="w-4 h-4" /> Near {sector.societies[0]}</span>
              {sector.societies[1] && <span className="flex items-center gap-1 font-medium bg-white/10 px-3 py-1.5 rounded-full"><Building2 className="w-4 h-4" /> Near {sector.societies[1]}</span>}
            </div>
            <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg bg-white text-primary hover:bg-white/90 font-bold">
              Match with a Tutor Nearby
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4 flex items-center gap-3">
                <UserCircle2 className="w-8 h-8 text-secondary" /> Tutors Available Near {sector.name}
              </h2>
              <p className="text-lg text-muted-foreground">Expert educators serving your immediate locality.</p>
            </div>
            
            {relevantTutors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relevantTutors.map(tutor => (
                  <Card key={tutor.id} className="glass-card hover:shadow-xl transition-all duration-300 border-border/50 h-full flex flex-col rounded-3xl overflow-hidden group">
                    <CardContent className="p-6 flex flex-col h-full justify-between">
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-full bg-primary/10 border-2 border-white shadow-sm flex items-center justify-center text-xl font-heading font-bold text-primary group-hover:scale-110 transition-transform">
                            {tutor.name.charAt(0)}
                          </div>
                          <div>
                            <h3 className="font-heading font-bold text-lg text-primary group-hover:text-accent transition-colors">{tutor.name}</h3>
                            <p className="text-xs font-medium text-secondary">{tutor.experienceYrs} Yrs Experience</p>
                          </div>
                        </div>
                        <div className="mb-4">
                           <p className="text-xs text-muted-foreground font-medium flex items-center gap-1 mb-2">
                              <MapPin className="w-3 h-3 text-accent" /> Available in {sector.name}
                           </p>
                           <div className="flex gap-2 flex-wrap">
                              {tutor.boards.map(b => <Badge key={b} variant="secondary" className="text-xs">{b}</Badge>)}
                           </div>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-6">{tutor.about}</p>
                      </div>
                      <Link href={`/tutors/${tutor.slug}`} className="w-full">
                        <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">View Profile</Button>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center bg-muted/50 rounded-3xl border border-dashed border-border text-muted-foreground max-w-2xl mx-auto">
                No public profiles currently match this exact locality filter. However, our network covers all of Gurugram. Click below to contact our advisors for a personalized match.
                <div className="mt-6">
                   <Link href="/contact">
                      <Button variant="outline" className="rounded-xl border-primary text-primary">Contact Academic Advisors</Button>
                   </Link>
                </div>
              </div>
            )}
          </FadeIn>

        </div>
      </section>
    </div>
  );
}
