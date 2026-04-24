"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function SectorsPage() {
  return (
    <ContentManager
      entity="sectors"
      title="Gurgaon Sectors"
      description="Manage sector pages, corridor context, publish state, nearby schools, boards, subjects, and local content blocks."
      fields={[
        { name: "name", label: "Sector Name", required: true },
        { name: "slug", label: "Slug" },
        { name: "city", label: "City" },
        { name: "corridor", label: "Corridor" },
        { name: "description", label: "Locality Description", type: "textarea" },
        { name: "status", label: "Publish State", type: "select" },
        { name: "seoTitle", label: "SEO Title" },
        { name: "metaDescription", label: "Meta Description", type: "textarea" },
        { name: "canonical", label: "Canonical URL" },
        { name: "ogTitle", label: "OG Title" },
        { name: "ogDescription", label: "OG Description", type: "textarea" },
        { name: "ogImage", label: "OG Image URL" },
      ]}
      relationFields={[
        { name: "schoolIds", label: "Nearby Schools", lookupKey: "schools", relationKey: "schools", childKey: "schoolId", nestedKey: "school" },
        { name: "boardIds", label: "Related Boards", lookupKey: "boards", relationKey: "boards", childKey: "boardId", nestedKey: "board" },
        { name: "subjectIds", label: "Related Subjects", lookupKey: "subjects", relationKey: "subjects", childKey: "subjectId", nestedKey: "subject" },
      ]}
    />
  );
}
