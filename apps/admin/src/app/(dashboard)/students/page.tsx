"use client";

import React from "react";
import { 
  Plus, Users, GraduationCap, School,
  Mail, Phone, Calendar, Star,
  Search, ShieldCheck, ArrowRight
} from "lucide-react";
import Link from "next/link";
import { DataTable } from "@/components/shared/DataTable";

export default function StudentsPage() {
  const columns = [
    { 
      header: "Student Profile", 
      accessor: (item: any) => (
        <div className="flex items-center gap-4 py-2">
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-black border border-amber-100 shadow-sm">
            {item.name.charAt(0)}
          </div>
          <div>
            <p className="font-black text-slate-900 text-[15px]">{item.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">{item.board} • Grade {item.grade}</p>
          </div>
        </div>
      )
    },
    { 
      header: "Contact Info", 
      accessor: (item: any) => (
        <div className="space-y-1">
          <p className="text-[11px] font-black text-slate-600 uppercase tracking-tighter flex items-center gap-1.5">
            <Mail className="w-3 h-3 text-slate-300" /> {item.email}
          </p>
          <p className="text-[11px] font-black text-slate-600 uppercase tracking-tighter flex items-center gap-1.5">
            <Phone className="w-3 h-3 text-slate-300" /> {item.phone}
          </p>
        </div>
      ) 
    },
    { 
      header: "Assigned Tutor", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-[8px] font-black text-blue-600">
            {item.tutor?.charAt(0) || '-'}
          </div>
          <span className="text-[11px] font-black text-slate-900">{item.tutor || 'Unassigned'}</span>
        </div>
      ) 
    },
    { 
      header: "Academics", 
      accessor: (item: any) => (
        <div className="flex items-center gap-2">
          <span className="px-2 py-1 rounded-lg bg-blue-600 text-[10px] font-black text-white uppercase tracking-widest">
            {item.subject}
          </span>
        </div>
      ) 
    },
  ];

  const mockData = [
    { id: "1", name: "Aryan Malhotra", board: "IB DP", grade: "12", email: "aryan@gmail.com", phone: "+91 98XXX XXXXX", tutor: "Dr. Ananya Sharma", subject: "Physics HL" },
    { id: "2", name: "Sneha Kapoor", board: "CBSE", grade: "10", email: "sneha@yahoo.com", phone: "+91 97XXX XXXXX", tutor: "Rahul Singh", subject: "Mathematics" },
    { id: "3", name: "Ishan Verma", board: "IGCSE", grade: "9", email: "ishan@outlook.com", phone: "+91 99XXX XXXXX", tutor: null, subject: "Chemistry" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
        <div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Student Enrollment</h1>
          <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.2em] mt-1">Manage Learner Profiles & Academic Mapping</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 text-white rounded-2xl hover:bg-slate-800 transition-all font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20">
            <Plus className="w-4 h-4" /> Enroll Student
          </button>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden">
        <DataTable 
          columns={columns} 
          data={mockData} 
          actions={(item) => (
            <div className="flex items-center justify-end gap-2 px-4">
              <button className="px-4 py-2 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2">
                View File <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}
        />
      </div>
    </div>
  );
}
