"use client";

import React from "react";
import { 
  Plus, Globe, Link2, RefreshCw,
  Search, ShieldCheck, AlertCircle,
  Zap, BarChart3, ChevronRight
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function SEOPage() {
  const columns = [
    { 
      header: "SEO Configuration", 
      accessor: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center border border-slate-700">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.page}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Title: {item.title}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Search Health", 
      accessor: (item: any) => (
        <div className="flex items-center gap-3">
          <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className={`h-full rounded-full ${item.score > 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${item.score}%` }}></div>
          </div>
          <span className="text-[11px] font-black text-slate-900">{item.score}%</span>
        </div>
      ) 
    },
    { 
      header: "Traffic Potential", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-600">
          <Zap className="w-3 h-3" /> {item.potential}
        </div>
      ) 
    },
    { 
      header: "Auto-Index", 
      accessor: (item: any) => (
        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">
          <ShieldCheck className="w-3.5 h-3.5" /> Synchronized
        </span>
      ) 
    },
  ];

  const mockData = [
    { id: "1", page: "Home Page", title: "Best Home Tutors in Gurugram", score: 95, potential: "High" },
    { id: "2", page: "IGCSE Page", title: "Expert IGCSE Tutors | BoardPeFocus", score: 88, potential: "Medium" },
    { id: "3", page: "Tutor Profiles", title: "Dynamic Tutor Directory", score: 82, potential: "High" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">SEO Command</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Manage Meta Data, Keywords & Redirects</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Add Metadata
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { label: "Search Impressions", value: "142k", change: "+12%", icon: BarChart3, color: "blue" },
          { label: "Active Keywords", value: "842", change: "+5%", icon: Globe, color: "indigo" },
          { label: "Redirection Rules", value: "124", change: "0%", icon: Link2, color: "rose" },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600`}>
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">{stat.change}</span>
            </div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
            <h3 className="text-2xl font-black text-slate-900 mt-1">{stat.value}</h3>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable columns={columns} data={mockData} />
      </div>
    </div>
  );
}
