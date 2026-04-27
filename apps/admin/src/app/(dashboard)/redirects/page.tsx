"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, Archive, CheckCircle2, Edit, Plus, RefreshCw, Save } from "lucide-react";
import { api, RedirectRule } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

function emptyForm() {
  return {
    from: "",
    to: "",
    code: "301",
    isActive: true,
  };
}

export default function RedirectsPage() {
  const [items, setItems] = useState<RedirectRule[]>([]);
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
      setItems(await api.redirects.list());
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load redirects.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => `${item.from} ${item.to}`.toLowerCase().includes(normalized));
  }, [items, query]);

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError("");
    setNotice("");
  };

  const startEdit = (item: RedirectRule) => {
    setEditingId(item.id);
    setForm({
      from: item.from,
      to: item.to,
      code: String(item.code),
      isActive: item.isActive,
    });
    setError("");
    setNotice("");
  };

  const save = async () => {
    setSaving(true);
    setError("");
    setNotice("");
    try {
      const payload = { ...form, code: Number(form.code) };
      if (editingId) {
        await api.redirects.update(editingId, payload);
      } else {
        await api.redirects.create(payload);
      }
      setNotice("Redirect saved.");
      await load();
      if (!editingId) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save redirect.");
    } finally {
      setSaving(false);
    }
  };

  const archive = async (item: RedirectRule) => {
    if (!window.confirm(`Disable redirect from ${item.from}?`)) return;
    setError("");
    setNotice("");
    try {
      await api.redirects.delete(item.id);
      setNotice("Redirect disabled.");
      await load();
      if (editingId === item.id) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to disable redirect.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">Redirects</h1>
          <p className="text-sm text-slate-500">Manage production redirect rules used by the frontend middleware.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-slate-200 font-bold" onClick={() => void load()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button className="bg-primary font-bold text-white hover:bg-primary/90" onClick={startCreate}>
            <Plus className="mr-2 h-4 w-4" /> New
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
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black uppercase tracking-tight">Rules</CardTitle>
              <Badge variant="outline" className="border-slate-200 bg-slate-50 text-slate-500">{filtered.length} shown</Badge>
            </div>
            <Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search source or destination..." className="max-w-md" />
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Source</th>
                    <th className="px-4 py-3">Destination</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr><td colSpan={4} className="px-4 py-12 text-center text-slate-400">Loading redirects...</td></tr>
                  ) : filtered.length === 0 ? (
                    <tr><td colSpan={4} className="px-4 py-12 text-center text-slate-400">No redirects found.</td></tr>
                  ) : (
                    filtered.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3 font-mono text-xs text-slate-700">{item.from}</td>
                        <td className="px-4 py-3 font-mono text-xs text-blue-700">{item.to}</td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={item.isActive ? "border-green-200 bg-green-50 text-green-700" : "border-slate-200 bg-slate-50 text-slate-500"}>
                            {item.code} {item.isActive ? "Active" : "Disabled"}
                          </Badge>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => startEdit(item)}>
                              <Edit className="h-4 w-4 text-slate-500" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-rose-600" onClick={() => void archive(item)}>
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
            <CardTitle className="text-lg font-black uppercase tracking-tight">{editingId ? "Edit Redirect" : "Create Redirect"}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Source Path"><Input value={form.from} onChange={(event) => setForm((current) => ({ ...current, from: event.target.value }))} placeholder="/old-page" /></Field>
            <Field label="Destination"><Input value={form.to} onChange={(event) => setForm((current) => ({ ...current, to: event.target.value }))} placeholder="/new-page or https://..." /></Field>
            <Field label="Status Code">
              <select value={form.code} onChange={(event) => setForm((current) => ({ ...current, code: event.target.value }))} className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm">
                <option value="301">301 Permanent</option>
                <option value="302">302 Temporary</option>
                <option value="307">307 Temporary</option>
                <option value="308">308 Permanent</option>
              </select>
            </Field>
            <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">
              <input type="checkbox" checked={form.isActive} onChange={(event) => setForm((current) => ({ ...current, isActive: event.target.checked }))} />
              Active
            </label>
            <Button className="w-full bg-primary font-bold text-white hover:bg-primary/90" disabled={saving} onClick={() => void save()}>
              <Save className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save Redirect"}
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
