import { Tutor } from "@/types";
import { Card, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Star, Clock, GraduationCap, ChevronRight, MapPin, BookOpen } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { getTutorPath } from "@/lib/tutor-paths";

interface TutorCardProps {
  tutor: Tutor;
}

export function TutorCard({ tutor }: TutorCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/50 bg-white hover:border-primary/20 hover:shadow-2xl transition-all duration-500 rounded-3xl h-full flex flex-col">
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/10 transition-colors" />

      <div className="p-6 lg:p-8 flex-grow">
        <div className="flex flex-col gap-6 lg:flex-row mb-8">
          <div className="relative shrink-0">
            <div className="w-24 h-24 lg:w-28 lg:h-28 rounded-2xl bg-muted overflow-hidden border-4 border-white shadow-md group-hover:scale-105 transition-transform duration-500">
              {tutor.photoUrl ? (
                <Image src={tutor.photoUrl} alt={`${tutor.name}, board-focused home tutor in Gurugram`} width={112} height={112} sizes="(min-width: 1024px) 112px, 96px" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary text-3xl font-heading font-bold">
                  {tutor.name.charAt(0)}
                </div>
              )}
            </div>
            <div className="absolute -bottom-2 -right-2 bg-white px-2 py-0.5 rounded-full shadow-sm border border-border flex items-center gap-1 text-sm font-bold text-accent">
              <Star className="w-3.5 h-3.5 fill-accent text-accent" />
              {tutor.rating}
            </div>
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="mb-2 break-words text-xl font-heading font-bold text-primary transition-colors group-hover:text-accent lg:text-2xl">
              {tutor.name}
            </h3>
            <div className="mb-4 flex flex-wrap gap-3 text-sm font-medium text-muted-foreground lg:gap-4">
              <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-secondary" /> {tutor.experienceYears} Yrs Exp.</span>
              <span className="flex items-center gap-1.5"><GraduationCap className="w-4 h-4 text-secondary" /> {tutor.studentsTaught}+ Students</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {tutor.boards.map((board) => (
                <Badge key={board} variant="secondary" className="bg-muted text-muted-foreground font-semibold px-2.5 py-0.5 rounded-lg border-none">
                  {board}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-2">
            <BookOpen className="w-4 h-4 text-primary mt-1 shrink-0" />
            <div className="flex flex-wrap gap-1.5">
              {tutor.subjects.map((subject, index) => (
                <span key={subject} className="text-sm font-medium text-foreground">
                  {subject}
                  {index < tutor.subjects.length - 1 ? ", " : ""}
                </span>
              ))}
            </div>
          </div>
          <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed italic">
            "{tutor.about}"
          </p>
        </div>

        {tutor.areas && tutor.areas.length > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 p-2.5 rounded-xl border border-border/40">
            <MapPin className="w-3.5 h-3.5" />
            <span className="truncate">Serves: {tutor.areas.join(", ")}</span>
          </div>
        )}
      </div>

      <CardFooter className="p-0 mt-auto">
        <Link href={getTutorPath(tutor.slug)} className="w-full">
          <Button variant="ghost" className="w-full h-14 rounded-none rounded-b-3xl border-t border-border/50 group-hover:bg-primary group-hover:text-white transition-all duration-300 text-primary font-bold">
            View Full Profile
            <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
