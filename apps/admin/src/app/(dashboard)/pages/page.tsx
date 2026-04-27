"use client";

import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertCircle, Archive, CheckCircle2, Edit, ExternalLink, Plus, RefreshCw, Save, Sparkles } from "lucide-react";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

function emptyForm() {
  return {
    title: "",
    slug: "",
    status: "DRAFT",
    seoTitle: "",
    metaDescription: "",
    keywords: "",
    canonical: "",
    ogImage: "",
    noIndex: false,
    blocks: "[]",
  };
}

function blocksToText(item: any) {
  const blocks = Array.isArray(item?.blocks)
    ? item.blocks.map((block: any) => ({
        type: block.type,
        order: block.order,
        content: block.content,
      }))
    : [];
  return JSON.stringify(blocks, null, 2);
}

function statusClass(status?: string) {
  if (status === "PUBLISHED") return "border-green-200 bg-green-50 text-green-700";
  if (status === "ARCHIVED") return "border-rose-200 bg-rose-50 text-rose-700";
  return "border-slate-200 bg-slate-50 text-slate-600";
}

export default function PagesManagementPage() {
  const [pages, setPages] = useState<any[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      setPages(await api.pages.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load pages.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return pages;
    return pages.filter((page) => `${page.title} ${page.slug}`.toLowerCase().includes(normalized));
  }, [pages, query]);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError("");
    setNotice("");
  };

  const startEdit = (page: any) => {
    setEditingId(page.id);
    setForm({
      title: page.title ?? "",
      slug: page.slug ?? "",
      status: page.status ?? "DRAFT",
      seoTitle: page.seo?.title ?? "",
      metaDescription: page.seo?.description ?? "",
      keywords: page.seo?.keywords ?? "",
      canonical: page.seo?.canonical ?? "",
      ogImage: page.seo?.ogImage ?? "",
      noIndex: Boolean(page.seo?.noIndex),
      blocks: blocksToText(page),
    });
    setError("");
    setNotice("");
  };

  const updateField = (name: keyof ReturnType<typeof emptyForm>, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const save = async (statusOverride?: string) => {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const payload = { ...form, status: statusOverride ?? form.status };
      if (editingId) {
        await api.pages.update(editingId, payload);
      } else {
        await api.pages.create(payload);
      }
      setNotice("Page saved.");
      await load();
      if (!editingId) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save page.");
    } finally {
      setSaving(false);
    }
  };

  const archive = async (page: any) => {
    if (!window.confirm(`Archive ${page.title}?`)) return;
    setError("");
    setNotice("");
    try {
      await api.pages.delete(page.id);
      setNotice("Page archived.");
      await load();
      if (editingId === page.id) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to archive page.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Pages</h1>
          <p className="text-sm text-slate-500">Create, publish, archive, and edit frontend CMS pages backed by PageRecord.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/page-generator">
            <Button variant="outline" className="border-amber-100 bg-amber-50 font-bold text-amber-700 hover:bg-amber-100">
              <Sparkles className="mr-2 h-4 w-4" /> Page Generator
            </Button>
          </Link>
          <Button variant="outline" className="border-slate-200 font-bold" onClick={() => void load()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button className="bg-primary font-bold text-white hover:bg-primary/90" onClick={startCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Page
          </Button>
        </div>
      </div>

      {(error || notice) && (
        <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm font-medium ${error ? "border-rose-100 bg-rose-50 text-rose-700" : "border-green-100 bg-green-50 text-green-700"}`}>
          {error ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <CheckCircle2 className="mt-0.5 h-4 w-4" />}
          <span>{error || notice}</span>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black uppercase tracking-tight">Records</CardTitle>
              <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-500">{filtered.length} shown</Badge>
            </div>
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search title or slug..." className="max-w-md" />
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Page</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Updated</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={4} className="px-4 py-12 text-center text-slate-400">Loading pages...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-12 text-center text-slate-400">No pages found.</td></tr>
                  ) : (
                    filtered.map((page) => (
                      <tr key={page.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-900">{page.title}</p>
                          <div className="flex items-center gap-2 text-[11px] font-mono text-blue-700">
                            <span>/{page.slug}</span>
                            <ExternalLink className="h-3 w-3" />
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={`${statusClass(page.status)} text-[9px] font-black uppercase tracking-widest`}>{page.status}</Badge>
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-400">{new Date(page.updatedAt).toLocaleDateString()}</td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(page)}>
                              <Edit className="h-4 w-4 text-slate-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-rose-600" onClick={() => void archive(page)}>
                              <Archive className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-tight">{editingId ? "Edit Page" : "Create Page"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Title"><Input value={form.title} onChange={(event) => updateField("title", event.target.value)} /></Field>
            <Field label="Slug"><Input value={form.slug} onChange={(event) => updateField("slug", event.target.value)} placeholder="resources/my-page" /></Field>
            <Field label="Status">
              <select value={form.status} onChange={(event) => updateField("status", event.target.value)} className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option value="DRAFT">Draft</option>
                <option value="PUBLISHED">Published</option>
                <option value="ARCHIVED">Archived</option>
              </select>
            </Field>
            <Field label="SEO Title"><Input value={form.seoTitle} onChange={(event) => updateField("seoTitle", event.target.value)} /></Field>
            <Field label="Meta Description"><Textarea value={form.metaDescription} onChange={(event) => updateField("metaDescription", event.target.value)} className="min-h-20" /></Field>
            <Field label="Keywords"><Input value={form.keywords} onChange={(event) => updateField("keywords", event.target.value)} /></Field>
            <Field label="Canonical"><Input value={form.canonical} onChange={(event) => updateField("canonical", event.target.value)} /></Field>
            <Field label="OG Image"><Input value={form.ogImage} onChange={(event) => updateField("ogImage", event.target.value)} /></Field>
            <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">
              <input type="checkbox" checked={form.noIndex} onChange={(event) => updateField("noIndex", event.target.checked)} />
              Noindex
            </label>
            <Field label="Content Blocks JSON"><Textarea value={form.blocks} onChange={(event) => updateField("blocks", event.target.value)} className="min-h-40 font-mono text-xs" /></Field>
            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button variant="outline" className="border-slate-200 font-bold" disabled={saving} onClick={() => void save("DRAFT")}>
                <Save className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button className="bg-primary font-bold text-white hover:bg-primary/90" disabled={saving} onClick={() => void save("PUBLISHED")}>
                <CheckCircle2 className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Publish"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      {children}
    </div>
  );
}
