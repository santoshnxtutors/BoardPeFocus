"use client";

import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Book, Plus, Settings2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SubjectsPage() {
  const subjects = [
    { id: '1', name: 'Mathematics', category: 'Sciences', difficulty: 'HARD', status: 'ACTIVE' },
    { id: '2', name: 'Physics', category: 'Sciences', difficulty: 'HARD', status: 'ACTIVE' },
    { id: '3', name: 'English Literature', category: 'Humanities', difficulty: 'MEDIUM', status: 'ACTIVE' },
    { id: '4', name: 'Chemistry', category: 'Sciences', difficulty: 'MEDIUM', status: 'DRAFT' },
  ];

  const columns = [
    {
      header: "Subject Name",
      accessorKey: "name",
      cell: (subject: any) => (
        <div className="flex items-center gap-2">
          <Book className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-900">{subject.name}</span>
        </div>
      ),
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (subject: any) => (
        <span className="text-xs font-bold text-slate-500">{subject.category}</span>
      ),
    },
    {
      header: "Level",
      accessorKey: "difficulty",
      cell: (subject: any) => (
        <Badge variant="outline" className={`text-[8px] font-black tracking-tighter uppercase ${subject.difficulty === 'HARD' ? 'border-rose-200 text-rose-600 bg-rose-50' : 'border-slate-200 text-slate-600 bg-slate-50'}`}>
          {subject.difficulty}
        </Badge>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (subject: any) => (
        <Badge variant="outline" className={`text-[9px] font-black tracking-widest uppercase ${subject.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
          {subject.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Subjects Inventory</h1>
          <p className="text-sm text-slate-500">Manage all academic subjects across different boards and levels.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-bold border-slate-200 text-blue-600 bg-blue-50 border-blue-100 hover:bg-blue-100">
            <Sparkles className="mr-2 h-4 w-4" /> AI Suggest
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
            <Plus className="mr-2 h-4 w-4" /> Add Subject
          </Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={subjects}
        searchPlaceholder="Search subjects..."
        actions={(subject) => (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4 text-slate-400" />
          </Button>
        )}
      />
    </div>
  );
}
