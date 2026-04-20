"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { HelpCircle, MessageSquare, Mail, Phone, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SupportPage() {
  const channels = [
    { title: "Chat Support", description: "Real-time help from our technical team.", icon: MessageSquare, action: "Open Chat" },
    { title: "Email Support", description: "Submit a ticket for complex issues.", icon: Mail, action: "Send Email" },
    { title: "Priority Call", description: "Available for Super Admins only.", icon: Phone, action: "Call Now" },
    { title: "Community", description: "Discuss with other platform admins.", icon: ExternalLink, action: "Join Discord" }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Support Center</h1>
        <p className="text-sm text-slate-500">Need help? Get in touch with the BoardPeFocus technical team.</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {channels.map((channel, idx) => (
          <Card key={idx} className="border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
                <channel.icon className="w-6 h-6" />
              </div>
              <div>
                <CardTitle className="text-lg font-black uppercase tracking-tight">{channel.title}</CardTitle>
                <p className="text-xs text-slate-500">{channel.description}</p>
              </div>
            </CardHeader>
            <CardContent>
              <Button className="w-full bg-slate-900 hover:bg-black text-white font-black uppercase tracking-widest text-[10px] py-6">
                {channel.action}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardHeader>
          <CardTitle className="text-sm font-black uppercase tracking-widest text-primary">Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-white rounded-xl border border-primary/10 shadow-sm">
                <HelpCircle className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-slate-900">How do I generate new curriculum pages?</p>
                  <p className="text-xs text-slate-500 mt-1">Navigate to the Page Generator section and select your target boards and subjects...</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
