import React from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Clock, School, CheckCircle2 } from "lucide-react";
import { FadeIn } from "@/lib/animations";
import { TutorProfileViewModel } from "@/types/tutor-profile";

interface TutorHeroProps {
  tutor: TutorProfileViewModel;
}

export const TutorHero = ({ tutor }: TutorHeroProps) => {
  const schoolCount = (tutor.schools ?? []).length;

  return (
    <section className="relative pt-32 pb-16 bg-muted/30 overflow-hidden">
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-[40rem] h-[40rem] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Profile Photo */}
          <FadeIn direction="right" className="shrink-0 mx-auto lg:mx-0">
            <div className="relative">
              <div className="w-48 h-48 md:w-64 md:h-64 rounded-3xl overflow-hidden border-8 border-white shadow-2xl">
                {tutor.photoUrl ? (
                  <img src={tutor.photoUrl} alt={`${tutor.name}, premium home tutor profile photo`} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary text-6xl font-heading font-bold uppercase">
                    {tutor.name.charAt(0)}
                  </div>
                )}
              </div>
              {tutor.isVerified && (
                <div className="absolute -top-4 -left-4 bg-white p-2 rounded-2xl shadow-xl border border-border flex items-center gap-2 text-xs font-black text-green-600 uppercase tracking-widest">
                  <CheckCircle2 className="w-4 h-4 fill-green-50 text-green-600" />
                  Verified
                </div>
              )}
              <div className="absolute -bottom-4 -right-4 bg-white px-4 py-2 rounded-2xl shadow-xl border border-border flex items-center gap-2 text-lg font-bold text-accent">
                <Star className="w-5 h-5 fill-accent text-accent" />
                {tutor.rating}
              </div>
            </div>
          </FadeIn>

          {/* Profile Info */}
          <div className="flex-grow text-center lg:text-left">
            <FadeIn direction="left">
              <div className="flex flex-wrap justify-center lg:justify-start gap-2 mb-4">
                {tutor.boards?.map((b, index: number) => {
                  const boardName = typeof b === 'string' ? b : b.board?.name;
                  const boardId = typeof b === 'string' ? `board-${index}` : b.board?.id;
                  
                  if (!boardName) return null;

                  return (
                    <Badge key={boardId} variant="outline" className="border-primary/20 bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {boardName} Specialist
                    </Badge>
                  );
                })}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-extrabold text-primary mb-4 leading-tight">
                {tutor.name}
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0 font-medium">
                {tutor.tagline}
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto lg:mx-0">
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1 flex items-center gap-1.5 justify-center lg:justify-start">
                    <Clock className="w-3 h-3" /> Experience
                  </p>
                  <p className="text-xl font-heading font-bold text-primary">{tutor.experienceYrs} Years</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1 flex items-center gap-1.5 justify-center lg:justify-start">
                    <School className="w-3 h-3" /> Schools
                  </p>
                  <p className="text-xl font-heading font-bold text-primary">{schoolCount}</p>
                </div>
                <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-border/50">
                  <p className="text-[10px] text-muted-foreground uppercase font-black tracking-widest mb-1 flex items-center gap-1.5 justify-center lg:justify-start">
                    <Star className="w-3 h-3" /> Highlights
                  </p>
                  <p className="text-xl font-heading font-bold text-primary">{tutor.reviewsCount}</p>
                </div>
                <div className="bg-primary text-white p-4 rounded-2xl shadow-xl shadow-primary/20">
                  <p className="text-[10px] text-white/60 uppercase font-black tracking-widest mb-1">Status</p>
                  <p className="text-xl font-heading font-bold">Available</p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
};
