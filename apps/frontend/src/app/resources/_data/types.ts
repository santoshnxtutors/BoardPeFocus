export interface ResourceFaqItem {
  question: string;
  answer: string;
}

export interface ResourceLinkCard {
  title: string;
  href: string;
  description: string;
}

export interface ResourceChipLink {
  label: string;
  href: string;
}

export interface ResourceCategory {
  slug: string;
  title: string;
  description: string;
  audience: string;
  ctaLabel: string;
  heroTitle: string;
  heroDescription: string;
}

export interface ResourceArticleSection {
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface ResourceArticle {
  slug: string;
  categorySlug: string;
  title: string;
  description: string;
  excerpt: string;
  audience: string;
  readTime: string;
  featured: boolean;
  heroEyebrow: string;
  answerFirst: string;
  keyTakeaways: string[];
  tags: string[];
  contextualLinks: ResourceChipLink[];
  sections: ResourceArticleSection[];
  midCta: {
    title: string;
    description: string;
  };
  moneyPageLinks: ResourceLinkCard[];
  continueLinks: ResourceLinkCard[];
  faq: ResourceFaqItem[];
  relatedArticleSlugs: string[];
}
