"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function SocietiesPage() {
  return (
    <ContentManager
      entity="societies"
      title="Gurgaon Societies"
      description="Manage society pages, parent sector, convenience-led copy, related schools, subjects, boards, and publish state."
      fields={[
        { name: "name", label: "Society Name", required: true },
        { name: "slug", label: "Slug" },
        { name: "sectorId", label: "Parent Sector", type: "select", lookupKey: "sectors", required: true },
        { name: "description", label: "Convenience-led Content", type: "textarea" },
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
