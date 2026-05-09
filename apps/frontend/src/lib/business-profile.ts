import { cache } from "react";
import { fetchBackend } from "@/lib/backend-api";

export interface BusinessProfile {
  name: string;
  websiteUrl: string;
  description: string;
  phone: string;
  email: string;
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode?: string | null;
  addressCountry: string;
  addressCountryCode: string;
  googleMapsUrl?: string | null;
  hasMapUrl?: string | null;
  latitude?: number | null;
  longitude?: number | null;
  areaServed: string[];
  logoPath: string;
  imagePath?: string | null;
  openingHours?: Array<{
    daysOfWeek: string[];
    opens: string;
    closes: string;
  }> | null;
}

interface BusinessProfileRecord {
  slug: string;
  title: string;
  summary?: string | null;
  schemaData?: unknown;
}

const DEFAULT_WEBSITE_URL = "https://www.boardpefocus.in";

export const DEFAULT_BUSINESS_PROFILE: BusinessProfile = {
  name: "BoardPeFocus",
  websiteUrl: DEFAULT_WEBSITE_URL,
  description:
    "Specialized home tutoring for CBSE, ICSE, ISC, IGCSE, and IB boards in Gurugram. We aim to help students target 95%+.",
  phone: "+91 87963 67754",
  email: "boardpefocus@gmail.com",
  streetAddress: "1st Floor, 497 Housing Board Colony, Sector 51",
  addressLocality: "Gurgaon",
  addressRegion: "Haryana",
  postalCode: null,
  addressCountry: "India",
  addressCountryCode: "IN",
  googleMapsUrl: "https://maps.app.goo.gl/UDMmuxzHsTMQY6n29",
  hasMapUrl: "https://maps.app.goo.gl/UDMmuxzHsTMQY6n29",
  latitude: null,
  longitude: null,
  areaServed: ["Gurgaon", "Gurugram", "Haryana"],
  logoPath: "/logo/logo.png",
  imagePath: "/og.jpg",
  openingHours: null,
};

function normalizeString(value: unknown) {
  if (typeof value !== "string") return null;
  const normalized = value.trim();
  return normalized.length > 0 ? normalized : null;
}

function normalizeStringArray(value: unknown) {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => normalizeString(item))
    .filter((item): item is string => Boolean(item));
}

function normalizeNumber(value: unknown) {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string") {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Number(trimmed);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function normalizeOpeningHours(value: unknown): BusinessProfile["openingHours"] {
  if (!Array.isArray(value)) return null;

  const rows = value
    .map((item) => {
      if (!item || typeof item !== "object") return null;
      const record = item as Record<string, unknown>;
      const daysOfWeek = normalizeStringArray(record.daysOfWeek);
      const opens = normalizeString(record.opens);
      const closes = normalizeString(record.closes);

      if (daysOfWeek.length === 0 || !opens || !closes) {
        return null;
      }

      return {
        daysOfWeek,
        opens,
        closes,
      };
    })
    .filter(
      (item): item is NonNullable<BusinessProfile["openingHours"]>[number] =>
        Boolean(item),
    );

  return rows.length > 0 ? rows : null;
}

function parseBusinessProfileRecord(record: BusinessProfileRecord | null) {
  if (!record?.schemaData || typeof record.schemaData !== "object") {
    return {};
  }

  const schemaData = record.schemaData as Record<string, unknown>;
  const description =
    normalizeString(schemaData.description) ?? normalizeString(record.summary);

  return {
    name: normalizeString(schemaData.name) ?? undefined,
    websiteUrl: normalizeString(schemaData.websiteUrl) ?? undefined,
    description: description ?? undefined,
    phone: normalizeString(schemaData.phone) ?? undefined,
    email: normalizeString(schemaData.email) ?? undefined,
    streetAddress: normalizeString(schemaData.streetAddress) ?? undefined,
    addressLocality: normalizeString(schemaData.addressLocality) ?? undefined,
    addressRegion: normalizeString(schemaData.addressRegion) ?? undefined,
    postalCode: normalizeString(schemaData.postalCode),
    addressCountry: normalizeString(schemaData.addressCountry) ?? undefined,
    addressCountryCode: normalizeString(schemaData.addressCountryCode) ?? undefined,
    googleMapsUrl: normalizeString(schemaData.googleMapsUrl),
    hasMapUrl: normalizeString(schemaData.hasMapUrl),
    latitude: normalizeNumber(schemaData.latitude),
    longitude: normalizeNumber(schemaData.longitude),
    areaServed: normalizeStringArray(schemaData.areaServed),
    logoPath: normalizeString(schemaData.logoPath) ?? undefined,
    imagePath: normalizeString(schemaData.imagePath),
    openingHours: normalizeOpeningHours(schemaData.openingHours),
  } satisfies Partial<BusinessProfile>;
}

function mergeBusinessProfile(
  base: BusinessProfile,
  overrides: Partial<BusinessProfile>,
): BusinessProfile {
  return {
    ...base,
    ...Object.fromEntries(
      Object.entries(overrides).filter(([, value]) => value !== null && value !== undefined),
    ),
    areaServed: overrides.areaServed && overrides.areaServed.length > 0 ? overrides.areaServed : base.areaServed,
    openingHours:
      overrides.openingHours && overrides.openingHours.length > 0
        ? overrides.openingHours
        : base.openingHours,
  };
}

export const getBusinessProfile = cache(async (): Promise<BusinessProfile> => {
  try {
    const response = await fetchBackend("/content/process-content/business-profile");
    if (!response.ok) {
      return DEFAULT_BUSINESS_PROFILE;
    }

    const record = (await response.json()) as BusinessProfileRecord;
    return mergeBusinessProfile(
      DEFAULT_BUSINESS_PROFILE,
      parseBusinessProfileRecord(record),
    );
  } catch {
    return DEFAULT_BUSINESS_PROFILE;
  }
});

export function getBusinessDisplayAddress(profile: BusinessProfile) {
  return [
    profile.streetAddress,
    profile.addressLocality,
    profile.addressRegion,
    profile.postalCode ?? null,
    profile.addressCountry,
  ].filter((item): item is string => Boolean(item));
}

export function getBusinessPhoneHref(phone: string) {
  return `tel:${phone.replace(/[^\d+]/g, "")}`;
}

export function getBusinessMailtoHref(email: string) {
  return `mailto:${email}`;
}

export function getBusinessWhatsAppHref(phone: string, message?: string) {
  const digits = phone.replace(/\D/g, "");
  const text = message?.trim();
  return text
    ? `https://wa.me/${digits}?text=${encodeURIComponent(text)}`
    : `https://wa.me/${digits}`;
}
