import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, Compass, ShieldCheck } from "lucide-react";
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
import { getAllProcessParams, getProcessPage } from "@/app/process/_data/process";
import { getLiveContentItem, getLiveFaqs } from "@/lib/live-content";

interface PageProps {
  params: Promise<{ slug: string }>;
}

interface LiveProcessContent {
  id: string;
  slug: string;
  title: string;
  summary?: string | null;
  body?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
}

async function getLiveProcessContent(slug: string) {
  return getLiveContentItem<LiveProcessContent>(`/content/process-content/${encodeURIComponent(slug)}`);
}

async function getLiveProcessFaqs(item: LiveProcessContent) {
  const [entityFaqs, pageFaqs] = await Promise.all([
    getLiveFaqs({ entityType: "PROCESS_CONTENT", entityId: item.id }),
    getLiveFaqs({ pageSlug: item.slug }),
  ]);

  return [...entityFaqs, ...pageFaqs].filter((faq, index, items) => {
    return items.findIndex((candidate) => candidate.id === faq.id) === index;
  });
}

export async function generateStaticParams() {
  return getAllProcessParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const livePage = await getLiveProcessContent(slug);
  if (livePage) {
    return constructMetadata({
      title: livePage.seoTitle ?? `${livePage.title} | BoardPeFocus Service Journey`,
      description: livePage.metaDescription ?? livePage.summary ?? livePage.body ?? undefined,
      pathname: `/process/${livePage.slug}`,
    });
  }

  const page = getProcessPage(slug);

  if (!page) {
    return constructMetadata({ title: "Process Page Not Found", noIndex: true });
  }

  return constructMetadata({
    title: `${page.label} | BoardPeFocus Service Journey`,
    description: page.heroDescription,
    pathname: `/process/${page.slug}`,
  });
}

export default async function ProcessDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const livePage = await getLiveProcessContent(slug);
  if (livePage) {
    const liveFaqs = await getLiveProcessFaqs(livePage);
    return <LiveProcessDetailPage page={livePage} faqs={liveFaqs} />;
  }

  const page = getProcessPage(slug);

  if (!page) {
    notFound();
  }

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Process", url: absoluteUrl("/process") },
    { name: page.label, url: absoluteUrl(`/process/${page.slug}`) },
  ]);
  const faqJsonLd = generateFaqJsonLd(page.faq);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ProcessBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Process", href: "/process" },
              { label: page.label },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  {page.label}
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
                  {page.heroTitle}
                </h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">{page.heroDescription}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="https://wa.me/918796367754?text=Hi%20BoardPeFocus%2C%20I%20want%20help%20with%20this%20process%20step%20for%20my%20child."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
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

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Why this page exists</p>
                <p className="mt-5 text-base leading-8 text-white/85">{page.summary}</p>
                <div className="mt-6 rounded-2xl border border-white/10 bg-white/10 p-4 text-sm leading-7 text-white/80">
                  {page.audience}
                </div>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <ProcessSection
              eyebrow="Step by Step"
              title={`How ${page.label.toLowerCase()} should work`}
              description="This page keeps the process practical, skimmable, and tied to the real tutoring journey families are trying to manage."
            >
              <div className="grid gap-5 md:grid-cols-3">
                {page.steps.map((step, index) => (
                  <div key={step.title} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">Step {index + 1}</p>
                    <h2 className="mt-3 text-2xl font-bold text-primary">{step.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{step.description}</p>
                  </div>
                ))}
              </div>
            </ProcessSection>

            <ProcessSection
              eyebrow="Parent Reassurance"
              title="What a premium service should make clearer at this stage"
            >
              <div className="grid gap-5 md:grid-cols-3">
                {page.reassurancePoints.map((point) => (
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
              eyebrow="Related Support"
              title="Continue into the most relevant next page"
              description="These links keep the process layer connected to the main site architecture and the next commercial step."
            >
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
                {page.relatedLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <Compass className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </ProcessSection>

            <ProcessSection eyebrow="Next Best Action" title="If the family is ready, keep the next step obvious">
              <div className="grid gap-5 md:grid-cols-3">
                {[
                  {
                    title: "Browse tutors",
                    href: "/search",
                    description: "Move into tutor profiles if the enquiry is ready for shortlist review.",
                  },
                  {
                    title: "Support page",
                    href: "/support",
                    description: "Use Support for the cleanest route into FAQs, contact, and service guidance.",
                  },
                  {
                    title: "Results hub",
                    href: "/result",
                    description: "Use the results layer if the family wants more trust context before deciding.",
                  },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6 transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-lg"
                  >
                    <div className="flex items-center gap-3 text-primary">
                      <CheckCircle2 className="h-5 w-5 text-accent" />
                      <h3 className="text-xl font-bold">{item.title}</h3>
                    </div>
                    <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
                  </Link>
                ))}
              </div>
            </ProcessSection>

            <FAQ
              items={page.faq}
              title={`${page.label} FAQs`}
              subtitle="Visible answers for parents reviewing this part of the service journey."
              columns={2}
            />

            <ProcessCtaBlock title={page.ctaTitle} description={page.ctaDescription} />
          </div>
        </div>
      </section>
    </div>
  );
}

function LiveProcessDetailPage({
  page,
  faqs,
}: {
  page: LiveProcessContent;
  faqs: Array<{ question: string; answer: string }>;
}) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Process", url: absoluteUrl("/process") },
    { name: page.title, url: absoluteUrl(`/process/${page.slug}`) },
  ]);
  const faqJsonLd = generateFaqJsonLd(faqs);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      {faqs.length > 0 ? <JsonLd data={faqJsonLd} /> : null}

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <ProcessBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Process", href: "/process" },
              { label: page.title },
            ]}
          />

          <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
            <div className="relative z-10 grid gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:items-end">
              <div className="max-w-3xl">
                <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
                  Live Process Content
                </Badge>
                <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">{page.title}</h1>
                <p className="mt-6 text-lg leading-8 text-white/80 md:text-xl">
                  {page.summary ?? "Published guidance from the BoardPeFocus admin content system."}
                </p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <Link
                    href="https://wa.me/918796367754?text=Hi%20BoardPeFocus%2C%20I%20want%20help%20with%20this%20process%20step%20for%20my%20child."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
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

              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-6 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">Published summary</p>
                <p className="mt-5 text-base leading-8 text-white/85">
                  {page.summary ?? "This page is being managed from the admin panel and is ready for live updates."}
                </p>
              </div>
            </div>
          </section>

          <div className="space-y-24 py-24">
            <ProcessSection
              eyebrow="Published Content"
              title="Current live guidance"
              description="This section reflects the latest published process copy from the admin panel."
            >
              <div className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm">
                <div className="whitespace-pre-line text-base leading-8 text-foreground">
                  {page.body ?? page.summary ?? "No body content has been published for this route yet."}
                </div>
              </div>
            </ProcessSection>

            {faqs.length > 0 ? (
              <FAQ
                items={faqs}
                title={`${page.title} FAQs`}
                subtitle="These FAQs are assigned from the admin panel and published live on this route."
                columns={2}
              />
            ) : null}

            <ProcessCtaBlock
              title="Need help with the next step?"
              description="We can help you move from reading this process page into the right callback, support, or matching conversation."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
