import Link from "next/link";
import { Metadata } from "next";
import { areaClusters } from "@/data/areas";
import { getAllBoardParams, getBoardPath } from "@/app/boards/_data/boards";
import { getAllClassHubParams, getClassHubPath } from "@/app/classes/_data/classes";
import { getAllSchoolParams } from "@/app/schools/_data/schools";
import { getAllResourceCategoryParams } from "@/app/resources/_data/catalog";
import { faqTopics } from "@/app/faqs/_data/topics";
import { processPages } from "@/app/process/_data/process";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";

const boardLinks = getAllBoardParams().map(({ board }) => ({
  title: board.toUpperCase(),
  href: getBoardPath(board),
}));

const classLinks = getAllClassHubParams().map(({ classLevel }) => ({
  title: classLevel.replace("-", " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
  href: getClassHubPath(classLevel),
}));

const schoolLinks = getAllSchoolParams().slice(0, 10).map(({ schoolSlug }) => ({
  title: schoolSlug.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
  href: `/schools/${schoolSlug}`,
}));

const resourceLinks = getAllResourceCategoryParams().map(({ category }) => ({
  title: category.replace(/-/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase()),
  href: `/resources/${category}`,
}));

const sections = [
  {
    title: "Core Hubs",
    links: [
      { title: "Home", href: "/" },
      { title: "Boards", href: "/boards" },
      { title: "Classes", href: "/classes" },
      { title: "Schools", href: "/schools" },
      { title: "Gurgaon Areas", href: "/gurgaon-area" },
      { title: "Resources", href: "/resources" },
      { title: "Results", href: "/result" },
      { title: "Support", href: "/support" },
      { title: "FAQs", href: "/faqs" },
      { title: "Contact", href: "/contact" },
      { title: "Browse Tutors", href: "/search" },
    ],
  },
  {
    title: "Boards",
    links: boardLinks,
  },
  {
    title: "Classes",
    links: classLinks,
  },
  {
    title: "Schools",
    links: schoolLinks,
  },
  {
    title: "Top Gurgaon Areas",
    links: areaClusters.map((cluster) => ({
      title: cluster.name,
      href: `/gurgaon-area/${cluster.slug}`,
    })),
  },
  {
    title: "Resources",
    links: resourceLinks,
  },
  {
    title: "Process",
    links: [{ title: "Process Hub", href: "/process" }].concat(
      processPages.map((page) => ({
        title: page.label,
        href: `/process/${page.slug}`,
      })),
    ),
  },
  {
    title: "FAQ Topics",
    links: faqTopics.map((topic) => ({
      title: topic.label,
      href: `/faqs/${topic.slug}`,
    })),
  },
  {
    title: "Company",
    links: [
      { title: "About", href: "/about" },
      { title: "Privacy Policy", href: "/privacy-policy" },
      { title: "Terms", href: "/terms" },
      { title: "Transparency", href: "/transparency" },
      { title: "Gurugram", href: "/gurugram" },
    ],
  },
];

export const metadata: Metadata = constructMetadata({
  title: "HTML Sitemap | BoardPeFocus",
  description:
    "Browse the main BoardPeFocus hubs, authority pages, support pages, and discovery routes from one clean HTML sitemap.",
  pathname: "/site-map",
});

export default function SiteMapPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "HTML Sitemap", url: absoluteUrl("/site-map") },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="pt-32 pb-24">
        <div className="container mx-auto max-w-7xl px-4">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <li>
                <Link href="/" className="transition-colors hover:text-primary">
                  Home
                </Link>
              </li>
              <li>/</li>
              <li className="font-semibold text-primary">HTML Sitemap</li>
            </ol>
          </nav>

          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">HTML Sitemap</p>
            <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
              Browse the main BoardPeFocus page clusters
            </h1>
            <p className="mt-6 text-lg leading-8 text-muted-foreground">
              This page keeps the main hubs, support routes, and authority layers discoverable for both families and crawlers without turning the site into a directory wall.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {sections.map((section) => (
              <section
                key={section.title}
                className="rounded-[2rem] border border-border/60 bg-white p-7 shadow-sm"
              >
                <h2 className="text-2xl font-bold text-primary">{section.title}</h2>
                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {section.links.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      className="rounded-[1.25rem] border border-border/60 bg-muted/20 px-4 py-3 text-sm font-medium text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-white hover:shadow-sm"
                    >
                      {link.title}
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
