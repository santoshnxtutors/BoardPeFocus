"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function SupportPage() {
  return (
    <ContentManager
      entity="process-content"
      title="Process / Support Content"
      description="Manage consultation, matching, demo class, replacement, callback, contact, and support page content."
      primaryField="title"
      fields={[
        { name: "title", label: "Content Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "summary", label: "Summary", type: "textarea" },
        { name: "body", label: "Body", type: "textarea" },
        { name: "status", label: "Publish State", type: "select" },
        { name: "seoTitle", label: "SEO Title" },
        { name: "metaDescription", label: "Meta Description", type: "textarea" },
        { name: "canonical", label: "Canonical URL" },
        { name: "ogTitle", label: "OG Title" },
        { name: "ogDescription", label: "OG Description", type: "textarea" },
        { name: "ogImage", label: "OG Image URL" },
      ]}
    />
  );
}
