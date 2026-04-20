import { FadeIn } from "@/lib/animations";
import { LeadForm } from "@/components/forms/LeadForm";
import { Phone, Mail, MapPin, MessageSquare, Clock } from "lucide-react";
import Link from "next/link";
import { constructMetadata } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Contact Us | BoardPeFocus Gurugram",
  description: "Get in touch with BoardPeFocus. Request a free demo class, talk to our academic advisors, or visit our Gurugram office.",
  pathname: "/contact",
});

export default function ContactPage() {
  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16 max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold text-primary mb-6">Let's start your child's success journey.</h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Our academic advisors are ready to help you find the perfect board-specialized home tutor in Gurugram.
            </p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start max-w-6xl mx-auto">
          {/* Left Column: Info */}
          <FadeIn direction="right" className="space-y-12">
            <div>
              <h2 className="text-3xl font-heading font-bold text-primary mb-8">Get in Touch</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Call or WhatsApp</p>
                    <Link href="tel:+91XXXXXXXXXX" className="text-xl font-bold text-primary hover:text-accent transition-colors">+91 XXXXX XXXXX</Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Email Us</p>
                    <Link href="mailto:hello@boardpefocus.com" className="text-xl font-bold text-primary hover:text-accent transition-colors">hello@boardpefocus.com</Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-1">Our Office</p>
                    <p className="text-xl font-bold text-primary">DLF Phase 5, Gurugram, Haryana</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl bg-accent/5 border border-accent/10">
              <h3 className="text-xl font-bold text-primary mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-accent" /> Advisor Availability
              </h3>
              <p className="text-primary/70 leading-relaxed mb-6">
                Our team is available for consultations Monday through Saturday, 9:00 AM to 8:00 PM.
              </p>
              <Link href="https://wa.me/91XXXXXXXXXX" target="_blank">
                <Button className="w-full h-14 rounded-xl bg-accent hover:bg-accent/90 text-white font-bold text-lg shadow-lg">
                  Chat with an Advisor Now
                </Button>
              </Link>
            </div>
          </FadeIn>

          {/* Right Column: Form */}
          <FadeIn direction="left">
            <LeadForm 
              title="Request a Callback" 
              subtitle="Fill out the form below and we'll get back to you within 24 hours."
            />
          </FadeIn>
        </div>
      </div>
    </div>
  );
}

// Missing Button import (assuming it's available in scope or I need to import it)
import { Button } from "@/components/ui/button";
