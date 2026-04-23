import { FadeIn } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { Trophy, School, Clock, ShieldCheck, BarChart3 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export const metadata = constructMetadata({
  title: "Trust & Proof | BoardPeFocus Gurugram",
  description: "Why hundreds of parents in Gurugram trust BoardPeFocus. A deep dive into our results, selection process, and legacy.",
  pathname: "/transparency",
});

export default function TransparencyPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-24 text-primary overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <FadeIn direction="up">
            <Badge variant="outline" className="mb-6 border-accent/20 bg-accent/5 text-accent px-4 py-1 rounded-full">
              Commitment to Transparency
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Results Driven by <span className="text-primary underline decoration-accent/30 decoration-4">Rigorous Proof.</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We don't just make claims; we back them up. Explore the data and methodology behind why BoardPeFocus is Gurugram's highest-rated tutoring service.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Stats Proof Grid */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 max-w-6xl">
          
          {/* 95%+ Proof */}
          <div id="results" className="mb-32">
            <FadeIn>
              <div className="flex flex-col md:flex-row gap-12 items-center">
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 mb-6 text-primary">
                    <Trophy className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-heading font-bold mb-6">95%+ Average Top Score</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Our focus is strictly on Class 10 and 12 boards. By specializing, our educators are able to deliver results that consistently exceed expectations. 92% of our students improve by at least 15 percentage points within 6 months.
                  </p>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white rounded-2xl border border-border shadow-sm">
                      <div className="text-2xl font-bold text-primary">88%</div>
                      <div className="text-sm text-muted-foreground">Scored 90%+ in 2023-24</div>
                    </div>
                    <div className="p-4 bg-white rounded-2xl border border-border shadow-sm">
                      <div className="text-2xl font-bold text-primary">45+</div>
                      <div className="text-sm text-muted-foreground">Perfect 100s in subjects</div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 bg-white p-8 rounded-[2.5rem] shadow-xl border border-border/50 relative">
                   {/* Placeholder for a chart or visualization */}
                   <div className="aspect-[4/3] bg-muted/30 rounded-2xl flex flex-col items-center justify-center p-8 border-2 border-dashed border-primary/10">
                      <BarChart3 className="w-16 h-16 text-primary/20 mb-4" />
                      <p className="text-center font-medium text-muted-foreground">Score improvement distribution visualization</p>
                      <div className="w-full space-y-3 mt-8">
                         <div className="h-2 bg-primary/20 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-primary w-[95%] rounded-full" />
                         </div>
                         <div className="h-2 bg-primary/10 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-primary w-[82%] rounded-full opacity-60" />
                         </div>
                         <div className="h-2 bg-primary/5 rounded-full w-full overflow-hidden">
                            <div className="h-full bg-primary w-[70%] rounded-full opacity-30" />
                         </div>
                      </div>
                   </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* Top 2% Proof */}
          <div id="selection" className="mb-32">
            <FadeIn direction="up">
              <div className="text-center mb-16">
                <div className="inline-flex p-3 rounded-2xl bg-accent/10 mb-6 text-accent">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h2 className="text-4xl font-heading font-bold mb-4">The Top 2% Selection Protocol</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                  We reject 98 out of 100 tutor applications. Here is how we verify our educators.
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                {[
                  { title: "Technical Exam", desc: "Board-specific subject test" },
                  { title: "Demo Class", desc: "Assessed by senior pedagogy experts" },
                  { title: "Verification", desc: "Document & background check" },
                  { title: "Training", desc: "Board rubric & empathy training" },
                  { title: "Matching", desc: "Strict compatibility criteria" }
                ].map((step, i) => (
                  <Card key={step.title} className="border-border/50 hover:border-accent/30 transition-colors bg-white">
                    <CardContent className="p-6 text-center">
                      <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold mx-auto mb-4">
                        {i + 1}
                      </div>
                      <h4 className="font-bold mb-2 text-primary">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.desc}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </FadeIn>
          </div>

          {/* 100+ Schools Proof */}
          <div id="schools" className="mb-32">
            <FadeIn>
              <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
                <div className="flex-1">
                  <div className="inline-flex p-3 rounded-2xl bg-secondary/10 mb-6 text-secondary">
                    <School className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-heading font-bold mb-6">Expertise Across 100+ Schools</h2>
                  <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                    Our tutors don't just teach subjects; they understand school-specific internal assessments. We have deep familiarity with the curricula of Gurugram's most prestigious institutions.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {["The Heritage", "Pathways World", "DPS (All Branches)", "The Shri Ram", "Step by Step", "Suncity", "Shiv Nadar", "GD Goenka"].map(s => (
                      <Badge key={s} variant="secondary" className="bg-muted text-muted-foreground px-3 py-1">{s}</Badge>
                    ))}
                    <span className="text-sm text-muted-foreground mt-2 italic">And 90+ more...</span>
                  </div>
                </div>
                <div className="flex-1 grid grid-cols-2 gap-4">
                  <div className="aspect-square bg-muted/20 rounded-3xl flex items-center justify-center border border-border">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">100+</div>
                      <div className="text-sm text-muted-foreground">Schools Covered</div>
                    </div>
                  </div>
                  <div className="aspect-square bg-primary/5 rounded-3xl flex items-center justify-center border border-primary/10">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-primary">12k+</div>
                      <div className="text-sm text-muted-foreground">Internal Papers</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

          {/* 10+ Years Proof */}
          <div id="experience">
            <FadeIn direction="up">
              <div className="bg-primary text-primary-foreground p-12 md:p-20 rounded-[3rem] text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <div className="relative z-10 max-w-2xl mx-auto">
                  <div className="inline-flex p-3 rounded-2xl bg-white/10 mb-6 text-white">
                    <Clock className="w-8 h-8" />
                  </div>
                  <h2 className="text-4xl font-heading font-bold mb-6">A Decade of Excellence</h2>
                  <p className="text-xl text-primary-foreground/80 leading-relaxed mb-10">
                    Founded in 2014, BoardPeFocus has evolved from a small collective of independent educators into Gurugram's premier board preparation firm. Our 10-year legacy is built on consistent student success and parent trust.
                  </p>
                  <div className="flex justify-center gap-12">
                     <div className="text-center">
                        <div className="text-3xl font-bold">10+</div>
                        <div className="text-sm opacity-70">Years</div>
                     </div>
                     <div className="text-center">
                        <div className="text-3xl font-bold">5000+</div>
                        <div className="text-sm opacity-70">Success Stories</div>
                     </div>
                     <div className="text-center">
                        <div className="text-3xl font-bold">98%</div>
                        <div className="text-sm opacity-70">Retention</div>
                     </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>
      </section>
    </div>
  );
}
