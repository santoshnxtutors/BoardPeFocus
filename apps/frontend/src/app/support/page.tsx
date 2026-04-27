import Link from "next/link";
import { Compass, LifeBuoy, MessageCircle, PhoneCall, Sparkles } from "lucide-react";
import { FAQ } from "@/components/faq/FAQ";
import { LeadForm } from "@/components/forms/LeadForm";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";
import { getLiveContentItem, getLiveFaqs } from "@/lib/live-content";

interface LiveSupportContent {
  slug: string;
  title: string;
  summary?: string | null;
  body?: string | null;
}

const supportChannels = [
  {
    title: "Call or WhatsApp",
    href: "tel:+919582706764",
    description: "Reach the Gurgaon academic advisory team directly when the family wants immediate clarity.",
  },
  {
    title: "Request a callback",
    href: "/contact",
    description: "Use the lead form when you want the team to call back with a cleaner brief and matching plan.",
  },
  {
    title: "Read the process",
    href: "/process",
    description: "Understand consultation, matching, demos, onboarding, and board-season support before deciding.",
  },
];

const supportTopics = [
  {
    title: "Service FAQs",
    href: "/faqs/service",
    description: "Best for questions about how the service works, demos, progress, and replacement.",
  },
  {
    title: "Parent FAQs",
    href: "/faqs/parents",
    description: "Best for timing, session frequency, revision planning, and calmer decision-making.",
  },
  {
    title: "Tutor FAQs",
    href: "/faqs/tutors",
    description: "Best for fit, subject expertise, first-session expectations, and tutor quality questions.",
  },
];

const supportHubs = [
  {
    title: "Boards hub",
    href: "/boards",
    description: "Use when the first question is curriculum-specific.",
  },
  {
    title: "Classes hub",
    href: "/classes",
    description: "Use when Class 10 or Class 12 pressure is the clearest starting point.",
  },
  {
    title: "Schools hub",
    href: "/schools",
    description: "Use when the family starts with school context first.",
  },
  {
    title: "Areas hub",
    href: "/gurgaon-area",
    description: "Use when locality, corridor, or sector convenience matters most.",
  },
  {
    title: "Results hub",
    href: "/result",
    description: "Use when the family wants more trust and proof framing before deciding.",
  },
  {
    title: "Resources hub",
    href: "/resources",
    description: "Use when the best next step is to read a revision or strategy guide first.",
  },
];

export const metadata = constructMetadata({
  title: "Support | FAQs, Process, and Contact Guidance | BoardPeFocus",
  description:
    "Use the BoardPeFocus support hub to move into FAQs, process pages, contact paths, and the right board, class, school, area, or tutor route in Gurgaon.",
  pathname: "/support",
});

export default async function SupportPage() {
  const [liveSupport, liveFaqs] = await Promise.all([
    getLiveContentItem<LiveSupportContent>("/content/process-content/support"),
    getLiveFaqs({ pageSlug: "support" }),
  ]);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Support", url: absoluteUrl("/support") },
  ]);
  const organizationJsonLd = generateOrganizationJsonLd();
  const faqJsonLd = liveFaqs.length > 0 ? generateFaqJsonLd(liveFaqs) : null;

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={organizationJsonLd} />
      {faqJsonLd ? <JsonLd data={faqJsonLd} /> : null}

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-primary">Support</li>
            </ol>
          </nav>

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  Help, guidance, and next steps
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  {liveSupport?.title ?? "Support hub for Gurgaon families using BoardPeFocus"}
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">
                  {liveSupport?.summary ??
                    "This page connects FAQs, process guidance, contact routes, and the right board, class, school, area, tutor, and results pages without making the journey feel cluttered."}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20need%20support%20to%20choose%20the%20right%20tutoring%20path."
                    target="_blank"
                    rel="noopener noreferrer"
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
                      <PhoneCall className="mr-2 h-4 w-4" />
                      Request Callback
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
                {supportChannels.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:bg-white/15"
                  >
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{item.title}</p>
                    <p className="mt-3 text-sm leading-7 text-white/85">{item.description}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            {liveSupport?.body ? (
              <section className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm">
                <div className="whitespace-pre-line text-base leading-8 text-foreground">{liveSupport.body}</div>
              </section>
            ) : null}

            <section className="grid gap-10 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
              <div className="space-y-6">
                <div className="max-w-3xl">
                  <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">Best Entry Points</p>
                  <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                    Start with the most useful support layer
                  </h2>
                  <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                    Some families need FAQs. Others need service clarity, a callback, or the right authority hub. This section keeps those entry points obvious.
                  </p>
                </div>

                <div className="grid gap-5 md:grid-cols-3">
                  {supportTopics.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <LifeBuoy className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </Link>
                  ))}
                </div>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                  {supportHubs.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                    >
                      <div className="flex items-center gap-3 text-primary">
                        <Compass className="h-5 w-5 text-accent" />
                        <h3 className="text-xl font-bold">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="rounded-[2rem] border border-border/60 bg-white p-4 shadow-sm md:p-6">
                <LeadForm
                  title="Get matched faster"
                  subtitle="Share the board, class, subject, school, and area so we can guide you into the best next step."
                />
              </div>
            </section>

            {liveFaqs.length > 0 ? (
              <FAQ
                items={liveFaqs}
                title="Support FAQs"
                subtitle="These FAQs are assigned from the admin panel and published live on the support route."
                columns={2}
              />
            ) : null}
          </div>
        </div>
      </section>
    </div>
  );
}
