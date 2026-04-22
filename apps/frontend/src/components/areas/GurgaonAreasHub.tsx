"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  GraduationCap,
  MapPin,
  PhoneCall,
  Search,
  Sparkles,
} from "lucide-react";
import {
  areaClusters,
  areaFaqs,
  areaTabs,
  corridorHighlights,
  getFeaturedSectors,
  getFeaturedSocieties,
  getSectorDetail,
} from "@/data/areas";
import { AreaCard } from "@/components/areas/AreaCard";
import { AreaSection } from "@/components/areas/AreaSection";
import { FAQ } from "@/components/faq/FAQ";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { mockSchools } from "@/data/mock";
import { getSchoolHubLink } from "@/app/schools/_data/linking";

const featuredSectors = getFeaturedSectors();
const featuredSocieties = getFeaturedSocieties();

export function GurgaonAreasHub() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<(typeof areaTabs)[number]["slug"]>("all");

  const normalizedQuery = query.trim().toLowerCase();

  const filteredClusters = useMemo(() => {
    return areaClusters.filter((cluster) => {
      const categoryMatch = activeTab === "all" || cluster.category === activeTab;
      if (!categoryMatch) return false;
      if (!normalizedQuery) return true;

      const sectorNames = cluster.sectorSlugs
        .map((slug) => getSectorDetail(slug)?.name ?? slug)
        .join(" ");
      const schoolNames = cluster.schoolRelevance.map((school) => school.name).join(" ");
      const societyNames = cluster.featuredSocieties.join(" ");
      const haystack = [
        cluster.name,
        cluster.shortDescription,
        cluster.positioning,
        sectorNames,
        schoolNames,
        societyNames,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(normalizedQuery);
    });
  }, [activeTab, normalizedQuery]);

  const visibleSectorCards = useMemo(() => {
    if (!normalizedQuery) return featuredSectors;

    return featuredSectors.filter((sector) =>
      [
        sector.name,
        sector.microcopy,
        sector.positioning,
        sector.subjectDemand.join(" "),
        sector.societies.map((society) => society.name).join(" "),
      ]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const visibleSocieties = useMemo(() => {
    if (!normalizedQuery) return featuredSocieties;

    return featuredSocieties.filter((society) =>
      [society.name, society.summary, society.sectorName].join(" ").toLowerCase().includes(normalizedQuery),
    );
  }, [normalizedQuery]);

  const schoolCards = mockSchools.slice(0, 6);

  return (
    <div className="space-y-24 pb-24">
      <section className="relative overflow-hidden rounded-[2.5rem] border border-border/60 bg-[linear-gradient(135deg,rgba(21,48,96,0.96),rgba(28,67,124,0.92))] px-6 py-16 text-white shadow-[0_30px_80px_rgba(21,48,96,0.18)] md:px-10 md:py-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,191,64,0.22),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(255,255,255,0.08),transparent_30%)]" />
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div className="max-w-3xl">
            <Badge variant="outline" className="border-white/20 bg-white/10 px-4 py-2 text-white">
              <Sparkles className="mr-2 h-4 w-4 text-accent" />
              Gurgaon / Gurugram only
            </Badge>
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              Gurgaon Areas for Premium Board Exam Home Tutors
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 md:text-xl">
              Explore Gurugram by corridor, sector, and society to find locality-aware Class 10 and Class 12 home tutoring that fits school routes, evening timing preferences, and premium family schedules.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/contact">
                <Button size="lg" className="h-12 rounded-xl bg-white px-6 text-primary hover:bg-white/90">
                  Get Matched
                </Button>
              </Link>
              <a href="#area-search">
                <Button
                  variant="outline"
                  size="lg"
                  className="h-12 rounded-xl border-white/20 bg-white/10 px-6 text-white hover:bg-white/15 hover:text-white"
                >
                  Explore Corridors
                </Button>
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {[
              { label: "Clusters", value: "10 curated Gurgaon area clusters" },
              { label: "Focus", value: "Class 10 & Class 12 board prep" },
              { label: "Flow", value: "City → corridor → sector → society" },
            ].map((item) => (
              <div key={item.label} className="rounded-[1.75rem] border border-white/10 bg-white/10 p-5 backdrop-blur-sm">
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/60">{item.label}</p>
                <p className="mt-3 text-base font-semibold leading-7 text-white">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="area-search" className="rounded-[2.25rem] border border-border/60 bg-white p-6 shadow-sm md:p-8">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <div className="mb-4 text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">Search by locality</div>
            <h2 className="text-3xl font-bold text-primary md:text-4xl">Search sectors, corridors, societies, or school-linked pockets</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-muted-foreground">
              Designed for parents who want a smooth discovery flow rather than a long directory page.
            </p>
          </div>

          <div className="rounded-[1.75rem] border border-primary/10 bg-primary/5 p-4">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search Sector 53, DLF Camellias, Golf Course Road..."
                className="h-14 rounded-2xl border-white bg-white pl-12 pr-4 text-base shadow-sm"
              />
            </label>
            <div className="mt-4 flex flex-wrap gap-2">
              {areaTabs.map((tab) => (
                <button
                  key={tab.slug}
                  type="button"
                  onClick={() => setActiveTab(tab.slug)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                    activeTab === tab.slug
                      ? "bg-primary text-white shadow-sm"
                      : "bg-white text-primary/75 hover:bg-primary/10 hover:text-primary"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <AreaSection
        eyebrow="Area Clusters"
        title="Start with the Gurgaon corridor that best matches your family"
        description="Each cluster below highlights the sectors, societies, and school relevance that usually matter most for premium board-exam home tutoring."
      >
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredClusters.map((cluster) => (
            <AreaCard key={cluster.slug} area={cluster} />
          ))}
        </div>
        {filteredClusters.length === 0 ? (
          <div className="mt-6 rounded-[1.75rem] border border-dashed border-border bg-muted/20 p-8 text-center text-muted-foreground">
            No Gurgaon areas match that search yet. Try a sector, society, or corridor name instead.
          </div>
        ) : null}
      </AreaSection>

      <AreaSection
        eyebrow="Corridor Overview"
        title="Six discovery corridors that make the page easier to use"
        description="These corridor groupings keep the page readable while still guiding parents toward the right sector and society pages."
      >
        <div className="grid gap-5 lg:grid-cols-2">
          {corridorHighlights.map((corridor) => (
            <Card key={corridor.title} className="rounded-[2rem] border-border/60 bg-white">
              <CardContent className="p-7">
                <h3 className="text-2xl font-bold text-primary">{corridor.title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{corridor.description}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {corridor.clusterSlugs.map((slug) => {
                    const cluster = areaClusters.find((item) => item.slug === slug);
                    if (!cluster) return null;

                    return (
                      <Link key={slug} href={`/gurgaon-area/${slug}`}>
                        <Badge variant="outline" className="rounded-full border-primary/10 bg-primary/5 px-3 py-1 text-primary">
                          {cluster.name}
                        </Badge>
                      </Link>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </AreaSection>

      <AreaSection
        eyebrow="Featured Sectors"
        title="Important sectors for Gurgaon board-exam tutor matching"
        description="These sector cards hint at school relevance, subject demand, and adjacent areas so the page feels useful rather than generic."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {visibleSectorCards.map((sector) => (
            <Link
              key={sector.slug}
              href={`/gurugram/sectors/${sector.slug}`}
              className="group rounded-[2rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">Sector Highlight</p>
                  <h3 className="mt-3 text-2xl font-bold text-primary">{sector.name}</h3>
                </div>
                <MapPin className="h-6 w-6 text-accent" />
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">{sector.microcopy}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {sector.subjectDemand.map((subject) => (
                  <Badge key={subject} variant="outline" className="rounded-full border-border/80 bg-muted/30 px-3 py-1 text-foreground">
                    {subject}
                  </Badge>
                ))}
              </div>
              <div className="mt-5 text-sm text-muted-foreground">
                School relevance:{" "}
                <span className="font-medium text-foreground">
                  {sector.nearbySchoolSlugs
                    .map((slug) => mockSchools.find((school) => school.slug === slug)?.name)
                    .filter(Boolean)
                    .slice(0, 2)
                    .join(" • ")}
                </span>
              </div>
              <div className="mt-6 text-sm font-semibold text-primary">
                Explore Sector <ArrowRight className="ml-1 inline h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </AreaSection>

      <AreaSection
        eyebrow="Featured Societies"
        title="Premium societies and micro-areas worth highlighting"
        description="Short, convenience-led society notes help parents understand where in-home tutoring is especially practical."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleSocieties.map((society) => (
            <Link
              key={`${society.sectorSlug}-${society.slug}`}
              href={`/gurugram/sectors/${society.sectorSlug}/${society.slug}`}
              className="group rounded-[1.75rem] border border-border/60 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">{society.sectorName}</p>
              <h3 className="mt-3 text-xl font-bold text-primary">{society.name}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{society.summary}</p>
              <div className="mt-5 text-sm font-semibold text-primary">
                View Society <ArrowRight className="ml-1 inline h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>
      </AreaSection>

      <AreaSection
        eyebrow="Nearby Schools"
        title="School relevance, without implying any school tie-up"
        description="Some localities naturally connect more closely to certain school corridors. We use that only to improve tutor matching and scheduling."
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {schoolCards.map((school) => (
            <Link
              key={school.slug}
              href={getSchoolHubLink(school.slug)}
              className="rounded-[1.75rem] border border-border/60 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">School corridor</p>
                  <h3 className="mt-3 text-xl font-bold text-primary">{school.name}</h3>
                </div>
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <p className="mt-4 text-sm leading-7 text-muted-foreground">
                Useful for area pages where parents want tutors familiar with nearby school routines and board expectations.
              </p>
              <p className="mt-4 text-sm font-medium text-foreground">{school.location}</p>
            </Link>
          ))}
        </div>
      </AreaSection>

      <AreaSection
        eyebrow="Why Locality Matters"
        title="Why Gurgaon locality still matters for premium home tutoring"
      >
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {[
            {
              title: "Timing convenience",
              description: "A tutor who can reach your area reliably is easier to retain through board season and pre-board rush.",
            },
            {
              title: "School corridor relevance",
              description: "Nearby school patterns often influence test timing, workload intensity, and subject support needs.",
            },
            {
              title: "One-to-one availability",
              description: "Premium families often need weekday and weekend slots that fit activities, travel, and school deadlines.",
            },
            {
              title: "Home-visit practicality",
              description: "For sectors and gated societies, smooth access often matters as much as subject expertise.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-[1.75rem] border border-border/60 bg-muted/20 p-6">
              <h3 className="text-xl font-bold text-primary">{item.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </AreaSection>

      <section className="rounded-[2.5rem] border border-border/60 bg-primary px-6 py-10 text-white shadow-[0_30px_80px_rgba(21,48,96,0.16)] md:px-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-white/60">Parent-friendly CTA</p>
            <h2 className="mt-4 text-3xl font-bold md:text-4xl">Ready to shortlist a Gurgaon tutor by locality, board, and subject?</h2>
            <p className="mt-4 max-w-2xl text-lg leading-8 text-white/75">
              We keep the process simple: tell us your sector or society, board, subjects, and preferred timing, and we will match accordingly.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            <Link href="https://wa.me/919582706764?text=Hi%20BoardPeFocus%2C%20I%20want%20a%20home%20tutor%20in%20Gurgaon." target="_blank">
              <Button className="h-12 w-full rounded-xl bg-white text-primary hover:bg-white/90">
                WhatsApp
              </Button>
            </Link>
            <Link href="/contact">
              <Button variant="outline" className="h-12 w-full rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Request Callback
              </Button>
            </Link>
            <Link href="/search">
              <Button variant="outline" className="h-12 w-full rounded-xl border-white/20 bg-white/10 text-white hover:bg-white/15 hover:text-white">
                Get Matched
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <FAQ
        title="Area FAQs"
        subtitle="Quick answers on locality availability, sectors, societies, timing, and subject demand."
        items={areaFaqs}
        columns={2}
      />

      <AreaSection
        eyebrow="Curated Links"
        title="Keep discovery tight with related boards, subjects, schools, and top localities"
        description="This footer-style module keeps important pages close to home without turning the area hub into a giant wall of links."
      >
        <div className="grid gap-6 lg:grid-cols-4">
          {[
            {
              title: "Related Boards",
              icon: <Sparkles className="h-5 w-5 text-accent" />,
              links: [
                { label: "CBSE Tutors", href: "/boards/cbse" },
                { label: "ICSE Tutors", href: "/boards/icse" },
                { label: "IB DP Tutors", href: "/boards/ib" },
              ],
            },
            {
              title: "Popular Subjects",
              icon: <Building2 className="h-5 w-5 text-accent" />,
              links: [
                { label: "CBSE Maths", href: "/boards/cbse/class-10/maths-home-tutor-gurgaon" },
                { label: "CBSE Physics", href: "/boards/cbse/class-12/physics-home-tutor-gurgaon" },
                { label: "CBSE Accountancy", href: "/boards/cbse/class-12/accountancy-home-tutor-gurgaon" },
              ],
            },
            {
              title: "Related Schools",
              icon: <GraduationCap className="h-5 w-5 text-accent" />,
              links: schoolCards.slice(0, 3).map((school) => ({
                label: school.name,
                href: getSchoolHubLink(school.slug),
              })),
            },
            {
              title: "Top Localities",
              icon: <PhoneCall className="h-5 w-5 text-accent" />,
              links: [
                { label: "DLF Phase 5", href: "/gurugram/sectors/dlf-phase-5" },
                { label: "Sector 53", href: "/gurugram/sectors/sector-53" },
                { label: "Sector 50", href: "/gurugram/sectors/sector-50" },
              ],
            },
          ].map((column) => (
            <div key={column.title} className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3 text-primary">
                {column.icon}
                <h3 className="text-xl font-bold">{column.title}</h3>
              </div>
              <div className="mt-5 space-y-3">
                {column.links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </AreaSection>
    </div>
  );
}
