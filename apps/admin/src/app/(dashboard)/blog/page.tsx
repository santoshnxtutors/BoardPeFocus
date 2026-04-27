"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function BlogManagementPage() {
  return (
    <ContentManager
      entity="resources"
      title="Resources / Blog"
      description="Manage articles, category pages, summaries, body content, publish state, metadata, and internal-link support."
      primaryField="title"
      fields={[
        { name: "title", label: "Article Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "category", label: "Category" },
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
      relationFields={[
        { name: "boardIds", label: "Related Boards", lookupKey: "boards", relationKey: "mappings", childKey: "entityId", entityType: "BOARD" },
        { name: "classLevelIds", label: "Related Classes", lookupKey: "classes", relationKey: "mappings", childKey: "entityId", entityType: "CLASS" },
        { name: "subjectIds", label: "Related Subjects", lookupKey: "subjects", relationKey: "mappings", childKey: "entityId", entityType: "SUBJECT" },
        { name: "schoolIds", label: "Related Schools", lookupKey: "schools", relationKey: "mappings", childKey: "entityId", entityType: "SCHOOL" },
        { name: "sectorIds", label: "Related Sectors", lookupKey: "sectors", relationKey: "mappings", childKey: "entityId", entityType: "SECTOR" },
        { name: "societyIds", label: "Related Societies", lookupKey: "societies", relationKey: "mappings", childKey: "entityId", entityType: "SOCIETY" },
      ]}
    />
  );
}
