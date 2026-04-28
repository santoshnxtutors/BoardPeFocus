import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FadeIn } from "@/lib/animations";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { mockBoards, mockSubjects, mockTutors } from "@/data/mock";
import { getTutorPath } from "@/lib/tutor-paths";
import { CheckCircle2, ChevronRight, Target } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";

export async function generateMetadata({ params }: { params: { board: string, subject: string } }) {
  const board = mockBoards.find(b => b.slug === params.board);
  const subject = mockSubjects.find(s => s.slug === params.subject);
  
  if (!board || !subject) {
    return constructMetadata({ title: "Page Not Found", noIndex: true });
  }
  
  return constructMetadata({
    title: `${board.name} ${subject.name} Tutors in Gurugram | BoardPeFocus`,
    description: `Premium home tutors for ${board.name} ${subject.name} in Gurugram. Structured preparation designed to help students target 95%+.`,
    pathname: `/gurugram/${board.slug}/${subject.slug}`,
  });
}

export default function BoardSubjectPage({ params }: { params: { board: string, subject: string } }) {
  const board = mockBoards.find(b => b.slug === params.board);
  const subject = mockSubjects.find(s => s.slug === params.subject);
  
  if (!board || !subject) notFound();

  // Filter tutors who teach this board and subject
  const relevantTutors = mockTutors.filter(
    t => t.boards.includes(board.name) && t.subjects.includes(subject.name)
  );
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: board.name, url: absoluteUrl(`/gurugram/${board.slug}`) },
    { name: subject.name, url: absoluteUrl(`/gurugram/${board.slug}/${subject.slug}`) },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary pt-32 pb-24 text-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-accent/20 rounded-full blur-3xl pointer-events-none" />
        
        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <FadeIn direction="up">
            <div className="flex items-center gap-2 mb-6">
              <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-md px-3 py-1 text-sm font-medium">
                {board.name}
              </Badge>
              <ChevronRight className="w-4 h-4 text-white/50" />
              <Badge variant="outline" className="text-accent border-accent/30 bg-accent/10 backdrop-blur-md px-3 py-1 text-sm font-medium">
                {subject.name}
              </Badge>
              <ChevronRight className="w-4 h-4 text-white/50" />
              <span className="text-white/70 text-sm">Gurugram</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold tracking-tight mb-6 leading-tight">
              Master <span className="text-accent">{subject.name}</span> for <br className="hidden md:block"/> {board.description}
            </h1>
            
            <p className="text-xl text-primary-foreground/80 max-w-2xl leading-relaxed mb-10">
              Personalized preparation built for strong board outcomes. We match you with Gurugram's top 2% educators who understand the exact marking scheme and syllabus requirements of {board.name}.
            </p>

            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="h-14 px-8 text-lg shadow-2xl bg-white text-primary hover:bg-white/90 rounded-xl font-bold transition-all duration-300">
                  Get Matched with a Tutor
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Breadcrumbs & Trust Bar */}
      <div className="bg-muted border-b border-border">
        <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between gap-4 text-sm font-medium text-muted-foreground">
          <div className="flex items-center gap-2">
            <Link href="/" className="hover:text-primary">Home</Link>
            <ChevronRight className="w-4 h-4" />
            <Link href={`/gurugram/${board.slug}`} className="hover:text-primary">{board.name}</Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-foreground">{subject.name}</span>
          </div>
          <div className="flex gap-6">
            <span className="flex items-center gap-1"><Target className="w-4 h-4 text-accent" /> 95%+ Target Outcomes</span>
            <span className="flex items-center gap-1 hidden sm:flex"><CheckCircle2 className="w-4 h-4 text-secondary" /> Strict Verification</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (Content) */}
          <div className="lg:col-span-2 space-y-16">
            
            <FadeIn>
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Why specialized {board.name} prep matters</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  {board.name} {subject.name} requires more than just reading the textbook. The examination assesses deep conceptual understanding, analytical thinking, and presentation skills. A slight deviation from the prescribed marking scheme can cost valuable marks.
                </p>
                <div className="bg-muted p-8 rounded-3xl border border-border/50">
                  <h3 className="font-heading font-bold text-xl mb-4 text-foreground">Common Student Pain Points:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1 bg-destructive/10 p-1 rounded-full"><div className="w-2 h-2 rounded-full bg-destructive"></div></div>
                      <span>Struggling to finish the lengthy {subject.name} paper within the time limit.</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1 bg-destructive/10 p-1 rounded-full"><div className="w-2 h-2 rounded-full bg-destructive"></div></div>
                      <span>Understanding concepts but failing to frame answers according to {board.name} guidelines.</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <div className="mt-1 bg-destructive/10 p-1 rounded-full"><div className="w-2 h-2 rounded-full bg-destructive"></div></div>
                      <span>Anxiety dealing with higher-order thinking (HOTS) questions.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-8">Relevant Expert Tutors</h2>
                {relevantTutors.length > 0 ? (
                  <div className="space-y-6">
                    {relevantTutors.map(tutor => (
                      <Card key={tutor.id} className="glass-card hover:shadow-lg transition-all border-border/60 rounded-3xl overflow-hidden flex flex-col sm:flex-row group cursor-pointer">
                        <div className="w-full sm:w-48 bg-primary/5 flex items-center justify-center p-6 border-r border-border/50">
                          <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-3xl font-heading font-bold text-primary group-hover:scale-110 transition-transform">
                            {tutor.name.charAt(0)}
                          </div>
                        </div>
                        <CardContent className="p-6 flex-1 flex flex-col justify-between">
                          <div>
                            <Link href={getTutorPath(tutor.slug)}>
                              <h3 className="font-heading font-bold text-xl text-primary hover:text-accent mb-2">{tutor.name}</h3>
                            </Link>
                            <p className="text-sm font-medium text-secondary mb-4">{tutor.experienceYrs} Years Experience • {tutor.rating} Rating</p>
                            <p className="text-muted-foreground text-sm line-clamp-2">{tutor.about}</p>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <div className="flex gap-2">
                              {tutor.boards.slice(0,2).map(b => <Badge key={b} variant="secondary">{b}</Badge>)}
                            </div>
                            <Link href={getTutorPath(tutor.slug)}>
                              <Button variant="outline" className="rounded-xl">View Profile</Button>
                            </Link>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-muted-foreground p-8 text-center bg-muted/50 rounded-2xl border border-dashed border-border">
                    No matching tutors currently listed online. Please contact us to get matched manually from our private roster.
                  </div>
                )}
              </div>
            </FadeIn>

          </div>

          {/* Right Column (Sidebar) */}
          <div className="space-y-8">
            <Card className="glass-card border-border/50 shadow-sm rounded-3xl sticky top-24">
              <div className="bg-primary p-6">
                <h3 className="font-heading font-bold text-xl text-white">Need a {board.name} Expert?</h3>
              </div>
              <CardContent className="p-6">
                <p className="text-muted-foreground text-sm mb-6">
                  Skip the search. Let our academic advisors match your child with the perfect {subject.name} tutor in Gurugram within 24 hours.
                </p>
                <Link href="/contact" className="block mb-3">
                  <Button className="w-full h-12 bg-accent text-accent-foreground hover:bg-accent/90 rounded-xl font-bold shadow-md">
                    Book Free Consultation
                  </Button>
                </Link>
                <Link href="tel:+918796367754" className="block">
                  <Button variant="outline" className="w-full h-12 border-primary/20 text-primary hover:bg-primary/5 rounded-xl font-bold">
                    Call Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}
