"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, RefreshCw, Save, SearchCheck } from "lucide-react";
import { api, SeoMetadataTarget } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const targetLabels: Record<string, string> = {
  pages: "Page",
  boards: "Board",
  classes: "Class",
  subjects: "Subject",
  schools: "School",
  sectors: "Sector",
  societies: "Society",
  resources: "Resource",
  "process-content": "Process",
};

function emptyForm() {
  return {
    seoTitle: "",
    metaDescription: "",
    keywords: "",
    canonical: "",
    ogTitle: "",
    ogDescription: "",
    ogImage: "",
    noIndex: false,
  };
}

export default function SEOPage() {
  const [items, setItems] = useState<SeoMetadataTarget[]>([]);
  const [selected, setSelected] = useState<SeoMetadataTarget | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const rows = await api.seo.list();
      setItems(rows);
      if (!selected && rows[0]) {
        selectItem(rows[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load SEO metadata.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      [item.label, item.slug, item.targetType, item.seoTitle, item.metaDescription]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [items, query]);

  const stats = useMemo(() => {
    const missingTitle = items.filter((item) => !item.seoTitle?.trim()).length;
    const missingDescription = items.filter((item) => !item.metaDescription?.trim()).length;
    const noIndex = items.filter((item) => item.noIndex).length;
    return { total: items.length, missingTitle, missingDescription, noIndex };
  }, [items]);

  const selectItem = (item: SeoMetadataTarget) => {
    setSelected(item);
    setForm({
      seoTitle: item.seoTitle ?? "",
      metaDescription: item.metaDescription ?? "",
      keywords: item.keywords ?? "",
      canonical: item.canonical ?? "",
      ogTitle: item.ogTitle ?? "",
      ogDescription: item.ogDescription ?? "",
      ogImage: item.ogImage ?? "",
      noIndex: Boolean(item.noIndex),
    });
    setError("");
    setNotice("");
  };

  const updateField = (name: keyof ReturnType<typeof emptyForm>, value: string | boolean) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const supportsAdvancedSeoControls = selected?.targetType === "pages";

  const save = async () => {
    if (!selected) return;
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const payload =
        selected.targetType === "pages"
          ? form
          : {
              seoTitle: form.seoTitle,
              metaDescription: form.metaDescription,
              canonical: form.canonical,
              ogTitle: form.ogTitle,
              ogDescription: form.ogDescription,
              ogImage: form.ogImage,
            };
      await api.seo.update(selected.targetType, selected.targetId, payload);
      setNotice("SEO metadata saved.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save SEO metadata.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">SEO Metadata</h1>
          <p className="text-sm text-slate-500">Manage metadata for pages and published content entities from one control surface.</p>
        </div>
        <Button variant="outline" className="font-bold border-slate-200" onClick={() => void load()}>
          <RefreshCw className="mr-2 h-4 w-4" /> Refresh
        </Button>
      </div>

      {(error || notice) && (
        <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm font-medium ${error ? "border-rose-100 bg-rose-50 text-rose-700" : "border-green-100 bg-green-50 text-green-700"}`}>
          {error ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <CheckCircle2 className="mt-0.5 h-4 w-4" />}
          <span>{error || notice}</span>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-4">
        {[
          ["Tracked Targets", stats.total],
          ["Missing Titles", stats.missingTitle],
          ["Missing Descriptions", stats.missingDescription],
          ["Noindex Pages", stats.noIndex],
        ].map(([label, value]) => (
          <Card key={label} className="border-slate-200 shadow-sm">
            <CardContent className="p-5">
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</p>
              <p className="mt-2 text-2xl font-black text-slate-900">{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_460px]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="space-y-4">
            <CardTitle className="text-lg font-black uppercase tracking-tight">Metadata Targets</CardTitle>
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search target, slug, title..." className="max-w-md" />
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Target</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3">Health</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={3} className="px-4 py-12 text-center text-slate-400">Loading metadata...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={3} className="px-4 py-12 text-center text-slate-400">No metadata targets found.</td></tr>
                  ) : (
                    filtered.map((item) => (
                      <tr key={item.id} className={`cursor-pointer hover:bg-slate-50 ${selected?.id === item.id ? "bg-blue-50/60" : ""}`} onClick={() => selectItem(item)}>
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-900">{item.label}</p>
                          <p className="text-[11px] font-mono text-slate-400">{item.slug ? `/${item.slug}` : item.targetId}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className="border-slate-200 bg-slate-50 text-[9px] font-black uppercase tracking-widest text-slate-500">
                            {targetLabels[item.targetType] ?? item.targetType}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                            <SearchCheck className={`h-4 w-4 ${item.seoTitle && item.metaDescription ? "text-green-600" : "text-amber-500"}`} />
                            {item.seoTitle && item.metaDescription ? "Ready" : "Needs metadata"}
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
            <CardTitle className="text-lg font-black uppercase tracking-tight">{selected ? "Edit Metadata" : "Select a Target"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {selected ? (
              <>
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                  <p className="text-sm font-black text-slate-900">{selected.label}</p>
                  <p className="mt-1 text-[11px] font-mono text-slate-400">{selected.slug ? `/${selected.slug}` : selected.targetId}</p>
                </div>
                <Field label="SEO Title"><Input value={form.seoTitle} onChange={(event) => updateField("seoTitle", event.target.value)} /></Field>
                <Field label="Meta Description"><Textarea value={form.metaDescription} onChange={(event) => updateField("metaDescription", event.target.value)} className="min-h-24" /></Field>
                <Field label="Keywords">
                  <Input
                    value={form.keywords}
                    onChange={(event) => updateField("keywords", event.target.value)}
                    disabled={!supportsAdvancedSeoControls}
                  />
                </Field>
                <Field label="Canonical URL"><Input value={form.canonical} onChange={(event) => updateField("canonical", event.target.value)} /></Field>
                <Field label="OG Title"><Input value={form.ogTitle} onChange={(event) => updateField("ogTitle", event.target.value)} /></Field>
                <Field label="OG Description"><Textarea value={form.ogDescription} onChange={(event) => updateField("ogDescription", event.target.value)} className="min-h-20" /></Field>
                <Field label="OG Image URL"><Input value={form.ogImage} onChange={(event) => updateField("ogImage", event.target.value)} /></Field>
                {!supportsAdvancedSeoControls ? (
                  <p className="rounded-md border border-amber-100 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-700">
                    Keywords and noindex are currently supported only for CMS pages. Entity SEO fields will save title, description, canonical, and OG values.
                  </p>
                ) : null}
                <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">
                  <input
                    type="checkbox"
                    checked={form.noIndex}
                    disabled={!supportsAdvancedSeoControls}
                    onChange={(event) => updateField("noIndex", event.target.checked)}
                  />
                  Noindex
                </label>
                <Button className="w-full bg-primary font-bold text-white hover:bg-primary/90" disabled={saving} onClick={() => void save()}>
                  <Save className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save Metadata"}
                </Button>
              </>
            ) : (
              <p className="text-sm text-slate-400">Choose a row to edit metadata.</p>
            )}
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
