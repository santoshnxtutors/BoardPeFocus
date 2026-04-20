"use client";

import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Bell, Shield, Database, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SettingsPage() {
  const sections = [
    {
      title: "General Settings",
      description: "Configure your basic application preferences.",
      icon: Settings,
      items: ["Application Name", "Timezone", "Language", "Logo Management"]
    },
    {
      title: "User Management",
      description: "Manage admin users and their permissions.",
      icon: User,
      items: ["Roles & Permissions", "Active Sessions", "Invitation Links"]
    },
    {
      title: "System & API",
      description: "Manage system integrations and API keys.",
      icon: Database,
      items: ["API Keys", "Webhook Endpoints", "System Logs"]
    },
    {
      title: "Notifications",
      description: "Configure how you receive alerts and updates.",
      icon: Bell,
      items: ["Email Alerts", "In-app Notifications", "Slack Integration"]
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">System Settings</h1>
        <p className="text-sm text-slate-500">Configure the BoardPeFocus command center and platform preferences.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {sections.map((section, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm hover:shadow-md transition-all group">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 group-hover:bg-primary group-hover:text-white transition-all">
                <section.icon className="w-5 h-5" />
              </div>
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">{section.title}</CardTitle>
                <CardDescription className="text-xs">{section.description}</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer border border-transparent hover:border-slate-100 transition-all">
                    <span className="text-sm font-bold text-slate-600">{item}</span>
                    <Button variant="ghost" size="sm" className="h-7 text-[10px] font-black uppercase tracking-widest text-blue-600">Configure</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
