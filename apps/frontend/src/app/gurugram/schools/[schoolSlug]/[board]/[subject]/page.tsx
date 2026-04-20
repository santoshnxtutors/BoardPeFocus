import { mockSchools, mockBoards, mockSubjects, mockTutors } from "@/data/mock";
import { notFound } from "next/navigation";
import { TutorCard } from "@/components/cards/TutorCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, Target, BookOpen } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

interface PageProps {
  params: Promise<{ schoolSlug: string; board: string; subject: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug, board: boardSlug, subject: subjectSlug } = await params;
  const school = mockSchools.find(s => s.slug === schoolSlug);
  const board = mockBoards.find(b => b.slug === boardSlug);
  const subject = mockSubjects.find(s => s.slug === subjectSlug);
  
  if (!school || !board || !subject) return constructMetadata({ title: "Page Not Found", noIndex: true });

  return constructMetadata({
    title: `${subject.name} Tutors for ${school.name} (${board.name}) | BoardPeFocus`,
    description: `Expert ${board.name} ${subject.name} home tutoring for ${school.name} students. Specialized board preparation in Gurugram.`,
    pathname: `/gurugram/schools/${schoolSlug}/${board.slug}/${subject.slug}`,
  });
}

export default async function SchoolBoardSubjectPage({ params }: PageProps) {
  const { schoolSlug, board: boardSlug, subject: subjectSlug } = await params;
  const school = mockSchools.find(s => s.slug === schoolSlug);
  const board = mockBoards.find(b => b.slug === boardSlug);
  const subject = mockSubjects.find(s => s.slug === subjectSlug);

  if (!school || !board || !subject) notFound();

  // Deeply filtered tutors
  const filteredTutors = mockTutors.filter(t => 
    t.subjects.some(s => s.toLowerCase() === subject.name.toLowerCase()) &&
    t.boards.some(b => b.toLowerCase() === board.name.toLowerCase() || b.toLowerCase() === boardSlug)
  ).slice(0, 4);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: school.name, url: absoluteUrl(`/gurugram/schools/${school.slug}`) },
    { name: board.name, url: absoluteUrl(`/gurugram/schools/${school.slug}/${board.slug}`) },
    { name: subject.name, url: absoluteUrl(`/gurugram/schools/${school.slug}/${board.slug}/${subject.slug}`) },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-primary text-primary-foreground overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="flex flex-wrap items-center gap-2 mb-6 text-sm font-bold text-primary-foreground/60 uppercase tracking-widest">
              <Link href={`/gurugram/schools/${schoolSlug}`} className="hover:text-white transition-colors">{school.name}</Link>
              <ChevronRight className="w-4 h-4" />
              <Link href={`/gurugram/schools/${schoolSlug}/${boardSlug}`} className="hover:text-white transition-colors">{board.name}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-white">{subject.name}</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight">
              {subject.name} Specialists for <br /> <span className="text-accent">{school.name}</span>
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl leading-relaxed mb-10">
              Personalized {board.name} {subject.name} tutoring for {school.name} students. Targeted support to excel in school assessments and final board exams.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-20">
              
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-10">Expert {subject.name} Tutors</h2>
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
                    <p className="text-muted-foreground">We are currently matching new {subject.name} specialists for {school.name}.</p>
                    <Link href="/contact" className="mt-4 inline-block">
                      <Button>Get Priority Matching</Button>
                    </Link>
                  </div>
                )}
              </div>

              <div className="p-10 rounded-3xl bg-muted/30 border border-border/50">
                <h3 className="text-2xl font-heading font-bold text-primary mb-6 flex items-center gap-3">
                  <Target className="w-8 h-8 text-accent" /> {subject.name} Performance Goals
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-muted-foreground leading-relaxed">
                  <div>
                    <h4 className="font-bold text-primary mb-2">Conceptual Clarity</h4>
                    <p>Building a strong foundation in {subject.name} basics, essential for the application-based questions typical of {board.name}.</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-primary mb-2">Internal Assessment</h4>
                    <p>Guidance on school projects, labs, and term tests at {school.name} to maintain a high academic track record.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <LeadForm 
                  title={`Master ${subject.name}`} 
                  subtitle={`Connect with the best ${subject.name} tutor for ${school.name}.`}
                  defaultValues={{ board: board.name, school: school.name, subject: subject.name }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
