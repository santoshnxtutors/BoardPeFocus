import { mockSchools, mockBoards, mockTutors } from "@/data/mock";
import { notFound, redirect } from "next/navigation";
import { TutorCard } from "@/components/cards/TutorCard";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookOpen } from "lucide-react";
import Link from "next/link";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { GeneratedManifestPage } from "@/components/generated-pages/GeneratedManifestPage";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  buildGeneratedMetadata,
  getManifestRedirectTarget,
  getManifestPage,
  getSchoolServiceFallbackParams,
} from "@/lib/generated-pages";

interface PageProps {
  params: Promise<{ schoolSlug: string; board: string }>;
}

export async function generateStaticParams() {
  return getSchoolServiceFallbackParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug, board: boardSlug } = await params;
  const school = mockSchools.find(s => s.slug === schoolSlug);
  const board = mockBoards.find(b => b.slug === boardSlug);
  const generatedPage = getManifestPage(`/gurugram/schools/${schoolSlug}/${boardSlug}`);
  
  if (!school || !board) {
    if (generatedPage) {
      return constructMetadata(buildGeneratedMetadata(generatedPage));
    }

    return constructMetadata({ title: "Page Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `${board.name} Tutors for ${school.name} Students | BoardPeFocus`,
    description: `Expert ${board.name} home tutoring for students of ${school.name}, Gurugram. Targeted board preparation with school-specific insights.`,
    pathname: `/gurugram/schools/${schoolSlug}/${board.slug}`,
  });
}

export default async function SchoolBoardPage({ params }: PageProps) {
  const { schoolSlug, board: boardSlug } = await params;
  const school = mockSchools.find(s => s.slug === schoolSlug);
  const board = mockBoards.find(b => b.slug === boardSlug);
  const pathname = `/gurugram/schools/${schoolSlug}/${boardSlug}`;
  const generatedPage = getManifestPage(pathname);

  if (!school || !board) {
    if (generatedPage) {
      const redirectTarget = getManifestRedirectTarget(pathname);
      if (redirectTarget) {
        redirect(redirectTarget);
      }

      return <GeneratedManifestPage record={generatedPage} />;
    }

    notFound();
  }

  // Find tutors for this school AND board
  const filteredTutors = mockTutors.filter(t => 
    (t.schools.some(s => s.toLowerCase() === school.name.toLowerCase()) || 
     t.boards.some(b => b.toLowerCase() === board.name.toLowerCase())) &&
    t.boards.some(b => b.toLowerCase() === board.name.toLowerCase() || b.toLowerCase() === boardSlug)
  ).slice(0, 6);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: school.name, url: absoluteUrl(`/gurugram/schools/${school.slug}`) },
    { name: board.name, url: absoluteUrl(`/gurugram/schools/${school.slug}/${board.slug}`) },
  ]);

  return (
    <div className="bg-background min-h-screen">
      <JsonLd data={breadcrumbJsonLd} />
      {/* Hero */}
      <section className="relative pt-32 pb-20 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10">
          <FadeIn direction="up">
            <div className="flex items-center gap-2 mb-6 text-sm font-bold text-muted-foreground uppercase tracking-widest">
              <Link href={`/gurugram/schools/${schoolSlug}`} className="hover:text-primary transition-colors">{school.name}</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-primary">{board.name} Specialization</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-6 leading-tight">
              {board.name} Tutors for <br /> <span className="text-accent">{school.name}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Specialized {board.name} home tutoring designed for the academic rigor and assessment patterns of {school.name}.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            <div className="lg:col-span-2">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-heading font-bold text-primary">{board.name} Specialists</h2>
                <Link href="/search">
                  <Button variant="link" className="text-primary font-bold">
                    View all <ChevronRight className="ml-1 w-4 h-4" />
                  </Button>
                </Link>
              </div>

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

              <div className="mt-20 p-10 rounded-3xl bg-primary/5 border border-primary/10">
                <h3 className="text-2xl font-heading font-bold text-primary mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6 text-accent" /> Why {board.name} @ {school.name}?
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  The {board.name} curriculum at {school.name} is known for its depth. Our tutors ensure that the student is not just prepared for the final board exams but also excels in the internal school assessments which are critical for {board.name === 'IB DP' ? 'predicted grades' : 'overall performance'}.
                </p>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <LeadForm 
                  title="Request a Match" 
                  subtitle={`Find an expert ${board.name} tutor who understands ${school.name}'s curriculum.`}
                  defaultValues={{ board: board.name, school: school.name }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
