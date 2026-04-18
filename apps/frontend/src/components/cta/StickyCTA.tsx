"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { MessageCircle, Calendar } from "lucide-react";
import { FadeIn } from "@/lib/animations";

export function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show CTA after scrolling down 300px
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 pointer-events-none">
      <FadeIn direction="up" className="max-w-4xl mx-auto flex justify-center md:justify-end">
        <div className="bg-white/90 backdrop-blur-xl border border-border/50 shadow-2xl rounded-2xl p-2 md:p-3 flex items-center gap-2 md:gap-4 pointer-events-auto w-full md:w-auto transition-all duration-300">
          <div className="hidden md:block pr-4 border-r border-border/50 text-sm font-medium text-foreground">
            <span className="text-primary font-bold">Target 95%+</span><br/>
            Get expert guidance
          </div>
          
          <Button variant="outline" className="flex-1 md:flex-none h-12 md:h-10 border-primary/20 hover:bg-primary/5 text-primary rounded-xl font-medium">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="hidden sm:inline">Book Demo</span>
            <span className="sm:hidden">Demo</span>
          </Button>
          
          <Button className="flex-1 md:flex-none h-12 md:h-10 bg-[#25D366] hover:bg-[#25D366]/90 text-white rounded-xl font-medium shadow-md">
            <MessageCircle className="w-4 h-4 mr-2 fill-current" />
            <span className="hidden sm:inline">WhatsApp Us</span>
            <span className="sm:hidden">Chat</span>
          </Button>
        </div>
      </FadeIn>
    </div>
  );
}
