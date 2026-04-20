"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Book, FileText, Code, Zap, Shield, Search } from "lucide-react";

export default function DocsPage() {
  const docs = [
    { title: "Getting Started", icon: Zap, items: ["System Overview", "Dashboard Guide", "First Login"] },
    { title: "Content Management", icon: FileText, items: ["Creating Pages", "Blog Posts", "Media Library"] },
    { title: "Developer Docs", icon: Code, items: ["API Reference", "Webhook Schema", "Database Models"] },
    { title: "Security", icon: Shield, items: ["Role Permissions", "Auth Flow", "Data Protection"] }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Documentation</h1>
          <p className="text-sm text-slate-500">Learn how to manage and scale the BoardPeFocus platform.</p>
        </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search docs..." 
            className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 w-64"
          />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {docs.map((doc, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-3">
              <doc.icon className="w-5 h-5 text-primary" />
              <CardTitle className="text-lg font-black uppercase tracking-tight">{doc.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {doc.items.map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm font-bold text-slate-600 hover:text-primary cursor-pointer transition-colors">
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                    {item}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
