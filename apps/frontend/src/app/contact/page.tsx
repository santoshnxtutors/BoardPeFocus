"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, MessageSquare, CheckCircle2 } from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import { api } from "@/services/api";
import { FAQ } from "@/components/faq/FAQ";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const data = {
      parentName: formData.get("parentName") as string,
      phoneNumber: formData.get("phone") as string,
      board: formData.get("board") as string,
      grade: formData.get("class") as string,
      location: formData.get("location") as string,
      message: formData.get("message") as string,
    };

    try {
      await api.postLead(data);
      setIsSuccess(true);
    } catch (err) {
      setError("Failed to submit inquiry. Please try again or WhatsApp us.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center pt-20">
        <div className="container mx-auto px-4 max-w-lg text-center">
          <FadeIn direction="up">
            <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-10 h-10 text-secondary" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-4">Inquiry Submitted!</h1>
            <p className="text-muted-foreground mb-8">
              Thank you for reaching out. One of our senior academic advisors will call you shortly (usually within 2 hours).
            </p>
            <Button size="lg" className="rounded-xl px-8" onClick={() => setIsSuccess(false)}>
              Send Another Inquiry
            </Button>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      {/* Hero */}
      <section className="relative bg-primary pt-32 pb-24 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:32px_32px] opacity-20"></div>
        <div className="container mx-auto px-4 max-w-4xl text-center relative z-10">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6">Talk to an Expert</h1>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto">
              Our academic advisors are ready to understand your child's specific board preparation needs and match them with Gurugram's top 2% educators.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Main Form & Info */}
      <section className="py-24 -mt-16 relative z-20">
        <div className="container mx-auto px-4 max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12">
          
          <FadeIn direction="right">
            <Card className="glass-card shadow-xl border-border/50 rounded-3xl overflow-hidden">
              <div className="bg-muted p-8 border-b border-border">
                <h2 className="text-2xl font-heading font-bold text-primary mb-2">Request a Callback</h2>
                <p className="text-muted-foreground text-sm">Fill out the form below. An advisor will call you within 2 hours.</p>
              </div>
              <CardContent className="p-8">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="parentName">Parent's Name *</Label>
                      <Input id="parentName" name="parentName" placeholder="Enter full name" className="h-12 bg-white rounded-xl" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+91" className="h-12 bg-white rounded-xl" required />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="board">Board Curriculum</Label>
                      <select id="board" name="board" className="w-full h-12 bg-white border border-input rounded-xl px-3 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <option value="">Select Board</option>
                        <option value="cbse">CBSE</option>
                        <option value="icse">ICSE</option>
                        <option value="igcse">IGCSE</option>
                        <option value="ibdp">IB DP</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="class">Class / Grade</Label>
                      <select id="class" name="class" className="w-full h-12 bg-white border border-input rounded-xl px-3 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                        <option value="">Select Class</option>
                        <option value="10">Class 10</option>
                        <option value="12">Class 12</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Gurugram Location / Sector</Label>
                    <Input id="location" name="location" placeholder="e.g. Sector 45" className="h-12 bg-white rounded-xl" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Any specific requirements?</Label>
                    <textarea id="message" name="message" rows={4} className="w-full bg-white border border-input rounded-xl p-3 text-sm outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 resize-none" placeholder="E.g., Needs rigorous practice for Mathematics..."></textarea>
                  </div>

                  {error && <p className="text-destructive text-sm font-medium">{error}</p>}

                  <Button type="submit" className="w-full h-14 text-lg bg-primary hover:bg-primary/90 text-white rounded-xl shadow-md transition-transform hover:-translate-y-1" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit Request"}
                  </Button>
                  <p className="text-xs text-center text-muted-foreground mt-4">
                    By submitting, you agree to our Privacy Policy. We keep your data secure.
                  </p>
                </form>
              </CardContent>
            </Card>
          </FadeIn>

          <FadeIn direction="left">
            <div className="space-y-12 lg:pl-8 pt-8">
              <div>
                <h3 className="text-3xl font-heading font-bold text-primary mb-8">Other ways to connect</h3>
                
                <StaggerContainer className="space-y-6">
                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="bg-accent/10 p-4 rounded-2xl shrink-0"><MessageSquare className="w-6 h-6 text-accent" /></div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground mb-1">WhatsApp Us</h4>
                        <p className="text-muted-foreground text-sm mb-2">Fastest way to get matched.</p>
                        <a href="#" className="text-primary font-medium hover:underline">+91 95827 06764</a>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="bg-primary/5 p-4 rounded-2xl shrink-0"><Phone className="w-6 h-6 text-primary" /></div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground mb-1">Call Our Advisors</h4>
                        <p className="text-muted-foreground text-sm mb-2">Available 9 AM to 8 PM, all days.</p>
                        <a href="tel:+919582706764" className="text-primary font-medium hover:underline">+91 95827 06764</a>
                      </div>
                    </div>
                  </StaggerItem>

                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="bg-secondary/10 p-4 rounded-2xl shrink-0"><Mail className="w-6 h-6 text-secondary" /></div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground mb-1">Email Us</h4>
                        <p className="text-muted-foreground text-sm mb-2">For general inquiries.</p>
                        <a href="mailto:hello@boardpefocus.com" className="text-primary font-medium hover:underline">hello@boardpefocus.com</a>
                      </div>
                    </div>
                  </StaggerItem>
                  
                  <StaggerItem>
                    <div className="flex items-start gap-4">
                      <div className="bg-muted p-4 rounded-2xl shrink-0"><MapPin className="w-6 h-6 text-muted-foreground" /></div>
                      <div>
                        <h4 className="font-bold text-lg text-foreground mb-1">Gurugram Office</h4>
                        <p className="text-muted-foreground text-sm">
                          BoardPeFocus Headquarters<br/>
                          Sector 44, Gurugram<br/>
                          Haryana 122003
                        </p>
                      </div>
                    </div>
                  </StaggerItem>
                </StaggerContainer>
              </div>
            </div>
          </FadeIn>

        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-24 bg-white border-t border-border/50">
        <div className="container mx-auto px-4 max-w-4xl">
          <FAQ 
            showViewMore={true}
            title="Inquiry FAQs"
            subtitle="Everything you need to know before you talk to an advisor."
            items={[
              {
                question: "Is there a registration fee?",
                answer: "No, there is no registration fee to talk to our advisors or to get matched with a tutor. We only charge for the actual classes conducted."
              },
              {
                question: "How long does it take to get a tutor?",
                answer: "Usually, we can match you with a suitable tutor and schedule a demo within 24 to 48 hours of your inquiry."
              },
              {
                question: "What if I don't like the tutor after the demo?",
                answer: "You are under no obligation. If the demo doesn't meet your expectations, we will provide an alternative match immediately or you can choose to close the inquiry."
              }
            ]}
            columns={2}
          />
        </div>
      </section>
    </div>
  );
}
