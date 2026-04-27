"use client";

import React, { useEffect, useState } from "react";
import { StatsCard } from "@/components/shared/stats-card";
import { 
  Inbox, 
  GraduationCap, 
  FileCode, 
  CheckCircle2, 
  AlertCircle,
  Clock,
  FileText,
  Mail,
  Phone
} from "lucide-react";
import { api } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { TutorApplication } from "@boardpefocus/types";

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalTutors: 0,
    totalLeads: 0,
    activePages: 0,
    pendingReviews: 0,
  });
  const [recentLeads, setRecentLeads] = useState([
    { id: "fallback-1", name: "Lead queue unavailable", subject: "Pending sync", time: "Just now", status: "NEW" },
  ]);
  const [recentApplications, setRecentApplications] = useState<TutorApplication[]>([]);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [overview, leads, applications] = await Promise.all([
          api.stats.overview(),
          api.leads.list(),
          api.tutorApplications.list(),
        ]);
        setStats(overview);
        setRecentLeads(
          leads.slice(0, 3).map((lead) => ({
            id: lead.id,
            name: lead.name,
            subject: lead.subject || "General Inquiry",
            time: new Date(lead.createdAt).toLocaleDateString(),
            status: lead.status,
          })),
        );
        setRecentApplications(applications.slice(0, 3));
      } catch (error) {
        console.error("Failed to load dashboard overview:", error);
      }
    };

    void loadDashboard();
  }, []);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Overview</h1>
        <p className="text-sm text-slate-500">Welcome back! Here is what is happening with BoardPeFocus today.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard 
          title="Total Tutors" 
          value={stats.totalTutors} 
          icon={<GraduationCap />}
          trend={{ value: "+4 this month", isUp: true }}
          description="Qualified educators"
          href="/dashboard/tutors"
        />
        <StatsCard 
          title="Total Leads" 
          value={stats.totalLeads} 
          icon={<Inbox />}
          trend={{ value: "+12% vs last week", isUp: true }}
          description="Parent inquiries"
          href="/dashboard/leads"
        />
        <StatsCard 
          title="Active Pages" 
          value={stats.activePages} 
          icon={<FileCode />}
          description="SEO generated pages"
          href="/dashboard/pages"
        />
        <StatsCard 
          title="Pending Reviews" 
          value={stats.pendingReviews} 
          icon={<AlertCircle />}
          trend={{ value: "Action required", isUp: false }}
          description="Needs approval"
          href="/dashboard/reviews"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
              <Inbox className="w-5 h-5 text-primary" /> Recent Leads
            </CardTitle>
            <Link href="/dashboard/leads">
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold hover:bg-blue-100 cursor-pointer transition-colors">View All</Badge>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentLeads.map((lead) => (
              <Link key={lead.id} href={`/dashboard/leads`} className="block">
                <div className="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100 group">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black group-hover:bg-primary group-hover:text-white transition-all">
                      {lead.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm group-hover:text-primary transition-colors">{lead.name}</p>
                      <p className="text-[10px] text-slate-500 uppercase tracking-widest font-bold">{lead.subject} • {lead.time}</p>
                    </div>
                  </div>
                  <Badge className={lead.status === 'NEW' ? 'bg-rose-500' : 'bg-slate-500'}>{lead.status}</Badge>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary" /> Tutor Applications
            </CardTitle>
            <Link href="/dashboard/tutor-applications">
              <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-100 font-bold hover:bg-blue-100 cursor-pointer transition-colors">View All</Badge>
            </Link>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentApplications.length > 0 ? (
              recentApplications.map((application) => (
                <Link
                  key={application.id}
                  href={`/dashboard/tutor-applications/${application.id}`}
                  className="block"
                >
                  <div className="rounded-xl border border-transparent p-3 transition-colors hover:border-slate-100 hover:bg-slate-50">
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1">
                        <p className="text-sm font-bold text-slate-900">
                          {application.fullName}
                        </p>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {application.subjectsHandled.slice(0, 2).join(", ") || "Tutor application"}
                        </p>
                      </div>
                      <Badge className={application.status === "NEW" ? "bg-rose-500" : "bg-slate-500"}>
                        {application.status.replaceAll("_", " ")}
                      </Badge>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                      <span className="flex items-center gap-1">
                        <Phone className="h-3 w-3" /> {application.phone}
                      </span>
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" /> {application.email}
                      </span>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="rounded-xl border border-dashed border-slate-200 p-4 text-sm text-slate-500">
                New tutor applications will appear here as soon as the website form is submitted.
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="shadow-sm border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-green-500" /> System Health
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-widest text-slate-500">
                <span>Page Generation Progress</span>
                <span>85%</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-primary w-[85%] rounded-full shadow-lg shadow-primary/20"></div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Migration</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-700">24m ago</span>
                </div>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">API Status</p>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-xs font-bold text-slate-700">Healthy</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
