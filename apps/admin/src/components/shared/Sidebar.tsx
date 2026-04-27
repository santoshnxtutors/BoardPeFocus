"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  MapPin,
  FileText,
  Star,
  Settings,
  History,
  GraduationCap,
  School,
  Sparkles,
  Inbox,
  Image,
  Route,
  SearchCheck,
} from "lucide-react";

const menuItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Leads Inbox", icon: Inbox, href: "/dashboard/leads", badge: "New" },

  { type: "divider", label: "Educators & Content" },
  { label: "Tutors", icon: GraduationCap, href: "/dashboard/tutors" },
  {
    label: "Tutor Applications",
    icon: FileText,
    href: "/dashboard/tutor-applications",
  },
  { label: "Schools", icon: School, href: "/dashboard/schools" },
  { label: "Boards", icon: BookOpen, href: "/dashboard/boards" },
  { label: "Classes", icon: GraduationCap, href: "/dashboard/classes" },
  { label: "Subjects", icon: BookOpen, href: "/dashboard/subjects" },
  { label: "Sectors", icon: MapPin, href: "/dashboard/locations/sectors" },
  { label: "Societies", icon: MapPin, href: "/dashboard/locations/societies" },

  { type: "divider", label: "CMS & Intelligence" },
  { label: "Pages", icon: FileText, href: "/dashboard/pages" },
  { label: "Resources", icon: FileText, href: "/dashboard/resources" },
  {
    label: "Page Generator",
    icon: Sparkles,
    href: "/dashboard/page-generator",
  },
  { label: "SEO Metadata", icon: SearchCheck, href: "/dashboard/seo" },
  { label: "Redirects", icon: Route, href: "/dashboard/redirects" },
  { label: "Media Library", icon: Image, href: "/dashboard/media" },

  { type: "divider", label: "Interactions" },
  { label: "Reviews", icon: Star, href: "/dashboard/reviews" },
  { label: "FAQs", icon: BookOpen, href: "/dashboard/faqs" },

  { type: "divider", label: "System" },
  { label: "Users & Roles", icon: Users, href: "/dashboard/users" },
  { label: "Audit Logs", icon: History, href: "/dashboard/audit-logs" },
  { label: "Settings", icon: Settings, href: "/dashboard/settings" },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-primary text-white shrink-0 flex flex-col h-screen sticky top-0 border-r border-white/10 shadow-2xl">
      <div className="p-6 bg-black/10">
        <div className="flex flex-col">
          <Link
            href="/dashboard"
            className="flex items-baseline leading-none tracking-tight"
          >
            <span className="text-white text-2xl font-serif font-black">
              Board
            </span>
            <span className="text-white text-2xl font-black mx-0.5">पे</span>
            <span className="text-accent text-2xl font-serif font-black">
              Focus
            </span>
          </Link>
          <p className="text-[10px] font-black text-white/30 mt-1 uppercase tracking-widest">
            Super Admin Panel
          </p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-0.5 custom-scrollbar">
        {menuItems.map((item, i) => {
          if (item.type === "divider") {
            return (
              <p
                key={i}
                className="text-[9px] font-black text-slate-600 uppercase tracking-widest mt-6 mb-2 px-4"
              >
                {item.label}
              </p>
            );
          }

          const isActive =
            pathname === item.href || pathname?.startsWith(item.href + "/");
          const Icon = item.icon!;

          return (
            <Link
              key={i}
              href={item.href!}
              className={`flex items-center justify-between px-4 py-2.5 rounded-xl transition-all group ${
                isActive
                  ? "bg-white/10 text-white border-l-4 border-accent"
                  : "text-white/60 hover:text-white hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500 group-hover:text-slate-300"}`}
                />
                <span className="font-bold text-[13px]">{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-1.5 py-0.5 rounded-md bg-rose-600 text-[8px] font-black text-white uppercase tracking-tighter">
                  {item.badge}
                </span>
              )}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
