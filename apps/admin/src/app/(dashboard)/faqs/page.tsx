"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/shared/DataTable";
import { Button } from "@/components/ui/button";
import { 
  MessageSquare, Plus, Search, Filter, 
  Edit, Trash2, ChevronRight, HelpCircle
} from "lucide-react";
import Link from "next/link";
import { api } from "@/lib/api";

export default function FaqsPage() {
  const [faqs, setFaqs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFaqs();
  }, []);

  const fetchFaqs = async () => {
    try {
      setLoading(true);
      // In a real scenario, this would be an actual API call
      // For now, using mock but structure it for real API
      const data = await api.get<any[]>('/faqs').catch(() => [
        { id: "1", question: "How do I book a home tutor?", answer: "You can book by filling the lead form or calling us directly.", category: "General", order: 1 },
        { id: "2", question: "What boards do you cover?", answer: "We cover CBSE, ICSE, IB, and IGCSE.", category: "Academic", order: 2 },
      ]);
      setFaqs(data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    { 
      header: "Question", 
      accessor: (item: any) => (
        <div className="flex items-start gap-3 max-w-md">
          <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
            <HelpCircle className="w-4 h-4 text-blue-600" />
          </div>
          <div>
            <p className="font-bold text-slate-900 leading-tight">{item.question}</p>
            <p className="text-xs text-slate-400 mt-1 truncate">{item.answer}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Category", 
      accessor: (item: any) => (
        <span className="px-2 py-1 rounded-md bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-widest">
          {item.category || "General"}
        </span>
      ) 
    },
    { 
      header: "Order", 
      accessor: (item: any) => (
        <span className="font-bold text-slate-700">{item.order}</span>
      ) 
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">FAQ Management</h1>
          <p className="text-slate-500 mt-1">Configure and organize frequently asked questions for the frontend.</p>
        </div>
        <Link href="/dashboard/faqs/new">
          <Button className="h-12 px-6 rounded-2xl bg-blue-600 text-white hover:bg-blue-700 shadow-xl shadow-blue-500/20 gap-2 font-bold">
            <Plus className="w-5 h-5" /> Add New FAQ
          </Button>
        </Link>
      </div>

      <div className="bg-white p-4 rounded-3xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="flex-1 flex items-center gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search questions or answers..." 
              className="w-full pl-10 pr-4 py-2 bg-slate-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
          <Button variant="outline" className="rounded-xl border-slate-200 text-slate-600 gap-2 font-bold">
            <Filter className="w-4 h-4" /> Categories
          </Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={faqs} 
        loading={loading}
        actions={(item) => (
          <div className="flex items-center justify-end gap-2">
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 hover:bg-blue-50 hover:border-blue-200">
              <Edit className="w-4 h-4 text-slate-500 hover:text-blue-600" />
            </Button>
            <Button variant="outline" size="icon" className="h-9 w-9 rounded-xl border-slate-200 hover:bg-rose-50 hover:border-rose-200 group">
              <Trash2 className="w-4 h-4 text-slate-500 group-hover:text-rose-600" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
