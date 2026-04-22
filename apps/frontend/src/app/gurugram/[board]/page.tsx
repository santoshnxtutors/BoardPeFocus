import { mockBoards, mockTutors, mockSubjects } from "@/data/mock";
import { notFound } from "next/navigation";
import { TutorCard } from "@/components/cards/TutorCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Target, BookOpen, GraduationCap, ChevronRight, Award, Zap } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { GeneratedManifestPage } from "@/components/generated-pages/GeneratedManifestPage";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildGeneratedMetadata,
  getGurugramFallbackParams,
  getManifestPage,
} from "@/lib/generated-pages";

interface PageProps {
  params: Promise<{ board: string }>;
}

export async function generateStaticParams() {
  return [...mockBoards.map((board) => ({ board: board.slug })), ...getGurugramFallbackParams()];
}

export async function generateMetadata({ params }: PageProps) {
  const { board: boardSlug } = await params;
  const board = mockBoards.find(b => b.slug === boardSlug);
  const generatedPage = getManifestPage(`/gurugram/${boardSlug}`);
  
  if (!board && !generatedPage) return constructMetadata({ title: "Board Not Found", noIndex: true });
  if (!board) return constructMetadata(buildGeneratedMetadata(generatedPage!));

  return constructMetadata({
    title: `Premium ${board.name} Home Tutors in Gurugram | BoardPeFocus`,
    description: `Target 95%+ in ${board.name} with our elite home tutors in Gurugram. Specialized preparation for Class 10 and 12 ${board.name} boards.`,
    pathname: `/gurugram/${board.slug}`,
  });
}

export default async function BoardPage({ params }: PageProps) {
  const { board: boardSlug } = await params;
  const board = mockBoards.find(b => b.slug === boardSlug);
  const generatedPage = getManifestPage(`/gurugram/${boardSlug}`);

  if (!board && !generatedPage) notFound();
  if (!board) {
    return <GeneratedManifestPage record={generatedPage!} />;
  }

  // Find tutors for this board
  const boardTutors = mockTutors.filter(t => 
    t.boards.some(b => b.toLowerCase() === board.name.toLowerCase() || b.toLowerCase() === boardSlug)
  );
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: board.name, url: absoluteUrl(`/gurugram/${board.slug}`) },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero */}
      <section className="relative pt-32 pb-24 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[45rem] h-[45rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up" className="max-w-4xl">
            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary text-sm px-4 py-1.5 rounded-full">
              {board.name} Excellence Program
            </Badge>
            <h1 className="text-5xl md:text-7xl font-heading font-extrabold text-primary mb-8 leading-[1.1]">
              Target 95%+ in your <span className="text-accent">{board.name} Boards.</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10 max-w-2xl">
              Specialized home tutoring for {board.name} Class 10 & 12 in Gurugram. Match with the top 2% of educators who know the board rubrics inside out.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-xl">
                  Book a Free Demo
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2 space-y-24">
              
              {/* Why this board? */}
              <FadeIn>
                <div className="space-y-8">
                  <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary flex items-center gap-4">
                    <Award className="w-10 h-10 text-accent" /> Why {board.name} needs specialized prep?
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-8 rounded-3xl bg-muted/30 border border-border/50">
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-secondary" /> Rubric Mastery
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        The {board.name} board has specific answer-writing requirements. Our tutors focus on meeting the exact criteria examiners look for.
                      </p>
                    </div>
                    <div className="p-8 rounded-3xl bg-muted/30 border border-border/50">
                      <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5 text-secondary" /> Concept Depth
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Move beyond rote memorization. We build deep conceptual understanding required for the challenging {board.name} application-based questions.
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* Subject Clusters */}
              <FadeIn>
                <h2 className="text-3xl font-heading font-bold text-primary mb-10 flex items-center gap-4">
                  <BookOpen className="w-10 h-10 text-accent" /> {board.name} Subject Specialists
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {mockSubjects.map(subject => (
                    <Link key={subject.slug} href={`/gurugram/${boardSlug}/${subject.slug}`}>
                      <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/50 transition-all text-center group">
                        <p className="font-bold text-foreground group-hover:text-primary transition-colors">{subject.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">Available for {board.name}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </FadeIn>

              {/* Featured Tutors */}
              <FadeIn>
                <div className="flex justify-between items-center mb-10">
                  <h2 className="text-3xl font-heading font-bold text-primary">Top {board.name} Tutors</h2>
                  <Link href="/search">
                    <Button variant="link" className="text-primary font-bold">
                      View all <ChevronRight className="ml-1 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {boardTutors.map((tutor) => (
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
              </FadeIn>
            </div>

            {/* Sidebar Form */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <LeadForm 
                  title={`Join the ${board.name} Program`} 
                  subtitle={`Connect with Gurugram's best ${board.name} home tutors.`}
                  defaultValues={{ board: board.name }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
