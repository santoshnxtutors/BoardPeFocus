"use client";

import React from "react";
import { 
  Plus, Tags, BookOpen, Layers, 
  ChevronRight, Edit3, Trash2, ShieldCheck,
  LayoutGrid
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function CategoriesPage() {
  const columns = [
    { 
      header: "Category Context", 
      accessor: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className={`w-12 h-12 rounded-2xl bg-${item.color}-50 text-${item.color}-600 flex items-center justify-center`}>
            <item.icon className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.type}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Mapping", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-slate-500">{item.parent || 'Root'}</span>
          {item.parent && <ChevronRight className="w-3 h-3 text-slate-300" />}
          <span className="text-xs font-black text-slate-900">{item.name}</span>
        </div>
      ) 
    },
    { 
      header: "Sub-items", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-slate-300" />
          <span className="text-[11px] font-black text-slate-600">{item.count} Active</span>
        </div>
      ) 
    },
    { 
      header: "Sync Status", 
      accessor: (item: any) => (
        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">
          <ShieldCheck className="w-3.5 h-3.5" /> Synchronized
        </span>
      ) 
    },
  ];

  const mockData = [
    { id: "1", name: "Boards", type: "CURRICULUM", count: "8", parent: null, color: "blue", icon: BookOpen },
    { id: "2", name: "Subjects", type: "ACADEMIC", count: "42", parent: null, color: "indigo", icon: LayoutGrid },
    { id: "3", name: "IGCSE Subjects", type: "ACADEMIC", count: "12", parent: "Boards", color: "emerald", icon: Tags },
    { id: "4", name: "IB DP Subjects", type: "ACADEMIC", count: "15", parent: "Boards", color: "amber", icon: Tags },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">System Categories</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Classification, Taxonomy & Mappings</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> New Category
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={mockData} 
          actions={(item) => (
            <div className="flex items-center justify-end gap-2 px-4">
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Expand</button>
              <button className="p-2.5 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
