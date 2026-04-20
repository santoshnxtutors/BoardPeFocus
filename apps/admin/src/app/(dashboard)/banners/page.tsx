"use client";

import React from "react";
import { 
  Plus, ImageIcon, Monitor, Tablet, Smartphone,
  ExternalLink, Eye, Edit3, Trash2, CheckCircle2, XCircle
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function BannersPage() {
  const columns = [
    { 
      header: "Visual Preview", 
      accessor: (item: any) => (
        <div className="py-2">
          <div className="w-48 h-20 rounded-2xl bg-slate-100 overflow-hidden border-2 border-white shadow-lg shadow-slate-200/50">
            <img src={item.image} className="w-full h-full object-cover" alt="" />
          </div>
        </div>
      )
    },
    { 
      header: "Placement / Name", 
      accessor: (item: any) => (
        <div>
          <p className="font-black text-slate-900 text-[14px] leading-tight">{item.name}</p>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="px-1.5 py-0.5 rounded-md bg-blue-50 text-blue-600 text-[9px] font-black uppercase tracking-widest">{item.placement}</span>
            <span className="text-[10px] font-bold text-slate-400">• {item.type}</span>
          </div>
        </div>
      )
    },
    { 
      header: "Devices", 
      accessor: (item: any) => (
        <div className="flex gap-2">
          <Monitor className={`w-4 h-4 ${item.devices.includes('desktop') ? 'text-blue-500' : 'text-slate-200'}`} />
          <Tablet className={`w-4 h-4 ${item.devices.includes('tablet') ? 'text-blue-500' : 'text-slate-200'}`} />
          <Smartphone className={`w-4 h-4 ${item.devices.includes('mobile') ? 'text-blue-500' : 'text-slate-200'}`} />
        </div>
      ) 
    },
    { 
      header: "Visibility", 
      accessor: (item: any) => (
        <span className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${item.active ? 'text-emerald-600' : 'text-rose-500'}`}>
          {item.active ? <CheckCircle2 className="w-3.5 h-3.5" /> : <XCircle className="w-3.5 h-3.5" />}
          {item.active ? 'Active' : 'Paused'}
        </span>
      ) 
    },
  ];

  const mockData = [
    { id: "1", name: "Summer Board Prep Sale", placement: "HOME_HERO", type: "IMAGE", active: true, devices: ["desktop", "tablet", "mobile"], image: "https://images.unsplash.com/photo-1513258496099-48168024adb0?w=400&h=200&fit=crop" },
    { id: "2", name: "Tutor Registration CTA", placement: "SIDEBAR", type: "DYNAMIC", active: true, devices: ["desktop"], image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=200&fit=crop" },
    { id: "3", name: "Gurugram Schools Special", placement: "CATALOG_TOP", type: "IMAGE", active: false, devices: ["desktop", "tablet", "mobile"], image: "https://images.unsplash.com/photo-1541339907198-e08756ebafe3?w=400&h=200&fit=crop" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Promotional Banners</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Manage Ads, CTAs & Visual Campaigns</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Add Banner
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={mockData} 
          actions={(item) => (
            <div className="flex items-center justify-end gap-2 px-4">
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20">Manage</button>
              <button className="p-2.5 bg-rose-500 text-white rounded-xl shadow-lg shadow-rose-500/20 hover:bg-rose-600 transition-all"><Trash2 className="w-4 h-4" /></button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
