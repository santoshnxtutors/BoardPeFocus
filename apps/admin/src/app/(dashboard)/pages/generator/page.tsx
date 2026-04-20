"use client";

import React, { useState } from "react";
import { 
  Sparkles, Layers, ShieldCheck, Zap, 
  Search, Check, AlertCircle, Play, ArrowLeft
} from "lucide-react";
import Link from "next/link";

export default function PageGeneratorPanel() {
  const [selectedType, setSelectedType] = useState("BOARD_SUBJECT");
  const [isGenerating, setIsGenerating] = useState(false);
  const [step, setStep] = useState(1); // 1: Select Type, 2: Select Entities, 3: Review & Generate

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/pages" className="p-2 hover:bg-white rounded-xl border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-600">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-3">
            SEO Intelligence Engine <Sparkles className="w-6 h-6 text-blue-600 fill-blue-600" />
          </h1>
          <p className="text-slate-500 mt-1 font-medium">Generate high-quality landing pages from your structured data.</p>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center gap-4 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div className={`flex items-center gap-2 ${step >= s ? 'text-blue-600' : 'text-slate-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm ${
                step === s ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20' : 
                step > s ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-400'
              }`}>
                {step > s ? <Check className="w-4 h-4" /> : s}
              </div>
              <span className="text-sm font-bold uppercase tracking-wider">
                {s === 1 ? "Page Type" : s === 2 ? "Entities" : "Review"}
              </span>
            </div>
            {s < 3 && <div className="h-0.5 w-12 bg-slate-100" />}
          </React.Fragment>
        ))}
      </div>

      {/* Step 1: Select Page Type */}
      {step === 1 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { id: "BOARD_SUBJECT", title: "Board + Subject", desc: "e.g., CBSE Mathematics in Gurugram", icon: Layers },
            { id: "SCHOOL", title: "School Specific", desc: "e.g., DPS Sushant Lok Home Tutors", icon: ShieldCheck },
            { id: "SCHOOL_BOARD", title: "School + Board", desc: "e.g., Heritage IBDP Tutors", icon: Zap },
            { id: "SECTOR", title: "Sector Landing", desc: "e.g., Tutors in Sector 45", icon: Play },
          ].map((type) => (
            <button 
              key={type.id}
              onClick={() => { setSelectedType(type.id); setStep(2); }}
              className={`p-6 rounded-3xl border-2 text-left transition-all group ${
                selectedType === type.id 
                  ? "border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-500/5" 
                  : "border-slate-100 bg-white hover:border-blue-200 hover:bg-slate-50"
              }`}
            >
              <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all ${
                selectedType === type.id ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600"
              }`}>
                <type.icon className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-1">{type.title}</h3>
              <p className="text-sm text-slate-500 font-medium">{type.desc}</p>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Select Entities (Simplified for UI) */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900 mb-4">Configure Entities for {selectedType.replace("_", " ")}</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Board</label>
                <select className="w-full p-3 rounded-xl border-slate-200 bg-slate-50 font-bold text-slate-700 focus:ring-blue-500">
                  <option>CBSE</option>
                  <option>ICSE</option>
                  <option>IBDP</option>
                  <option>IGCSE</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Select Subject</label>
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search subjects..." 
                    className="w-full pl-11 p-3 rounded-xl border-slate-200 bg-slate-50 font-medium text-slate-700 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between pt-4">
            <button onClick={() => setStep(1)} className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all">Back</button>
            <button onClick={() => setStep(3)} className="px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all">Continue to Review</button>
          </div>
        </div>
      )}

      {/* Step 3: Review & Generate */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              Pre-Generation Analysis <AlertCircle className="w-5 h-5 text-amber-500" />
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Target Slug</p>
                <p className="font-bold text-slate-700">/gurugram/cbse/mathematics</p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase mb-1">Estimated Score</p>
                <p className="font-bold text-emerald-600 text-lg">94/100 (Excellent)</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Quality Checklist</h3>
              <div className="space-y-2">
                {[
                  "Verified Tutors Found: 12",
                  "School Mappings Detected: 8",
                  "Unique Content Blocks Ready: 5",
                  "Internal Link Graph: Healthy"
                ].map((check, i) => (
                  <div key={i} className="flex items-center gap-3 text-slate-600 font-medium">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    {check}
                  </div>
                ))}
              </div>
            </div>

            <div className="flex justify-between pt-6 border-t border-slate-100">
              <button onClick={() => setStep(2)} className="px-6 py-2.5 text-slate-500 font-bold hover:bg-slate-100 rounded-xl transition-all">Modify Configuration</button>
              <button 
                onClick={() => {
                  setIsGenerating(true);
                  setTimeout(() => {
                    setIsGenerating(false);
                    alert("Page generated successfully!");
                  }, 2000);
                }}
                disabled={isGenerating}
                className="flex items-center gap-2 px-8 py-2.5 bg-blue-600 text-white font-bold rounded-xl shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-all disabled:opacity-50"
              >
                {isGenerating ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Generating Blocks...
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" /> Start Intelligence Engine
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
