"use client";

import React, { useEffect, useState } from "react";
import { DataTable } from "@/components/shared/data-table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  CheckCircle, 
  XCircle,
  Eye
} from "lucide-react";
import { api } from "@/lib/api";
import { Tutor } from "@boardpefocus/types";
import Link from "next/link";

export default function TutorsPage() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = async () => {
    setIsLoading(true);
    try {
      const data = await api.tutors.list();
      setTutors(data);
    } catch (error) {
      console.error("Failed to load tutors:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: "Tutor",
      accessorKey: "name",
      cell: (tutor: Tutor) => (
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-200 overflow-hidden">
            {tutor.photoUrl ? (
              <img src={tutor.photoUrl} alt={tutor.name} className="h-full w-full object-cover" />
            ) : (
              <div className="h-full w-full flex items-center justify-center text-slate-400">
                {tutor.name.charAt(0)}
              </div>
            )}
          </div>
          <div>
            <p className="font-bold text-slate-900">{tutor.name}</p>
            <p className="text-xs text-slate-500">{tutor.slug}</p>
          </div>
        </div>
      ),
    },
    {
      header: "Experience",
      accessorKey: "experienceYrs",
      cell: (tutor: Tutor) => (
        <span>{tutor.experienceYrs} Years</span>
      ),
    },
    {
      header: "Rating",
      accessorKey: "rating",
      cell: (tutor: Tutor) => (
        <div className="flex items-center gap-1">
          <span className="font-bold">{tutor.rating}</span>
          <span className="text-slate-400 text-xs">({tutor.reviewsCount})</span>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (tutor: Tutor) => {
        const variants: Record<string, string> = {
          PUBLISHED: "bg-green-100 text-green-700 border-green-200",
          DRAFT: "bg-slate-100 text-slate-700 border-slate-200",
          PENDING_REVIEW: "bg-amber-100 text-amber-700 border-amber-200",
          ARCHIVED: "bg-rose-100 text-rose-700 border-rose-200",
        };
        return (
          <Badge variant="outline" className={variants[tutor.status]}>
            {tutor.status}
          </Badge>
        );
      },
    },
    {
      header: "Verified",
      accessorKey: "isVerified",
      cell: (tutor: Tutor) => (
        tutor.isVerified ? (
          <CheckCircle className="h-4 w-4 text-green-500" />
        ) : (
          <XCircle className="h-4 w-4 text-slate-300" />
        )
      ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Tutors</h1>
          <p className="text-sm text-slate-500">Manage your educator profiles and their visibility.</p>
        </div>
        <Link href="/dashboard/tutors/new">
          <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6">
            <Plus className="mr-2 h-4 w-4" />
            Add Tutor
          </Button>
        </Link>
      </div>

      <DataTable 
        columns={columns} 
        data={tutors} 
        isLoading={isLoading}
        searchPlaceholder="Search tutors by name or slug..."
        actions={(tutor) => (
          <div className="flex items-center justify-end gap-2">
            <Link href={`/dashboard/tutors/${tutor.id}`}>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Edit className="h-4 w-4 text-slate-500" />
              </Button>
            </Link>
            <Button variant="ghost" size="icon" className="h-8 w-8 hover:text-rose-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      />
    </div>
  );
}
