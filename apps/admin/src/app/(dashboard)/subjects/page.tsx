"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function SubjectsPage() {
  return (
    <ContentManager
      entity="subjects"
      title="Subjects Inventory"
      description="Manage subject pages, metadata, publish state, and relationships to boards, classes, schools, tutors, and areas."
      fields={[
        { name: "name", label: "Subject Name", required: true },
        { name: "slug", label: "Slug" },
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
        { name: "boardIds", label: "Boards", lookupKey: "boards", relationKey: "boards", childKey: "boardId", nestedKey: "board" },
        { name: "classLevelIds", label: "Classes", lookupKey: "classes", relationKey: "classes", childKey: "classLevelId", nestedKey: "classLevel" },
        { name: "schoolIds", label: "Related Schools", lookupKey: "schools", relationKey: "schools", childKey: "schoolId", nestedKey: "school" },
        { name: "sectorIds", label: "Related Sectors", lookupKey: "sectors", relationKey: "sectors", childKey: "sectorId", nestedKey: "sector" },
        { name: "societyIds", label: "Related Societies", lookupKey: "societies", relationKey: "societies", childKey: "societyId", nestedKey: "society" },
        { name: "tutorIds", label: "Related Tutors", lookupKey: "tutors", relationKey: "tutors", childKey: "tutorId", nestedKey: "tutor" },
      ]}
    />
  );
}
