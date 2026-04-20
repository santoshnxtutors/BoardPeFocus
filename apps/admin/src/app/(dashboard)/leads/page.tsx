"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Mail, 
  Phone, 
  Calendar, 
  MapPin, 
  MessageSquare,
  CheckCircle2,
  Clock,
  MoreVertical
} from "lucide-react";
import { api } from "@/lib/api";
import { Lead } from "@boardpefocus/types";

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadLeads();
  }, []);

  const loadLeads = async () => {
    setIsLoading(true);
    try {
      const fallbackLeads: Lead[] = [
        { 
          id: '1', 
          name: 'Sanjeev Kumar', 
          phone: '+91 9876543210', 
          email: 'sanjeev@example.com',
          board: 'CBSE',
          subject: 'Math',
          class: '10th',
          location: 'Sector 43',
          status: 'NEW',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        { 
          id: '2', 
          name: 'Anita Devi', 
          phone: '+91 9123456789', 
          status: 'CONTACTED',
          board: 'IB DP',
          subject: 'Physics',
          location: 'DLF Phase 5',
          createdAt: new Date(Date.now() - 86400000),
          updatedAt: new Date(Date.now() - 86400000)
        }
      ];
      const data = await api.leads.list().catch(() => fallbackLeads);
      setLeads(data);
    } catch (error) {
      console.error("Failed to load leads:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: "Inquiry Details",
      accessorKey: "name",
      cell: (lead: Lead) => (
        <div className="space-y-1">
          <p className="font-bold text-slate-900">{lead.name}</p>
          <div className="flex items-center gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {lead.phone}</span>
            {lead.email && <span className="flex items-center gap-1"><Mail className="w-3 h-3" /> {lead.email}</span>}
          </div>
        </div>
      ),
    },
    {
      header: "Academic Need",
      accessorKey: "subject",
      cell: (lead: Lead) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 uppercase text-[9px] font-black">
              {lead.board}
            </Badge>
            <span className="text-sm font-bold text-slate-700">{lead.subject}</span>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
            {lead.class ? `${lead.class} Grade` : 'General Inquiry'}
          </p>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: (lead: Lead) => (
        <div className="flex items-center gap-1 text-slate-500">
          <MapPin className="w-3.5 h-3.5" />
          <span className="text-xs font-bold">{lead.location || 'Unknown'}</span>
        </div>
      ),
    },
    {
      header: "Received",
      accessorKey: "createdAt",
      cell: (lead: Lead) => (
        <div className="flex items-center gap-1 text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-tight">
            {new Date(lead.createdAt).toLocaleDateString()}
          </span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (lead: Lead) => {
        const variants: Record<string, string> = {
          NEW: "bg-rose-500 text-white shadow-lg shadow-rose-500/20",
          CONTACTED: "bg-amber-500 text-white shadow-lg shadow-amber-500/20",
          QUALIFIED: "bg-blue-500 text-white shadow-lg shadow-blue-500/20",
          CONVERTED: "bg-green-500 text-white shadow-lg shadow-green-500/20",
          SPAM: "bg-slate-400 text-white",
        };
        return (
          <Badge className={`${variants[lead.status]} border-0 font-black uppercase text-[9px] tracking-widest`}>
            {lead.status}
          </Badge>
        );
      },
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Leads Inbox</h1>
          <p className="text-sm text-slate-500">Respond to parent inquiries and track conversion status.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-bold border-slate-200">Export CSV</Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold">Refresh</Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={leads} 
        isLoading={isLoading}
        searchPlaceholder="Search leads by name or phone..."
        actions={(lead) => (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreVertical className="h-4 w-4 text-slate-400" />
          </Button>
        )}
      />
    </div>
  );
}
