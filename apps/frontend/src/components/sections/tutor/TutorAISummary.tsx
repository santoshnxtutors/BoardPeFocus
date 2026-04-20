import React from "react";
import { Sparkles, Target, Zap, ShieldCheck } from "lucide-react";
import { TutorProfileViewModel } from "@/types/tutor-profile";

interface TutorAISummaryProps {
  tutor: TutorProfileViewModel;
}

export const TutorAISummary = ({ tutor }: TutorAISummaryProps) => {
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
            Highly specialized in <strong>{typeof tutor.boards?.[0] === 'string' ? tutor.boards[0] : tutor.boards?.[0]?.board?.name}</strong> and <strong>{typeof tutor.boards?.[1] === 'string' ? tutor.boards[1] : tutor.boards?.[1]?.board?.name}</strong> boards. Expert at bridging the gap between school curriculum and board requirements.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <Zap className="w-5 h-5" />
            <h4 className="font-bold text-lg">Methodology</h4>
          </div>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Focuses on <strong>rubric-aligned answer framing</strong> and conceptual clarity. Proven track record with students from {typeof tutor.schools?.[0] === 'string' ? tutor.schools[0] : (tutor.schools?.[0]?.school?.name || 'top Gurugram schools')}.
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-primary">
            <ShieldCheck className="w-5 h-5" />
            <h4 className="font-bold text-lg">Trust Score</h4>
          </div>
          <div className="space-y-2">
             <p className="text-muted-foreground text-sm leading-relaxed">
               Verified experience of <strong>{tutor.experienceYrs} years</strong>. All academic credentials and result proofs are verified by our team.
             </p>
             <div className="flex items-center gap-2">
               <div className="h-1.5 flex-1 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-green-500 w-[95%]"></div>
               </div>
               <span className="text-[10px] font-black text-green-600 uppercase">95% Match</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};
