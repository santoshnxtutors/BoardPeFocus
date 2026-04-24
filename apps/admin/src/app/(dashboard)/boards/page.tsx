"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function BoardsPage() {
  return (
    <ContentManager
      entity="boards"
      title="Academic Boards"
      description="Create, edit, publish, and relate curriculum boards to classes, subjects, schools, and Gurgaon areas."
      fields={[
        { name: "name", label: "Board Name", required: true },
        { name: "slug", label: "Slug" },
        { name: "shortName", label: "Short Name" },
        { name: "description", label: "Short Description", type: "textarea" },
        { name: "longDescription", label: "Long Description", type: "textarea" },
        { name: "status", label: "Publish State", type: "select" },
        { name: "seoTitle", label: "SEO Title" },
        { name: "metaDescription", label: "Meta Description", type: "textarea" },
        { name: "canonical", label: "Canonical URL" },
        { name: "ogTitle", label: "OG Title" },
        { name: "ogDescription", label: "OG Description", type: "textarea" },
        { name: "ogImage", label: "OG Image URL" },
      ]}
      relationFields={[
        { name: "classLevelIds", label: "Related Classes", lookupKey: "classes", relationKey: "classes", childKey: "classLevelId", nestedKey: "classLevel" },
        { name: "subjectIds", label: "Related Subjects", lookupKey: "subjects", relationKey: "subjects", childKey: "subjectId", nestedKey: "subject" },
        { name: "schoolIds", label: "Related Schools", lookupKey: "schools", relationKey: "schools", childKey: "schoolId", nestedKey: "school" },
        { name: "sectorIds", label: "Related Sectors", lookupKey: "sectors", relationKey: "sectors", childKey: "sectorId", nestedKey: "sector" },
        { name: "societyIds", label: "Related Societies", lookupKey: "societies", relationKey: "societies", childKey: "societyId", nestedKey: "society" },
      ]}
    />
  );
}
