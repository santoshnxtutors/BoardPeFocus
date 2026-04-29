import React from "react";
import { ButtonLink } from "@/components/ui/button";
import { MessageSquare, Calendar } from "lucide-react";
import { TutorProfileViewModel } from "@/types/tutor-profile";

interface TutorStickyCTAProps {
  tutor: Pick<TutorProfileViewModel, "name">;
}

export const TutorStickyCTA = ({ tutor }: TutorStickyCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-4 bg-white/80 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300">
      <div className="flex gap-3 max-w-md mx-auto">
        <ButtonLink
          href={`https://wa.me/918796367754?text=Hi, I'm interested in booking a demo with ${tutor.name}`}
          target="_blank"
          rel="noopener noreferrer"
          variant="outline"
          className="h-14 flex-1 rounded-2xl border-accent/20 text-[10px] font-black uppercase tracking-widest text-accent hover:bg-accent hover:text-white"
        >
          <MessageSquare className="mr-2 h-4 w-4" /> WhatsApp
        </ButtonLink>
        <ButtonLink
          href="/process/demo-class"
          className="h-14 flex-[2] rounded-2xl bg-primary text-xs font-black uppercase tracking-widest text-white shadow-xl shadow-primary/20 hover:bg-primary/90"
        >
          <Calendar className="mr-2 h-4 w-4" /> Book Free Demo
        </ButtonLink>
      </div>
    </div>
  );
};
