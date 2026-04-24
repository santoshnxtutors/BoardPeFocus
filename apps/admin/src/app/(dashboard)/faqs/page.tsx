"use client";

import { ContentManager } from "@/components/shared/content-manager";

export default function FaqsPage() {
  return (
    <ContentManager
      entity="faqs"
      title="FAQs"
      description="Create and publish reusable FAQs. Use assignments for page/entity mapping through the backend API as needed."
      primaryField="question"
      secondaryField="category"
      fields={[
        { name: "question", label: "Question", required: true },
        { name: "answer", label: "Answer", type: "textarea", required: true },
        { name: "category", label: "Category / Page Type" },
        { name: "order", label: "Display Order", type: "number" },
        { name: "visibility", label: "Visible", type: "checkbox" },
        { name: "status", label: "Publish State", type: "select" },
      ]}
    />
  );
}
