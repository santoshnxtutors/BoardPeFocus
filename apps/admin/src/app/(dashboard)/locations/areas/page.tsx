"use client";

import React from "react";
import { 
  Plus, Map, MapPin, Navigation,
  ChevronRight, Edit3, Trash2, Home,
  Building2, LocateFixed
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function AreasPage() {
  const columns = [
    { 
      header: "Micro-location", 
      accessor: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center border border-indigo-100 shadow-sm">
            <LocateFixed className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.city}, {item.state}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Infrastructure", 
      accessor: (item: any) => (
        <div className="space-y-1.5">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <Building2 className="w-3.5 h-3.5" /> {item.societies} Societies
          </div>
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
            <Home className="w-3.5 h-3.5" /> {item.sectors} Sectors
          </div>
        </div>
      ) 
    },
    { 
      header: "Tutors Assigned", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <div className="flex -space-x-2">
            {[1, 2, 3].map(i => (
              <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200" />
            ))}
          </div>
          <span className="text-[11px] font-black text-blue-600 uppercase tracking-tighter">+{item.tutors} Experts</span>
        </div>
      ) 
    },
    { 
      header: "SEO Status", 
      accessor: (item: any) => (
        <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
          item.seo === 'Optimized' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-amber-500 text-white shadow-amber-500/20'
        }`}>
          {item.seo}
        </span>
      ) 
    },
  ];

  const mockData = [
    { id: "1", name: "Sector 54", city: "Gurugram", state: "Haryana", societies: "12", sectors: "1", tutors: "24", seo: "Optimized" },
    { id: "2", name: "DLF Phase 5", city: "Gurugram", state: "Haryana", societies: "8", sectors: "1", tutors: "18", seo: "Optimized" },
    { id: "3", name: "Golf Course Road", city: "Gurugram", state: "Haryana", societies: "15", sectors: "3", tutors: "42", seo: "Processing" },
    { id: "4", name: "Sohna Road", city: "Gurugram", state: "Haryana", societies: "22", sectors: "5", tutors: "31", seo: "Optimized" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Neighborhood Intelligence</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Manage Sectors, Societies & Micro-targeting</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Define Area
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={mockData} 
          actions={(item) => (
            <div className="flex items-center justify-end gap-2 px-4">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">Edit</button>
              <button className="p-2.5 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
