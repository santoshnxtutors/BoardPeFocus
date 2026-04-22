import { notFound } from "next/navigation";
import { FAQ } from "@/components/faq/FAQ";
import { JsonLd } from "@/components/seo/JsonLd";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd, generateFaqJsonLd } from "@/lib/seo";
import { SchoolsBreadcrumbs } from "@/app/schools/_components/SchoolsBreadcrumbs";
import { SchoolsCtaBlock } from "@/app/schools/_components/SchoolsCtaBlock";
import { SchoolsRelatedLinks } from "@/app/schools/_components/SchoolsRelatedLinks";
import { SchoolTutorLinks } from "@/app/schools/_components/SchoolTutorLinks";
import { getAllSchoolParams, getSchoolConfig, getSchoolTutorProfiles } from "@/app/schools/_data/schools";

interface PageProps {
  params: Promise<{ schoolSlug: string }>;
}

export async function generateStaticParams() {
  return getAllSchoolParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { schoolSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  if (!school) return constructMetadata({ title: "School FAQ Page Not Found", noIndex: true });

  return constructMetadata({
    title: `${school.name} FAQs | BoardPeFocus`,
    description: `Frequently asked questions about school-aware tutoring for students studying in ${school.name}.`,
    pathname: `/schools/${school.slug}/faq`,
  });
}

export default async function SchoolFaqPage({ params }: PageProps) {
  const { schoolSlug } = await params;
  const school = getSchoolConfig(schoolSlug);
  if (!school) notFound();
  const tutors = getSchoolTutorProfiles(school);

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Schools", url: absoluteUrl("/schools") },
    { name: school.name, url: absoluteUrl(`/schools/${school.slug}`) },
    { name: "FAQ", url: absoluteUrl(`/schools/${school.slug}/faq`) },
  ]);
  const faqJsonLd = generateFaqJsonLd(school.faq);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <SchoolsBreadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Schools", href: "/schools" },
              { label: school.name, href: `/schools/${school.slug}` },
              { label: "FAQ" },
            ]}
          />

          <div className="space-y-16 py-12">
            <FAQ
              title={`${school.name} FAQs`}
              subtitle="Visible parent-friendly answers around school-aware tutoring, curriculum support, subject pathways, and nearby Gurgaon localities."
              items={school.faq}
              columns={2}
            />

            <SchoolsRelatedLinks
              links={[
                {
                  title: `${school.name} overview`,
                  href: `/schools/${school.slug}`,
                  description: "Return to the main school page for curriculum, area, and tutor routes.",
                },
                {
                  title: "Boards Hub",
                  href: "/boards",
                  description: "Use the Boards hub to compare curriculum and board pathways.",
                },
                {
                  title: "Classes Hub",
                  href: "/classes",
                  description: "Use the Classes hub to compare Class 10 and Class 12 routes more clearly.",
                },
                {
                  title: "Areas Hub",
                  href: "/gurgaon-area",
                  description: "Connect the school path back to Gurgaon corridors and premium locality discovery.",
                },
              ]}
            />

            <SchoolTutorLinks tutors={tutors} compact viewAllHref="/search" />

            <SchoolsCtaBlock
              title={`Still deciding the right tutor path for ${school.name}?`}
              description="Tell us the school, board, class, subject, and Gurgaon area, and we will help you move into the right one-to-one tutor match."
            />
          </div>
        </div>
      </section>
    </div>
  );
}
