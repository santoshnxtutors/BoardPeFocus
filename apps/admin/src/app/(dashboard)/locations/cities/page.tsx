"use client";

import React from "react";
import { 
  Plus, MapPin, Globe, Navigation,
  ChevronRight, Edit3, Trash2, Map as MapIcon,
  Search, ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function CitiesPage() {
  const columns = [
    { 
      header: "City Context", 
      accessor: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center border border-blue-100 shadow-sm">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.state}, {item.country}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Active Sectors", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Navigation className="w-4 h-4 text-slate-300" />
          <span className="text-[11px] font-black text-slate-600 uppercase tracking-widest">{item.sectors} Registered</span>
        </div>
      ) 
    },
    { 
      header: "Tutor Density", 
      accessor: (item: any) => (
        <div className="w-32">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Coverage</span>
            <span className="text-[10px] font-black text-blue-600">{item.coverage}%</span>
          </div>
          <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-blue-600 h-full rounded-full" style={{ width: `${item.coverage}%` }}></div>
          </div>
        </div>
      ) 
    },
    { 
      header: "Status", 
      accessor: (item: any) => (
        <span className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-emerald-600">
          <ShieldCheck className="w-3.5 h-3.5" /> Published
        </span>
      ) 
    },
  ];

  const mockData = [
    { id: "1", name: "Gurugram", state: "Haryana", country: "India", sectors: "115", coverage: "92" },
    { id: "2", name: "New Delhi", state: "Delhi", country: "India", sectors: "48", coverage: "45" },
    { id: "3", name: "Noida", state: "Uttar Pradesh", country: "India", sectors: "62", coverage: "38" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Geo Hub / Cities</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Manage Regional Expansion & Coverage</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Add City
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={mockData} 
          actions={(item) => (
            <div className="flex items-center justify-end gap-2 px-4">
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all">Configure</button>
              <button className="p-2.5 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
