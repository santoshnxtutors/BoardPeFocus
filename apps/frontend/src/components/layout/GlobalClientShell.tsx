"use client";

import dynamic from "next/dynamic";

const StickyCTA = dynamic(
  () => import("@/components/cta/StickyCTA").then((mod) => mod.StickyCTA),
  { ssr: false },
);

const WhatsAppFloat = dynamic(
  () =>
    import("@/components/common/whatsapp-float").then(
      (mod) => mod.WhatsAppFloat,
    ),
  { ssr: false },
);

const GoogleAnalytics = dynamic(
  () =>
    import("@/components/analytics/GoogleAnalytics").then(
      (mod) => mod.GoogleAnalytics,
    ),
  { ssr: false },
);

export function GlobalClientShell() {
  return (
    <>
      <GoogleAnalytics />
      <StickyCTA />
      <WhatsAppFloat />
    </>
  );
}
