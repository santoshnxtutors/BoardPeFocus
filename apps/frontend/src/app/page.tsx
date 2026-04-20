import { JsonLd } from "@/components/seo/JsonLd";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import {
  constructMetadata,
  generateOrganizationJsonLd,
  generateWebsiteJsonLd,
} from "@/lib/seo";
import { GraduationCap, MapPin, Star, BookOpen, Clock, ChevronRight, Target, ShieldCheck } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/faq/FAQ";
import { platformStats } from "@/data/stats";
import { mockTutors, mockBoards } from "@/data/mock";
import { TutorCard } from "@/components/cards/TutorCard";

export const metadata = constructMetadata({
  title: "Premium Home Tutors in Gurugram | BoardPeFocus",
  description: "Board-focused home tutors for Class 10 and 12 students in Gurugram. Explore expert tutors for CBSE, ICSE, IGCSE, and IB preparation.",
  pathname: "/",
});

export default function HomePage() {
  const organizationJsonLd = generateOrganizationJsonLd();
  const websiteJsonLd = generateWebsiteJsonLd();

  return (
    <div className="bg-background">
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={websiteJsonLd} />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-muted/30 pt-32 pb-32">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <FadeIn delay={0.1}>
            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary text-sm px-4 py-1.5 rounded-full shadow-sm font-bold">
              Gurugram's Premium Home Tutors
            </Badge>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-heading font-extrabold tracking-tight mb-8 text-primary leading-[1.1]">
              Board-focused preparation designed for <span className="text-accent relative inline-block">
                high performance.
                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent/30" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent" />
                </svg>
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.3}>
            <p className="text-lg md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
              Specialized home tutoring for CBSE, ICSE, IGCSE, and IB boards in Gurugram. We match you with top 2% educators to target 95%+.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/contact" className="w-full sm:w-auto">
                <Button size="lg" className="h-14 px-8 text-lg w-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl group transition-all duration-300 font-bold">
                  Get Matched with a Tutor
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/gurugram" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full rounded-xl border-primary/20 hover:bg-primary/5 text-primary font-bold">
                  Explore Boards
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* WHY US / PROOF STRIP */}
      <section className="border-y border-border/50 bg-white py-14 relative z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-border/50">
            {platformStats.map((stat) => (
              <StaggerItem key={stat.id}>
                <Link 
                  href={`/transparency#${stat.id}`} 
                  className="group block transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 drop-shadow-sm group-hover:text-accent transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider group-hover:text-primary transition-colors">
                    {stat.label}
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* BOARD CHOOSER */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-4">Choose Your Board</h2>
              <p className="text-muted-foreground text-lg">Specialized preparation for major academic boards in Gurugram.</p>
            </div>
          </FadeIn>
          <StaggerContainer className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
            {mockBoards.map((board) => (
              <StaggerItem key={board.slug}>
                <Link href={`/gurugram/${board.slug}`}>
                  <div className="px-8 py-4 rounded-2xl bg-muted/30 border border-border hover:border-primary/30 hover:bg-white hover:shadow-lg transition-all cursor-pointer group">
                    <p className="text-xl font-bold text-primary group-hover:text-accent transition-colors">{board.name}</p>
                  </div>
                </Link>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* FEATURED TUTORS */}
      <section className="py-32 bg-muted/20 relative">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-end mb-16">
              <div>
                <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">Premium Tutors in Gurugram</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">
                  Rigorous selection process. Only the most experienced board-specialized educators make it to BoardPeFocus.
                </p>
              </div>
              <Link href="/search">
                <Button variant="link" className="text-primary hover:text-primary/80 px-0 mt-4 md:mt-0 text-lg group font-bold">
                  View all tutors 
                  <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {mockTutors.slice(0, 3).map((tutor) => (
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
        </div>
      </section>
      
      {/* HOW IT WORKS */}
      <section className="py-32 bg-white">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">How Matching Works</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A seamless 3-step process to find the perfect board-specialized tutor for your child.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto relative">
            <div className="hidden md:block absolute top-12 left-1/4 right-1/4 h-0.5 border-t-2 border-dashed border-primary/10 -z-10" />
            
            {[
              { 
                step: "01", 
                title: "Share Requirements", 
                desc: "Tell us about your child's board, class, subject, and school." 
              },
              { 
                step: "02", 
                title: "Expert Matching", 
                desc: "Our advisors handpick the best-fit tutor from our verified top 2% roster." 
              },
              { 
                step: "03", 
                title: "Free Demo Class", 
                desc: "Schedule a demo to ensure the perfect teaching compatibility." 
              }
            ].map((item, i) => (
              <StaggerItem key={i} className="text-center group">
                <div className="w-20 h-20 rounded-3xl bg-primary/5 flex items-center justify-center text-primary text-2xl font-bold mb-6 mx-auto group-hover:bg-primary group-hover:text-white transition-all duration-500 border border-primary/10">
                  {item.step}
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-3">{item.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* WHY BOARDPEFOCUS */}
      <section className="py-32 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8 leading-tight">
                Not a marketplace. <br /> A curated excellence program.
              </h2>
              <div className="space-y-6">
                {[
                  { title: "Top 2% Vetting", desc: "Only the most capable educators pass our rigorous 5-step screening process." },
                  { title: "School-Aware Mapping", desc: "Tutors who understand the internal assessment patterns of top Gurugram schools." },
                  { title: "Board-Specific Rubrics", desc: "Preparation focused on the exact marking schemes of CBSE, IB, and IGCSE." },
                  { title: "Personalized Support", desc: "Dedicated academic advisors to track progress and ensure satisfaction." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                      <ShieldCheck className="w-6 h-6 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">{item.title}</h3>
                      <p className="text-primary-foreground/70">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="left" className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-accent/20 rounded-3xl blur-3xl" />
                <div className="relative bg-white/5 backdrop-blur-xl p-10 rounded-[3rem] border border-white/10 shadow-2xl">
                  <div className="text-center mb-8">
                    <p className="text-sm font-bold uppercase tracking-widest text-accent mb-2">Our Results</p>
                    <p className="text-6xl font-heading font-extrabold">95%+</p>
                    <p className="text-primary-foreground/60">Target Score for Board Students</p>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                      <p className="text-sm italic">"The tutor's understanding of the IB DP Chemistry rubric was exceptional. My son's score jumped from 4 to 7 in just 4 months."</p>
                      <p className="mt-2 text-xs font-bold text-accent">— Parent, Nirvana Country</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-[1400px]">
          <FAQ 
            showViewMore={true}
            columns={2}
            title="Frequently asked questions"
            subtitle="Everything you need to know about our premium home tutoring service in Gurugram."
            items={[
              {
                question: "How does BoardPeFocus tutor matching work?",
                answer: "We analyze your student's board (CBSE, IB, etc.), current performance, and learning style. Then, our advisors hand-match you with an elite tutor from our top 2% roster who has a proven track record for that specific board."
              },
              {
                question: "Which classes and boards are supported?",
                answer: "We specialize exclusively in Class 10 and 12 boards: CBSE, ICSE/ISC, IGCSE, and IB DP/MYP. This focus ensures we remain the best in board-specific preparation."
              },
              {
                question: "Are tutors verified on BoardPeFocus?",
                answer: "Absolutely. Every tutor undergoes a rigorous vetting process including technical interviews on board rubrics, teaching demonstrations, and background checks."
              },
              {
                question: "What are the typical fees for tutors?",
                answer: "Fees depend on the tutor's experience and the complexity of the board. As we provide premium, board-specialized educators, our rates reflect this high level of expertise."
              }
            ]} 
          />
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section className="py-32 bg-muted/30 relative overflow-hidden">
        <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
          <FadeIn>
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-primary leading-tight">Ready to elevate your board preparation?</h2>
            <p className="text-muted-foreground text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of parents in Gurugram who trust BoardPeFocus for targeted, premium home tutoring.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-16 px-12 text-lg font-bold shadow-2xl rounded-2xl hover:-translate-y-1 transition-all duration-300">
                Request a Callback
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
