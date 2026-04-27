import { FAQPageClient } from "@/components/pages/FAQPageClient";
import { FaqTopicLinks } from "@/app/faqs/_components/FaqTopicLinks";
import { JsonLd } from "@/components/seo/JsonLd";
import { categorizedFaqs } from "@/data/faqs";
import { getLiveContent } from "@/lib/live-content";
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

interface LiveFaq {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
}

function groupFaqs(faqs: LiveFaq[]) {
  if (faqs.length === 0) return categorizedFaqs;

  const grouped = new Map<string, { category: string; items: { question: string; answer: string }[] }>();
  for (const faq of faqs) {
    const category = faq.category?.trim() || "General Information";
    const row = grouped.get(category) ?? { category, items: [] };
    row.items.push({ question: faq.question, answer: faq.answer });
    grouped.set(category, row);
  }

  return Array.from(grouped.values());
}

export default async function FAQPage() {
  const liveFaqs = await getLiveContent<LiveFaq>("/content/faqs");
  const visibleFaqs = groupFaqs(liveFaqs);
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "FAQs", url: absoluteUrl("/faqs") },
  ]);
  const faqJsonLd = generateFaqJsonLd(
    visibleFaqs.flatMap((category) => category.items),
  );

  return (
    <>
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <FAQPageClient initialCategories={visibleFaqs} />
      <FaqTopicLinks />
    </>
  );
}
