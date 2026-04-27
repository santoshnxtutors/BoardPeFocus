import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  ShieldCheck,
  Users,
} from "lucide-react";
import { FadeIn } from "@/lib/animations";
import { JsonLd } from "@/components/seo/JsonLd";
import { TutorApplicationForm } from "@/components/forms/TutorApplicationForm";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

const faqItems = [
  {
    question: "Will every application be published on the website?",
    answer:
      "No. Every application is screened first. Only tutors who clear review and are approved for onboarding can move toward a public profile.",
  },
  {
    question: "Can I apply if I teach only online?",
    answer:
      "Yes. We review home tutoring, online-only, and blended profiles. The fit depends on board strength, subject depth, and demand alignment.",
  },
  {
    question: "Do I need prior board-specific experience?",
    answer:
      "That is strongly preferred. BoardPeFocus is built around board-aware, school-aware one-to-one tutoring rather than generic mass-market teaching.",
  },
  {
    question: "Can I upload a resume directly here?",
    answer:
      "The current production stack accepts secure document links instead of direct file uploads. Share drive or cloud links for resumes, certificates, and portfolio material.",
  },
];

export const metadata = constructMetadata({
  title: "Become Our Tutor | BoardPeFocus",
  description:
    "Apply to join BoardPeFocus as a curated board-focused tutor. Submit your academic profile, teaching approach, and Gurugram service fit for review.",
  pathname: "/become-our-tutor",
});

export default function BecomeOurTutorPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Become Our Tutor", url: absoluteUrl("/become-our-tutor") },
  ]);
  const organizationJsonLd = generateOrganizationJsonLd();
  const faqJsonLd = generateFaqJsonLd(faqItems);

  return (
    <div className="min-h-screen bg-background pt-32 pb-24">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={organizationJsonLd} />
      <JsonLd data={faqJsonLd} />

      <div className="container mx-auto px-4">
        <nav aria-label="Breadcrumb" className="mx-auto mb-8 max-w-6xl">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-primary">Become Our Tutor</li>
          </ol>
        </nav>

        <section className="mx-auto max-w-6xl">
          <FadeIn>
            <div className="relative overflow-hidden rounded-[2rem] border border-border/50 bg-white px-6 py-10 shadow-sm md:px-10 md:py-14">
              <div className="absolute right-0 top-0 h-56 w-56 translate-x-12 -translate-y-12 rounded-full bg-primary/5 blur-3xl" />
              <div className="relative z-10 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
                <div>
                  <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/10 bg-primary/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-primary/70">
                    Curated Tutor Network
                  </div>
                  <h1 className="max-w-3xl text-4xl font-extrabold text-primary md:text-6xl">
                    Apply to join a board-focused, curated academic network.
                  </h1>
                  <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
                    BoardPeFocus is not a generic tutor marketplace. We review
                    every educator profile for board fit, teaching depth,
                    one-to-one quality, and school-aware relevance before we
                    move toward onboarding.
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    <Link href="#tutor-application-form">
                      <Button className="h-12 rounded-xl px-6 font-bold">
                        Start Application
                      </Button>
                    </Link>
                    <Link href="/contact">
                      <Button
                        variant="outline"
                        className="h-12 rounded-xl px-6 font-bold"
                      >
                        Talk to the Team
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="grid gap-4">
                  {[
                    {
                      icon: ShieldCheck,
                      title: "Curated screening",
                      text: "We review academic depth, board familiarity, and professionalism before approving profiles.",
                    },
                    {
                      icon: GraduationCap,
                      title: "Board-exam relevance",
                      text: "We prefer tutors who understand board-specific paper patterns, rubrics, and school expectations.",
                    },
                    {
                      icon: Users,
                      title: "One-to-one fit",
                      text: "We are built for serious, one-to-one tutoring outcomes rather than open marketplace volume.",
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="rounded-3xl border border-border/50 bg-muted/20 p-5"
                    >
                      <item.icon className="h-5 w-5 text-accent" />
                      <h2 className="mt-3 text-lg font-bold text-primary">
                        {item.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className="mx-auto mt-14 grid max-w-6xl gap-6 lg:grid-cols-3">
          {[
            {
              title: "Who we look for",
              icon: BadgeCheck,
              points: [
                "Experienced tutors with strong board familiarity",
                "Serious one-to-one educators, not mass-market listing seekers",
                "Comfort with school-aware, exam-aware academic support",
              ],
            },
            {
              title: "Preferred profile signals",
              icon: BookOpen,
              points: [
                "Clear subject ownership and class-stage clarity",
                "Strong communication with parents and students",
                "Credible results, references, or reviewable portfolio material",
              ],
            },
            {
              title: "What this page is for",
              icon: Clock3,
              points: [
                "A real application routed to backend storage and admin review",
                "Not an instant listing form and not auto-published",
                "A structured intake flow for serious tutor onboarding",
              ],
            },
          ].map((card) => (
            <FadeIn key={card.title}>
              <div className="rounded-[1.75rem] border border-border/50 bg-white p-6 shadow-sm">
                <card.icon className="h-5 w-5 text-accent" />
                <h2 className="mt-4 text-xl font-bold text-primary">
                  {card.title}
                </h2>
                <ul className="mt-4 space-y-3 text-sm leading-relaxed text-muted-foreground">
                  {card.points.map((point) => (
                    <li key={point} className="flex gap-3">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </FadeIn>
          ))}
        </section>

        <section
          id="tutor-application-form"
          className="mx-auto mt-14 max-w-6xl scroll-mt-32"
        >
          <div className="grid gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <FadeIn direction="right">
              <div className="space-y-6">
                <div className="rounded-[1.75rem] border border-border/50 bg-white p-6 shadow-sm">
                  <h2 className="text-2xl font-heading font-bold text-primary">
                    Selection process
                  </h2>
                  <div className="mt-6 space-y-5">
                    {[
                      "Submit your profile",
                      "Academic screening and internal review",
                      "Shortlisting, interaction, or demo if needed",
                      "Approval and onboarding into the tutor system",
                    ].map((step, index) => (
                      <div key={step} className="flex gap-4">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                          {index + 1}
                        </div>
                        <p className="pt-1 text-sm font-medium leading-relaxed text-muted-foreground">
                          {step}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-[1.75rem] border border-accent/10 bg-accent/5 p-6">
                  <h2 className="text-xl font-bold text-primary">
                    Before you submit
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-primary/75">
                    Be specific about your board experience, class levels,
                    Gurgaon service areas, and real teaching results. Stronger,
                    clearer applications move through review more smoothly.
                  </p>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="left">
              <TutorApplicationForm />
            </FadeIn>
          </div>
        </section>

        <section className="mx-auto mt-16 max-w-6xl rounded-[2rem] border border-border/50 bg-white p-6 shadow-sm md:p-8">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-heading font-bold text-primary">
                Frequently asked questions
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                A few practical answers before you apply.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="outline" className="rounded-xl font-bold">
                Need help before applying?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Accordion className="mt-8">
            {faqItems.map((item) => (
              <AccordionItem
                key={item.question}
                value={item.question}
                className="border-border/60 py-1"
              >
                <AccordionTrigger className="text-base font-bold text-primary hover:no-underline">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>

        <section className="mx-auto mt-14 max-w-6xl rounded-[2rem] bg-primary px-6 py-10 text-white shadow-xl md:px-10">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-3xl font-heading font-bold">
                Serious tutors only. Clear profiles welcome.
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-white/80">
                If your teaching is board-aware, student-specific, and built for
                disciplined one-to-one outcomes, this is the right place to
                introduce your profile.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="#tutor-application-form">
                <Button className="h-12 rounded-xl bg-white px-6 font-bold text-primary hover:bg-white/90">
                  Apply Now
                </Button>
              </Link>
              <Link
                href="https://wa.me/919582706764"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button
                  variant="outline"
                  className="h-12 rounded-xl border-white/30 bg-transparent px-6 font-bold text-white hover:bg-white/10"
                >
                  WhatsApp Support
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
