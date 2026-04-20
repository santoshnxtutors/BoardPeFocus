import { FadeIn } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { mockSchools, mockBoards, mockTutors } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, MapPin, CheckCircle2, ChevronRight, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, generateBreadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }: { params: { schoolSlug: string } }) {
  const school = mockSchools.find(s => s.slug === params.schoolSlug);
  if (!school) return {};
  
  return constructMetadata({
    title: `Tutors familiar with ${school.name} | BoardPeFocus`,
    description: `Find home tutors in Gurugram who understand the curriculum, testing patterns, and rigorous requirements of ${school.name}.`,
    pathname: `/gurugram/schools/${school.slug}`,
  });
}

export default function SchoolLandingPage({ params }: { params: { schoolSlug: string } }) {
  const school = mockSchools.find(s => s.slug === params.schoolSlug);
  if (!school) notFound();

  // Find tutors that have this school in their profile
  const relevantTutors = mockTutors.filter(t => t.schools.includes(school.name));
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: school.name, url: absoluteUrl(`/gurugram/schools/${school.slug}`) },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 text-white bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <FadeIn direction="up">
            <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-md px-3 py-1 text-sm font-medium mb-6">
              <GraduationCap className="w-4 h-4 mr-2 inline" /> School-Aware Tutoring
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 tracking-tight leading-tight">
              Tutors Familiar With <br className="hidden md:block" /> <span className="text-accent">{school.name}</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-6">
              Every top school has its own internal assessment patterns and project requirements. We match you with educators who understand exactly what teachers at {school.name} expect.
            </p>
            <div className="flex items-center justify-center gap-4 text-primary-foreground/60 text-sm mb-10">
              <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Located near {school.location}</span>
              <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Curricula: {school.boards.join(", ")}</span>
            </div>
            <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg bg-white text-primary hover:bg-white/90 font-bold">
              Find an Expert
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          <div className="lg:col-span-2 space-y-16">
            <FadeIn>
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-6">Why School-Aware Tutors Matter</h2>
                <p className="text-muted-foreground text-lg leading-relaxed mb-6">
                  While the board syllabus (like {school.boards[0]}) remains standard across the country, schools like {school.name} have highly specific internal grading, unit test schedules, and project requirements. 
                </p>
                <div className="bg-muted p-8 rounded-3xl border border-border/50">
                  <h3 className="font-heading font-bold text-xl mb-4 text-foreground">A specialized tutor helps with:</h3>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span>Aligning home preparation with the school's specific unit test schedule.</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span>Understanding the rigor of internal assessments and practicals specific to the school's faculty.</span>
                    </li>
                    <li className="flex items-start gap-3 text-muted-foreground">
                      <CheckCircle2 className="w-5 h-5 text-secondary shrink-0 mt-0.5" />
                      <span>Ensuring the student is always a week ahead of what is being taught in class.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </FadeIn>

            <FadeIn>
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-8 flex items-center gap-3">
                  <UserCircle2 className="w-8 h-8 text-accent" /> Matched Tutors
                </h2>
                {relevantTutors.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                <p className="text-xs font-medium text-secondary">{tutor.rating} Rating • {tutor.experienceYrs} Yrs</p>
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{tutor.about}</p>
                            <div className="mb-6 space-y-2">
                               <div className="flex gap-2">
                                  {tutor.subjects.slice(0, 2).map(s => <Badge key={s} variant="outline" className="text-xs">{s}</Badge>)}
                               </div>
                               <div className="text-xs text-muted-foreground font-medium flex items-center gap-1">
                                  <GraduationCap className="w-3 h-3" /> Mentored {school.name} students
                               </div>
                            </div>
                          </div>
                          <Link href={`/tutors/${tutor.slug}`} className="w-full">
                            <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">View Full Profile</Button>
                          </Link>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="p-8 text-center bg-muted/50 rounded-3xl border border-dashed border-border text-muted-foreground">
                    We currently do not have public profiles listed for this specific school match. Contact our advisors and we will match you from our private roster within 24 hours.
                  </div>
                )}
              </div>
            </FadeIn>
          </div>

          <div className="space-y-8">
             {/* Dynamic sidebar / filter navigation */}
             <Card className="glass-card border-border/50 shadow-sm rounded-3xl sticky top-24">
              <div className="bg-primary p-6">
                <h3 className="font-heading font-bold text-xl text-white">Filter by Board</h3>
              </div>
              <CardContent className="p-6 space-y-2">
                {school.boards.map(boardName => {
                   const boardData = mockBoards.find(b => b.name === boardName);
                   return boardData ? (
                      <Link key={boardName} href={`/gurugram/schools/${school.slug}/${boardData.slug}`}>
                        <div className="p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-colors flex justify-between items-center group">
                          <span className="font-bold text-foreground group-hover:text-primary transition-colors">{boardName}</span>
                          <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        </div>
                      </Link>
                   ) : null;
                })}
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </div>
  );
}
