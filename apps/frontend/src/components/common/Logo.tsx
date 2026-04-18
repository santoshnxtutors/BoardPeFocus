import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex flex-col group", className)}>
      <div className="flex items-baseline leading-none tracking-tight">
        {/* "Board" in Navy Blue with Serif font */}
        <span className="text-[#1e3a5f] text-2xl font-serif font-bold">
          Board
        </span>
        
        {/* "पे" in Navy Blue Hindi Script */}
        <span className="text-[#1e3a5f] text-2xl font-bold mx-0.5" style={{ fontFamily: 'serif' }}>
          पे
        </span>

        {/* "Focus" in Gold/Orange with Serif font */}
        <span className="text-[#f5a623] text-2xl font-serif font-bold">
          Focus
        </span>
      </div>
    </Link>
  );
}
