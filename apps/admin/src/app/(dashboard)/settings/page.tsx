"use client";

import React, { useEffect, useMemo, useState } from "react";
import { AlertCircle, CheckCircle2, Globe, MapPin, RefreshCw, Save } from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const BUSINESS_PROFILE_SLUG = "business-profile";

const defaultForm = {
  status: "PUBLISHED",
  name: "BoardPeFocus",
  websiteUrl: "https://www.boardpefocus.in",
  description:
    "Specialized home tutoring for CBSE, ICSE, ISC, IGCSE, and IB boards in Gurugram. We aim to help students target 95%+.",
  phone: "+91 87963 67754",
  email: "boardpefocus@gmail.com",
  streetAddress: "1st Floor, 497 Housing Board Colony, Sector 51",
  addressLocality: "Gurgaon",
  addressRegion: "Haryana",
  postalCode: "",
  addressCountry: "India",
  addressCountryCode: "IN",
  googleMapsUrl: "https://maps.app.goo.gl/UDMmuxzHsTMQY6n29",
  hasMapUrl: "https://maps.app.goo.gl/UDMmuxzHsTMQY6n29",
  latitude: "",
  longitude: "",
  areaServed: "Gurgaon\nGurugram\nHaryana",
  logoPath: "/logo/logo.png",
  imagePath: "/og.jpg",
};

function normalizeString(value: unknown) {
  return typeof value === "string" ? value : "";
}

export default function SettingsPage() {
  const [recordId, setRecordId] = useState<string | null>(null);
  const [form, setForm] = useState(defaultForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const areaServedPreview = useMemo(
    () =>
      form.areaServed
        .split(/\r?\n|,/)
        .map((item) => item.trim())
        .filter(Boolean),
    [form.areaServed],
  );

  useEffect(() => {
    void loadRecord();
  }, []);

  async function loadRecord() {
    setLoading(true);
    setError("");
    setNotice("");

    try {
      const records = await api.content.list<any>("process-content");
      const record = records.find((item) => item.slug === BUSINESS_PROFILE_SLUG);

      if (!record) {
        setRecordId(null);
        setForm(defaultForm);
        return;
      }

      const schemaData =
        record.schemaData && typeof record.schemaData === "object"
          ? (record.schemaData as Record<string, unknown>)
          : {};

      setRecordId(record.id);
      setForm({
        status: normalizeString(record.status) || defaultForm.status,
        name: normalizeString(schemaData.name) || defaultForm.name,
        websiteUrl: normalizeString(schemaData.websiteUrl) || defaultForm.websiteUrl,
        description:
          normalizeString(schemaData.description) ||
          normalizeString(record.summary) ||
          defaultForm.description,
        phone: normalizeString(schemaData.phone) || defaultForm.phone,
        email: normalizeString(schemaData.email) || defaultForm.email,
        streetAddress: normalizeString(schemaData.streetAddress) || defaultForm.streetAddress,
        addressLocality: normalizeString(schemaData.addressLocality) || defaultForm.addressLocality,
        addressRegion: normalizeString(schemaData.addressRegion) || defaultForm.addressRegion,
        postalCode: normalizeString(schemaData.postalCode),
        addressCountry: normalizeString(schemaData.addressCountry) || defaultForm.addressCountry,
        addressCountryCode:
          normalizeString(schemaData.addressCountryCode) || defaultForm.addressCountryCode,
        googleMapsUrl: normalizeString(schemaData.googleMapsUrl) || defaultForm.googleMapsUrl,
        hasMapUrl: normalizeString(schemaData.hasMapUrl) || defaultForm.hasMapUrl,
        latitude:
          schemaData.latitude === null || schemaData.latitude === undefined
            ? ""
            : String(schemaData.latitude),
        longitude:
          schemaData.longitude === null || schemaData.longitude === undefined
            ? ""
            : String(schemaData.longitude),
        areaServed: Array.isArray(schemaData.areaServed)
          ? (schemaData.areaServed as unknown[]).map((item) => String(item)).join("\n")
          : defaultForm.areaServed,
        logoPath: normalizeString(schemaData.logoPath) || defaultForm.logoPath,
        imagePath: normalizeString(schemaData.imagePath) || defaultForm.imagePath,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load settings.");
    } finally {
      setLoading(false);
    }
  }

  function updateField(name: keyof typeof defaultForm, value: string) {
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function saveRecord() {
    setSaving(true);
    setError("");
    setNotice("");

    const areaServed = form.areaServed
      .split(/\r?\n|,/)
      .map((item) => item.trim())
      .filter(Boolean);

    const payload = {
      title: "Business Profile",
      slug: BUSINESS_PROFILE_SLUG,
      status: form.status || "PUBLISHED",
      summary: form.description,
      schemaData: {
        name: form.name.trim(),
        websiteUrl: form.websiteUrl.trim(),
        description: form.description.trim(),
        phone: form.phone.trim(),
        email: form.email.trim(),
        streetAddress: form.streetAddress.trim(),
        addressLocality: form.addressLocality.trim(),
        addressRegion: form.addressRegion.trim(),
        postalCode: form.postalCode.trim() || null,
        addressCountry: form.addressCountry.trim(),
        addressCountryCode: form.addressCountryCode.trim(),
        googleMapsUrl: form.googleMapsUrl.trim() || null,
        hasMapUrl: form.hasMapUrl.trim() || null,
        latitude: form.latitude.trim() ? Number(form.latitude) : null,
        longitude: form.longitude.trim() ? Number(form.longitude) : null,
        areaServed,
        logoPath: form.logoPath.trim(),
        imagePath: form.imagePath.trim() || null,
      },
    };

    try {
      if (recordId) {
        await api.content.update("process-content", recordId, payload);
      } else {
        const created = await api.content.create<any>("process-content", payload);
        setRecordId(created.id);
      }
      setNotice("Business profile saved.");
      await loadRecord();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save settings.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500">Manage the published business profile used for contact details, Google Maps links, and local-business schema.</p>
      </div>

      {(error || notice) ? (
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
      ) : null}

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <Card className="border-slate-200 shadow-sm">
          <CardHeader className="flex flex-row items-start justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-black uppercase tracking-tight">Business Profile</CardTitle>
              <CardDescription className="text-xs">
                This record is published as `process-content/business-profile` and powers frontend trust links plus local-business schema.
              </CardDescription>
            </div>
            <Button variant="outline" className="font-bold border-slate-200" onClick={() => void loadRecord()} disabled={loading}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Publish Status">
                <select
                  value={form.status}
                  onChange={(event) => updateField("status", event.target.value)}
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm"
                >
                  <option value="DRAFT">Draft</option>
                  <option value="PUBLISHED">Published</option>
                  <option value="ARCHIVED">Archived</option>
                </select>
              </Field>
              <Field label="Business Name">
                <Input value={form.name} onChange={(event) => updateField("name", event.target.value)} />
              </Field>
              <Field label="Website URL">
                <Input value={form.websiteUrl} onChange={(event) => updateField("websiteUrl", event.target.value)} />
              </Field>
              <Field label="Phone / WhatsApp">
                <Input value={form.phone} onChange={(event) => updateField("phone", event.target.value)} />
              </Field>
              <Field label="Email">
                <Input value={form.email} onChange={(event) => updateField("email", event.target.value)} />
              </Field>
              <Field label="Street Address">
                <Input value={form.streetAddress} onChange={(event) => updateField("streetAddress", event.target.value)} />
              </Field>
              <Field label="City">
                <Input value={form.addressLocality} onChange={(event) => updateField("addressLocality", event.target.value)} />
              </Field>
              <Field label="State / Region">
                <Input value={form.addressRegion} onChange={(event) => updateField("addressRegion", event.target.value)} />
              </Field>
              <Field label="Postal Code">
                <Input value={form.postalCode} onChange={(event) => updateField("postalCode", event.target.value)} />
              </Field>
              <Field label="Country">
                <Input value={form.addressCountry} onChange={(event) => updateField("addressCountry", event.target.value)} />
              </Field>
              <Field label="Country Code">
                <Input value={form.addressCountryCode} onChange={(event) => updateField("addressCountryCode", event.target.value)} />
              </Field>
              <Field label="Google Maps / Business URL">
                <Input value={form.googleMapsUrl} onChange={(event) => updateField("googleMapsUrl", event.target.value)} />
              </Field>
              <Field label="hasMap URL">
                <Input value={form.hasMapUrl} onChange={(event) => updateField("hasMapUrl", event.target.value)} />
              </Field>
              <Field label="Latitude">
                <Input value={form.latitude} onChange={(event) => updateField("latitude", event.target.value)} placeholder="Leave blank until exact value is confirmed" />
              </Field>
              <Field label="Longitude">
                <Input value={form.longitude} onChange={(event) => updateField("longitude", event.target.value)} placeholder="Leave blank until exact value is confirmed" />
              </Field>
              <Field label="Logo Path">
                <Input value={form.logoPath} onChange={(event) => updateField("logoPath", event.target.value)} />
              </Field>
              <Field label="Image / OG Path">
                <Input value={form.imagePath} onChange={(event) => updateField("imagePath", event.target.value)} />
              </Field>
            </div>

            <Field label="Business Description">
              <Textarea
                value={form.description}
                onChange={(event) => updateField("description", event.target.value)}
                className="min-h-28"
              />
            </Field>

            <Field label="Area Served">
              <Textarea
                value={form.areaServed}
                onChange={(event) => updateField("areaServed", event.target.value)}
                className="min-h-28"
                placeholder="One location per line"
              />
            </Field>

            <div className="flex justify-end">
              <Button className="bg-primary hover:bg-primary/90 text-white font-bold" onClick={() => void saveRecord()} disabled={saving || loading}>
                <Save className="mr-2 h-4 w-4" /> {saving ? "Saving..." : "Save Business Profile"}
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-tight">Live Usage</CardTitle>
            <CardDescription className="text-xs">
              This summary shows what the published business profile will feed into contact surfaces and schema output.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5 text-sm text-slate-600">
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-900">
                <Globe className="h-4 w-4 text-primary" />
                <p className="font-black uppercase tracking-widest text-[10px]">Identity</p>
              </div>
              <p className="mt-3 font-bold text-slate-900">{form.name}</p>
              <p className="mt-1 break-all">{form.websiteUrl}</p>
              <p className="mt-1">{form.phone}</p>
              <p className="mt-1">{form.email}</p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center gap-2 text-slate-900">
                <MapPin className="h-4 w-4 text-primary" />
                <p className="font-black uppercase tracking-widest text-[10px]">Location Data</p>
              </div>
              <p className="mt-3">{form.streetAddress}</p>
              <p>{form.addressLocality}, {form.addressRegion}{form.postalCode ? ` ${form.postalCode}` : ""}</p>
              <p>{form.addressCountry}</p>
              <p className="mt-3 text-xs text-slate-500">
                Geo schema is emitted only when both latitude and longitude are set to exact values.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <p className="font-black uppercase tracking-widest text-[10px] text-slate-900">Area Served Preview</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {areaServedPreview.length > 0 ? areaServedPreview.map((item) => (
                  <span key={item} className="rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-bold text-slate-600">
                    {item}
                  </span>
                )) : <span className="text-xs text-slate-400">No service areas added yet.</span>}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">{label}</label>
      {children}
    </div>
  );
}
