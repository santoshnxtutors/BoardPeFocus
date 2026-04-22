import Link from "next/link";
import { faqTopics } from "@/app/faqs/_data/topics";

export function FaqTopicLinks() {
  return (
    <section className="bg-background px-4 py-24">
      <div className="container mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-[0.26em] text-accent">FAQ Topics</p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-primary md:text-4xl">
            Browse FAQs by board, class, school, area, tutor, service, or parent concern
          </h2>
          <p className="mt-4 text-base leading-8 text-muted-foreground md:text-lg">
            The Help Center now includes cleaner topic routes so families can move from general questions into the exact layer they care about most.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {faqTopics.map((topic) => (
            <Link
              key={topic.slug}
              href={`/faqs/${topic.slug}`}
              className="rounded-[1.75rem] border border-border/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">{topic.label}</p>
              <h3 className="mt-3 text-2xl font-bold text-primary">{topic.title}</h3>
              <p className="mt-3 text-sm leading-7 text-muted-foreground">{topic.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
