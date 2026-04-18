import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { mockBoards, mockSubjects, mockTutors } from "@/data/mock";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Target, ChevronRight, GraduationCap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "@/components/faq/FAQ";

export async function generateMetadata({ params }: { params: { board: string } }) {
  const board = mockBoards.find(b => b.slug === params.board);
  if (!board) return {};
  
  return constructMetadata({
    title: `${board.name} Tutors in Gurugram | BoardPeFocus`,
    description: `Specialized home tutors for ${board.name} in Gurugram. Covering Mathematics, Physics, Chemistry, and Commerce for Class 10 and 12.`,
  });
}

export default function BoardLandingPage({ params }: { params: { board: string } }) {
  const board = mockBoards.find(b => b.slug === params.board);
  if (!board) notFound();

  // Filter tutors who teach this board
  const relevantTutors = mockTutors.filter(t => t.boards.includes(board.name)).slice(0, 3);

  return (
    <div className="bg-background min-h-screen">
      
      {/* Hero */}
      <section className="relative pt-32 pb-24 text-white bg-primary overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="container mx-auto px-4 max-w-5xl text-center relative z-10">
          <FadeIn direction="up">
            <Badge variant="outline" className="text-white border-white/30 bg-white/10 backdrop-blur-md px-3 py-1 text-sm font-medium mb-6">
              {board.name} Curriculum
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-extrabold mb-6 tracking-tight leading-tight">
              Master the {board.name} <br className="hidden md:block" /> Board Exams
            </h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed mb-10">
              {board.description}. Find top educators in Gurugram who understand the exact rubric, answer structuring, and rigorous marking schemes of the {board.name} board.
            </p>
            <Button size="lg" className="h-14 px-8 text-lg rounded-xl shadow-lg bg-white text-primary hover:bg-white/90 font-bold">
              Get Matched with a Tutor
            </Button>
          </FadeIn>
        </div>
      </section>

      {/* Subjects Grid */}
      <section className="py-24">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn>
            <div className="mb-12">
              <h2 className="text-3xl font-heading font-bold text-primary mb-4 flex items-center gap-3">
                <BookOpen className="w-8 h-8 text-accent" /> Select a Subject
              </h2>
              <p className="text-lg text-muted-foreground">Drill down to find highly specialized tutors for specific {board.name} subjects.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {mockSubjects.map((subject) => (
                <Link key={subject.slug} href={`/gurugram/${board.slug}/${subject.slug}`}>
                  <div className="p-6 rounded-2xl border border-border hover:border-primary/30 hover:bg-muted/50 hover:shadow-md transition-all flex justify-between items-center group">
                    <span className="font-bold text-foreground group-hover:text-primary transition-colors">{subject.name}</span>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Featured Tutors */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl">
          <FadeIn>
            <div className="flex justify-between items-end mb-12">
              <div>
                <h2 className="text-3xl font-heading font-bold text-primary mb-4 flex items-center gap-3">
                  <Target className="w-8 h-8 text-secondary" /> Featured {board.name} Experts
                </h2>
                <p className="text-lg text-muted-foreground">Top-rated educators serving Gurugram families.</p>
              </div>
              <Link href={`/search?board=${board.slug}`}>
                <Button variant="outline" className="hidden sm:flex rounded-xl">View All</Button>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relevantTutors.map(tutor => (
                <Card key={tutor.id} className="glass-card hover:shadow-xl transition-all duration-300 border-border/50 h-full flex flex-col rounded-3xl overflow-hidden">
                  <div className="h-32 bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center border-b border-border/50">
                     <div className="w-20 h-20 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-2xl font-heading font-bold text-primary translate-y-1/2">
                        {tutor.name.charAt(0)}
                      </div>
                  </div>
                  <CardContent className="p-6 pt-12 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-xl text-primary text-center mb-1">{tutor.name}</h3>
                      <p className="text-xs font-medium text-secondary text-center mb-4">{tutor.experienceYrs} Yrs Exp • {tutor.rating} Rating</p>
                      <div className="flex flex-wrap gap-1 justify-center mb-4">
                        {tutor.subjects.slice(0, 3).map(s => <Badge key={s} variant="secondary" className="text-[10px]">{s}</Badge>)}
                      </div>
                      <p className="text-muted-foreground text-sm line-clamp-3 text-center mb-6">{tutor.about}</p>
                    </div>
                    <Link href={`/tutors/${tutor.slug}`} className="w-full">
                      <Button className="w-full rounded-xl bg-primary hover:bg-primary/90">View Profile</Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Link href={`/search?board=${board.slug}`}>
              <Button variant="outline" className="w-full mt-6 sm:hidden rounded-xl h-12">View All {board.name} Tutors</Button>
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white border-t border-border/50">
        <div className="container mx-auto px-4">
          <FAQ 
            showViewMore={true}
            title={`Common Questions about ${board.name}`}
            subtitle={`Expert insights into the ${board.name} curriculum and preparation.`}
            items={[
              {
                question: `What makes ${board.name} preparation different at BoardPeFocus?`,
                answer: `Unlike generic tutoring, we focus on the specific grading rubrics and answer-writing techniques required for ${board.name}. Our tutors are familiar with the internal assessment patterns of major Gurugram schools.`
              },
              {
                question: "Do you provide help with internal assessments/practicals?",
                answer: "Yes, we provide specialized guidance for projects, practicals, and internal assessments, ensuring that the student maximizes their scores in non-theory components as well."
              },
              {
                question: "Can I choose the frequency of classes?",
                answer: "Absolutely. Depending on the student's current proficiency and the remaining time for boards, we recommend 2 to 4 sessions per week."
              }
            ]}
            columns={2}
          />
        </div>
      </section>

    </div>
  );
}
