import { FAQPageClient } from "@/components/pages/FAQPageClient";
import { JsonLd } from "@/components/seo/JsonLd";
import { categorizedFaqs } from "@/data/faqs";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";

export const metadata = constructMetadata({
  title: "Frequently Asked Questions | BoardPeFocus",
  description: "Answers to common questions about BoardPeFocus, our Gurugram-only home tutoring model, supported boards, tutor matching, fees, and scheduling.",
  pathname: "/faqs",
});

export default function FAQPage() {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "FAQs", url: absoluteUrl("/faqs") },
  ]);
  const faqJsonLd = generateFaqJsonLd(
    categorizedFaqs.flatMap((category) => category.items),
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <FAQPageClient />
    </>
  );
}
