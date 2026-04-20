"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, 
  Save, 
  HelpCircle, 
  Layout, 
  Hash,
  Sparkles
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NewFaqPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "General",
    order: 0
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      console.log("Saving FAQ:", formData);
      setLoading(false);
      router.push("/dashboard/faqs");
    }, 1000);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/faqs" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Create FAQ</h1>
            <p className="text-slate-500 font-medium">Add a new question to the platform.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Card className="rounded-[2.5rem] border-slate-200 shadow-xl shadow-slate-200/50 overflow-hidden">
          <CardContent className="p-10 space-y-8">
            {/* Question Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <HelpCircle className="w-4 h-4" /> The Question
              </label>
              <input 
                required
                type="text" 
                placeholder="e.g., How long does it take to find a tutor?" 
                className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-bold placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all text-lg"
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              />
            </div>

            {/* Answer Field */}
            <div className="space-y-3">
              <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                <Layout className="w-4 h-4" /> The Answer
              </label>
              <textarea 
                required
                rows={5}
                placeholder="Provide a clear, detailed answer..." 
                className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-medium placeholder:text-slate-300 focus:ring-2 focus:ring-blue-500 transition-all leading-relaxed"
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Category Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <Sparkles className="w-4 h-4" /> Category
                </label>
                <select 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                >
                  <option>General</option>
                  <option>Academic</option>
                  <option>Pricing</option>
                  <option>Verification</option>
                </select>
              </div>

              {/* Order Field */}
              <div className="space-y-3">
                <label className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">
                  <Hash className="w-4 h-4" /> Display Order
                </label>
                <input 
                  type="number" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4">
          <Link href="/dashboard/faqs">
            <Button type="button" variant="outline" className="h-12 px-8 rounded-2xl border-slate-200 font-bold text-slate-500 hover:bg-slate-50">
              Cancel
            </Button>
          </Link>
          <Button 
            disabled={loading}
            className="h-12 px-10 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20 font-extrabold gap-2"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            Save FAQ
          </Button>
        </div>
      </form>
    </div>
  );
}
