import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { GurgaonAreasHub } from "@/components/areas/GurgaonAreasHub";
import { AreaBreadcrumbs } from "@/components/areas/AreaBreadcrumbs";
import { absoluteUrl, constructMetadata, generateBreadcrumbJsonLd } from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Gurgaon Areas for Premium Board Exam Home Tutors | BoardPeFocus",
  description:
    "Explore Gurgaon and Gurugram areas for premium Class 10 and Class 12 home tutors. Browse corridors, sectors, societies, and nearby school relevance in one clean discovery hub.",
  pathname: "/gurgaon-area",
});

export default function GurgaonAreaPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Gurgaon Areas", url: absoluteUrl("/gurgaon-area") },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />

      <section className="pt-32">
        <div className="container mx-auto max-w-7xl px-4">
          <AreaBreadcrumbs items={[{ label: "Home", href: "/" }, { label: "Gurgaon Areas" }]} />
          <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.26em] text-primary/60">Areas Hub</p>
              <p className="mt-3 max-w-2xl text-sm leading-7 text-muted-foreground">
                A dedicated Gurgaon area flow that keeps corridors, sectors, and societies discoverable without using a dropdown in the main navigation.
              </p>
            </div>
            <Link href="/contact">
              <Button variant="outline" className="rounded-xl px-5">
                Request a Callback
              </Button>
            </Link>
          </div>

          <GurgaonAreasHub />
        </div>
      </section>
    </div>
  );
}
