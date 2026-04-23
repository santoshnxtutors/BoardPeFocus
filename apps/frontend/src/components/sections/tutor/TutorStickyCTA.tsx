import React from "react";
import { Button } from "@/components/ui/button";
import { MessageSquare, Calendar } from "lucide-react";
import Link from "next/link";
import { TutorProfileViewModel } from "@/types/tutor-profile";

interface TutorStickyCTAProps {
  tutor: Pick<TutorProfileViewModel, "name">;
}

export const TutorStickyCTA = ({ tutor }: TutorStickyCTAProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-4 bg-white/80 backdrop-blur-xl border-t border-border shadow-[0_-10px_40px_rgba(0,0,0,0.1)] transition-transform duration-300">
      <div className="flex gap-3 max-w-md mx-auto">
        <Link href={`https://wa.me/919582706764?text=Hi, I'm interested in booking a demo with ${tutor.name}`} target="_blank" rel="noopener noreferrer" className="flex-1">
          <Button variant="outline" className="w-full h-14 rounded-2xl border-accent/20 text-accent font-black uppercase tracking-widest text-[10px] hover:bg-accent hover:text-white">
            <MessageSquare className="w-4 h-4 mr-2" /> WhatsApp
          </Button>
        </Link>
        <Button className="flex-[2] h-14 rounded-2xl bg-primary hover:bg-primary/90 text-white font-black uppercase tracking-widest text-xs shadow-xl shadow-primary/20">
          <Calendar className="w-4 h-4 mr-2" /> Book Free Demo
        </Button>
      </div>
    </div>
  );
};
