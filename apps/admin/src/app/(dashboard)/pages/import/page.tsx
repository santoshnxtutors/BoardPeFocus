"use client";

import React, { useState } from "react";
import { 
  ArrowLeft, Upload, FileDown, 
  CheckCircle2, AlertCircle, FileSpreadsheet,
  X, Sparkles, Database, Pencil
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ImportPagesPage() {
  const [file, setFile] = useState<File | null>(null);
  const [isImporting, setIsImporting] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const startImport = () => {
    setIsImporting(true);
    let p = 0;
    const interval = setInterval(() => {
      p += 10;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setTimeout(() => setIsImporting(false), 500);
      }
    }, 200);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-10 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/pages" className="p-3 hover:bg-white rounded-2xl border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Bulk Page Import</h1>
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest mt-1">Populate your engine with Excel / CSV data</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        <div className="md:col-span-2 space-y-10">
          <Card className="rounded-[2.5rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/50 overflow-hidden bg-white">
            <CardContent className="p-10">
              {!isImporting ? (
                <div className="space-y-10">
                  <div 
                    className={`border-4 border-dashed rounded-[2rem] p-16 flex flex-col items-center justify-center text-center transition-all ${
                      file ? 'border-emerald-200 bg-emerald-50/30' : 'border-slate-100 bg-slate-50/50 hover:bg-slate-50 hover:border-blue-200'
                    }`}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={(e) => {
                      e.preventDefault();
                      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                        setFile(e.dataTransfer.files[0]);
                      }
                    }}
                  >
                    <div className={`w-20 h-20 rounded-3xl flex items-center justify-center mb-6 shadow-xl ${
                      file ? 'bg-emerald-500 text-white' : 'bg-white text-slate-300'
                    }`}>
                      {file ? <CheckCircle2 className="w-10 h-10" /> : <FileSpreadsheet className="w-10 h-10" />}
                    </div>
                    
                    {file ? (
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">{file.name}</h3>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready to sync</p>
                        <button onClick={() => setFile(null)} className="mt-4 text-xs font-black text-rose-500 uppercase tracking-widest hover:underline flex items-center gap-1 mx-auto">
                          <X className="w-3 h-3" /> Remove File
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h3 className="text-xl font-black text-slate-900 mb-1">Upload Data Sheet</h3>
                        <p className="text-sm font-bold text-slate-500 uppercase tracking-tight">Drag and drop or click to browse</p>
                        <input 
                          type="file" 
                          id="fileUpload"
                          className="hidden" 
                          accept=".xlsx,.xls,.csv"
                          onChange={handleFileChange}
                        />
                        <label 
                          htmlFor="fileUpload"
                          className="mt-8 inline-block px-8 py-4 bg-slate-900 text-white rounded-2xl font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-slate-800 shadow-xl shadow-slate-900/20"
                        >
                          Select File
                        </label>
                      </div>
                    )}
                  </div>

                  <div className="bg-blue-50/50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                    <AlertCircle className="w-6 h-6 text-blue-500 shrink-0" />
                    <div>
                      <p className="text-sm font-black text-blue-900 uppercase tracking-tight">Import Requirements</p>
                      <ul className="text-xs font-bold text-blue-700/70 mt-2 space-y-1 list-disc list-inside">
                        <li>File must contain "Title", "Slug", and "Location" columns.</li>
                        <li>Maximum of 5,000 rows per single import.</li>
                        <li>Format must be .XLSX, .XLS or .CSV</li>
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-20 flex flex-col items-center justify-center text-center space-y-8">
                  <div className="relative w-32 h-32">
                    <svg className="w-full h-full" viewBox="0 0 100 100">
                      <circle className="text-slate-100 stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                      <circle 
                        className="text-blue-600 stroke-current transition-all duration-300" 
                        strokeWidth="8" 
                        strokeDasharray={251.2}
                        strokeDashoffset={251.2 * (1 - progress / 100)}
                        strokeLinecap="round" 
                        fill="transparent" 
                        r="40" cx="50" cy="50" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center font-black text-2xl text-slate-900">
                      {progress}%
                    </div>
                  </div>
                  <div>
                    <h3 className="text-2xl font-black text-slate-900">Processing Data...</h3>
                    <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mt-2">Connecting to Intelligence Engine</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-10">
          <Card className="rounded-[2.5rem] border-2 border-slate-50 shadow-2xl shadow-slate-200/50 overflow-hidden bg-white p-8">
            <h3 className="font-black text-sm text-slate-400 uppercase tracking-widest mb-6">Instructions</h3>
            <div className="space-y-6">
              {[
                { title: "Download Template", icon: FileDown, desc: "Get our standard format." },
                { title: "Fill Data", icon: Pencil, desc: "Add your titles and URLs." },
                { title: "Import & Sync", icon: Sparkles, desc: "Run the intelligence engine." },
              ].map((step, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 shrink-0">
                    <step.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-black text-slate-900">{step.title}</p>
                    <p className="text-xs font-bold text-slate-400">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="mt-10 w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all">
              <FileDown className="w-4 h-4" /> Download Sample
            </button>
          </Card>

          <Button 
            onClick={startImport}
            disabled={!file || isImporting}
            className="w-full h-20 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 shadow-2xl shadow-blue-600/30 text-lg font-black uppercase tracking-widest gap-3 disabled:opacity-50"
          >
            <Database className="w-6 h-6" />
            Process Import
          </Button>
        </div>
      </div>
    </div>
  );
}
