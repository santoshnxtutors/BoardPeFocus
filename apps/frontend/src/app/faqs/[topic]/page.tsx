import Link from "next/link";
import { notFound } from "next/navigation";
import { HelpCircle, Link2, Sparkles } from "lucide-react";
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
import { FaqTopicBreadcrumbs } from "@/app/faqs/_components/FaqTopicBreadcrumbs";
import { FaqTopicCtaBlock } from "@/app/faqs/_components/FaqTopicCtaBlock";
import { getAllFaqTopicParams, getFaqTopic } from "@/app/faqs/_data/topics";

interface PageProps {
  params: Promise<{ topic: string }>;
}

export async function generateStaticParams() {
  return getAllFaqTopicParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { topic } = await params;
  const page = getFaqTopic(topic);

  if (!page) {
    return constructMetadata({ title: "FAQ Topic Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `${page.title} | BoardPeFocus FAQs`,
    description: page.description,
    pathname: `/faqs/${page.slug}`,
  });
}

export default async function FaqTopicPage({ params }: PageProps) {
  const { topic } = await params;
  const page = getFaqTopic(topic);

  if (!page) {
    notFound();
  }

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "FAQs", url: absoluteUrl("/faqs") },
    { name: page.label, url: absoluteUrl(`/faqs/${page.slug}`) },
  ]);
  const faqJsonLd = generateFaqJsonLd(page.faqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <FaqTopicBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "FAQs", href: "/faqs" },
              { label: page.label },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  <Sparkles className="mr-2 h-4 w-4 text-accent" />
                  {page.label}
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{page.title}</h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">{page.description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link href="/contact">
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                      Request Callback
                    </Button>
                  </Link>
                  <Link
                    href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20have%20a%20question%20after%20reading%20your%20FAQs."
                    target="_blank"
                  >
                    <Button
                      variant="outline"
                      size="lg"
                      className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                    >
                      Talk on WhatsApp
                    </Button>
                  </Link>
                </div>
              </div>

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Use this topic for</p>
                <p className="mt-5 text-base leading-8 text-white/85">{page.intro}</p>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <FAQ
              items={page.faqs}
              title={`${page.label} answers`}
              subtitle="Visible answers only — useful, skimmable, and connected to the right next pages."
              columns={2}
            />

            <section className="space-y-6">
              <div className="max-w-3xl">
                <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">Related Support</p>
                <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
                  Continue into the most relevant next page
                </h2>
                <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
                  FAQ pages should still guide parents naturally into boards, classes, schools, areas, tutors, and contact routes.
                </p>
              </div>
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {page.relatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <Link2 className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </section>

            <section className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm">
              <div className="flex items-start gap-4">
                <div className="rounded-2xl bg-primary/5 p-3 text-primary">
                  <HelpCircle className="h-6 w-6" />
                </div>
                <div className="max-w-3xl">
                  <h2 className="text-2xl font-bold text-primary">Still not sure which page to open next?</h2>
                  <p className="mt-3 text-base leading-8 text-muted-foreground">
                    If the decision still feels broad, the best next route is usually the Support page because it connects FAQs, process, contact, and the main commercial hubs in one place.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-4">
                    <Link href="/support">
                      <Button className="rounded-xl">Go to Support</Button>
                    </Link>
                    <Link href="/process">
                      <Button variant="outline" className="rounded-xl">
                        View Process
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </section>

            <FaqTopicCtaBlock
              title="Need help after reading the FAQs?"
              description="We can help connect your question to the right board, class, subject, school, area, tutor, or service path."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
