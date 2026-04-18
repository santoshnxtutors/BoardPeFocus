import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { GraduationCap, MapPin, Star, BookOpen, Clock, ChevronRight } from "lucide-react";
import Link from "next/link";
import { FAQ } from "@/components/faq/FAQ";

export default function HomePage() {
  return (
    <div className="bg-background">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-muted/30 pt-24 pb-32">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-[30rem] h-[30rem] bg-accent/5 rounded-full blur-3xl" />
        
        <div className="container mx-auto px-4 text-center max-w-5xl relative z-10">
          <FadeIn delay={0.1}>
            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary text-sm px-4 py-1.5 rounded-full shadow-sm">
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
                <Button size="lg" className="h-14 px-8 text-lg w-full shadow-xl bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl group transition-all duration-300">
                  Get Matched with a Tutor
                  <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/gurugram" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="h-14 px-8 text-lg w-full rounded-xl border-primary/20 hover:bg-primary/5 text-primary">
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
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 drop-shadow-sm">95%+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">Average Top Score</div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 drop-shadow-sm">Top 2%</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">Tutors Selected</div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 drop-shadow-sm">100+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">Gurugram Schools</div>
            </StaggerItem>
            <StaggerItem>
              <div className="text-4xl md:text-5xl font-heading font-bold text-primary mb-3 drop-shadow-sm">10+</div>
              <div className="text-sm md:text-base text-muted-foreground font-medium uppercase tracking-wider">Years Experience</div>
            </StaggerItem>
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
              <Link href="/tutors">
                <Button variant="link" className="text-primary hover:text-primary/80 px-0 mt-4 md:mt-0 text-lg group">
                  View all tutors 
                  <ChevronRight className="ml-1 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <StaggerItem key={i}>
                <Link href={`/tutors/dr-sharma-${i}`}>
                  <Card className="glass-card overflow-hidden border-border/60 rounded-3xl group cursor-pointer h-full flex flex-col hover:-translate-y-2 hover:shadow-xl transition-all duration-500">
                    <div className="h-40 bg-gradient-to-r from-primary/10 to-accent/5 flex items-end p-6 relative">
                      <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 text-accent shadow-sm">
                        <Star className="w-4 h-4 fill-accent text-accent" /> 4.9
                      </div>
                      <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-lg flex items-center justify-center -mb-12 text-3xl font-heading font-bold text-primary relative z-10 transition-transform duration-500 group-hover:scale-110">
                        T{i}
                      </div>
                    </div>
                    <CardContent className="pt-16 pb-6 px-8 flex-grow">
                      <div className="mb-4">
                        <h3 className="font-heading font-bold text-2xl text-primary mb-2 group-hover:text-accent transition-colors">Dr. Sharma {i}</h3>
                        <div className="flex items-center gap-4 text-sm text-secondary font-medium">
                          <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> 12 Yrs Exp.</span>
                          <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> 450+ Students</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-6">
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none">CBSE</Badge>
                        <Badge variant="secondary" className="bg-muted text-muted-foreground border-none">ICSE</Badge>
                        <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">Mathematics</Badge>
                      </div>
                      <p className="text-muted-foreground line-clamp-3 leading-relaxed">
                        Specialized in making complex calculus intuitive and highly tailored for board examinations with proven results in Gurugram's top schools.
                      </p>
                    </CardContent>
                    <CardFooter className="px-8 pb-8 pt-0 mt-auto">
                      <div className="w-full flex items-center justify-between text-primary font-medium border-t border-border/50 pt-4 group-hover:border-accent/30 transition-colors">
                        <span>View Full Profile</span>
                        <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </CardFooter>
                  </Card>
                </Link>
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

      {/* TESTIMONIALS */}
      <section className="py-32 bg-muted/10 overflow-hidden">
        <div className="container mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-20">
              <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4 text-primary">Trusted by Gurugram Parents</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Real results from families in Golf Course Road, DLF, and beyond.
              </p>
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                quote: "The tutor's understanding of the IB DP Chemistry rubric was exceptional. My son's score jumped from 4 to 7 in just 4 months.",
                author: "Mrs. Malhotra",
                location: "Nirvana Country"
              },
              { 
                quote: "BoardPeFocus helped us find a Physics tutor who actually taught in a top Gurugram school. That insider perspective made all the difference.",
                author: "Mr. Kapoor",
                location: "DLF Phase 5"
              },
              { 
                quote: "Very professional service. Unlike other agencies, they actually listened to our specific needs for Class 10 ICSE Boards.",
                author: "Dr. Singhania",
                location: "Sector 45"
              }
            ].map((t, i) => (
              <StaggerItem key={i}>
                <Card className="p-8 rounded-3xl border-none shadow-sm bg-white hover:shadow-md transition-all duration-300">
                  <div className="flex gap-1 text-accent mb-6">
                    {[1, 2, 3, 4, 5].map(s => <Star key={s} className="w-4 h-4 fill-accent" />)}
                  </div>
                  <p className="text-lg text-primary/80 italic mb-8 leading-relaxed">"{t.quote}"</p>
                  <div>
                    <p className="font-bold text-primary">{t.author}</p>
                    <p className="text-sm text-muted-foreground">{t.location}, Gurugram</p>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerContainer>
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
              },
              {
                question: "How quickly can I get matched with a tutor?",
                answer: "Typically, we provide a curated match within 24-48 hours. Once matched, we schedule a demo class at your convenience."
              },
              {
                question: "Do tutors provide homework and tests?",
                answer: "Yes. Our tutors provide board-aligned worksheets, past paper practice, and regular mock tests to ensure the student is perfectly prepared for the final exam format."
              },
              {
                question: "Do you support JEE and NEET preparation?",
                answer: "While we focus on board excellence, many of our tutors are experts at bridging board concepts with competitive exam foundations for Science subjects."
              },
              {
                question: "Which cities do you currently support?",
                answer: "We are hyper-focused on Gurugram only, ensuring we provide the best local support and understanding of school assessment patterns."
              }
            ]} 
          />
        </div>
      </section>
      
      {/* CTA SECTION */}
      <section className="py-32 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-[100px] pointer-events-none" />
        
        <FadeIn direction="up">
          <div className="container mx-auto px-4 text-center relative z-10 max-w-4xl">
            <h2 className="text-5xl md:text-6xl font-heading font-bold mb-8 text-white leading-tight">Ready to elevate your board preparation?</h2>
            <p className="text-primary-foreground/80 text-xl mb-12 max-w-2xl mx-auto leading-relaxed">
              Join hundreds of parents in Gurugram who trust BoardPeFocus for targeted, premium home tutoring.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-16 px-12 text-lg font-bold shadow-2xl bg-white text-primary hover:bg-white/90 rounded-2xl hover:-translate-y-1 transition-all duration-300">
                Request a Callback
              </Button>
            </Link>
          </div>
        </FadeIn>
      </section>
    </div>
  );
}
