import { notFound, redirect } from "next/navigation";
import { GeneratedManifestPage } from "@/components/generated-pages/GeneratedManifestPage";
import { fetchBackend } from "@/lib/backend-api";
import {
  buildGeneratedMetadata,
  getCatchAllManifestParams,
  getManifestRedirectTarget,
  getManifestPage,
  isCatchAllManifestPath,
} from "@/lib/generated-pages";
import { constructMetadata } from "@/lib/seo";

interface PageProps {
  params: Promise<{ slug: string[] }>;
}

interface CmsBlockRecord {
  id: string;
  type: string;
  content: Record<string, unknown>;
  order: number;
}

interface CmsPageRecord {
  id: string;
  slug: string;
  title: string;
  seo?: {
    title?: string | null;
    description?: string | null;
    keywords?: string | null;
    canonical?: string | null;
    ogImage?: string | null;
    noIndex?: boolean;
  } | null;
  blocks?: CmsBlockRecord[];
}

async function getCmsPage(pathname: string) {
  const slug = pathname.replace(/^\/+|\/+$/g, "");
  if (!slug) return null;

  const response = await fetchBackend(`/content/pages?slug=${encodeURIComponent(slug)}`);
  if (!response.ok) return null;

  return (await response.json()) as CmsPageRecord;
}

export function generateStaticParams() {
  return getCatchAllManifestParams();
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`.replace(/\/+/g, "/");
  const cmsPage = await getCmsPage(pathname);

  if (cmsPage) {
    return constructMetadata({
      title: cmsPage.seo?.title || cmsPage.title,
      description: cmsPage.seo?.description || undefined,
      pathname,
      image: cmsPage.seo?.ogImage || undefined,
      noIndex: cmsPage.seo?.noIndex,
    });
  }

  const record = getManifestPage(pathname);

  if (!record || !isCatchAllManifestPath(pathname)) {
    return constructMetadata({ title: "Page Not Found", noIndex: true });
  }

  return constructMetadata(buildGeneratedMetadata(record));
}

export default async function ManifestCatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const pathname = `/${slug.join("/")}`.replace(/\/+/g, "/");
  const cmsPage = await getCmsPage(pathname);

  if (cmsPage) {
    return <CmsPageView page={cmsPage} />;
  }

  const record = getManifestPage(pathname);

  if (!record || !isCatchAllManifestPath(pathname)) {
    notFound();
  }

  const redirectTarget = getManifestRedirectTarget(pathname);
  if (redirectTarget) {
    redirect(redirectTarget);
  }

  return <GeneratedManifestPage record={record} />;
}

function readText(content: Record<string, unknown>, keys: string[]) {
  for (const key of keys) {
    const value = content[key];
    if (typeof value === "string" && value.trim()) return value;
  }

  return "";
}

function CmsPageView({ page }: { page: CmsPageRecord }) {
  const blocks = page.blocks ?? [];
  const hero = blocks.find((block) => block.type === "HERO") ?? blocks[0];
  const heroTitle = hero ? readText(hero.content, ["title", "heading"]) : page.title;
  const heroDescription = hero
    ? readText(hero.content, ["description", "subtitle", "body"])
    : page.seo?.description ?? "";
  const bodyBlocks = blocks.filter((block) => block.id !== hero?.id);

  return (
    <main className="min-h-screen bg-background">
      <section className="pt-32">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm md:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-primary/60">BoardPeFocus</p>
            <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-primary md:text-6xl">
              {heroTitle || page.title}
            </h1>
            {heroDescription ? (
              <p className="mt-6 text-lg leading-8 text-muted-foreground">{heroDescription}</p>
            ) : null}
          </div>

          <div className="space-y-8 py-12">
            {bodyBlocks.length === 0 ? (
              <section className="rounded-[2rem] border border-border/60 bg-white p-8 text-muted-foreground shadow-sm">
                This page is published. Add content blocks in the admin panel to expand it.
              </section>
            ) : (
              bodyBlocks.map((block) => <CmsBlock key={block.id} block={block} />)
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

function CmsBlock({ block }: { block: CmsBlockRecord }) {
  const title = readText(block.content, ["title", "heading"]);
  const body = readText(block.content, ["body", "text", "description"]);
  const bullets = Array.isArray(block.content.bullets)
    ? block.content.bullets.filter((item): item is string => typeof item === "string")
    : [];

  return (
    <section className="rounded-[2rem] border border-border/60 bg-white p-8 shadow-sm">
      {title ? <h2 className="text-2xl font-bold text-primary">{title}</h2> : null}
      {body ? <p className="mt-4 text-base leading-8 text-muted-foreground">{body}</p> : null}
      {bullets.length > 0 ? (
        <div className="mt-6 grid gap-3">
          {bullets.map((bullet) => (
            <div key={bullet} className="rounded-2xl border border-primary/10 bg-primary/5 p-4 text-sm leading-7 text-foreground">
              {bullet}
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}
