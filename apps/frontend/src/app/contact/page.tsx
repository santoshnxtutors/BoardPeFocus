import Link from "next/link";
import { Clock, Mail, MapPin, MessageSquare, Phone } from "lucide-react";
import { FadeIn } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/button";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateOrganizationJsonLd,
} from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us | BoardPeFocus Gurugram",
  description:
    "Get in touch with BoardPeFocus. Request a callback, talk to our academic advisors, or discuss the right board, class, school, and Gurgaon-area tutoring path.",
  pathname: "/contact",
});

export default function ContactPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Contact", url: absoluteUrl("/contact") },
  ]);
  const organizationJsonLd = generateOrganizationJsonLd();

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={organizationJsonLd} />

      <div className="container mx-auto px-4">
        <nav aria-label="Breadcrumb" className="mb-8 max-w-6xl mx-auto">
          <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="transition-colors hover:text-primary">
                Home
              </Link>
            </li>
            <li>/</li>
            <li className="font-semibold text-primary">Contact</li>
          </ol>
        </nav>

        <FadeIn>
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="mb-6 text-4xl font-extrabold text-primary md:text-6xl">
              Let&apos;s start your child&apos;s success journey.
            </h1>
            <p className="text-xl leading-relaxed text-muted-foreground">
              Our academic advisors are ready to help you find the right board-specialized home tutoring path in Gurugram.
            </p>
          </div>
        </FadeIn>

        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-16 lg:grid-cols-2">
          <FadeIn direction="right" className="space-y-10">
            <div>
              <h2 className="mb-8 text-3xl font-bold text-primary">Get in touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5">
                    <Phone className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">Call or WhatsApp</p>
                    <Link href="tel:+919582706764" className="text-xl font-bold text-primary transition-colors hover:text-accent">
                      +91 95827 06764
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">Email us</p>
                    <Link href="mailto:hello@boardpefocus.com" className="text-xl font-bold text-primary transition-colors hover:text-accent">
                      hello@boardpefocus.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/5">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="mb-1 text-sm font-bold uppercase tracking-wider text-muted-foreground">Service base</p>
                    <p className="text-xl font-bold text-primary">Sector 44, Gurugram, Haryana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-accent/10 bg-accent/5 p-8">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
                <Clock className="h-5 w-5 text-accent" /> Advisor availability
              </h3>
              <p className="mb-6 leading-relaxed text-primary/70">
                Our team is available Monday through Saturday, 9:00 AM to 8:00 PM, for consultations, callback requests, and tutor-matching support.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                <Link href="https://wa.me/919582706764" target="_blank">
                  <Button className="h-14 w-full rounded-xl bg-accent text-lg font-bold text-white shadow-lg hover:bg-accent/90">
                    Chat with an Advisor
                  </Button>
                </Link>
                <Link href="/support">
                  <Button variant="outline" className="h-14 w-full rounded-xl text-lg font-bold">
                    Open Support Hub
                  </Button>
                </Link>
              </div>
            </div>

            <div className="rounded-3xl border border-border/50 bg-white p-8 shadow-sm">
              <h3 className="mb-4 flex items-center gap-2 text-xl font-bold text-primary">
                <MessageSquare className="h-5 w-5 text-accent" /> Before you contact us
              </h3>
              <p className="mb-6 leading-relaxed text-primary/70">
                If you already know the board, class, subject, school, and Gurgaon locality, share those details in the form so we can guide you more quickly into the right consultation, tutor match, or demo path.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="/process">
                  <Button variant="outline" className="rounded-xl">
                    How it works
                  </Button>
                </Link>
                <Link href="/faqs/service">
                  <Button variant="outline" className="rounded-xl">
                    Service FAQs
                  </Button>
                </Link>
                <Link href="/result">
                  <Button variant="outline" className="rounded-xl">
                    Results
                  </Button>
                </Link>
              </div>
            </div>
          </FadeIn>

          <FadeIn direction="left">
            <LeadForm
              title="Request a Callback"
              subtitle="Fill out the form below and we&apos;ll get back to you with the right next step."
            />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}
