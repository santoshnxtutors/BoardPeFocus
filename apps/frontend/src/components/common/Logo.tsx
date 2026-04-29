import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex flex-col group", className)}>
      <div className="flex items-baseline leading-none tracking-tight">
        <span className="text-2xl font-serif font-bold text-[#1e3a5f]">Board</span>
        <span
          className="mx-0.5 text-2xl font-bold text-[#1e3a5f]"
          style={{ fontFamily: "serif" }}
        >
          {"\u092a\u0947"}
        </span>
        <span className="text-2xl font-serif font-bold text-[#b56a00]">Focus</span>
      </div>
    </Link>
  );
}
