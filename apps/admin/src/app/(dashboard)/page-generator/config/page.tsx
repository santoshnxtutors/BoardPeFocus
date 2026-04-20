"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  ArrowLeft, 
  Save, 
  ShieldCheck, 
  AlertCircle,
  Settings,
  Database,
  Search
} from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default function GeneratorConfigPage() {
  const [config, setConfig] = useState({
    tutor_min_completeness: 80,
    school_min_tutors: 3,
    board_subject_min_tutors: 2,
    sector_min_tutors: 5,
    min_unique_words: 150,
    max_duplication: 30,
  });

  return (
    <div className="space-y-8 pb-20">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/page-generator">
            <Button variant="ghost" size="icon" className="h-10 w-10 border border-slate-200">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Intelligence Thresholds</h1>
            <p className="text-sm text-slate-500">Define the quality rules that prevent junk page generation.</p>
          </div>
        </div>
        <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-xl shadow-primary/20">
          <Save className="mr-2 h-4 w-4" /> Save Configuration
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-primary mb-1">
                <ShieldCheck className="w-5 h-5" />
                <CardTitle className="text-lg font-black uppercase tracking-tight">Eligibility Rules</CardTitle>
              </div>
              <CardDescription className="text-xs">Minimum requirements for a page to be generated and indexed.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-700">Tutor Profile Completeness</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Calculated from bio, photo, and certs</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={config.tutor_min_completeness} 
                      className="w-20 text-right font-mono font-bold"
                    />
                    <span className="text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-700">Min Tutors per School Page</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Active tutors associated with school</p>
                  </div>
                  <Input 
                    type="number" 
                    value={config.school_min_tutors} 
                    className="w-20 text-right font-mono font-bold"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-700">Min Tutors for Geo Pages</p>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sectors and Societies</p>
                  </div>
                  <Input 
                    type="number" 
                    value={config.sector_min_tutors} 
                    className="w-20 text-right font-mono font-bold"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-blue-500 mb-1">
                <Database className="w-5 h-5" />
                <CardTitle className="text-lg font-black uppercase tracking-tight">Content Uniqueness</CardTitle>
              </div>
              <CardDescription className="text-xs">Algorithmic checks to prevent duplicate or thin content.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-700">Min Unique Words</p>
                  <Input 
                    type="number" 
                    value={config.min_unique_words} 
                    className="w-20 text-right font-mono font-bold"
                  />
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-bold text-slate-700">Max Duplication Allowed</p>
                  <div className="flex items-center gap-2">
                    <Input 
                      type="number" 
                      value={config.max_duplication} 
                      className="w-20 text-right font-mono font-bold"
                    />
                    <span className="text-xs font-bold text-slate-400">%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-slate-900 text-white border-0">
            <CardHeader>
              <div className="flex items-center gap-2 text-amber-500 mb-1">
                <AlertCircle className="w-5 h-5" />
                <CardTitle className="text-lg font-black uppercase tracking-tight">System Guardrails</CardTitle>
              </div>
              <CardDescription className="text-xs text-white/40">These settings cannot be bypassed during generation.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest">Slug Locking</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-black">ENABLED</Badge>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed font-bold">Prevents slugs from changing after a page is published, forcing a 301 redirect if an override occurs.</p>
              </div>

              <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-black uppercase tracking-widest">Canonical Matching</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 font-black">ENABLED</Badge>
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed font-bold">Automatically maps self-referential canonicals for all generated routes.</p>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm border-slate-200">
            <CardHeader>
              <div className="flex items-center gap-2 text-slate-900 mb-1">
                <Settings className="w-5 h-5" />
                <CardTitle className="text-lg font-black uppercase tracking-tight">Internal Linking Rules</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
               <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Auto-link Child Pages</span>
                 <div className="w-10 h-5 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                 </div>
               </div>
               <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Sibling Contextual Links</span>
                 <div className="w-10 h-5 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                 </div>
               </div>
               <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-100">
                 <span className="text-xs font-bold text-slate-700 uppercase tracking-tight">Intent-based CTAs</span>
                 <div className="w-10 h-5 bg-primary rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow-sm"></div>
                 </div>
               </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
