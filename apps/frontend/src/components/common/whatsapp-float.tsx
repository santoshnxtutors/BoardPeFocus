"use client";

import { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const phoneNumber = "919582706764"; // Based on previous contact info

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank");
    setIsOpen(false);
    setMessage("");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
      {/* Inquiry Popup */}
      <div 
        className={cn(
          "bg-white rounded-2xl shadow-2xl border border-border/50 p-4 w-72 transition-all duration-300 transform origin-bottom-right",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between mb-4 border-b border-border/50 pb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span className="font-bold text-primary text-sm">Academic Advisor</span>
          </div>
          <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-primary transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        
        <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
          Hi! 👋 How can we help you with your board preparation today?
        </p>
        
        <form onSubmit={handleSend} className="space-y-3">
          <Input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your inquiry..."
            className="rounded-xl border-muted focus-visible:ring-accent"
          />
          <Button type="submit" className="w-full bg-[#25D366] hover:bg-[#20ba59] text-white rounded-xl gap-2 font-bold shadow-lg shadow-green-500/20">
            <Send className="w-4 h-4" /> Start WhatsApp Chat
          </Button>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative",
          isOpen ? "bg-primary text-white" : "bg-[#25D366] text-white"
        )}
      >
        {isOpen ? (
          <X className="w-8 h-8" />
        ) : (
          <div className="relative">
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-bounce" />
            <span className="text-3xl">💬</span>
          </div>
        )}
        
        {!isOpen && (
          <div className="absolute right-full mr-4 bg-white px-4 py-2 rounded-xl shadow-xl border border-border/50 whitespace-nowrap text-primary font-bold text-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity translate-x-2 group-hover:translate-x-0">
            Need Help? Chat with us
          </div>
        )}
      </button>
    </div>
  );
}
