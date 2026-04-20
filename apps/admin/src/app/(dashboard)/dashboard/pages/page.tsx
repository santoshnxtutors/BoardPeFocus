"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  FileText, 
  ExternalLink, 
  Globe, 
  Lock, 
  RefreshCw,
  Sparkles,
  Settings2
} from "lucide-react";
import { api } from "@/lib/api";
import { PageRecord } from "@boardpefocus/types";
import Link from "next/link";

export default function PagesManagementPage() {
  const [pages, setPages] = useState<PageRecord[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    try {
      const data = await api.pages.list();
      setPages(data);
    } catch (error) {
      console.error("Failed to load pages:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: "Page Title & URL",
      accessorKey: "title",
      cell: (page: PageRecord) => (
        <div className="space-y-1">
          <p className="font-bold text-slate-900">{page.title}</p>
          <div className="flex items-center gap-2 text-[10px] font-mono text-blue-600">
            <span>/{page.slug}</span>
            <ExternalLink className="w-3 h-3 cursor-pointer hover:text-blue-800" />
          </div>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (page: PageRecord) => {
        const variants: Record<string, string> = {
          PUBLISHED: "bg-green-100 text-green-700 border-green-200",
          DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
          ARCHIVED: "bg-rose-100 text-rose-700 border-rose-200",
        };
        return (
          <Badge variant="outline" className={`${variants[page.status]} uppercase text-[9px] font-black tracking-widest`}>
            {page.status}
          </Badge>
        );
      },
    },
    {
      header: "Type",
      accessorKey: "templateId",
      cell: (page: PageRecord) => (
        <div className="flex items-center gap-1.5">
          {page.templateId ? <Sparkles className="w-3 h-3 text-amber-500" /> : <FileText className="w-3 h-3 text-slate-400" />}
          <span className="text-xs font-bold text-slate-500">{page.templateId ? 'Generated' : 'Static'}</span>
        </div>
      ),
    },
    {
      header: "Last Modified",
      accessorKey: "updatedAt",
      cell: (page: PageRecord) => (
        <span className="text-xs text-slate-400 font-bold">
          {new Date(page.updatedAt).toLocaleDateString()}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Pages Management</h1>
          <p className="text-sm text-slate-500">Manage all frontend routes, dynamic content, and SEO visibility.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/page-generator">
            <Button variant="outline" className="font-bold border-slate-200 text-amber-600 border-amber-100 bg-amber-50 hover:bg-amber-100">
              <Sparkles className="mr-2 h-4 w-4" /> Bulk Generate
            </Button>
          </Link>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold">
            New Page
          </Button>
        </div>
      </div>

      <DataTable 
        columns={columns} 
        data={pages} 
        isLoading={isLoading}
        searchPlaceholder="Search pages by title or slug..."
        actions={(page) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Settings2 className="h-4 w-4 text-slate-400" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
