"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Copy, Edit, FileText, Image as ImageIcon, Plus, RefreshCw, Save, Trash2 } from "lucide-react";
import { api, MediaAssetRecord } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function emptyForm() {
  return {
    filename: "",
    originalName: "",
    url: "",
    mimeType: "",
    size: "0",
    provider: "EXTERNAL",
    altText: "",
  };
}

function formatBytes(size: number) {
  if (!size) return "0 B";
  const units = ["B", "KB", "MB", "GB"];
  let value = size;
  let index = 0;
  while (value >= 1024 && index < units.length - 1) {
    value /= 1024;
    index += 1;
  }
  return `${value.toFixed(index === 0 ? 0 : 1)} ${units[index]}`;
}

export default function MediaLibraryPage() {
  const [media, setMedia] = useState<MediaAssetRecord[]>([]);
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
      setMedia(await api.media.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load media.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return media;
    return media.filter((item) =>
      [item.filename, item.originalName, item.url, item.altText, item.mimeType]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [media, query]);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError("");
    setNotice("");
  };

  const startEdit = (item: MediaAssetRecord) => {
    setEditingId(item.id);
    setForm({
      filename: item.filename,
      originalName: item.originalName,
      url: item.url,
      mimeType: item.mimeType,
      size: String(item.size ?? 0),
      provider: item.provider ?? "EXTERNAL",
      altText: item.altText ?? "",
    });
    setError("");
    setNotice("");
  };

  const updateField = (name: keyof ReturnType<typeof emptyForm>, value: string) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const payload = { ...form, size: Number(form.size || 0) };
      if (editingId) {
        await api.media.update(editingId, payload);
      } else {
        await api.media.create(payload);
      }
      setNotice("Media asset saved.");
      await load();
      if (!editingId) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save media.");
    } finally {
      setSaving(false);
    }
  };

  const remove = async (item: MediaAssetRecord) => {
    if (!window.confirm(`Delete ${item.filename}?`)) return;
    setError("");
    setNotice("");
    try {
      await api.media.delete(item.id);
      setNotice("Media asset deleted.");
      await load();
      if (editingId === item.id) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete media.");
    }
  };

  const copyUrl = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setNotice("Media URL copied.");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Media Library</h1>
          <p className="text-sm text-slate-500">Register and manage reusable media URLs for pages, tutors, schools, and SEO images.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200 font-bold" onClick={() => void load()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button className="bg-primary font-bold text-white hover:bg-primary/90" onClick={startCreate}>
            <Plus className="mr-2 h-4 w-4" /> New Asset
          </Button>
        </div>
      </div>

      {(error || notice) && (
        <div className={`flex items-start gap-3 rounded-xl border p-4 text-sm font-medium ${error ? "border-rose-100 bg-rose-50 text-rose-700" : "border-green-100 bg-green-50 text-green-700"}`}>
          {error ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <CheckCircle2 className="mt-0.5 h-4 w-4" />}
          <span>{error || notice}</span>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="space-y-4">
            <CardTitle className="text-lg font-black uppercase tracking-tight">Assets</CardTitle>
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search filename, alt text, URL..." className="max-w-md" />
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-400">Loading media...</div>
            ) : filtered.length === 0 ? (
              <div className="rounded-xl border border-slate-200 bg-white p-12 text-center text-sm text-slate-400">No media assets found.</div>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
                {filtered.map((item) => (
                  <Card key={item.id} className="group overflow-hidden border-slate-200 shadow-sm">
                    <div className="flex aspect-square items-center justify-center overflow-hidden bg-slate-100">
                      {item.mimeType?.startsWith("image/") ? (
                        <img src={item.url} alt={item.altText ?? item.filename} className="h-full w-full object-cover transition-transform group-hover:scale-105" />
                      ) : (
                        <FileText className="h-12 w-12 text-slate-300" />
                      )}
                    </div>
                    <CardContent className="space-y-3 p-3">
                      <div>
                        <p className="truncate text-[11px] font-black uppercase tracking-tight text-slate-700">{item.filename}</p>
                        <p className="mt-1 text-[10px] font-bold uppercase tracking-widest text-slate-400">{item.mimeType} - {formatBytes(item.size)}</p>
                      </div>
                      <div className="flex justify-between gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200" onClick={() => void copyUrl(item.url)}>
                          <Copy className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200" onClick={() => startEdit(item)}>
                          <Edit className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="outline" size="icon" className="h-8 w-8 border-slate-200 text-rose-600" onClick={() => void remove(item)}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-tight">{editingId ? "Edit Asset" : "Register Asset"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Media URL"><Input value={form.url} onChange={(event) => updateField("url", event.target.value)} placeholder="https://..." /></Field>
            <Field label="Filename"><Input value={form.filename} onChange={(event) => updateField("filename", event.target.value)} placeholder="hero-school.webp" /></Field>
            <Field label="Original Name"><Input value={form.originalName} onChange={(event) => updateField("originalName", event.target.value)} /></Field>
            <Field label="MIME Type"><Input value={form.mimeType} onChange={(event) => updateField("mimeType", event.target.value)} placeholder="image/webp" /></Field>
            <Field label="Size In Bytes"><Input type="number" value={form.size} onChange={(event) => updateField("size", event.target.value)} /></Field>
            <Field label="Provider"><Input value={form.provider} onChange={(event) => updateField("provider", event.target.value)} /></Field>
            <Field label="Alt Text"><Input value={form.altText} onChange={(event) => updateField("altText", event.target.value)} /></Field>
            <Button className="w-full bg-primary font-bold text-white hover:bg-primary/90" disabled={saving} onClick={() => void save()}>
              {form.mimeType.startsWith("image/") ? <ImageIcon className="mr-2 h-4 w-4" /> : <Save className="mr-2 h-4 w-4" />}
              {saving ? "Saving..." : "Save Asset"}
            </Button>
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
