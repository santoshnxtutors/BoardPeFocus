"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import { AlertCircle, Archive, CheckCircle2, Edit, Plus, RefreshCw, Save } from "lucide-react";
import { api } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FieldType = "text" | "textarea" | "number" | "select" | "checkbox";

export interface ContentField {
  name: string;
  label: string;
  type?: FieldType;
  required?: boolean;
  options?: { label: string; value: string }[];
  lookupKey?: RelationField["lookupKey"];
  defaultValue?: any;
  placeholder?: string;
}

export interface RelationField {
  name: string;
  label: string;
  lookupKey: "boards" | "classes" | "subjects" | "schools" | "sectors" | "societies" | "tutors";
  relationKey?: string;
  childKey?: string;
  nestedKey?: string;
  entityType?: string;
}

interface ContentManagerProps {
  entity: string;
  title: string;
  description: string;
  primaryField?: string;
  secondaryField?: string;
  fields: ContentField[];
  relationFields?: RelationField[];
}

const publishStatuses = [
  { label: "Draft", value: "DRAFT" },
  { label: "Published", value: "PUBLISHED" },
  { label: "Archived", value: "ARCHIVED" },
];

function emptyForm(fields: ContentField[], relationFields: RelationField[] = []) {
  const form: Record<string, any> = {};
  for (const field of fields) {
    if (field.defaultValue !== undefined) {
      form[field.name] = field.defaultValue;
    } else if (field.type === "checkbox") {
      form[field.name] = false;
    } else if (field.type === "number") {
      form[field.name] = "";
    } else if (field.name === "status") {
      form[field.name] = "DRAFT";
    } else {
      form[field.name] = "";
    }
  }
  for (const relation of relationFields) {
    form[relation.name] = [];
  }
  return form;
}

function isBlankValue(value: any) {
  return value === undefined || value === null || (typeof value === "string" && value.trim() === "");
}

function relationIds(item: any, relation: RelationField) {
  const relationKey = relation.relationKey ?? relation.lookupKey;
  const childKey = relation.childKey;
  const nestedKey = relation.nestedKey;
  const rows = Array.isArray(item?.[relationKey]) ? item[relationKey] : [];

  return rows
    .filter((row: any) => !relation.entityType || row?.entityType === relation.entityType)
    .map((row: any) => {
      if (childKey && row?.[childKey]) return row[childKey];
      if (nestedKey && row?.[nestedKey]?.id) return row[nestedKey].id;
      return row?.id;
    })
    .filter(Boolean);
}

function statusClass(status?: string) {
  if (status === "PUBLISHED" || status === "APPROVED") {
    return "bg-green-50 text-green-700 border-green-200";
  }
  if (status === "ARCHIVED" || status === "REJECTED") {
    return "bg-rose-50 text-rose-700 border-rose-200";
  }
  return "bg-slate-50 text-slate-600 border-slate-200";
}

export function ContentManager({
  entity,
  title,
  description,
  primaryField = "name",
  secondaryField = "slug",
  fields,
  relationFields = [],
}: ContentManagerProps) {
  const [items, setItems] = useState<any[]>([]);
  const [lookups, setLookups] = useState<Record<string, any[]>>({});
  const [form, setForm] = useState<Record<string, any>>(() => emptyForm(fields, relationFields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const [rows, lookupRows] = await Promise.all([
        api.content.list(entity),
        api.lookups.list(),
      ]);
      setItems(rows);
      setLookups(lookupRows as any);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load admin data.");
    } finally {
      setLoading(false);
    }
  }, [entity]);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) => {
      const primary = String(item?.[primaryField] ?? item?.title ?? "").toLowerCase();
      const secondary = String(item?.[secondaryField] ?? "").toLowerCase();
      return primary.includes(normalized) || secondary.includes(normalized);
    });
  }, [items, primaryField, query, secondaryField]);
  const supportsDraftStatus =
    fields.find((field) => field.name === "status")?.options?.some((option) => option.value === "DRAFT") ??
    fields.some((field) => field.name === "status");

  const startCreate = () => {
    setEditingId(null);
    setForm(emptyForm(fields, relationFields));
    setError("");
    setNotice("");
  };

  const startEdit = (item: any) => {
    const next = emptyForm(fields, relationFields);
    for (const field of fields) {
      next[field.name] = item?.[field.name] ?? next[field.name];
    }
    for (const relation of relationFields) {
      next[relation.name] = relationIds(item, relation);
    }
    setEditingId(item.id);
    setForm(next);
    setError("");
    setNotice("");
  };

  const updateField = (name: string, value: any) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const toggleRelation = (name: string, id: string) => {
    setForm((current) => {
      const existing = Array.isArray(current[name]) ? current[name] : [];
      return {
        ...current,
        [name]: existing.includes(id)
          ? existing.filter((item: string) => item !== id)
          : [...existing, id],
      };
    });
  };

  const save = async (override?: Record<string, unknown>) => {
    setSaving(true);
    setError("");
    setNotice("");

    const payload = { ...form, ...override };
    const missingField = fields.find((field) => field.required && isBlankValue(payload[field.name]));
    if (missingField) {
      setError(`${missingField.label} is required.`);
      setSaving(false);
      return;
    }

    for (const field of fields) {
      if (field.type === "number" && payload[field.name] === "") {
        delete payload[field.name];
      }
    }

    try {
      if (editingId) {
        await api.content.update(entity, editingId, payload);
      } else {
        await api.content.create(entity, payload);
      }
      setNotice("Saved successfully.");
      await load();
      if (!editingId) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed.");
    } finally {
      setSaving(false);
    }
  };

  const archive = async (item: any) => {
    const confirmed = window.confirm(`Archive ${item?.[primaryField] ?? item?.title ?? "this item"}?`);
    if (!confirmed) return;

    setError("");
    setNotice("");
    try {
      await api.content.archive(entity, item.id);
      setNotice("Archived successfully.");
      await load();
      if (editingId === item.id) startCreate();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Archive failed.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">{title}</h1>
          <p className="text-sm text-slate-500">{description}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-bold border-slate-200" onClick={() => void load()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold" onClick={startCreate}>
            <Plus className="mr-2 h-4 w-4" /> New
          </Button>
        </div>
      </div>

      {(error || notice) && (
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm font-medium ${
            error
              ? "border-rose-100 bg-rose-50 text-rose-700"
              : "border-green-100 bg-green-50 text-green-700"
          }`}
        >
          {error ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <CheckCircle2 className="mt-0.5 h-4 w-4" />}
          <span>{error || notice}</span>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_420px]">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black uppercase tracking-tight">Records</CardTitle>
              <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200">
                {filteredItems.length} shown
              </Badge>
            </div>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by title, name, or slug..."
              className="max-w-md"
            />
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-4 py-3">Item</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-12 text-center text-slate-400">
                        Loading records...
                      </td>
                    </tr>
                  ) : filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-4 py-12 text-center text-slate-400">
                        No records found.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-900">{item?.[primaryField] ?? item?.title ?? "Untitled"}</p>
                          <p className="text-[11px] font-mono text-slate-400">/{item?.[secondaryField] ?? item?.slug ?? item.id}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={`${statusClass(item.status)} uppercase text-[9px] font-black tracking-widest`}>
                            {item.status ?? (item.visibility ? "VISIBLE" : "DRAFT")}
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

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-tight">
              {editingId ? "Edit Record" : "Create Record"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            {fields.map((field) => (
              <div key={field.name} className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {field.label}
                  {field.required ? " *" : ""}
                </label>
                {field.type === "textarea" ? (
                  <Textarea
                    value={form[field.name] ?? ""}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    placeholder={field.placeholder}
                    className="min-h-28"
                  />
                ) : field.type === "select" ? (
                  <select
                    value={form[field.name] ?? ""}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                  >
                    <option value="">
                      {field.required ? `Select ${field.label}` : "None"}
                    </option>
                    {(field.options ??
                      (field.lookupKey
                        ? (lookups[field.lookupKey] ?? []).map((option) => ({
                            label: option.name ?? option.title ?? option.slug,
                            value: option.id,
                          }))
                        : publishStatuses)
                    ).map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                ) : field.type === "checkbox" ? (
                  <label className="flex items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">
                    <input
                      type="checkbox"
                      checked={Boolean(form[field.name])}
                      onChange={(event) => updateField(field.name, event.target.checked)}
                    />
                    Enabled
                  </label>
                ) : (
                  <Input
                    type={field.type === "number" ? "number" : "text"}
                    value={form[field.name] ?? ""}
                    onChange={(event) => updateField(field.name, event.target.value)}
                    placeholder={field.placeholder}
                  />
                )}
              </div>
            ))}

            {relationFields.map((relation) => {
              const options = lookups[relation.lookupKey] ?? [];
              const selected = Array.isArray(form[relation.name]) ? form[relation.name] : [];

              return (
                <div key={relation.name} className="space-y-2">
                  <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{relation.label}</label>
                  <div className="max-h-44 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2">
                    {options.length === 0 ? (
                      <p className="p-3 text-xs font-medium text-slate-400">No options available.</p>
                    ) : (
                      options.map((option) => (
                        <label key={option.id} className="flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50">
                          <input
                            type="checkbox"
                            checked={selected.includes(option.id)}
                            onChange={() => toggleRelation(relation.name, option.id)}
                          />
                          <span>{option.name ?? option.title ?? option.slug}</span>
                        </label>
                      ))
                    )}
                  </div>
                </div>
              );
            })}

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className="font-bold border-slate-200"
                disabled={saving}
                onClick={() => void save(supportsDraftStatus ? { status: "DRAFT" } : undefined)}
              >
                <Save className="mr-2 h-4 w-4" /> {supportsDraftStatus ? "Save Draft" : "Save"}
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-white font-bold"
                disabled={saving}
                onClick={() => void save(supportsDraftStatus ? { status: "PUBLISHED" } : undefined)}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
