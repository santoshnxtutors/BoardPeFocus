"use client";

import React, { useCallback, useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  Archive,
  CheckCircle2,
  Edit,
  Plus,
  RefreshCw,
  Save,
  Trash2,
} from "lucide-react";
import { api, LookupCatalog, LookupRecord } from "@/lib/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type FaqStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

type AssignmentType =
  | "BOARD"
  | "CLASS"
  | "SUBJECT"
  | "SCHOOL"
  | "SECTOR"
  | "SOCIETY"
  | "RESOURCE"
  | "RESULT"
  | "PROCESS_CONTENT"
  | "PAGE";

interface FaqAssignmentRow {
  entityType: AssignmentType;
  entityId: string;
  pageSlug: string;
}

interface FaqRecord {
  id: string;
  question: string;
  answer: string;
  category?: string | null;
  order?: number | null;
  visibility: boolean;
  status: FaqStatus;
  assignments?: Array<{
    id: string;
    entityType: string;
    entityId?: string | null;
    pageSlug?: string | null;
  }>;
}

const ENTITY_OPTIONS: Array<{ label: string; value: AssignmentType }> = [
  { label: "Board", value: "BOARD" },
  { label: "Class", value: "CLASS" },
  { label: "Subject", value: "SUBJECT" },
  { label: "School", value: "SCHOOL" },
  { label: "Sector", value: "SECTOR" },
  { label: "Society", value: "SOCIETY" },
  { label: "Resource", value: "RESOURCE" },
  { label: "Result Story", value: "RESULT" },
  { label: "Process Content", value: "PROCESS_CONTENT" },
  { label: "Page / Route", value: "PAGE" },
];

const PAGE_SLUG_OPTIONS = [
  { label: "Support page (/support)", value: "support" },
  { label: "Contact page (/contact)", value: "contact" },
  { label: "Process hub (/process)", value: "process" },
];

function emptyAssignment(): FaqAssignmentRow {
  return {
    entityType: "BOARD",
    entityId: "",
    pageSlug: "",
  };
}

function emptyForm() {
  return {
    question: "",
    answer: "",
    category: "",
    order: "0",
    visibility: true,
    status: "DRAFT" as FaqStatus,
    assignments: [emptyAssignment()],
  };
}

function statusClass(status?: string) {
  if (status === "PUBLISHED") return "bg-green-50 text-green-700 border-green-200";
  if (status === "ARCHIVED") return "bg-rose-50 text-rose-700 border-rose-200";
  return "bg-slate-50 text-slate-600 border-slate-200";
}

function getLookupKey(entityType: AssignmentType): keyof LookupCatalog | null {
  switch (entityType) {
    case "BOARD":
      return "boards";
    case "CLASS":
      return "classes";
    case "SUBJECT":
      return "subjects";
    case "SCHOOL":
      return "schools";
    case "SECTOR":
      return "sectors";
    case "SOCIETY":
      return "societies";
    case "RESOURCE":
      return "resources";
    case "RESULT":
      return "results";
    case "PROCESS_CONTENT":
      return "processContent";
    default:
      return null;
  }
}

function displayLookupLabel(option: LookupRecord) {
  return option.name ?? option.title ?? option.slug ?? option.id;
}

export function FaqManager() {
  const [items, setItems] = useState<FaqRecord[]>([]);
  const [lookups, setLookups] = useState<LookupCatalog | null>(null);
  const [form, setForm] = useState(emptyForm);
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
      const [faqs, lookupRows] = await Promise.all([
        api.content.list<FaqRecord>("faqs"),
        api.lookups.list(),
      ]);
      setItems(faqs);
      setLookups(lookupRows);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load FAQs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return items;
    return items.filter((item) =>
      [item.question, item.category, item.answer]
        .filter(Boolean)
        .some((value) => String(value).toLowerCase().includes(normalized)),
    );
  }, [items, query]);

  const pageSlugOptions = useMemo(() => {
    const pageRows = lookups?.pages ?? [];
    const processRows = lookups?.processContent ?? [];

    return [
      ...PAGE_SLUG_OPTIONS,
      ...processRows.map((row) => ({
        label: `Process route (/process/${row.slug})`,
        value: row.slug ?? "",
      })),
      ...pageRows
        .filter((row) => row.slug)
        .map((row) => ({
          label: `${row.title ?? row.name ?? row.slug} (/${row.slug})`,
          value: row.slug ?? "",
        })),
    ].filter((option, index, options) => {
      return option.value && options.findIndex((candidate) => candidate.value === option.value) === index;
    });
  }, [lookups]);

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
    setError("");
    setNotice("");
  };

  const startEdit = (item: FaqRecord) => {
    const assignments =
      item.assignments && item.assignments.length > 0
        ? item.assignments.map((assignment) => ({
            entityType: (assignment.entityType?.toUpperCase() as AssignmentType) || "BOARD",
            entityId: assignment.entityId ?? "",
            pageSlug: assignment.pageSlug ?? "",
          }))
        : [emptyAssignment()];

    setEditingId(item.id);
    setForm({
      question: item.question ?? "",
      answer: item.answer ?? "",
      category: item.category ?? "",
      order: String(item.order ?? 0),
      visibility: Boolean(item.visibility),
      status: item.status ?? "DRAFT",
      assignments,
    });
    setError("");
    setNotice("");
  };

  const updateField = (name: keyof ReturnType<typeof emptyForm>, value: string | boolean | FaqAssignmentRow[]) => {
    setForm((current) => ({ ...current, [name]: value }));
  };

  const updateAssignment = (index: number, patch: Partial<FaqAssignmentRow>) => {
    setForm((current) => {
      const assignments = current.assignments.map((assignment, rowIndex) => {
        if (rowIndex !== index) return assignment;
        const next = { ...assignment, ...patch };
        if (patch.entityType && patch.entityType === "PAGE") {
          next.entityId = "";
        }
        if (patch.entityType && patch.entityType !== "PAGE") {
          next.pageSlug = "";
        }
        return next;
      });
      return { ...current, assignments };
    });
  };

  const addAssignment = () => {
    setForm((current) => ({
      ...current,
      assignments: [...current.assignments, emptyAssignment()],
    }));
  };

  const removeAssignment = (index: number) => {
    setForm((current) => ({
      ...current,
      assignments:
        current.assignments.length === 1
          ? [emptyAssignment()]
          : current.assignments.filter((_, rowIndex) => rowIndex !== index),
    }));
  };

  const save = async (statusOverride?: FaqStatus) => {
    setSaving(true);
    setError("");
    setNotice("");

    if (!form.question.trim() || !form.answer.trim()) {
      setError("Question and answer are required.");
      setSaving(false);
      return;
    }

    const assignments = form.assignments
      .map((assignment) => ({
        entityType: assignment.entityType,
        entityId: assignment.entityType === "PAGE" ? null : assignment.entityId || null,
        pageSlug: assignment.entityType === "PAGE" ? assignment.pageSlug.trim() || null : null,
      }))
      .filter((assignment) => {
        return Boolean(assignment.pageSlug || assignment.entityId);
      });

    try {
      const payload = {
        question: form.question.trim(),
        answer: form.answer.trim(),
        category: form.category.trim() || null,
        order: Number(form.order || 0),
        visibility: form.visibility,
        status: statusOverride ?? form.status,
        assignments,
      };

      if (editingId) {
        await api.content.update("faqs", editingId, payload);
      } else {
        await api.content.create("faqs", payload);
      }

      setNotice("FAQ saved successfully.");
      await load();
      if (!editingId) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save FAQ.");
    } finally {
      setSaving(false);
    }
  };

  const archive = async (item: FaqRecord) => {
    if (!window.confirm(`Archive FAQ: ${item.question}?`)) return;

    setError("");
    setNotice("");
    try {
      await api.content.archive("faqs", item.id);
      setNotice("FAQ archived successfully.");
      await load();
      if (editingId === item.id) {
        resetForm();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to archive FAQ.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">FAQs</h1>
          <p className="text-sm text-slate-500">
            Manage FAQ content and map each FAQ to boards, classes, schools, resources, results, process pages, or support routes.
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-bold border-slate-200" onClick={() => void load()}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold" onClick={resetForm}>
            <Plus className="mr-2 h-4 w-4" /> New
          </Button>
        </div>
      </div>

      {(error || notice) && (
        <div
          className={`flex items-start gap-3 rounded-xl border p-4 text-sm font-medium ${
            error ? "border-rose-100 bg-rose-50 text-rose-700" : "border-green-100 bg-green-50 text-green-700"
          }`}
        >
          {error ? <AlertCircle className="mt-0.5 h-4 w-4" /> : <CheckCircle2 className="mt-0.5 h-4 w-4" />}
          <span>{error || notice}</span>
        </div>
      )}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_480px]">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="space-y-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg font-black uppercase tracking-tight">FAQ Records</CardTitle>
              <Badge variant="outline" className="bg-slate-50 text-slate-500 border-slate-200">
                {filteredItems.length} shown
              </Badge>
            </div>
            <Input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search question, answer, or category..."
              className="max-w-md"
            />
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  <tr>
                    <th className="px-4 py-3">FAQ</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Assignments</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {loading ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center text-slate-400">
                        Loading FAQs...
                      </td>
                    </tr>
                  ) : filteredItems.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-4 py-12 text-center text-slate-400">
                        No FAQs found.
                      </td>
                    </tr>
                  ) : (
                    filteredItems.map((item) => (
                      <tr key={item.id} className="hover:bg-slate-50">
                        <td className="px-4 py-3">
                          <p className="font-bold text-slate-900">{item.question}</p>
                          <p className="text-[11px] text-slate-500">{item.category ?? "General"}</p>
                        </td>
                        <td className="px-4 py-3">
                          <Badge variant="outline" className={`${statusClass(item.status)} uppercase text-[9px] font-black tracking-widest`}>
                            {item.status}
                          </Badge>
                        </td>
                        <td className="px-4 py-3 text-xs font-bold text-slate-500">
                          {item.assignments?.length ?? 0}
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
              {editingId ? "Edit FAQ" : "Create FAQ"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <Field label="Question *">
              <Input value={form.question} onChange={(event) => updateField("question", event.target.value)} />
            </Field>
            <Field label="Answer *">
              <Textarea value={form.answer} onChange={(event) => updateField("answer", event.target.value)} className="min-h-28" />
            </Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Category">
                <Input value={form.category} onChange={(event) => updateField("category", event.target.value)} />
              </Field>
              <Field label="Display Order">
                <Input type="number" value={form.order} onChange={(event) => updateField("order", event.target.value)} />
              </Field>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Publish State">
                <select
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value as FaqStatus)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </Field>
              <Field label="Visibility">
                <label className="flex h-10 items-center gap-3 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold text-slate-600">
                  <input
                    type="checkbox"
                    checked={form.visibility}
                    onChange={(event) => updateField("visibility", event.target.checked)}
                  />
                  Visible on frontend
                </label>
              </Field>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Assignments</label>
                <Button type="button" variant="outline" className="h-8 border-slate-200 px-3 text-xs font-bold" onClick={addAssignment}>
                  <Plus className="mr-2 h-3.5 w-3.5" /> Add Mapping
                </Button>
              </div>
              <div className="space-y-3">
                {form.assignments.map((assignment, index) => {
                  const lookupKey = getLookupKey(assignment.entityType);
                  const entityOptions = lookupKey ? lookups?.[lookupKey] ?? [] : [];

                  return (
                    <div key={`${assignment.entityType}-${index}`} className="rounded-xl border border-slate-200 bg-slate-50/80 p-3">
                      <div className="grid gap-3">
                        <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-3">
                          <select
                            value={assignment.entityType}
                            onChange={(event) => updateAssignment(index, { entityType: event.target.value as AssignmentType, entityId: "", pageSlug: "" })}
                            className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                          >
                            {ENTITY_OPTIONS.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 text-slate-500 hover:text-rose-600"
                            onClick={() => removeAssignment(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {assignment.entityType === "PAGE" ? (
                          <>
                            <select
                              value={assignment.pageSlug}
                              onChange={(event) => updateAssignment(index, { pageSlug: event.target.value })}
                              className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                            >
                              <option value="">Select page route</option>
                              {pageSlugOptions.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))}
                            </select>
                            <Input
                              value={assignment.pageSlug}
                              onChange={(event) => updateAssignment(index, { pageSlug: event.target.value })}
                              placeholder="Or type a custom route slug"
                            />
                          </>
                        ) : (
                          <select
                            value={assignment.entityId}
                            onChange={(event) => updateAssignment(index, { entityId: event.target.value })}
                            className="h-10 rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                          >
                            <option value="">Select related item</option>
                            {entityOptions.map((option) => (
                              <option key={option.id} value={option.id}>
                                {displayLookupLabel(option)}
                              </option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <Button
                variant="outline"
                className="font-bold border-slate-200"
                disabled={saving}
                onClick={() => void save("DRAFT")}
              >
                <Save className="mr-2 h-4 w-4" /> Save Draft
              </Button>
              <Button
                className="bg-primary hover:bg-primary/90 text-white font-bold"
                disabled={saving}
                onClick={() => void save("PUBLISHED")}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Publish FAQ"}
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
