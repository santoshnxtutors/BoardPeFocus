"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function ClassesPage() {
  return (
    <ContentManager
      entity="classes"
      title="Classes"
      description="Manage Class 10, Class 12, and related class-level content relationships for board-exam flows."
      fields={[
        { name: "name", label: "Class Name", required: true },
        { name: "slug", label: "Slug" },
        { name: "level", label: "Numeric Level", type: "number" },
        { name: "description", label: "Description", type: "textarea" },
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
        { name: "tutorIds", label: "Related Tutors", lookupKey: "tutors", relationKey: "tutors", childKey: "tutorId", nestedKey: "tutor" },
      ]}
    />
  );
}
