"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function SchoolsPage() {
  return (
    <ContentManager
      entity="schools"
      title="Premium Schools"
      description="Manage school pages, safe school-support wording, metadata, curriculum mix, and related tutors or locality links."
      fields={[
        { name: "name", label: "School Name", required: true },
        { name: "slug", label: "Slug" },
        { name: "address", label: "Address / Locality" },
        { name: "locality", label: "Locality Cue" },
        { name: "website", label: "Website" },
        { name: "curriculumMix", label: "Curriculum / Board Mix" },
        { name: "description", label: "Page Description", type: "textarea" },
        { name: "safeSupportWording", label: "Safe Support Wording", type: "textarea" },
        { name: "status", label: "Publish State", type: "select" },
        { name: "seoTitle", label: "SEO Title" },
        { name: "metaDescription", label: "Meta Description", type: "textarea" },
        { name: "canonical", label: "Canonical URL" },
        { name: "ogTitle", label: "OG Title" },
        { name: "ogDescription", label: "OG Description", type: "textarea" },
        { name: "ogImage", label: "OG Image URL" },
      ]}
      relationFields={[
        { name: "boardIds", label: "Related Boards", lookupKey: "boards", relationKey: "boards", childKey: "boardId", nestedKey: "board" },
        { name: "subjectIds", label: "Related Subjects", lookupKey: "subjects", relationKey: "subjects", childKey: "subjectId", nestedKey: "subject" },
        { name: "sectorIds", label: "Nearby Sectors", lookupKey: "sectors", relationKey: "sectors", childKey: "sectorId", nestedKey: "sector" },
        { name: "societyIds", label: "Nearby Societies", lookupKey: "societies", relationKey: "societies", childKey: "societyId", nestedKey: "society" },
        { name: "tutorIds", label: "Related Tutors", lookupKey: "tutors", relationKey: "tutors", childKey: "tutorId", nestedKey: "tutor" },
      ]}
    />
  );
}
