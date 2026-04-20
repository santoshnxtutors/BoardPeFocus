"use client";

import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { MapPin, Plus, Settings2, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SocietiesPage() {
  const societies = [
    { id: '1', name: 'DLF The Crest', sector: 'Sector 54', activeLeads: 24, status: 'ACTIVE' },
    { id: '2', name: 'Park Place', sector: 'Sector 54', activeLeads: 18, status: 'ACTIVE' },
    { id: '3', name: 'Emaar Palm Drive', sector: 'Sector 66', activeLeads: 12, status: 'ACTIVE' },
  ];

  const columns = [
    {
      header: "Society Name",
      accessorKey: "name",
      cell: (society: any) => (
        <div className="flex items-center gap-2">
          <Home className="w-4 h-4 text-blue-500" />
          <span className="font-bold text-slate-900">{society.name}</span>
        </div>
      ),
    },
    {
      header: "Sector",
      accessorKey: "sector",
      cell: (society: any) => (
        <span className="text-xs font-bold text-slate-500">{society.sector}</span>
      ),
    },
    {
      header: "Lead Volume",
      accessorKey: "activeLeads",
      cell: (society: any) => (
        <span className="text-sm font-bold text-slate-600">{society.activeLeads} Active Leads</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (society: any) => (
        <Badge variant="outline" className={`text-[9px] font-black tracking-widest uppercase ${society.status === 'ACTIVE' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-slate-50 text-slate-400 border-slate-100'}`}>
          {society.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Societies Management</h1>
          <p className="text-sm text-slate-500">Manage residential societies and local lead concentrations.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
          <Plus className="mr-2 h-4 w-4" /> Add Society
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={societies}
        searchPlaceholder="Search societies..."
        actions={(society) => (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Settings2 className="h-4 w-4 text-slate-400" />
          </Button>
        )}
      />
    </div>
  );
}
