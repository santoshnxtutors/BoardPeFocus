"use client";

import React from "react";
import { 
  Plus, Shield, Mail,
  User as UserIcon,
} from "lucide-react";
import { DataTable } from "@/components/shared/DataTable";

export default function UsersPage() {
  const columns = [
    { 
      header: "User Details", 
      accessor: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center font-black text-slate-400 border border-slate-200 shadow-inner">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.name}</p>
            <div className="flex items-center gap-2 mt-1">
              <Mail className="w-3 h-3 text-slate-400" />
              <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">{item.email}</p>
            </div>
          </div>
        </div>
      )
    },
    { 
      header: "System Role", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <Shield className={`w-4 h-4 ${item.role === 'SUPER ADMIN' ? 'text-blue-600' : 'text-slate-400'}`} />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">
            {item.role}
          </span>
        </div>
      ) 
    },
    { 
      header: "Last Login", 
      accessor: (item: any) => (
        <div className="space-y-1">
          <p className="text-xs font-bold text-slate-700">{item.lastLoginDate}</p>
          <p className="text-[10px] font-bold text-slate-400 uppercase">{item.lastLoginTime}</p>
        </div>
      ) 
    },
    { 
      header: "Account Status", 
      accessor: (item: any) => (
        <span className={`px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-sm ${
          item.status === 'Active' ? 'bg-emerald-500 text-white shadow-emerald-500/20' : 'bg-slate-300 text-white'
        }`}>
          {item.status}
        </span>
      ) 
    },
  ];

  const mockData = [
    { id: "1", name: "Santosh Roy", email: "santosh@boardpefocus.com", role: "SUPER ADMIN", lastLoginDate: "18 Apr 2026", lastLoginTime: "04:30 PM", status: "Active" },
    { id: "2", name: "Priyanka Verma", email: "priyanka@nxtutors.in", role: "EDITOR", lastLoginDate: "17 Apr 2026", lastLoginTime: "11:20 AM", status: "Active" },
    { id: "3", name: "Rahul Sharma", email: "rahul@boardpefocus.com", role: "ADMIN", lastLoginDate: "15 Apr 2026", lastLoginTime: "09:45 AM", status: "Active" },
    { id: "4", name: "Neha Gupta", email: "neha@boardpefocus.com", role: "MODERATOR", lastLoginDate: "10 Apr 2026", lastLoginTime: "02:15 PM", status: "Inactive" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Access Control</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">User Management & Permissions</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Add User
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={mockData} 
          actions={(item) => (
            <div className="flex items-center justify-end gap-2">
              <button className="px-4 py-2 bg-blue-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/20">Edit</button>
              <button className="px-4 py-2 bg-rose-500 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-600 transition-all shadow-lg shadow-rose-500/20">Delete</button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
