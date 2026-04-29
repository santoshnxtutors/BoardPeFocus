import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import { ResourceArticleView } from "@/app/resources/_components/ResourceArticleView";
import { fetchBackend } from "@/lib/backend-api";
import {
  getAllResourceArticleParams,
  getRelatedArticles,
  getResourceArticle,
  getResourceArticlePath,
  getResourceCategoryFromArticle,
} from "@/app/resources/_data/articles";

export const dynamic = "force-dynamic";

interface LiveResourceArticle {
  id: string;
  slug: string;
  title: string;
  category?: string | null;
  summary?: string | null;
  body?: string | null;
  seoTitle?: string | null;
  metaDescription?: string | null;
}

async function getLiveResource(slug: string) {
  const response = await fetchBackend(`/content/resources/${encodeURIComponent(slug)}`);
  if (!response.ok) return null;
  return (await response.json()) as LiveResourceArticle;
}

export function generateStaticParams() {
  return getAllResourceArticleParams();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category, slug } = await params;
  const liveArticle = await getLiveResource(slug);

  if (liveArticle) {
    return constructMetadata({
      title: liveArticle.seoTitle ?? `${liveArticle.title} | BoardPeFocus Resources`,
      description: liveArticle.metaDescription ?? liveArticle.summary ?? undefined,
      pathname: `/resources/${category}/${slug}`,
    });
  }

  const article = getResourceArticle(category, slug);

  if (!article) {
    return constructMetadata({ title: "Resource Not Found | BoardPeFocus", noIndex: true });
  }

  return constructMetadata({
    title: `${article.title} | BoardPeFocus Resources`,
    description: article.description,
    pathname: getResourceArticlePath(article),
  });
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ category: string; slug: string }>;
}) {
  const { category: categorySlug, slug } = await params;
  const liveArticle = await getLiveResource(slug);

  if (liveArticle) {
    return <LiveResourceView article={liveArticle} categorySlug={categorySlug} />;
  }

  const article = getResourceArticle(categorySlug, slug);

  if (!article) {
    notFound();
  }

  const category = getResourceCategoryFromArticle(article);
  const relatedArticles = getRelatedArticles(article).map((relatedArticle) => ({
    article: relatedArticle,
    category: getResourceCategoryFromArticle(relatedArticle),
  }));

  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Resources", url: absoluteUrl("/resources") },
    { name: category.title, url: absoluteUrl(`/resources/${category.slug}`) },
    { name: article.title, url: absoluteUrl(getResourceArticlePath(article)) },
  ]);
  const faqJsonLd = generateFaqJsonLd(article.faq);
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    articleSection: category.title,
    author: {
      "@type": "Organization",
      name: "BoardPeFocus",
    },
    publisher: {
      "@type": "Organization",
      name: "BoardPeFocus",
      url: absoluteUrl("/"),
    },
    mainEntityOfPage: absoluteUrl(getResourceArticlePath(article)),
    about: article.tags,
    datePublished: "2026-04-22",
    dateModified: "2026-04-22",
  };

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <JsonLd data={faqJsonLd} />
      <JsonLd data={articleJsonLd} />
      <ResourceArticleView article={article} category={category} relatedArticles={relatedArticles} />
    </div>
  );
}

function LiveResourceView({
  article,
  categorySlug,
}: {
  article: LiveResourceArticle;
  categorySlug: string;
}) {
  const breadcrumbJsonLd = generateBreadcrumbJsonLd([
    { name: "Home", url: absoluteUrl("/") },
    { name: "Resources", url: absoluteUrl("/resources") },
    { name: article.category ?? categorySlug, url: absoluteUrl(`/resources/${categorySlug}`) },
    { name: article.title, url: absoluteUrl(`/resources/${categorySlug}/${article.slug}`) },
  ]);

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={breadcrumbJsonLd} />
      <section className="pt-32">
        <div className="container mx-auto max-w-4xl px-4">
          <article className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">
              {article.category ?? "Resource"}
            </p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
              {article.title}
            </h1>
            {article.summary ? (
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{article.summary}</p>
            ) : null}
            {article.body ? (
              <div className="mt-10 whitespace-pre-line text-base leading-8 text-foreground">
                {article.body}
              </div>
            ) : null}
          </article>
        </div>
      </section>
    </div>
  );
}
