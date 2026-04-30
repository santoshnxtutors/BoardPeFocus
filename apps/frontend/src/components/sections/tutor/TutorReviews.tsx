import React from "react";
import { Star, Quote, User } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { TutorReviewItem } from "@/types/tutor-profile";

interface TutorReviewsProps {
  reviews: TutorReviewItem[];
}

export const TutorReviews = ({ reviews }: TutorReviewsProps) => {
  if (!reviews || reviews.length === 0) return null;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-heading font-bold text-primary flex items-center gap-3">
          <Quote className="w-8 h-8 text-accent rotate-180" /> Parent-Fit Notes
        </h2>
        <div className="flex items-center gap-1">
          <span className="text-2xl font-black text-primary">{reviews.length}</span>
          <span className="text-xs font-black uppercase tracking-widest text-slate-400">Profile Notes</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reviews.map((review) => (
          <Card key={review.id} className="rounded-[2rem] border-border/60 hover:border-primary/20 transition-all group hover:shadow-xl hover:shadow-primary/5">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={`star-${i}`} 
                      className={`w-4 h-4 ${i < review.rating ? "fill-accent text-accent" : "text-slate-200"}`} 
                    />
                  ))}
                </div>
                <div className="bg-slate-50 px-3 py-1 rounded-full border border-slate-100 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-500">Trusted Parents</span>
                </div>
              </div>
              
              <p className="text-muted-foreground leading-relaxed italic">
                "{review.comment}"
              </p>

              <div className="flex items-center gap-4 pt-2">
                <div className="w-12 h-12 rounded-2xl bg-muted flex items-center justify-center text-slate-400 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                  <User className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-black text-primary uppercase tracking-tight text-sm">{review.parentName}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Relevant for {review.studentName || "Board-stage families"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
