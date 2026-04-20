"use client";

import React from "react";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Star, MessageSquare, CheckCircle2, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ReviewsPage() {
  const reviews = [
    { id: '1', author: 'Sanjay Malik', rating: 5, content: 'Excellent tutor found for IB Math.', status: 'PENDING', date: '2026-04-19' },
    { id: '2', author: 'Anita Rao', rating: 4, content: 'Good experience with the platform.', status: 'APPROVED', date: '2026-04-18' },
    { id: '3', author: 'Vikram Singh', rating: 5, content: 'IGCSE Physics content is top notch.', status: 'PENDING', date: '2026-04-17' },
  ];

  const columns = [
    {
      header: "Reviewer",
      accessorKey: "author",
      cell: (review: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-[10px] font-black">{review.author.charAt(0)}</div>
          <span className="font-bold text-slate-900">{review.author}</span>
        </div>
      ),
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: (review: any) => (
        <div className="flex items-center gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`w-3 h-3 ${i < review.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'}`} />
          ))}
        </div>
      ),
    },
    {
      header: "Content",
      accessorKey: "content",
      cell: (review: any) => (
        <p className="text-xs text-slate-500 max-w-md truncate">{review.content}</p>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (review: any) => (
        <Badge variant="outline" className={`text-[9px] font-black tracking-widest uppercase ${review.status === 'APPROVED' ? 'bg-green-50 text-green-600 border-green-100' : 'bg-amber-50 text-amber-600 border-amber-100'}`}>
          {review.status}
        </Badge>
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Review Moderation</h1>
        <p className="text-sm text-slate-500">Manage tutor reviews and platform feedback.</p>
      </div>

      <DataTable 
        columns={columns} 
        data={reviews}
        searchPlaceholder="Search reviews..."
        actions={(review) => (
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="h-8 text-green-600 font-bold hover:bg-green-50">
              <CheckCircle2 className="w-4 h-4 mr-1" /> Approve
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-rose-600 font-bold hover:bg-rose-50">
              <XCircle className="w-4 h-4 mr-1" /> Reject
            </Button>
          </div>
        )}
      />
    </div>
  );
}
