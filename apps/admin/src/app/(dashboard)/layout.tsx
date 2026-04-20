"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/shared/Sidebar";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { Bell, Search, HelpCircle, Settings, LogOut } from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="flex h-screen bg-[#F4F7FE] overflow-hidden">
      <Sidebar />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header - Synchronized with BoardPeFocus Theme */}
        <header className="h-16 bg-primary text-white shrink-0 flex items-center justify-between px-8 z-30 shadow-2xl relative">
          <div className="flex items-center">
            <Link href="/dashboard" className="flex items-baseline leading-none tracking-tight">
              <span className="text-white text-lg font-serif font-black">
                Board
              </span>
              <span className="text-white text-lg font-black mx-0.5">
                पे
              </span>
              <span className="text-accent text-lg font-serif font-black">
                Focus
              </span>
            </Link>
            <div className="h-4 w-[1px] bg-white/10 mx-4"></div>
            <span className="text-xs font-bold text-white/40 tracking-wide uppercase whitespace-nowrap">Command Center</span>
          </div>

          <div className="hidden lg:flex items-center justify-center gap-10 flex-1">
            <Link href="/dashboard/docs" className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors">Documentation</Link>
            <Link href="/dashboard/support" className="text-[11px] font-black uppercase tracking-widest text-white/50 hover:text-white transition-colors">Support</Link>
            <Link href="/dashboard/settings" className="text-[11px] font-black uppercase tracking-widest text-white transition-colors flex items-center gap-2 bg-white/10 px-4 py-2 rounded-xl border border-white/5">
              <Settings className="w-3.5 h-3.5" /> Setting
            </Link>
          </div>

          <div className="flex items-center gap-8">
            <Link href="/dashboard/users" className="flex items-center gap-3 hover:bg-white/5 p-1.5 pr-4 rounded-2xl transition-all duration-300 cursor-pointer group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 flex items-center justify-center text-[12px] font-black text-white shadow-lg shadow-orange-500/20 ring-2 ring-white/10 group-hover:ring-orange-400/50 transition-all">
                {user.name.charAt(0)}
              </div>
              <div className="text-left">
                <p className="text-[11px] font-black text-white uppercase tracking-wider leading-none group-hover:text-amber-400 transition-colors">{user.name}</p>
                <p className="text-[9px] font-bold text-white/40 uppercase tracking-widest mt-1">Super Admin</p>
              </div>
            </Link>

            <div className="h-8 w-[1px] bg-white/10"></div>

            <button 
              onClick={logout}
              className="group flex items-center gap-2.5 px-5 py-2.5 bg-black/20 hover:bg-rose-500/90 rounded-xl text-[10px] font-black uppercase tracking-widest text-white transition-all duration-300 border border-white/5 hover:border-rose-400/50 shadow-lg"
            >
              <LogOut className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Logout
            </button>
          </div>
        </header>

        {/* Sub-header for navigation context */}
        <div className="h-10 bg-white border-b border-slate-200 shrink-0 flex items-center px-8">
          <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            <Link href="/dashboard" className="hover:text-blue-600 cursor-pointer transition-colors">Admin</Link>
            <span className="text-slate-300">/</span>
            <span className="text-slate-600">Management</span>
            <span className="text-slate-300">/</span>
            <span className="text-blue-600">Active Panel</span>
          </div>
        </div>

        {/* Main View Area */}
        <main className="flex-1 overflow-y-auto custom-scrollbar bg-[#F4F7FE]">
          <div className="p-10 max-w-[1800px] mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
