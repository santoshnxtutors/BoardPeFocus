import React from "react";
import { Sparkles, Target, Zap, ShieldCheck } from "lucide-react";
import { TutorProfileViewModel } from "@/types/tutor-profile";

interface TutorAISummaryProps {
  tutor: TutorProfileViewModel;
}

export const TutorAISummary = ({ tutor }: TutorAISummaryProps) => {
  const boardNames = (tutor.boards ?? [])
    .map((board) => (typeof board === "string" ? board : board.board?.name))
    .filter(Boolean) as string[];
  const schoolNames = (tutor.schools ?? [])
    .map((school) => (typeof school === "string" ? school : school.school?.name))
    .filter(Boolean) as string[];
  const subjectNames = tutor.subjects ?? [];

  return (
    <div className="bg-primary/5 rounded-[2.5rem] p-8 border border-primary/10 relative overflow-hidden group">
      <div className="flex items-center gap-2 mb-6">
        <div className="bg-primary text-white p-1.5 rounded-lg shadow-lg shadow-primary/20">
          <Sparkles className="w-4 h-4" />
        </div>
        <h3 className="text-sm font-black uppercase tracking-widest text-primary">BoardPe Focus Quick Overview</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Target className="w-5 h-5" />
            <h4 className="font-bold text-lg">Key Specialization</h4>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Strong fit for students needing <strong>{subjectNames.join(", ")}</strong> support across <strong>{boardNames.join(", ")}</strong>. The profile is designed around board-stage clarity, better written execution, and more stable revision flow.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="w-5 h-5" />
            <h4 className="font-bold text-lg">Methodology</h4>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Built around <strong>concept clarity, guided practice, and revision discipline</strong>. Especially relevant for families connected to {schoolNames[0] || "top Gurugram schools"} and similar school contexts.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="font-bold text-lg">Trust Score</h4>
          </div>
          <div className="space-y-2">
             <p className="text-muted-foreground text-sm leading-relaxed">
               Backed by <strong>{tutor.experienceYrs} years</strong> of teaching experience with a profile that matches school-aware home tutoring in Gurugram.
             </p>
             <div className="flex items-center gap-2">
               <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 w-[90%]"></div>
               </div>
               <span className="text-[10px] font-black text-green-600 uppercase">Strong Fit</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
