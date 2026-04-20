"use client";

import React from "react";
import { 
  Plus, Upload, Search, FileText, 
  Eye, Edit3, Trash2, Calendar, User,
  Globe, MessageCircle
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function BlogManagementPage() {
  const columns = [
    { 
      header: "Article Details", 
      accessor: (item: any) => (
        <div className="flex items-start gap-4 py-2 max-w-md">
          <div className="w-20 h-14 rounded-xl bg-slate-100 shrink-0 overflow-hidden border border-slate-200">
            <img src={item.image} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all" alt="" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-[14px] leading-snug">{item.title}</p>
            <p className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-tighter">/blog/{item.slug}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Author / Stats", 
      accessor: (item: any) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <User className="w-3 h-3" /> {item.author}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <div className="flex items-center gap-1 text-[10px] font-black text-blue-600">
              <Eye className="w-3 h-3" /> {item.views}
            </div>
            <div className="flex items-center gap-1 text-[10px] font-black text-emerald-600">
              <MessageCircle className="w-3 h-3" /> {item.comments}
            </div>
          </div>
        </div>
      ) 
    },
    { 
      header: "Publish Date", 
      accessor: (item: any) => (
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-slate-700">{item.date}</p>
          <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Published</span>
        </div>
      ) 
    },
  ];

  const mockData = [
    { id: "1", title: "Effective Board Exam Strategies for Class 10", slug: "board-exam-strategies-class-10", author: "Santosh Roy", views: "1.2k", comments: "24", date: "15 Apr 2026", image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=200&h=140&fit=crop" },
    { id: "2", title: "The Ultimate Guide to IB Physics IA", slug: "ib-physics-ia-guide", author: "Dr. Ananya Sharma", views: "840", comments: "12", date: "12 Apr 2026", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=200&h=140&fit=crop" },
    { id: "3", title: "Top 5 Schools in Gurugram for IB MYP", slug: "top-schools-gurugram-ib-myp", author: "Staff Writer", views: "2.5k", comments: "45", date: "08 Apr 2026", image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=200&h=140&fit=crop" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Editorial Hub</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Manage Articles, Guides & News</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Create Post
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={mockData} 
          actions={(item) => (
            <div className="flex items-center justify-end gap-2 px-4">
              <button className="p-2.5 bg-blue-500 text-white rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-600 transition-all"><Eye className="w-4 h-4" /></button>
              <button className="p-2.5 bg-amber-500 text-white rounded-xl shadow-lg shadow-amber-500/20 hover:bg-amber-600 transition-all"><Edit3 className="w-4 h-4" /></button>
              <button className="p-2.5 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
