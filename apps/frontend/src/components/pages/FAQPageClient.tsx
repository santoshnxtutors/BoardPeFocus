"use client";

import { useEffect, useMemo, useState } from "react";
import { categorizedFaqs } from "@/data/faqs";
import { FAQ } from "@/components/faq/FAQ";
import { FadeIn } from "@/lib/animations";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  BookOpen,
  ChevronRight,
  CreditCard,
  HelpCircle,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Search,
  ShieldCheck,
  Users,
  type LucideIcon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const getCategoryId = (category: string) => category.toLowerCase().replace(/\s+/g, "-");

export function FAQPageClient() {
  const [activeCategory, setActiveCategory] = useState(categorizedFaqs[0].category);
  const [searchQuery, setSearchQuery] = useState("");

  const visibleCategories = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();
    if (!normalizedQuery) {
      return categorizedFaqs;
    }

    return categorizedFaqs
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          `${item.question} ${item.answer}`.toLowerCase().includes(normalizedQuery)
        ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery]);

  const displayedActiveCategory = visibleCategories.some(
    (category) => category.category === activeCategory
  )
    ? activeCategory
    : visibleCategories[0]?.category;

  const categoryIcons: Record<string, LucideIcon> = {
    "General Information": HelpCircle,
    "For Parents": ShieldCheck,
    "Boards & Curriculum": BookOpen,
    "Tutors & Matching": Users,
    "Areas & Schools": MapPin,
    "Payments & Scheduling": CreditCard,
  };

  useEffect(() => {
    if (visibleCategories.length === 0) {
      return;
    }

    const sections = visibleCategories
      .map((category) => document.getElementById(getCategoryId(category.category)))
      .filter((section): section is HTMLElement => Boolean(section));

    if (sections.length === 0) {
      return;
    }

    let animationFrame = 0;

    const updateActiveCategory = () => {
      const readingLine = window.innerHeight * 0.28;
      let currentSection = sections[0];

      for (const section of sections) {
        if (section.getBoundingClientRect().top <= readingLine) {
          currentSection = section;
        } else {
          break;
        }
      }

      const nextCategory = currentSection.dataset.category;

      if (nextCategory) {
        setActiveCategory((currentCategory) =>
          currentCategory === nextCategory ? currentCategory : nextCategory
        );
      }
    };

    const handleScroll = () => {
      window.cancelAnimationFrame(animationFrame);
      animationFrame = window.requestAnimationFrame(updateActiveCategory);
    };

    updateActiveCategory();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [visibleCategories]);

  return (
    <div className="bg-background min-h-screen">
      <section className="bg-primary text-primary-foreground pt-40 pb-32 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="absolute -right-20 -top-20 w-96 h-96 bg-accent/10 rounded-full blur-[100px]" />

        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <FadeIn direction="up">
            <h1 className="text-4xl md:text-7xl font-heading font-extrabold mb-8 tracking-tight">Help Center</h1>
            <p className="text-xl text-primary-foreground/70 max-w-2xl mx-auto leading-relaxed mb-12">
              Everything you need to know about Gurugram&apos;s most trusted board-specific tutoring service.
            </p>

            <div className="relative max-w-2xl mx-auto group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Search className="w-6 h-6 text-primary/40 group-focus-within:text-primary transition-colors" />
              </div>
              <Input
                type="text"
                placeholder="Search for questions (e.g. 'fees', 'boards', 'tutors')..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                aria-label="Search FAQs"
                className="w-full h-16 pl-14 pr-6 rounded-2xl border-none bg-white text-primary text-lg shadow-2xl focus-visible:ring-2 focus-visible:ring-accent transition-all"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      <section className="py-24 px-4 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            <aside className="lg:w-80 flex-shrink-0">
              <div className="sticky top-28 space-y-4">
                <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-6 ml-4">Categories</h2>
                <nav className="space-y-2">
                  {visibleCategories.map((cat) => {
                    const Icon = categoryIcons[cat.category] || HelpCircle;
                    const isActive = displayedActiveCategory === cat.category;

                    return (
                      <button
                        key={cat.category}
                        onClick={() => {
                          setActiveCategory(cat.category);
                          const el = document.getElementById(getCategoryId(cat.category));
                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }}
                        className={cn(
                          "w-full flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-300 text-left group",
                          isActive
                            ? "bg-primary text-white shadow-xl shadow-primary/20 scale-[1.02]"
                            : "bg-white text-primary/70 hover:bg-white hover:text-primary hover:shadow-md"
                        )}
                      >
                        <Icon className={cn("w-5 h-5", isActive ? "text-accent" : "text-primary/40 group-hover:text-primary")} />
                        <span className="font-bold flex-1">{cat.category}</span>
                        <ChevronRight className={cn("w-4 h-4 transition-transform", isActive ? "rotate-90 text-accent" : "opacity-0 group-hover:opacity-100")} />
                      </button>
                    );
                  })}
                </nav>

                <div className="mt-12 p-6 rounded-3xl bg-accent text-accent-foreground shadow-lg overflow-hidden relative group">
                  <div className="absolute -right-4 -bottom-4 opacity-10 transition-transform group-hover:scale-110">
                    <MessageCircle className="w-24 h-24" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">Need direct help?</h3>
                  <p className="text-sm text-accent-foreground/80 mb-6 leading-relaxed">Our academic advisors are online to assist you.</p>
                  <Link href="/contact">
                    <Button className="w-full bg-primary text-white hover:bg-primary/90 rounded-xl">Contact Now</Button>
                  </Link>
                </div>
              </div>
            </aside>

            <div className="flex-1 space-y-24">
              {visibleCategories.map((category) => (
                <div
                  key={category.category}
                  id={getCategoryId(category.category)}
                  data-category={category.category}
                  className="scroll-mt-32"
                >
                  <FadeIn>
                    <div className="flex items-center gap-4 mb-10">
                      <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center">
                        {(() => {
                          const Icon = categoryIcons[category.category] || HelpCircle;
                          return <Icon className="w-6 h-6 text-primary" />;
                        })()}
                      </div>
                      <div>
                        <h2 className="text-3xl font-heading font-extrabold text-primary">
                          {category.category}
                        </h2>
                        <p className="text-muted-foreground mt-1">{category.items.length} Questions</p>
                      </div>
                    </div>
                  </FadeIn>

                  <div className="bg-white rounded-[2.5rem] shadow-sm border border-border/40 p-2 md:p-8">
                    <FAQ items={category.items} title="" columns={2} />
                  </div>
                </div>
              ))}
              {visibleCategories.length === 0 && (
                <div className="bg-white rounded-[2.5rem] shadow-sm border border-border/40 p-10 text-center">
                  <h2 className="text-2xl font-heading font-extrabold text-primary">No matching FAQs found</h2>
                  <p className="text-muted-foreground mt-3">Try a different search term or contact our academic advisors.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-primary text-primary-foreground text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:32px_32px]"></div>
        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Can&apos;t find what you&apos;re looking for?</h2>
            <div className="flex flex-wrap justify-center gap-6">
              <Link href="mailto:hello@boardpefocus.com">
                <Button size="lg" className="h-16 px-10 text-lg rounded-2xl bg-accent text-accent-foreground hover:bg-accent/90 shadow-xl">
                  <Mail className="w-5 h-5 mr-2" /> Email Support
                </Button>
              </Link>
              <Link href="tel:+919582706764">
                <Button
                  size="lg"
                  className="h-16 px-10 text-lg rounded-2xl !bg-white !text-primary hover:!bg-white/90 shadow-xl [&_svg]:!text-primary"
                >
                  <Phone className="w-5 h-5 mr-2" /> Call Academic Office
                </Button>
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
}
