"use client";

import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { History, Shield, User, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AuditLogsPage() {
  const logs = [
    { id: '1', user: 'Santosh (Admin)', action: 'LOGIN', details: 'Successful login from IP 192.168.1.1', time: '10 mins ago' },
    { id: '2', user: 'System', action: 'PAGE_GEN', details: 'Generated 50 new curriculum pages for IB Math', time: '2 hours ago' },
    { id: '3', user: 'Admin', action: 'UPDATE', details: 'Modified tutor profile: Amit Sharma', time: 'Yesterday' },
  ];

  const columns = [
    {
      header: "User",
      accessorKey: "user",
      cell: (log: any) => (
        <div className="flex items-center gap-2">
          <User className="w-4 h-4 text-slate-400" />
          <span className="font-bold text-slate-900">{log.user}</span>
        </div>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: (log: any) => (
        <Badge variant="outline" className="bg-slate-100 text-slate-700 border-slate-200 text-[9px] font-black tracking-widest uppercase">
          {log.action}
        </Badge>
      ),
    },
    {
      header: "Details",
      accessorKey: "details",
      cell: (log: any) => (
        <p className="text-xs text-slate-500 max-w-sm truncate">{log.details}</p>
      ),
    },
    {
      header: "Time",
      accessorKey: "time",
      cell: (log: any) => (
        <div className="flex items-center gap-1.5 text-slate-400">
          <Clock className="w-3.5 h-3.5" />
          <span className="text-[10px] font-bold uppercase tracking-widest">{log.time}</span>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">System Audit Logs</h1>
          <p className="text-sm text-slate-500">Track all administrative actions and system events for security.</p>
        </div>
        <Button variant="outline" className="font-bold border-slate-200">
          <History className="mr-2 h-4 w-4" /> Export Logs
        </Button>
      </div>

      <DataTable 
        columns={columns} 
        data={logs}
        searchPlaceholder="Search logs..."
        actions={(log) => (
          <Button variant="ghost" size="sm" className="h-8 text-blue-600 font-bold">
            View Full
          </Button>
        )}
      />
    </div>
  );
}
