"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

import { Logo } from "@/components/common/Logo";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrolled = () => {
      setScrolled((current) => {
        const next = window.scrollY > 20;
        return current === next ? current : next;
      });
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(updateScrolled);
      }
    };

    updateScrolled();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Boards", href: "/boards" },
    { name: "Classes", href: "/classes" },
    { name: "Areas", href: "/gurgaon-area" },
    { name: "Schools", href: "/schools" },

    { name: "Browse Tutors", href: "/search" },
    { name: "Results", href: "/result" },
    { name: "Resources", href: "/resources" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg py-2 md:py-3"
          : "bg-white/60 backdrop-blur-sm py-3 md:py-5 border-b border-black/[0.03]",
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
              className="group relative text-sm font-bold text-primary/80 transition-colors hover:text-accent"
            >
              {link.name}
              <span className="absolute inset-x-0 -bottom-1 h-0.5 bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link href="/become-our-tutor" className="hidden sm:block">
            <Button className="bg-primary text-white hover:bg-primary/90 shadow-lg rounded-xl px-6 font-bold">
              Become Our Tutor
            </Button>
          </Link>

          {/* Mobile Toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-primary hover:bg-black/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={
              isOpen ? "Close navigation menu" : "Open navigation menu"
            }
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden absolute top-full left-0 w-full bg-white shadow-2xl transition-all duration-300 overflow-hidden",
          isOpen ? "max-h-96 opacity-100 border-t" : "max-h-0 opacity-0",
        )}
      >
        <nav id="mobile-navigation" className="flex flex-col p-6 gap-4">
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
            <Link href="/become-our-tutor" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-primary h-14 text-lg rounded-xl">
                Become Our Tutor
              </Button>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
