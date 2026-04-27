"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Mail, MapPin, Phone, RefreshCw } from "lucide-react";
import { TutorApplication } from "@boardpefocus/types";
import { api } from "@/lib/api";
import { DataTable } from "@/components/shared/data-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTutorApplicationStatusClasses } from "@/lib/tutor-applications";

const statusOptions = [
  "ALL",
  "NEW",
  "UNDER_REVIEW",
  "SHORTLISTED",
  "APPROVED",
  "REJECTED",
  "ARCHIVED",
  "PUBLISHED",
];

export default function TutorApplicationsPage() {
  const [applications, setApplications] = useState<TutorApplication[]>([]);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    void loadApplications(statusFilter);
  }, [statusFilter]);

  const loadApplications = async (status: string) => {
    setIsLoading(true);
    setError("");

    try {
      const data = await api.tutorApplications.list(
        status === "ALL" ? undefined : status,
      );
      setApplications(data);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load tutor applications.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const columns = [
    {
      header: "Applicant",
      accessorKey: "fullName",
      cell: (application: TutorApplication) => (
        <div className="space-y-1">
          <p className="font-bold text-slate-900">{application.fullName}</p>
          <div className="flex flex-wrap gap-3 text-[10px] font-black uppercase tracking-widest text-slate-400">
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {application.phone}
            </span>
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {application.email}
            </span>
          </div>
        </div>
      ),
    },
    {
      header: "Teaching Fit",
      accessorKey: "subjectsHandled",
      cell: (application: TutorApplication) => (
        <div className="space-y-1">
          <p className="text-sm font-bold text-slate-700">
            {(application.subjectsHandled ?? []).slice(0, 3).join(", ") ||
              "Not specified"}
          </p>
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            {(application.boardsHandled ?? []).join(", ") ||
              "No boards selected"}
          </p>
        </div>
      ),
    },
    {
      header: "Location",
      accessorKey: "city",
      cell: (application: TutorApplication) => (
        <div className="space-y-1 text-sm font-medium text-slate-600">
          <p className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {application.city}
          </p>
          <p className="text-xs text-slate-400">
            {application.currentLocation}
          </p>
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (application: TutorApplication) => (
        <Badge
          variant="outline"
          className={`font-black uppercase text-[9px] tracking-widest ${getTutorApplicationStatusClasses(
            application.status,
          )}`}
        >
          {application.status.replaceAll("_", " ")}
        </Badge>
      ),
    },
    {
      header: "Linked Tutor",
      accessorKey: "publishedTutor",
      cell: (application: TutorApplication) =>
        application.publishedTutor ? (
          <Link
            href={`/dashboard/tutors/${application.publishedTutor.id}`}
            className="text-sm font-bold text-primary hover:text-accent"
          >
            {application.publishedTutor.name}
          </Link>
        ) : (
          <span className="text-xs font-bold uppercase tracking-widest text-slate-400">
            Not converted
          </span>
        ),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
            Tutor Applications
          </h1>
          <p className="text-sm text-slate-500">
            Review incoming tutor onboarding applications and convert approved
            candidates into managed tutor profiles.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-slate-700"
          >
            {statusOptions.map((option) => (
              <option key={option} value={option}>
                {option === "ALL"
                  ? "All statuses"
                  : option.replaceAll("_", " ")}
              </option>
            ))}
          </select>
          <Button
            variant="outline"
            className="border-slate-200 bg-white font-bold"
            onClick={() => void loadApplications(statusFilter)}
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}

      <DataTable
        columns={columns}
        data={applications}
        isLoading={isLoading}
        searchPlaceholder="Search applications by name, email, phone, or subject..."
        actions={(application) => (
          <Link href={`/dashboard/tutor-applications/${application.id}`}>
            <Button variant="ghost" className="h-8 px-3 text-xs font-bold">
              Open
            </Button>
          </Link>
        )}
      />
    </div>
  );
}
