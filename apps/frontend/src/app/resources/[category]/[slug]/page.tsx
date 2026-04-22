import { notFound } from "next/navigation";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  absoluteUrl,
  constructMetadata,
  generateBreadcrumbJsonLd,
  generateFaqJsonLd,
} from "@/lib/seo";
import { ResourceArticleView } from "@/app/resources/_components/ResourceArticleView";
import {
  getAllResourceArticleParams,
  getRelatedArticles,
  getResourceArticle,
  getResourceArticlePath,
  getResourceCategoryFromArticle,
} from "@/app/resources/_data/articles";

export function generateStaticParams() {
  return getAllResourceArticleParams();
}

export function generateMetadata({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = getResourceArticle(params.category, params.slug);

  if (!article) {
    return constructMetadata({ title: "Resource Not Found | BoardPeFocus", noIndex: true });
  }

  return constructMetadata({
    title: `${article.title} | BoardPeFocus Resources`,
    description: article.description,
    pathname: getResourceArticlePath(article),
  });
}

export default function ResourceArticlePage({
  params,
}: {
  params: { category: string; slug: string };
}) {
  const article = getResourceArticle(params.category, params.slug);

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
