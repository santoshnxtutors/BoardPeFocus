"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  School, 
  MapPin, 
  Globe, 
  GraduationCap,
  Plus,
  Edit,
  ExternalLink
} from "lucide-react";
import { api } from "@/lib/api";
import { School as SchoolType } from "@boardpefocus/types";
import Link from "next/link";

export default function SchoolsPage() {
  const [schools, setSchools] = useState<SchoolType[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadSchools();
  }, []);

  const loadSchools = async () => {
    setIsLoading(true);
    try {
      const data = await api.boards.list().catch(() => [
        { id: '1', slug: 'the-heritage-school', name: 'The Heritage School, Gurugram', address: 'Sector 62', website: 'https://ths.ac.in' },
        { id: '2', slug: 'shri-ram-school', name: 'The Shri Ram School, Moulsari', address: 'DLF Phase 3', website: 'https://tsrs.org' },
      ]);
      setSchools(data as any);
    } catch (error) {
      console.error("Failed to load schools:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: "School Name",
      accessorKey: "name",
      cell: (school: SchoolType) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-500 border border-blue-100 shadow-sm">
            <School className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900">{school.name}</p>
            <p className="text-[10px] font-mono text-slate-400">/{school.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Address",
      accessorKey: "address",
      cell: (school: SchoolType) => (
        <div className="flex items-center gap-1.5 text-slate-500">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{school.address || 'Not set'}</span>
        </div>
      ),
    },
    {
      header: "Website",
      accessorKey: "website",
      cell: (school: SchoolType) => (
        school.website ? (
          <a href={school.website} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-blue-600 hover:underline text-xs font-bold">
            <Globe className="w-3.5 h-3.5" />
            Visit
          </a>
        ) : (
          <span className="text-xs text-slate-300 font-bold">None</span>
        )
      ),
    },
    {
      header: "Related Tutors",
      accessorKey: "id",
      cell: (school: SchoolType) => (
        <div className="flex items-center gap-1.5 text-slate-500">
          <GraduationCap className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">12 Tutors</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Premium Schools</h1>
          <p className="text-sm text-slate-500">Manage school profiles and their associations with tutors.</p>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6">
          <Plus className="mr-2 h-4 w-4" />
          Add School
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={schools} 
        isLoading={isLoading}
        searchPlaceholder="Search schools by name..."
        actions={(school) => (
          <div className="flex items-center justify-end gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Edit className="h-4 w-4 text-slate-500" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
