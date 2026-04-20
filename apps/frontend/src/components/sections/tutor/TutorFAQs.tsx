"use client";

import React from "react";
import { MessageSquare, Plus, Minus } from "lucide-react";
import { TutorFaqItem } from "@/types/tutor-profile";

interface TutorFAQsProps {
  faqs: TutorFaqItem[];
}

export const TutorFAQs = ({ faqs }: TutorFAQsProps) => {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0);

  if (!faqs || faqs.length === 0) return null;

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
        <MessageSquare className="w-8 h-8 text-accent" /> Frequently Asked Questions
      </h2>

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div 
            key={faq.id} 
            className={`rounded-3xl border transition-all overflow-hidden ${
              openIndex === index ? "border-primary/20 bg-white shadow-xl shadow-primary/5" : "border-border bg-slate-50/50 hover:border-primary/10"
            }`}
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <span className="font-bold text-primary text-lg pr-8">{faq.question}</span>
              <div className={`shrink-0 w-8 h-8 rounded-xl border flex items-center justify-center transition-colors ${
                openIndex === index ? "bg-primary text-white border-primary" : "border-slate-200 text-slate-400"
              }`}>
                {openIndex === index ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
              </div>
            </button>
            
            <div className={`transition-all duration-300 ease-in-out ${
              openIndex === index ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}>
              <div className="p-6 pt-0 text-muted-foreground leading-relaxed border-t border-slate-100 mt-2">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
