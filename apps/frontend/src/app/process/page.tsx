import Link from "next/link";
import { MessageCircle, Route, ShieldCheck, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import { ProcessBreadcrumbs } from "@/app/process/_components/ProcessBreadcrumbs";
import { ProcessCtaBlock } from "@/app/process/_components/ProcessCtaBlock";
import { ProcessSection } from "@/app/process/_components/ProcessSection";
import { processHubFaqs, processPages } from "@/app/process/_data/process";

export const metadata = constructMetadata({
  title: "How BoardPeFocus Works | Consultation, Matching, Demo, and Support",
  description:
    "Understand the BoardPeFocus service journey for Gurgaon families: consultation, tutor matching, demo class, onboarding, progress support, and board-season guidance.",
  pathname: "/process",
});

export default function ProcessHubPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Process", url: absoluteUrl("/process") },
  ]);
  const faqJsonLd = generateFaqJsonLd(processHubFaqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ProcessBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Process" }]} />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  Premium service journey
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  How the BoardPeFocus tutoring journey works
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">
                  This is the clean process layer behind consultation, tutor matching, demo classes, onboarding, feedback, and board-season support for Gurgaon families.
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20want%20to%20understand%20the%20tutoring%20process%20for%20my%20child."
                    target="_blank"
                  >
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Talk on WhatsApp
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
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {[
                  {
                    label: "Built for",
                    value: "Board-focused Class 10 and Class 12 families in Gurgaon / Gurugram",
                  },
                  {
                    label: "Decision style",
                    value: "Cleaner board, class, subject, school, area, and tutor choices",
                  },
                  {
                    label: "Best outcome",
                    value: "A more confident next step into matching, demos, and ongoing support",
                  },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{item.label}</p>
                    <p className="mt-3 text-base font-semibold leading-7 text-white">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <ProcessSection
              eyebrow="Journey Steps"
              title="Move into the part of the service journey you need most"
              description="Some parents need help defining the requirement. Others need tutor matching, demo clarity, or board-season structure. This hub keeps those paths connected."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {processPages.map((page) => (
                  <Link
                    key={page.slug}
                    href={`/process/${page.slug}`}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{page.shortLabel}</p>
                    <h2 className="mt-3 text-2xl font-bold text-primary">{page.label}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{page.summary}</p>
                    <p className="mt-5 text-sm font-medium text-primary/80">{page.audience}</p>
                  </Link>
                ))}
              </div>
            </ProcessSection>

            <ProcessSection
              eyebrow="Why This Layer Matters"
              title="The process should feel reassuring, not confusing"
              description="A premium tutoring service should explain how decisions are made, what parents should expect, and how the next step connects to board, class, school, and area context."
            >
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  "Consultation helps shape the right brief before anyone wastes time on the wrong tutor type.",
                  "Matching should consider board, school, schedule, and home-tutoring practicality together.",
                  "Progress, replacement, and board-season support matter because tutoring needs to stay useful after onboarding.",
                ].map((point) => (
                  <div key={point} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <div className="flex items-start gap-3">
                      <ShieldCheck className="mt-1 h-5 w-5 shrink-0 text-accent" />
                      <p className="text-sm leading-7 text-foreground">{point}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ProcessSection>

            <ProcessSection
              eyebrow="Connected Hubs"
              title="Keep the service journey connected to the main site architecture"
              description="The process hub should help families move naturally into the right commercial and authority pages, not become a dead end."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {[
                  {
                    title: "Boards hub",
                    href: "/boards",
                    description: "Use the boards layer when curriculum fit is still the main decision point.",
                  },
                  {
                    title: "Classes hub",
                    href: "/classes",
                    description: "Use the classes layer when Class 10 or Class 12 pressure is shaping the tutoring journey.",
                  },
                  {
                    title: "Schools hub",
                    href: "/schools",
                    description: "Move into school-aware support when the family starts with school context first.",
                  },
                  {
                    title: "Areas hub",
                    href: "/gurgaon-area",
                    description: "Area context matters when locality convenience and home-visit practicality influence the next step.",
                  },
                  {
                    title: "Results hub",
                    href: "/result",
                    description: "Use the proof layer when the family wants reassurance before choosing the next action.",
                  },
                  {
                    title: "Support page",
                    href: "/support",
                    description: "Go to Support for the cleanest route into FAQs, contact, matching, and process help.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <Route className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </ProcessSection>

            <FAQ
              items={processHubFaqs}
              title="Process FAQs"
              subtitle="Visible answers to the questions families usually ask before they move deeper into the service."
              columns={2}
            />

            <ProcessCtaBlock
              title="Need help understanding the right next step?"
              description="We can help you move from broad concern into the right consultation, matching, demo, support, or board-season path."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
