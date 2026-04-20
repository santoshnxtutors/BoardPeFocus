"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Sparkles, 
  Play, 
  History, 
  Settings2, 
  CheckCircle2, 
  AlertTriangle,
  RefreshCw,
  Search,
  ArrowRight,
  Globe,
  GraduationCap,
  MapPin
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { DataTable } from "@/components/shared/data-table";
import { api } from "@/lib/api";

export default function PageGeneratorPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [jobs, setJobs] = useState<any[]>([]);

  useEffect(() => {
    loadJobs();
    const interval = setInterval(loadJobs, 5000); // Poll every 5s
    return () => clearInterval(interval);
  }, []);

  const loadJobs = async () => {
    try {
      const data = await api.pageGenerator.getJobs();
      setJobs(data);
      
      // Check if any job is currently running to update UI state
      const runningJob = data.find(j => j.status === 'RUNNING');
      if (runningJob) {
        setIsGenerating(true);
        setProgress(runningJob.progress || 0);
      } else {
        setIsGenerating(false);
      }
    } catch (error) {
      console.error("Failed to load jobs:", error);
    }
  };

  const handleStartGeneration = async (type: string) => {
    setIsGenerating(true);
    setProgress(0);
    try {
      await api.pageGenerator.trigger(type);
      await loadJobs();
    } catch (error) {
      console.error("Failed to start generation:", error);
      setIsGenerating(false);
    }
  };

  const columns = [
    {
      header: "Job Type",
      accessorKey: "type",
      cell: (job: any) => (
        <span className="font-bold text-slate-900">{job.type}</span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (job: any) => {
        const variants: Record<string, string> = {
          COMPLETED: "bg-green-100 text-green-700 border-green-200",
          FAILED: "bg-rose-100 text-rose-700 border-rose-200",
          RUNNING: "bg-blue-100 text-blue-700 border-blue-200",
        };
        return (
          <Badge variant="outline" className={`${variants[job.status]} font-black uppercase text-[9px] tracking-widest`}>
            {job.status}
          </Badge>
        );
      },
    },
    {
      header: "Results",
      accessorKey: "pages",
      cell: (job: any) => (
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-slate-700">{job.pages} Pages</span>
          {job.issues > 0 && (
            <span className="flex items-center gap-1 text-xs font-bold text-amber-600">
              <AlertTriangle className="w-3 h-3" /> {job.issues} Issues
            </span>
          )}
        </div>
      ),
    },
    {
      header: "Date",
      accessorKey: "date",
      cell: (job: any) => (
        <span className="text-xs text-slate-400 font-bold">{job.date}</span>
      ),
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Page Intelligence</h1>
          <p className="text-sm text-slate-500">Generate scalable SEO pages from structured data with quality thresholds.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="font-bold border-slate-200">
            <Settings2 className="mr-2 h-4 w-4" /> Thresholds
          </Button>
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6 shadow-xl shadow-primary/20">
            <RefreshCw className="mr-2 h-4 w-4" /> Re-sync Data
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="shadow-sm border-slate-200 hover:border-primary transition-all group overflow-hidden">
          <div className="h-1 bg-amber-500 w-full"></div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <GraduationCap className="w-8 h-8 text-amber-500" />
              <Badge variant="secondary" className="bg-amber-50 text-amber-700 font-black">HIGH PRIO</Badge>
            </div>
            <CardTitle className="text-lg font-black uppercase tracking-tight">Tutor Profiles</CardTitle>
            <CardDescription className="text-xs">Generate optimized landing pages for all verified tutors.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Eligible Tutors</span>
                <span>42 / 50</span>
              </div>
              <Button 
                onClick={() => handleStartGeneration('TUTOR')} 
                disabled={isGenerating}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold"
              >
                <Play className="mr-2 h-3 w-3 fill-current" /> Run Generation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 hover:border-primary transition-all group overflow-hidden">
          <div className="h-1 bg-blue-500 w-full"></div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <Globe className="w-8 h-8 text-blue-500" />
              <Badge variant="secondary" className="bg-blue-50 text-blue-700 font-black">SEO CORE</Badge>
            </div>
            <CardTitle className="text-lg font-black uppercase tracking-tight">Academic Taxonomy</CardTitle>
            <CardDescription className="text-xs">Boards, Subjects, and combinations (e.g. IB Physics).</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Eligible Combos</span>
                <span>128 / 500</span>
              </div>
              <Button 
                onClick={() => handleStartGeneration('ACADEMIC')}
                disabled={isGenerating}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold"
              >
                <Play className="mr-2 h-3 w-3 fill-current" /> Run Generation
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200 hover:border-primary transition-all group overflow-hidden">
          <div className="h-1 bg-green-500 w-full"></div>
          <CardHeader>
            <div className="flex items-center justify-between mb-2">
              <MapPin className="w-8 h-8 text-green-500" />
              <Badge variant="secondary" className="bg-green-50 text-green-700 font-black">LOCAL</Badge>
            </div>
            <CardTitle className="text-lg font-black uppercase tracking-tight">Geo Pages</CardTitle>
            <CardDescription className="text-xs">Sectors, Societies, and School-specific pages.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-400">
                <span>Eligible Pages</span>
                <span>85 / 1200</span>
              </div>
              <Button 
                onClick={() => handleStartGeneration('GEO')}
                disabled={isGenerating}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold"
              >
                <Play className="mr-2 h-3 w-3 fill-current" /> Run Generation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {isGenerating && (
        <Card className="bg-slate-900 text-white border-0 shadow-2xl">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center animate-pulse">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-sm font-black uppercase tracking-widest">Generation Engine Running...</p>
                  <p className="text-[10px] text-slate-400 font-bold uppercase">Assembling blocks, scoring content, and creating internal links</p>
                </div>
              </div>
              <span className="text-xl font-black">{progress}%</span>
            </div>
            <Progress value={progress} className="h-1 bg-white/10" />
            <div className="flex gap-4">
              <div className="text-[10px] font-bold text-white/40 uppercase">Processed: 124 entities</div>
              <div className="text-[10px] font-bold text-white/40 uppercase">Skipped: 42 (Low Score)</div>
              <div className="text-[10px] font-bold text-rose-400 uppercase">Errors: 0</div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        <h2 className="text-lg font-black text-slate-900 uppercase tracking-tight flex items-center gap-2">
          <History className="w-5 h-5 text-slate-400" /> Recent Generation Jobs
        </h2>
        <DataTable 
          columns={columns} 
          data={jobs} 
          isLoading={false}
          searchPlaceholder="Search jobs..."
          actions={(job) => (
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-900">
              <ArrowRight className="w-4 h-4" />
            </Button>
          )}
        />
      </div>
    </div>
  );
}
