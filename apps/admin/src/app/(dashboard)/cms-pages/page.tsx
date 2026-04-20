"use client";

import React from "react";
import { 
  Plus, FileCode, Globe, Layout,
  Eye, Edit3, Trash2, ShieldCheck,
  Search, Terminal, Layers
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function CMSPagesPage() {
  const columns = [
    { 
      header: "Core Page Structure", 
      accessor: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center border border-slate-700 shadow-xl shadow-slate-900/10">
            <Layout className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.title}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Template: {item.template}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Direct URL", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-blue-500" />
          <span className="text-[11px] font-black text-blue-600 uppercase tracking-tighter">/{item.slug}</span>
        </div>
      ) 
    },
    { 
      header: "Components", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-300" />
          <span className="text-[11px] font-black text-slate-600">{item.components} Modules</span>
        </div>
      ) 
    },
    { 
      header: "Vitals", 
      accessor: (item: any) => (
        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">
          <ShieldCheck className="w-3.5 h-3.5" /> Core Live
        </span>
      ) 
    },
  ];

  const mockData = [
    { id: "1", title: "Home Landing", slug: "", template: "MAIN_HOME", components: "14" },
    { id: "2", title: "About BoardPeFocus", slug: "about", template: "CONTENT_FULL", components: "6" },
    { id: "3", title: "Contact Academic Office", slug: "contact", template: "FORM_CENTER", components: "4" },
    { id: "4", title: "Privacy & Data Policy", slug: "privacy-policy", template: "LEGAL_MIN", components: "3" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">CMS Infrastructure</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Manage Core Static & Functional Pages</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Create Page
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
            </div>
          )}
        />
      </div>
    </div>
  );
}
