"use client";

import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SectorsPage() {
  const sectors = [
    { id: '1', name: 'Sector 54', city: 'Gurugram', activeTutors: 15, status: 'ACTIVE' },
    { id: '2', name: 'Sector 43', city: 'Gurugram', activeTutors: 12, status: 'ACTIVE' },
    { id: '3', name: 'Sector 67', city: 'Gurugram', activeTutors: 8, status: 'ACTIVE' },
  ];

  const columns = [
    {
      header: "Sector Name",
      accessorKey: "name",
      cell: (sector: any) => (
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-rose-500" />
          <span className="font-bold text-slate-900">{sector.name}</span>
        </div>
      ),
    },
    {
      header: "City",
      accessorKey: "city",
      cell: (sector: any) => (
        <span className="text-xs font-bold text-slate-500">{sector.city}</span>
      ),
    },
    {
      header: "Active Tutors",
      accessorKey: "activeTutors",
      cell: (sector: any) => (
        <span className="text-sm font-bold text-slate-600">{sector.activeTutors} Tutors</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (sector: any) => (
        <Badge variant="outline" className={`text-[9px] font-black tracking-widest uppercase ${sector.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
          {sector.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Sectors Management</h1>
          <p className="text-sm text-slate-500">Manage geographical sectors and coverage areas.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
          <Plus className="mr-2 h-4 w-4" /> Add Sector
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={sectors}
        searchPlaceholder="Search sectors..."
        actions={(sector) => (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4 text-slate-400" />
          </Button>
        )}
      />
    </div>
  );
}
