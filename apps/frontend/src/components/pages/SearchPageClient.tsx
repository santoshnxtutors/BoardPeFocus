"use client";

import { Suspense, useMemo, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { mockBoards, mockSubjects } from "@/data/mock";
import { TutorCard } from "@/components/cards/TutorCard";
import { Tutor } from "@/types";
import { tutorMatchesFilters } from "@/lib/tutors";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search as SearchIcon,
  SlidersHorizontal,
  Filter,
} from "lucide-react";
import { FadeIn, StaggerContainer, StaggerItem } from "@/lib/animations";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "@/components/ui/accordion";

function SearchPageContent({ tutors }: { tutors: Tutor[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const initialQuery = searchParams.get("q") || "";
  const initialBoard = searchParams.get("board") || "";
  const initialSubject = searchParams.get("subject") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedBoard, setSelectedBoard] = useState(initialBoard);
  const [selectedSubject, setSelectedSubject] = useState(initialSubject);
  const [showFilters, setShowFilters] = useState(false);

  const filteredTutors = useMemo(() => {
    return tutors.filter((tutor) =>
      tutorMatchesFilters(tutor, {
        query,
        board: selectedBoard,
        subject: selectedSubject,
      }),
    );
  }, [query, selectedBoard, selectedSubject, tutors]);

  const clearFilters = () => {
    setQuery("");
    setSelectedBoard("");
    setSelectedSubject("");
    router.push("/search");
  };

  return (
    <div className="bg-background min-h-screen pt-32 pb-24">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="mb-12">
            <h1 className="text-4xl md:text-5xl font-heading font-extrabold text-primary mb-4">
              Find Your Perfect Tutor
            </h1>
            <p className="text-lg text-muted-foreground">
              Browse our handpicked selection of top-tier educators in Gurugram.
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="flex flex-col md:flex-row gap-4 mb-12">
            <div className="relative flex-grow">
              <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, subject, or school..."
                className="h-14 pl-12 rounded-2xl border-border/60 shadow-sm focus:ring-primary/5"
              />
            </div>
            <Button
              variant="outline"
              className="h-14 px-6 rounded-2xl md:hidden border-border/60"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-5 h-5 mr-2" />
              Filters
            </Button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <aside className={`lg:block ${showFilters ? 'block' : 'hidden'} lg:col-span-1 space-y-8`}>
            <div className="bg-white p-8 rounded-3xl border border-border/50 shadow-sm sticky top-24">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-heading font-bold text-primary flex items-center gap-2">
                  <Filter className="w-5 h-5" /> Filters
                </h2>
                {(selectedBoard || selectedSubject || query) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="text-accent hover:text-accent/80 p-0 h-auto"
                  >
                    Clear All
                  </Button>
                )}
              </div>

              <Accordion multiple defaultValue={["boards", "subjects"]}>
                <AccordionItem value="boards" className="border-border/50">
                  <AccordionTrigger className="text-primary font-bold hover:no-underline">Boards</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pt-2">
                      {mockBoards.map((board) => (
                        <label key={board.slug} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="board"
                            checked={selectedBoard.toLowerCase() === board.slug}
                            onChange={() => setSelectedBoard(board.slug)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className={`text-sm ${selectedBoard.toLowerCase() === board.slug ? 'text-primary font-bold' : 'text-muted-foreground group-hover:text-primary transition-colors'}`}>
                            {board.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="subjects" className="border-border/50">
                  <AccordionTrigger className="text-primary font-bold hover:no-underline">Subjects</AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col gap-2 pt-2">
                      {mockSubjects.map((subject) => (
                        <label key={subject.slug} className="flex items-center gap-3 cursor-pointer group">
                          <input
                            type="radio"
                            name="subject"
                            checked={selectedSubject.toLowerCase() === subject.slug}
                            onChange={() => setSelectedSubject(subject.slug)}
                            className="w-4 h-4 accent-primary"
                          />
                          <span className={`text-sm ${selectedSubject.toLowerCase() === subject.slug ? 'text-primary font-bold' : 'text-muted-foreground group-hover:text-primary transition-colors'}`}>
                            {subject.name}
                          </span>
                        </label>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <div className="mt-8 pt-8 border-t border-border/50">
                <Button className="w-full rounded-xl shadow-lg" onClick={() => setShowFilters(false)}>
                  Apply Filters
                </Button>
              </div>
            </div>
          </aside>

          <main className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <p className="text-muted-foreground font-medium">
                Showing <span className="text-primary font-bold">{filteredTutors.length}</span> elite tutors
              </p>
            </div>

            {filteredTutors.length > 0 ? (
              <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {filteredTutors.map((tutor) => (
                  <StaggerItem key={tutor.id}>
                    <TutorCard tutor={tutor} />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            ) : (
              <FadeIn className="text-center py-20 bg-muted/20 rounded-3xl border border-dashed border-border">
                <div className="w-20 h-20 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
                  <SearchIcon className="w-10 h-10 text-muted-foreground" />
                </div>
                <h3 className="text-2xl font-heading font-bold text-primary mb-2">No tutors found</h3>
                <p className="text-muted-foreground mb-8">Try adjusting your filters or search terms.</p>
                <Button onClick={clearFilters} variant="outline" className="rounded-xl">
                  Clear All Filters
                </Button>
              </FadeIn>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

export function SearchPageClient({ tutors }: { tutors: Tutor[] }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-background pt-32 pb-24" />}>
      <SearchPageContent tutors={tutors} />
    </Suspense>
  );
}
