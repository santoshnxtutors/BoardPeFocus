"use client";

import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BoardsPage() {
  const boards = [
    { id: '1', name: 'IB', fullName: 'International Baccalaureate', activeSubjects: 24, status: 'ACTIVE' },
    { id: '2', name: 'IGCSE', fullName: 'Cambridge IGCSE', activeSubjects: 18, status: 'ACTIVE' },
    { id: '3', name: 'CBSE', fullName: 'Central Board of Secondary Education', activeSubjects: 12, status: 'INACTIVE' },
  ];

  const columns = [
    {
      header: "Board Name",
      accessorKey: "name",
      cell: (board: any) => (
        <div className="space-y-0.5">
          <p className="font-bold text-slate-900">{board.name}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{board.fullName}</p>
        </div>
      ),
    },
    {
      header: "Active Subjects",
      accessorKey: "activeSubjects",
      cell: (board: any) => (
        <span className="text-sm font-bold text-slate-600">{board.activeSubjects} Subjects</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (board: any) => (
        <Badge variant="outline" className={`text-[9px] font-black tracking-widest uppercase ${board.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
          {board.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Academic Boards</h1>
          <p className="text-sm text-slate-500">Manage curriculum boards and their general settings.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
          <Plus className="mr-2 h-4 w-4" /> Add Board
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={boards}
        searchPlaceholder="Search boards..."
        actions={(board) => (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4 text-slate-400" />
          </Button>
        )}
      />
    </div>
  );
}
