import { mockTutors } from "@/data/mock";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  MapPin, BookOpen,
  School, ChevronRight, MessageSquare, User,
  Award, Target, Phone
} from "lucide-react";
import Link from "next/link";
import { FadeIn } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateTutorJsonLd } from "@/lib/seo";
import { TutorProfileViewModel } from "@/types/tutor-profile";
import { JsonLd } from "@/components/seo/JsonLd";

// New high-fidelity components
import { TutorHero } from "@/components/sections/tutor/TutorHero";
import { TutorAISummary } from "@/components/sections/tutor/TutorAISummary";
import { TutorReviews } from "@/components/sections/tutor/TutorReviews";
import { TutorFAQs } from "@/components/sections/tutor/TutorFAQs";
import { TutorStickyCTA } from "@/components/sections/tutor/TutorStickyCTA";

interface PageProps {
  params: Promise<{ tutorSlug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
  const { tutorSlug } = await params;
  const tutor = mockTutors.find(t => t.slug === tutorSlug);
  
  if (!tutor) return constructMetadata({ title: "Tutor Not Found", noIndex: true });

  const boardNames = tutor.boards.join(", ");
  const subjectNames = tutor.subjects.join(", ");

  return constructMetadata({
    title: `${tutor.name} | Expert ${subjectNames} Tutor for ${boardNames} | Gurugram`,
    description: `Highly qualified ${boardNames} ${subjectNames} home tutor in Gurugram. Book a free demo with ${tutor.name}. ${tutor.experienceYrs} years of proven results in top schools.`,
    image: tutor.photoUrl,
    pathname: `/tutors/${tutor.slug}`,
  });
}

export default async function TutorProfilePage({ params }: PageProps) {
  const { tutorSlug } = await params;
  
  // Fetch from API with all relations (conceptually)
  const tutorData = mockTutors.find(t => t.slug === tutorSlug);

  if (!tutorData) {
    notFound();
  }

  // Enhanced data mapping for long-form content
  const tutor: TutorProfileViewModel & {
    boards: string[];
    subjects: string[];
    schools: string[];
    reviews: {
      id: string;
      parentName: string;
      studentName?: string;
      rating: number;
      comment: string;
    }[];
    faqs: { id: string; question: string; answer: string }[];
    teachingPhilosophy: string;
    results: { label: string; value: string }[];
    achievements: { title: string; year: string; institution: string }[];
    coverage: { sectors: string[]; societies: string[] };
  } = {
    ...tutorData,
    methodology: "My approach focuses on rubric-aligned answer framing and conceptual clarity. I believe in bridging the gap between what the textbook says and what the board examiners expect. Every session includes past-paper practice and individualized feedback cycles.",
    teachingPhilosophy: "Education is not the filling of a pail, but the lighting of a fire. I aim to make complex concepts intuitive through real-world analogies and structured learning paths.",
    results: [
      { label: "Highest Score", value: "98/100" },
      { label: "Average Improvement", value: "+25%" },
      { label: "Board Success Rate", value: "100%" }
    ],
    achievements: [
      { title: "Best Subject Teacher Award", year: "2023", institution: "Educational Excellence Forum" },
      { title: "Curriculum Design Specialist", year: "2021", institution: "Gurugram Educators Network" }
    ],
    faqs: [
      { id: '1', question: "Do you provide home tutoring in Sector 54?", answer: "Yes, I provide home tutoring in Sector 54, 56, and DLF Phase 5. I also offer online sessions for students outside these areas." },
      { id: '2', question: "What boards do you cover?", answer: "I specialize in IB (MYP & DP), IGCSE, and CBSE curricula. I am well-versed with the specific marking schemes of these boards." },
      { id: '3', question: "How do you track student progress?", answer: "I maintain a weekly progress tracker that maps performance against board rubrics. Parents receive a monthly summary of improvement areas." }
    ],
    reviews: [
      { id: '1', parentName: "Rajesh Khanna", studentName: "Arjun", rating: 5, comment: "Exceptional clarity in concepts. My son improved his Physics score from a 4 to a 7 in just 4 months. Highly recommended for IB DP prep." },
      { id: '2', parentName: "Meera Gupta", studentName: "Isha", rating: 5, comment: "Very professional and patient. Understands the IGCSE curriculum inside out. The focus on past papers was a game changer." }
    ],
    coverage: {
      sectors: ["Sector 42", "Sector 43", "Sector 54", "Sector 56"],
      societies: ["Aralias", "Magnolias", "The Camellias", "DLF Park Place"]
    }
  };

  const jsonLd = generateTutorJsonLd(tutor);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurugram", url: absoluteUrl("/gurugram") },
    { name: tutor.name, url: absoluteUrl(`/tutors/${tutor.slug}`) },
  ]);
  const tutorBoards = tutor.boards.map((board) =>
    typeof board === "string" ? board : (board.board?.name ?? ""),
  ).filter(Boolean);
  const tutorSchools = tutor.schools.map((school) =>
    typeof school === "string" ? school : (school.school?.name ?? ""),
  ).filter(Boolean);

  return (
    <div className="bg-white min-h-screen">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      <TutorHero tutor={tutor} />

      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            
            {/* Main Content: Information Rich & Long Form */}
            <div className="lg:col-span-2 space-y-20">
              
              {/* 1. AI Summary Block */}
              <FadeIn>
                <TutorAISummary tutor={tutor} />
              </FadeIn>

              {/* 2. About & Detailed Bio */}
              <FadeIn>
                <div className="space-y-6">
                   <h2 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
                    <User className="w-8 h-8 text-accent" /> Professional Profile
                  </h2>
                  <div className="prose prose-lg prose-slate max-w-none text-muted-foreground leading-relaxed">
                    <p>{tutor.about}</p>
                    <p>Over the past {tutor.experienceYrs} years, I have mentored {tutor.studentsTaught}+ students across Gurugram's top international schools. My journey began with a passion for simplifying complex academic concepts, which evolved into a structured pedagogical approach that consistently delivers results.</p>
                  </div>
                </div>
              </FadeIn>

              {/* 3. Teaching Philosophy & Methodology */}
              <FadeIn>
                <div className="bg-primary/5 rounded-[2.5rem] p-10 border border-primary/10 relative overflow-hidden">
                  <Quote className="absolute top-8 left-8 w-20 h-20 text-primary/5 -z-0" />
                  <div className="relative z-10 space-y-6">
                    <h3 className="text-2xl font-heading font-bold text-primary flex items-center gap-3">
                      <Target className="w-7 h-7 text-secondary" /> Teaching Philosophy
                    </h3>
                    <p className="text-xl text-primary/80 leading-relaxed font-medium italic">
                      "{tutor.teachingPhilosophy}"
                    </p>
                    <div className="pt-4 border-t border-primary/10">
                       <h4 className="font-black text-xs uppercase tracking-widest text-primary/40 mb-3">My Methodology</h4>
                       <p className="text-muted-foreground leading-relaxed">{tutor.methodology}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>

              {/* 4. Boards & Subjects Expertise */}
              <FadeIn>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                     <h3 className="text-xl font-black uppercase tracking-tight text-primary flex items-center gap-2">
                       <BookOpen className="w-5 h-5 text-accent" /> Board Expertise
                     </h3>
                     <div className="flex flex-wrap gap-2">
                       {tutorBoards.map(board => (
                         <Badge key={board} variant="secondary" className="bg-slate-100 text-primary font-bold px-4 py-1.5 rounded-xl border border-slate-200">
                           {board}
                         </Badge>
                       ))}
                     </div>
                   </div>
                   <div className="space-y-4">
                     <h3 className="text-xl font-black uppercase tracking-tight text-primary flex items-center gap-2">
                       <Award className="w-5 h-5 text-accent" /> Subject Mastery
                     </h3>
                     <div className="flex flex-wrap gap-2">
                       {tutor.subjects.map(subject => (
                         <Badge key={subject} variant="outline" className="border-primary/20 text-primary font-bold px-4 py-1.5 rounded-xl bg-white">
                           {subject}
                         </Badge>
                       ))}
                     </div>
                   </div>
                </div>
              </FadeIn>

              {/* 5. Schools Familiar With & Results */}
              <FadeIn>
                <div className="space-y-8">
                  <h2 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
                    <School className="w-8 h-8 text-accent" /> Schools & Performance
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {tutor.results.map((result, i) => (
                      <div key={i} className="text-center p-8 rounded-[2rem] bg-white border border-border shadow-sm group hover:border-primary/20 transition-all">
                        <p className="text-4xl font-heading font-bold text-primary mb-2 group-hover:scale-110 transition-transform">{result.value}</p>
                        <p className="text-[10px] text-muted-foreground font-black uppercase tracking-widest">{result.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-3 pt-4">
                    <p className="w-full text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Familiar with academic patterns of:</p>
                    {tutorSchools.map(school => (
                      <span key={school} className="px-4 py-2 rounded-xl bg-slate-50 border border-slate-100 text-slate-600 text-sm font-bold flex items-center gap-2">
                        <School className="w-3.5 h-3.5" /> {school}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* 6. Localities Served in Gurugram */}
              <FadeIn>
                <div className="space-y-6">
                  <h3 className="text-xl font-black uppercase tracking-tight text-primary flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-accent" /> Areas Served in Gurugram
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {tutor.coverage.sectors.map(sector => (
                      <span key={sector} className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 text-sm font-bold hover:bg-slate-50 transition-colors">
                        {sector}
                      </span>
                    ))}
                    {tutor.coverage.societies.map(soc => (
                      <span key={soc} className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 text-sm font-bold">
                        {soc}
                      </span>
                    ))}
                  </div>
                </div>
              </FadeIn>

              {/* 7. Reviews Section */}
              <FadeIn>
                <TutorReviews reviews={tutor.reviews} />
              </FadeIn>

              {/* 8. FAQ Section */}
              <FadeIn>
                <TutorFAQs faqs={tutor.faqs} />
              </FadeIn>

            </div>

            {/* Sidebar: Lead Form & CTAs */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                <Card className="rounded-[2.5rem] border-primary/10 shadow-2xl shadow-primary/5 overflow-hidden">
                  <CardContent className="p-0">
                    <div className="bg-primary p-8 text-white">
                      <h3 className="text-2xl font-heading font-extrabold mb-2 leading-tight">Book a Free Demo</h3>
                      <p className="text-white/60 text-sm font-medium">Start your board preparation journey with {tutor.name} today.</p>
                    </div>
                    <div className="p-8">
                      <LeadForm 
                        defaultValues={{ board: tutor.boards[0], subject: tutor.subjects[0] }}
                      />
                    </div>
                  </CardContent>
                </Card>

                <div className="p-8 rounded-[2rem] bg-accent/5 border border-accent/10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-accent flex items-center justify-center text-white shadow-lg shadow-accent/20">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-accent">Quick Inquiry</p>
                      <p className="font-black text-primary uppercase">+91 XXXXX XXXXX</p>
                    </div>
                  </div>
                  
                  <Link href={`https://wa.me/91XXXXXXXXXX?text=Hi, I'm interested in booking a demo with ${tutor.name}`} target="_blank" className="block">
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-accent/20 text-accent font-black uppercase tracking-widest text-xs hover:bg-accent hover:text-white transition-all shadow-xl shadow-accent/5">
                      <MessageSquare className="w-4 h-4 mr-2" /> Chat on WhatsApp
                    </Button>
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Related Content / Links Rail */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-4">
          <div className="space-y-12">
            <div className="text-center space-y-4">
              <h2 className="text-3xl font-heading font-extrabold text-primary uppercase tracking-tight">Expand Your Discovery</h2>
              <p className="text-muted-foreground font-medium">Find more expert tutors and school-aligned academic support.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-4">
                <h4 className="font-black uppercase tracking-widest text-xs text-slate-400">Related Boards</h4>
                <div className="flex flex-col gap-2">
                  {tutorBoards.map(b => (
                    <Link key={b} href={`/gurugram/${b.toLowerCase()}`} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-primary group transition-all">
                      <span className="font-bold text-slate-700">{b} Tutors</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-black uppercase tracking-widest text-xs text-slate-400">Nearby Localities</h4>
                <div className="flex flex-col gap-2">
                  {tutor.coverage.sectors.slice(0, 3).map(s => (
                    <Link key={s} href={`/gurugram/sectors/${s.toLowerCase().replace(' ', '-')}`} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-primary group transition-all">
                      <span className="font-bold text-slate-700">Tutors in {s}</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-black uppercase tracking-widest text-xs text-slate-400">School Support</h4>
                <div className="flex flex-col gap-2">
                  {tutorSchools.slice(0, 3).map(s => (
                    <Link key={s} href={`/gurugram/schools/${s.toLowerCase().replace(' ', '-')}`} className="flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-200 hover:border-primary group transition-all">
                      <span className="font-bold text-slate-700">{s} Preparation</span>
                      <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-primary transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TutorStickyCTA tutor={tutor} />
    </div>
  );
}

function Quote(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-2 5" />
      <path d="M13 21c3 0 7-1 7-8V5c0-1.1-.9-2-2-2h-3c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h4c0 3.5-1 4.4-2 5" />
    </svg>
  );
}
