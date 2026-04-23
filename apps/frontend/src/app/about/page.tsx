import { FadeIn } from "@/lib/animations";
import { Badge } from "@/components/ui/badge";
import { ShieldCheck, Target, Users, BookOpen, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "About Us | BoardPeFocus",
  description: "Learn more about BoardPeFocus - Gurugram's premium board-focused home tutoring platform.",
  pathname: "/about",
});

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 bg-muted/30 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <FadeIn>
            <Badge variant="outline" className="mb-6 border-primary/20 bg-primary/5 text-primary text-sm px-4 py-1.5 rounded-full">
              Our Story
            </Badge>
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-6">
              Not just another marketplace. <br /> A bridge to excellence.
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              BoardPeFocus was born out of a simple observation: generic tutoring doesn't work for board exams. High-stakes exams like CBSE, IB, and IGCSE require a level of specialization that marketplaces simply can't provide.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="right">
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-8">
                The BoardPeFocus Difference
              </h2>
              <div className="space-y-8">
                {[
                  { 
                    title: "Hyper-Local Focus", 
                    icon: <MapPin className="w-6 h-6" />,
                    desc: "We operate exclusively in Gurugram. This allows us to understand the specific academic cultures and internal assessment patterns of the city's top schools." 
                  },
                  { 
                    title: "Board Specialists Only", 
                    icon: <BookOpen className="w-6 h-6" />,
                    desc: "We don't do 'general' tutoring. Our educators are experts in specific board rubrics—whether it's the IB DP criteria or CBSE internal marking." 
                  },
                  { 
                    title: "Rigorous Vetting", 
                    icon: <ShieldCheck className="w-6 h-6" />,
                    desc: "We accept fewer than 2% of the tutors who apply. Every educator passes through a 5-step screening process including technical board-specific interviews." 
                  }
                ].map((item) => (
                  <div key={item.title} className="flex gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0 text-primary">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
                      <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn direction="left" className="relative">
              <div className="aspect-square bg-muted/30 rounded-[3rem] overflow-hidden border border-border flex items-center justify-center p-12">
                <div className="text-center">
                  <p className="text-7xl font-heading font-extrabold text-primary mb-4">95%+</p>
                  <p className="text-xl font-bold text-muted-foreground uppercase tracking-widest">Target Achievement</p>
                  <div className="mt-12 h-0.5 w-24 bg-accent mx-auto"></div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Team/Values Section */}
      <section className="py-24 bg-muted/20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary mb-12">Our Commitment to Parents</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-10 rounded-3xl bg-white border border-border shadow-sm">
                <Users className="w-12 h-12 text-accent mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">Personal Matching</h3>
                <p className="text-muted-foreground">Every student is matched manually by our academic advisors, not by an algorithm. We listen to your child's needs first.</p>
              </div>
              <div className="p-10 rounded-3xl bg-white border border-border shadow-sm">
                <Target className="w-12 h-12 text-secondary mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-primary mb-4">Result Oriented</h3>
                <p className="text-muted-foreground">Our methodology is designed for high performance. We focus on past paper practice, rubric mastery, and time management.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Ready to start your journey?</h2>
            <p className="text-xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto">
              Join hundreds of Gurugram families who have elevated their child's board preparation with BoardPeFocus.
            </p>
            <Link href="/contact">
              <Button size="lg" className="h-16 px-12 text-lg font-bold bg-white text-primary hover:bg-white/90 rounded-2xl">
                Get Started Today
              </Button>
            </Link>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
