import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { constructMetadata } from "@/lib/seo";
import { Target, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";

export const metadata = constructMetadata({
  title: "About Us | Premium Gurugram Tutors | BoardPeFocus",
  description: "Learn why BoardPeFocus is Gurugram's most trusted name for specialized Class 10 and 12 board preparation.",
});

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-24 text-primary overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Why We Only Do <span className="text-accent">Boards.</span></h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              We aren't a generic marketplace. We are a specialized academic advisory firm focused strictly on helping Class 10 and 12 students in Gurugram achieve top percentiles.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <FadeIn direction="right">
            <div className="space-y-6">
              <h2 className="text-3xl font-heading font-bold text-primary">The Market Problem</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Most tutoring platforms are directories. They list thousands of tutors for every hobby, language, and subject under the sun. Finding a serious educator who understands the nuances of the IB DP grading rubric or the CBSE marking scheme is like finding a needle in a haystack.
              </p>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Parents end up wasting crucial months with tutors who are merely "good at Math" but have no idea how a board exam is evaluated.
              </p>
            </div>
          </FadeIn>
          <FadeIn direction="left">
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-border/50 relative overflow-hidden">
              <div className="absolute -right-10 -top-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
              <h2 className="text-3xl font-heading font-bold text-primary mb-6">The BoardPeFocus Solution</h2>
              <ul className="space-y-6">
                <li className="flex gap-4 items-start">
                  <div className="bg-primary/10 p-2 rounded-full shrink-0"><Target className="w-5 h-5 text-primary" /></div>
                  <div>
                    <h4 className="font-bold text-foreground">Hyper-Specialization</h4>
                    <p className="text-muted-foreground text-sm mt-1">We only onboard tutors who have proven track records with specific boards (CBSE, ICSE, IB, IGCSE).</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="bg-accent/10 p-2 rounded-full shrink-0"><MapPin className="w-5 h-5 text-accent" /></div>
                  <div>
                    <h4 className="font-bold text-foreground">Gurugram Exclusive</h4>
                    <p className="text-muted-foreground text-sm mt-1">We know the local schools. Our tutors understand the internal grading patterns of major Gurugram schools.</p>
                  </div>
                </li>
                <li className="flex gap-4 items-start">
                  <div className="bg-secondary/10 p-2 rounded-full shrink-0"><ShieldCheck className="w-5 h-5 text-secondary" /></div>
                  <div>
                    <h4 className="font-bold text-foreground">Top 2% Selection</h4>
                    <p className="text-muted-foreground text-sm mt-1">Our interview and vetting process rejects 98% of applicants. We only provide educators we would trust with our own children.</p>
                  </div>
                </li>
              </ul>
            </div>
          </FadeIn>
        </div>
      </section>

    </div>
  );
}
