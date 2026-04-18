"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/common/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Boards", href: "/gurugram" },
    { name: "Sectors", href: "/gurugram" },
    { name: "Schools", href: "/gurugram" },
    { name: "Browse Tutors", href: "/search" },
  ];

  return (
    <header 
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled 
          ? "bg-white/95 backdrop-blur-md shadow-lg py-3" 
          : "bg-white/60 backdrop-blur-sm py-5 border-b border-black/[0.03]"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo className="scale-[0.85] md:scale-100 origin-left" />
 
        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 items-center">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-sm font-bold text-primary/80 transition-colors hover:text-accent"
            >
              {link.name}
            </Link>
          ))}
        </nav>
 
        <div className="flex items-center gap-4">
          <Link href="/contact" className="hidden sm:block">
            <Button className="bg-primary text-white hover:bg-primary/90 shadow-lg rounded-xl px-6 font-bold">
              Find a Tutor
            </Button>
          </Link>
          
          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 rounded-lg text-primary hover:bg-black/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden",
        isOpen ? "max-h-96 opacity-100 border-t" : "max-h-0 opacity-0"
      )}>
        <nav className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className="text-lg font-bold text-primary hover:text-accent transition-colors py-2 border-b border-border/50"
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4">
            <Link href="/contact" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary h-14 text-lg rounded-xl">Get Started</Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
