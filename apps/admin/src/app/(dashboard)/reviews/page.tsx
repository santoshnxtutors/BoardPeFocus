"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function ReviewsPage() {
  return (
    <ContentManager
      entity="results"
      title="Results / Testimonials"
      description="Manage result stories and testimonials with publish-safe visibility controls and optional tutor/locality mapping."
      primaryField="title"
      fields={[
        { name: "title", label: "Title", required: true },
        { name: "slug", label: "Slug" },
        { name: "kind", label: "Kind", type: "select", defaultValue: "TESTIMONIAL", options: [
          { label: "Testimonial", value: "TESTIMONIAL" },
          { label: "Result Story", value: "RESULT_STORY" },
        ] },
        { name: "parentName", label: "Parent Name" },
        { name: "studentName", label: "Student Context" },
        { name: "context", label: "Board/Class/Subject Context" },
        { name: "story", label: "Story / Testimonial", type: "textarea", required: true },
        { name: "rating", label: "Rating", type: "number" },
        { name: "scoreLabel", label: "Score Label" },
        { name: "status", label: "Moderation Status", type: "select", defaultValue: "PENDING", options: [
          { label: "Pending", value: "PENDING" },
          { label: "Approved", value: "APPROVED" },
          { label: "Rejected", value: "REJECTED" },
        ] },
        { name: "visibility", label: "Visible Publicly", type: "checkbox" },
        { name: "boardId", label: "Board", type: "select", lookupKey: "boards" },
        { name: "classLevelId", label: "Class", type: "select", lookupKey: "classes" },
        { name: "subjectId", label: "Subject", type: "select", lookupKey: "subjects" },
        { name: "schoolId", label: "School", type: "select", lookupKey: "schools" },
        { name: "sectorId", label: "Sector", type: "select", lookupKey: "sectors" },
        { name: "societyId", label: "Society", type: "select", lookupKey: "societies" },
        { name: "tutorId", label: "Tutor", type: "select", lookupKey: "tutors" },
      ]}
    />
  );
}
