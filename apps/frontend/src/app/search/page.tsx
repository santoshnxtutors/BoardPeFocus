"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Search, MapPin, GraduationCap, Star, BookOpen, SlidersHorizontal, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function SearchPage({ searchParams }: { searchParams: { q?: string, board?: string } }) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeBoard, setActiveBoard] = useState(searchParams.board || "");
  const [query, setQuery] = useState(searchParams.q || "");

  
  return (
    <div className="bg-muted/10 min-h-screen pb-24">
      {/* Search Header */}
      <div className="bg-primary pt-32 pb-24 px-4 text-center">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl md:text-5xl font-heading font-bold text-white mb-6">Find Your Perfect Tutor</h1>
          <p className="text-lg text-primary-foreground/80 mb-10 max-w-2xl mx-auto">Filter by board, subject, or location to discover top educators matching your child's specific needs.</p>
          
          <div className="bg-white p-3 rounded-2xl flex items-center shadow-2xl max-w-2xl mx-auto">
            <Search className="w-6 h-6 text-muted-foreground ml-3 mr-2" />
            <Input 
              type="text" 
              placeholder="Search by subject, board, or location..." 
              className="border-0 shadow-none focus-visible:ring-0 text-lg h-12 px-2"
              defaultValue={query}
            />
            <Button size="lg" className="h-12 px-8 rounded-xl bg-accent text-accent-foreground hover:bg-accent/90">
              Search
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 -mt-10 relative z-10">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Mobile Filter Toggle */}
          <div className="lg:hidden flex justify-end mb-4">
            <Button 
              variant="outline" 
              className="bg-white rounded-xl shadow-md gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="w-4 h-4" /> Filters
            </Button>
          </div>

          {/* Filters Sidebar */}
          <aside className={cn(
            "fixed inset-0 z-[100] lg:relative lg:inset-auto lg:z-auto bg-black/50 lg:bg-transparent lg:w-80 flex-shrink-0 transition-opacity",
            showFilters ? "opacity-100" : "opacity-0 pointer-events-none lg:opacity-100 lg:pointer-events-auto"
          )}>
            <Card className={cn(
              "absolute right-0 top-0 bottom-0 w-80 lg:w-full lg:relative lg:inset-auto glass-card border-border/50 shadow-sm rounded-none lg:rounded-2xl transition-transform duration-300",
              showFilters ? "translate-x-0" : "translate-x-full lg:translate-x-0"
            )}>
              <div className="p-6 border-b border-border/50 flex items-center justify-between">
                <h3 className="font-heading font-bold text-xl text-primary flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5" /> Filters
                </h3>
                <button onClick={() => setShowFilters(false)} className="lg:hidden p-2 hover:bg-muted rounded-full">
                  <X className="w-5 h-5" />
                </button>
                <span className="hidden lg:block text-xs text-muted-foreground cursor-pointer hover:text-primary">Clear all</span>
              </div>
              <CardContent className="p-6 space-y-8">
                <div>
                  <h4 className="font-bold text-foreground mb-4">Board Curriculum</h4>
                  <div className="flex flex-wrap gap-2">
                    {["CBSE", "ICSE", "IGCSE", "IB DP", "Cambridge"].map(board => (
                      <Badge key={board} variant="outline" className="px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground border-border text-foreground transition-colors">
                        {board}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-4">Core Subjects</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Mathematics", "Physics", "Chemistry", "Biology", "Accounts", "Economics"].map(subj => (
                      <Badge key={subj} variant="outline" className="px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground border-border text-foreground transition-colors">
                        {subj}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="font-bold text-foreground mb-4">Gurugram Sectors</h4>
                  <div className="flex flex-wrap gap-2">
                    {["Sector 45", "Sector 50", "Golf Course Road", "DLF Phase 1"].map(loc => (
                      <Badge key={loc} variant="outline" className="px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground border-border text-foreground transition-colors">
                        {loc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Results Grid */}
          <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-foreground">Showing 14 available tutors</h2>
              <select className="bg-transparent border border-border rounded-lg px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary">
                <option>Most Relevant</option>
                <option>Highest Rated</option>
                <option>Most Experienced</option>
              </select>
            </div>

            {/* List of Tutor Cards */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Card key={i} className="glass-card hover:shadow-lg transition-all duration-300 border-border/50 rounded-2xl overflow-hidden flex flex-col md:flex-row group">
                <div className="w-full md:w-48 h-48 md:h-auto bg-gradient-to-br from-primary/10 to-accent/5 flex items-center justify-center shrink-0 border-r border-border/50 relative">
                  <div className="w-24 h-24 rounded-full bg-white border-4 border-white shadow-md flex items-center justify-center text-3xl font-heading font-bold text-primary group-hover:scale-110 transition-transform duration-500">
                    T{i}
                  </div>
                  <div className="absolute top-3 right-3 bg-white/80 backdrop-blur-md px-2 py-1 rounded-full text-xs font-bold flex items-center gap-1 text-accent shadow-sm md:hidden">
                    <Star className="w-3 h-3 fill-accent" /> 4.9
                  </div>
                </div>
                
                <CardContent className="p-6 md:p-8 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-2">
                      <Link href={`/tutors/dr-sharma-${i}`}>
                        <h3 className="font-heading font-bold text-2xl text-primary hover:text-accent transition-colors">Dr. Sharma {i}</h3>
                      </Link>
                      <div className="hidden md:flex bg-white px-3 py-1 rounded-full text-sm font-bold items-center gap-1 text-accent shadow-sm border border-border/50">
                        <Star className="w-4 h-4 fill-accent" /> 4.9 <span className="text-muted-foreground font-normal text-xs ml-1">(84)</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-x-4 gap-y-2 mb-4 text-sm text-secondary font-medium">
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> Sector 45 & Nearby</span>
                      <span className="flex items-center gap-1"><BookOpen className="w-4 h-4" /> CBSE, ICSE</span>
                      <span className="flex items-center gap-1"><GraduationCap className="w-4 h-4" /> 12 Yrs Exp.</span>
                    </div>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2 leading-relaxed mb-4">
                      Specialized in making complex calculus intuitive and highly tailored for board examinations. Works exclusively with students targeting 95%+ in boards.
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-border/50">
                    <div className="flex gap-2">
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-none">Mathematics</Badge>
                      <Badge variant="secondary" className="bg-primary/5 text-primary border-none hidden sm:flex">Physics</Badge>
                    </div>
                    <Link href={`/tutors/dr-sharma-${i}`}>
                      <Button className="bg-primary text-white hover:bg-primary/90 shadow-sm rounded-xl">View Profile</Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
