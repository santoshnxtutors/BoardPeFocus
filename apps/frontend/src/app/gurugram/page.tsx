import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { mockBoards, mockSectors, mockSchools } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Target, GraduationCap, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/faq/FAQ";

export const metadata = constructMetadata({
  title: "Premium Home Tutors in Gurugram | BoardPeFocus",
  description: "Find the top 2% of board-specialized home tutors in Gurugram. Covering Golf Course Road, Sector 50, Phase 5, and all major localities for CBSE, ICSE, and IB DP.",
});

export default function GurugramCityPage() {
  return (
    <div className="bg-background min-h-screen">
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 text-primary overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-accent/10 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <FadeIn direction="up">
            <div className="inline-flex items-center gap-2 bg-primary/5 text-primary px-4 py-2 rounded-full text-sm font-bold mb-6">
              <MapPin className="w-4 h-4" /> Gurugram Exclusive
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 tracking-tight leading-tight">
              Gurugram's Premium <br className="hidden md:block" /> Board Preparation
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed mb-10">
              We exclusively match Class 10 and 12 students in Gurugram with highly vetted educators who understand the internal marking schemes of top city schools.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg">
                Find a Tutor Near You
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Boards Grid */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Board Curricula We Support</h2>
              <p className="text-lg text-muted-foreground">Expert educators specialized in specific boards.</p>
            </div>
            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockBoards.map((board) => (
                <StaggerItem key={board.slug}>
                  <Link href={`/gurugram/${board.slug}`}>
                    <Card className="glass-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/50 h-full">
                      <CardContent className="p-8">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                          <Target className="w-6 h-6 text-primary" />
                        </div>
                        <h3 className="font-heading font-bold text-2xl text-foreground mb-2">{board.name}</h3>
                        <p className="text-muted-foreground text-sm mb-6">{board.description}</p>
                        <div className="flex items-center text-primary font-bold text-sm">
                          Explore {board.name} Tutors <ChevronRight className="w-4 h-4 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </FadeIn>
        </div>
      </section>

      {/* Localities & Schools */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <FadeIn direction="right">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-8 flex items-center gap-3">
                <MapPin className="w-8 h-8 text-accent" /> Major Localities
              </h2>
              <div className="space-y-4">
                {mockSectors.map(sector => (
                  <Link key={sector.slug} href={`/gurugram/sectors/${sector.slug}`}>
                    <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-colors flex justify-between items-center group">
                      <div>
                        <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors">{sector.name}</h3>
                        <p className="text-sm text-muted-foreground mt-1">Including {sector.societies.slice(0, 2).join(", ")}</p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-8 flex items-center gap-3">
                <GraduationCap className="w-8 h-8 text-secondary" /> Familiar with Top Schools
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {mockSchools.map(school => (
                  <Link key={school.slug} href={`/gurugram/schools/${school.slug}`}>
                    <div className="p-5 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-colors h-full flex flex-col justify-center">
                      <h3 className="font-bold text-foreground mb-1">{school.name}</h3>
                      <p className="text-xs text-muted-foreground">{school.boards.join(", ")} • {school.location}</p>
                    </div>
                  </Link>
                ))}
              </div>
              <div className="mt-6 text-sm text-muted-foreground p-4 bg-muted rounded-xl">
                Our tutors are familiar with the internal assessment patterns and standard expectations of these institutions, ensuring your child's preparation perfectly aligns with school criteria.
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-muted/20 border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQ 
            showViewMore={true}
            title="Gurugram Tutoring FAQs"
            subtitle="Specific answers for Gurugram parents looking for board prep."
            items={[
              {
                question: "Do you provide home tutors in New Gurugram?",
                answer: "Yes, we cover sectors 80-100 including areas like Sector 82 (Vatika India Next), Sector 90, and DLF Garden City. Our network of tutors is spread across the entire city."
              },
              {
                question: "How do you ensure tutor quality in Gurugram?",
                answer: "We focus on educators who are either teaching in or have taught in premium Gurugram schools like Heritage, Pathways, and DPS. They must pass our rigorous 5-step vetting process before they are matched with students."
              },
              {
                question: "Are your classes available only in person?",
                answer: "While we specialize in high-impact physical home tutoring for board classes, we also offer premium online sessions for students who prefer a digital setup or have tight schedules."
              }
            ]}
            columns={2}
          />
        </div>
      </section>
    </div>
  );
}
