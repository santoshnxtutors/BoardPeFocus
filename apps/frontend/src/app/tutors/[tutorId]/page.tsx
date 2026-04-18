import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { CheckCircle2, MapPin, GraduationCap, Star, BookOpen, Clock, CalendarDays, Award } from "lucide-react";
import Image from "next/image";
import { FAQ } from "@/components/faq/FAQ";

export async function generateMetadata({ params }: { params: { tutorId: string } }) {
  // In production, fetch tutor data here
  return constructMetadata({
    title: `Dr. Sharma | Premium Home Tutor in Gurugram | BoardPeFocus`,
    description: `Specialized in CBSE & ICSE Mathematics for Grades 10 and 12 with 12 years of experience.`,
  });
}

export default function TutorProfilePage({ params }: { params: { tutorId: string } }) {
  // Mock data for UI demonstration
  const tutor = {
    name: "Dr. Sharma",
    tagline: "Specialized in CBSE & ICSE Mathematics for Grades 10 and 12",
    boards: ["CBSE", "ICSE"],
    subjects: ["Mathematics", "Physics"],
    experienceYrs: 12,
    studentsTaught: 450,
    rating: 4.9,
    reviews: 84,
    about: "Dr. Sharma brings over a decade of dedicated teaching experience in Mathematics and Physics. With a deep understanding of the CBSE and ICSE curricula, he has consistently helped students achieve top percentiles. His methodology focuses on building strong fundamentals before tackling complex problem-solving techniques essential for board exams.",
    methodology: "My approach is simple: understand the 'why' before the 'how'. We start with real-world applications of mathematical concepts, then move to rigorous practice using past 10-year board papers. Every student gets a customized study plan based on their baseline assessment.",
    schools: ["DPS Sector 45", "The Heritage School", "Shiv Nadar School"],
    locations: ["Sector 45", "Sector 50", "Golf Course Road"]
  };

  return (
    <div className="bg-muted/20 min-h-screen pb-32">
      {/* Hero Profile Strip */}
      <div className="bg-primary text-primary-foreground pt-40 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute -right-40 -top-40 w-96 h-96 bg-accent/20 rounded-full blur-[80px]" />
        
        <div className="container mx-auto max-w-6xl flex flex-col md:flex-row gap-12 items-center md:items-start relative z-10">
          <FadeIn direction="right" delay={0.1}>
            <div className="relative w-48 h-48 rounded-full bg-white/10 border-[6px] border-white/20 shadow-2xl flex items-center justify-center text-6xl font-heading font-bold flex-shrink-0 backdrop-blur-md">
              {/* If we had an image: <Image src={tutor.photoUrl} alt={tutor.name} fill className="rounded-full object-cover" /> */}
              {tutor.name.charAt(0)}
              <div className="absolute bottom-2 right-2 bg-accent text-accent-foreground rounded-full p-2 border-4 border-primary shadow-lg">
                <Award className="w-6 h-6" />
              </div>
            </div>
          </FadeIn>
          
          <div className="flex-1 text-center md:text-left space-y-6">
            <FadeIn delay={0.2}>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                  <h1 className="text-4xl md:text-6xl font-heading font-bold text-white tracking-tight">{tutor.name}</h1>
                  <CheckCircle2 className="w-8 h-8 text-accent fill-accent/20" />
                </div>
                <p className="text-xl text-primary-foreground/80 font-medium max-w-2xl leading-relaxed">{tutor.tagline}</p>
              </div>
            </FadeIn>
            
            <FadeIn delay={0.3}>
              <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                {tutor.boards.map(b => (
                  <Badge key={b} variant="secondary" className="bg-white/10 text-white hover:bg-white/20 border-none px-4 py-1.5 text-sm backdrop-blur-sm">
                    {b}
                  </Badge>
                ))}
                {tutor.subjects.map(s => (
                  <Badge key={s} variant="outline" className="border-white/30 text-white px-4 py-1.5 text-sm backdrop-blur-sm bg-white/5">
                    {s}
                  </Badge>
                ))}
              </div>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-8 justify-center md:justify-start pt-6 border-t border-white/15 mt-8">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-3 rounded-xl"><Clock className="w-6 h-6 text-accent" /></div>
                  <div className="text-left">
                    <div className="text-2xl font-heading font-bold text-white">{tutor.experienceYrs}+ Yrs</div>
                    <div className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold mt-1">Experience</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-3 rounded-xl"><GraduationCap className="w-6 h-6 text-accent" /></div>
                  <div className="text-left">
                    <div className="text-2xl font-heading font-bold text-white">{tutor.studentsTaught}+</div>
                    <div className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold mt-1">Students Taught</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 p-3 rounded-xl"><Star className="w-6 h-6 text-accent fill-accent" /></div>
                  <div className="text-left">
                    <div className="text-2xl font-heading font-bold text-white">{tutor.rating}/5</div>
                    <div className="text-xs text-primary-foreground/70 uppercase tracking-wider font-semibold mt-1">{tutor.reviews} Reviews</div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="container mx-auto max-w-6xl px-4 -mt-16 relative z-20 grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Column (Main Info) */}
        <div className="lg:col-span-2 space-y-8">
          <StaggerContainer>
            <StaggerItem>
              <Card className="glass-card border-border/60 shadow-lg rounded-3xl overflow-hidden mb-8">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-primary/10 p-3 rounded-xl"><BookOpen className="w-6 h-6 text-primary" /></div>
                    <h2 className="text-3xl font-heading font-bold text-primary">About the Tutor</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">{tutor.about}</p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="glass-card border-border/60 shadow-lg rounded-3xl overflow-hidden mb-8">
                <CardContent className="p-8 md:p-12">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="bg-accent/10 p-3 rounded-xl"><Award className="w-6 h-6 text-accent" /></div>
                    <h2 className="text-3xl font-heading font-bold text-primary">Teaching Methodology</h2>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-lg whitespace-pre-line">{tutor.methodology}</p>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <Card className="glass-card border-border/60 shadow-lg rounded-3xl overflow-hidden">
                <CardContent className="p-8 md:p-12 grid sm:grid-cols-2 gap-8">
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <GraduationCap className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-heading font-bold text-primary">Students From</h3>
                    </div>
                    <ul className="space-y-3">
                      {tutor.schools.map(school => (
                        <li key={school} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span>{school}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin className="w-6 h-6 text-primary" />
                      <h3 className="text-xl font-heading font-bold text-primary">Areas Served</h3>
                    </div>
                    <ul className="space-y-3">
                      {tutor.locations.map(loc => (
                        <li key={loc} className="flex items-start gap-2 text-muted-foreground">
                          <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                          <span>{loc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </StaggerItem>

            <StaggerItem>
              <div className="pt-12">
                <FAQ 
                  title="Frequently Asked Questions"
                  subtitle={`Common queries about classes with ${tutor.name}`}
                  items={[
                    {
                      question: "Does the tutor provide study material?",
                      answer: "Yes, we provide curated practice sheets, topic-wise notes, and the last 10 years of solved board papers specifically aligned with your child's board curriculum."
                    },
                    {
                      question: "How are the classes scheduled?",
                      answer: "Once you confirm, we create a recurring schedule (e.g., 3 days a week). However, we are flexible for additional support during school unit tests or mock exams."
                    },
                    {
                      question: "Will there be regular feedback?",
                      answer: "Absolutely. We conduct monthly assessments and share a detailed progress report with parents, highlighting strengths and areas needing more focus."
                    }
                  ]}
                  columns={2}
                />
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
        
        {/* Right Column (Sticky CTA & Quick Info) */}
        <div className="space-y-6">
          <FadeIn direction="up" delay={0.5}>
            <Card className="bg-white border-primary/10 shadow-2xl rounded-3xl overflow-hidden sticky top-28">
              <div className="bg-gradient-to-br from-primary/5 to-accent/5 p-8 border-b border-primary/10 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <CalendarDays className="w-24 h-24 text-primary" />
                </div>
                <h3 className="font-heading font-bold text-2xl text-primary mb-2 relative z-10">Book a Trial Class</h3>
                <p className="text-sm text-muted-foreground relative z-10">Get matched with {tutor.name} for your board prep in Gurugram.</p>
              </div>
              <CardContent className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-sm p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground flex items-center gap-2"><BookOpen className="w-4 h-4" /> Format</span>
                    <span className="font-medium text-foreground">In-person Home</span>
                  </div>
                  <div className="flex justify-between items-center text-sm p-3 bg-muted/50 rounded-lg">
                    <span className="text-muted-foreground flex items-center gap-2"><MapPin className="w-4 h-4" /> Location</span>
                    <span className="font-medium text-foreground">Gurugram</span>
                  </div>
                </div>
                <Link href="/contact">
                  <Button className="w-full bg-primary hover:bg-primary/90 text-white shadow-xl h-14 text-lg rounded-xl mt-4 transition-transform hover:-translate-y-1">
                    Request a Callback
                  </Button>
                </Link>
                <p className="text-xs text-center text-muted-foreground mt-4">
                  No payment required. Our counselor will contact you within 2 hours.
                </p>
              </CardContent>
            </Card>
          </FadeIn>
        </div>

      </div>
    </div>
  );
}
