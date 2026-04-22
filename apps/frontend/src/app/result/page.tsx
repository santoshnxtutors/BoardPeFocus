import Link from "next/link";
import { BookOpen, GraduationCap, ShieldCheck, Sparkles, Star, Trophy } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FadeIn } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { ResultBreadcrumbs } from "@/app/result/_components/ResultBreadcrumbs";
import { ResultCtaBlock } from "@/app/result/_components/ResultCtaBlock";
import { ResultSection } from "@/app/result/_components/ResultSection";
import {
  resultBoardLinks,
  resultCaseStudyLinks,
  resultCategories,
  resultsFaqs,
  resultRelatedLinks,
  resultSubjectLinks,
  resultTutorLinks,
} from "@/app/result/_data/results";

export const metadata = constructMetadata({
  title: "Results Hub | Testimonials, Proof Paths, and Success Stories | BoardPeFocus",
  description:
    "Explore premium result stories, parent trust signals, tutor proof paths, and board-wise success routes for Gurgaon families on BoardPeFocus.",
  pathname: "/result",
});

export default function ResultHubPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Results", url: absoluteUrl("/result") },
  ]);
  const faqJsonLd = generateFaqJsonLd(resultsFaqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ResultBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Results" }]} />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <FadeIn direction="up" className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  Gurgaon / Gurugram trust hub
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  Results, testimonials, and proof paths for Gurgaon families
                </h1>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
                  This page is designed to help parents move from trust-seeking into the right board, class, subject, tutor, school, and locality path without relying on fabricated proof or noisy claims.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/search">
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                      Explore Tutors
                    </Button>
                  </Link>
                  <Link href="/contact">
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                    >
                      Request Callback
                    </Button>
                  </Link>
                </div>
              </FadeIn>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  { label: "Proof style", value: "Tutor profiles, case-study guides, and school-aware pathways" },
                  { label: "Use case", value: "Trust building before board, class, subject, or tutor decisions" },
                  { label: "Best next step", value: "Move into boards, classes, subjects, schools, or matching" },
                ].map((item) => (
                  <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{item.label}</p>
                    <p className="mt-3 text-base font-semibold leading-7 text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <ResultSection
              eyebrow="Trust Categories"
              title="Choose the kind of proof or reassurance you want first"
              description="Some parents want testimonials, some want subject pathways, and some want school-aware or locality-aware trust signals. This section keeps those journeys clean."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {resultCategories.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </ResultSection>

            <ResultSection
              eyebrow="How to Read Proof"
              title="What this Results page shows, and what it does not pretend to show"
              description="The page stays commercially useful without inventing fake scores or endorsements. It focuses on the public trust layers already present on the site."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    icon: <Star className="h-5 w-5 text-accent" />,
                    title: "Parent decision support",
                    description: "Use the page to understand which board, class, subject, school, and area paths are most relevant to the family’s current concern.",
                  },
                  {
                    icon: <Trophy className="h-5 w-5 text-accent" />,
                    title: "Tutor-led proof",
                    description: "Tutor profiles, subject expertise, board fit, and area familiarity are surfaced here as the most direct trust signals available.",
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-accent" />,
                    title: "Case-study style resources",
                    description: "Resource guides and local support pages help show what a structured academic journey can look like without turning this into a noisy testimonials wall.",
                  },
                ].map((item) => (
                  <div key={item.title} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-center gap-3 text-primary">
                      {item.icon}
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </ResultSection>

            <ResultSection
              eyebrow="Board and Subject Paths"
              title="Move from proof intent into the right board or subject page"
              description="These are the cleanest next trust paths if the family wants board-wise or subject-wise proof before making contact."
            >
              <div className="grid gap-6 lg:grid-cols-2">
                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <BookOpen className="h-5 w-5 text-accent" />
                    <h3 className="text-2xl font-bold">Board-wise proof pathways</h3>
                  </div>
                  <div className="mt-6 space-y-4">
                    {resultBoardLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-[1.5rem] border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                        <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <div className="flex items-center gap-3 text-primary">
                    <GraduationCap className="h-5 w-5 text-accent" />
                    <h3 className="text-2xl font-bold">Subject-wise support proof</h3>
                  </div>
                  <div className="mt-6 space-y-4">
                    {resultSubjectLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-[1.5rem] border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                        <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </ResultSection>

            <ResultSection
              eyebrow="Tutors and Case Studies"
              title="Browse related tutors and linked success-style guides"
              description="Use these next steps if the family wants to see how experience, subject fit, and case-study resources connect to the broader tutoring system."
            >
              <div className="grid gap-6 xl:grid-cols-2">
                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <h3 className="text-2xl font-bold text-primary">Related tutor profiles</h3>
                  <div className="mt-6 space-y-4">
                    {resultTutorLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-[1.5rem] border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                        <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm">
                  <h3 className="text-2xl font-bold text-primary">Related case-study style guides</h3>
                  <div className="mt-6 space-y-4">
                    {resultCaseStudyLinks.map((item) => (
                      <Link key={item.href} href={item.href} className="block rounded-[1.5rem] border border-border/60 bg-muted/20 p-5 transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-md">
                        <h4 className="text-lg font-bold text-primary">{item.title}</h4>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.description}</p>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </ResultSection>

            <ResultSection
              eyebrow="Continue Exploring"
              title="Keep proof paths connected to the main revenue and trust pages"
              description="The Results page should not become a dead end. These links keep the next commercial step obvious."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {resultRelatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </ResultSection>

            <FAQ
              items={resultsFaqs}
              title="Results FAQs"
              subtitle="A visible FAQ layer helps keep the trust conversation clear and grounded."
            />

            <ResultCtaBlock
              title="Want proof paths that lead to the right tutor, not just reassurance?"
              description="Tell us the board, class, subject, school, and area, and we’ll help you move from trust-building into the right Gurgaon tutoring path."
            />
          </div>
        </div>
      </section>
    </div>
  );
}

