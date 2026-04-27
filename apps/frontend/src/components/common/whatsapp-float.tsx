"use client";

import { useState } from "react";
import { Send, X, MapPin, School, BookOpen, User, Layers, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { trackEvent } from "@/lib/tracking";
import { cn } from "@/lib/utils";

export function WhatsAppFloat() {
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({
    location: "",
    board: "",
    school: "",
    grade: "",
    subject: "",
    message: ""
  });

  const phoneNumber = "919582706764";

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();

    const fullMessage = `Hi BoardPe Focus Team, I'm looking for a tutor.

Location: ${form.location || "Not specified"}
Board: ${form.board || "Not specified"}
School: ${form.school || "Not specified"}
Grade: ${form.grade || "Not specified"}
Subject: ${form.subject || "Not specified"}
Inquiry: ${form.message || "I would like to book a free demo."}`;

    const encodedMessage = encodeURIComponent(fullMessage);
    trackEvent("whatsapp_float_send", {
      board: form.board,
      grade: form.grade,
      subject: form.subject,
      school: form.school,
      location: form.location,
    });
    window.open(`https://wa.me/${phoneNumber}?text=${encodedMessage}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setForm({ location: "", board: "", school: "", grade: "", subject: "", message: "" });
  };

  const boards = ["IB DP", "IB MYP", "IGCSE", "CBSE", "ISC", "ICSE", "Cambridge Lower Secondary"];

  return (
    <div className="pointer-events-none fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-[100] flex flex-col items-end gap-4">
      {/* Inquiry Popup */}
      <div
        className={cn(
          "pointer-events-auto",
          "bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-border/40 p-5 sm:p-7 w-[calc(100vw-2rem)] sm:w-[24rem] transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1) transform origin-bottom-right max-h-[85vh] overflow-y-auto custom-scrollbar",
          isOpen ? "scale-100 opacity-100 translate-y-0" : "scale-90 opacity-0 translate-y-10 pointer-events-none"
        )}
      >
        <div className="flex items-center justify-between mb-4 sm:mb-6 border-b border-border/50 pb-4 sm:pb-5 sticky top-0 bg-white z-20">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="relative">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
                <User className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full bg-green-500 border-2 border-white animate-pulse" />
            </div>
            <div>
              <span className="block font-black text-primary text-sm sm:text-base uppercase tracking-tight">Home Tutor Advisor</span>
              <span className="block text-[10px] font-black text-green-600 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> Online Now
              </span>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full hover:bg-slate-50 flex items-center justify-center text-muted-foreground hover:text-primary transition-all"
            aria-label="Close WhatsApp form"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <p className="text-[10px] sm:text-[11px] font-bold text-slate-500 mb-5 sm:mb-6 leading-relaxed uppercase tracking-wide">
          Connect with Gurugram's top home tutors in seconds.
        </p>

        <form onSubmit={handleSend} className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="relative group">
              <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="Location"
                aria-label="Location"
                className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50 focus-visible:bg-white text-xs font-bold"
              />
            </div>
            <div className="relative group">
              <BookOpen className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors z-10" />
              <select
                value={form.board}
                onChange={(e) => setForm({ ...form, board: e.target.value })}
                aria-label="Board"
                className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-100 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-accent/20 text-xs font-bold appearance-none transition-all cursor-pointer text-slate-700"
              >
                <option value="" disabled>Select Board</option>
                {boards.map((board) => (
                  <option key={board} value={board}>{board}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="relative group">
            <School className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              value={form.school}
              onChange={(e) => setForm({ ...form, school: e.target.value })}
              placeholder="School Name (e.g. The Heritage)"
              aria-label="School name"
              className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50 focus-visible:bg-white text-xs font-bold"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="relative group">
              <Layers className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                value={form.grade}
                onChange={(e) => setForm({ ...form, grade: e.target.value })}
                placeholder="Grade"
                aria-label="Grade"
                className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50 focus-visible:bg-white text-xs font-bold"
              />
            </div>
            <div className="relative group">
              <BookOpen className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
              <Input
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                placeholder="Subject"
                aria-label="Subject"
                className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50 focus-visible:bg-white text-xs font-bold"
              />
            </div>
          </div>

          <div className="relative group">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
            <Input
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?"
              aria-label="How can we help?"
              className="pl-10 h-11 rounded-xl border-slate-100 bg-slate-50 focus-visible:bg-white text-xs font-bold"
            />
          </div>

          <Button type="submit" className="w-full h-12 sm:h-14 bg-[#25D366] hover:bg-[#20ba59] text-white rounded-2xl gap-3 font-black uppercase tracking-widest text-[10px] sm:text-[11px] shadow-2xl shadow-green-500/20 transition-all active:scale-95 group/btn">
            <Send className="w-4 h-4 group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
            Start WhatsApp Chat
          </Button>
        </form>
      </div>

      {/* Floating Button */}
      <button
        onClick={() => {
          const nextOpen = !isOpen;
          setIsOpen(nextOpen);
          trackEvent("whatsapp_float_toggle", { open: nextOpen });
        }}
        aria-label={isOpen ? "Close WhatsApp form" : "Open WhatsApp form"}
        aria-expanded={isOpen}
        className={cn(
          "pointer-events-auto",
          "w-14 h-14 sm:w-18 sm:h-18 rounded-full shadow-[0_15px_40px_rgba(37,211,102,0.4)] flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 group relative border-4 border-white",
          isOpen ? "bg-primary text-white" : "bg-[#25D366] text-white"
        )}
      >
        {isOpen ? (
          <X className="w-7 h-7 sm:w-10 sm:h-10" />
        ) : (
          <div className="relative">
             <svg 
               viewBox="0 0 24 24" 
               className="w-7 h-7 sm:w-9 sm:h-9" 
               fill="currentColor"
             >
               <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
             </svg>
             <span className="absolute -top-0.5 -right-0.5 sm:-top-1 sm:-right-1 w-3 h-3 sm:w-4 sm:h-4 bg-red-500 rounded-full border-2 border-[#25D366] animate-bounce" />
          </div>
        )}

        {!isOpen && (
          <div className="absolute right-full mr-6 bg-white px-6 py-3.5 rounded-2xl shadow-2xl border border-border/50 whitespace-nowrap text-primary font-black uppercase tracking-widest text-[11px] pointer-events-none opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 hidden sm:block">
            Need Expert Help? Chat Now
          </div>
        )}
      </button>

      <style jsx>{`
        .w-18 { width: 4.5rem; }
        .h-18 { height: 4.5rem; }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0,0,0,0.05);
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}
