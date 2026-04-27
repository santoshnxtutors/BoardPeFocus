"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  ExternalLink,
  Save,
  Send,
  ShieldCheck,
  UserCheck,
} from "lucide-react";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  buildTutorApplicationPayload,
  emptyTutorApplication,
  getTutorApplicationStatusClasses,
  normalizeTutorApplicationForForm,
  tutorApplicationStatusOptions,
} from "@/lib/tutor-applications";

function formatTimestamp(value?: string | null) {
  if (!value) return "Not yet";
  return new Date(value).toLocaleString();
}

export default function TutorApplicationDetailPage() {
  const params = useParams();
  const applicationId = params.id as string;
  const [application, setApplication] = useState<any>(emptyTutorApplication);
  const [lookups, setLookups] = useState<Record<string, any[]>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [isConverting, setIsConverting] = useState<"" | "DRAFT" | "PUBLISHED">(
    "",
  );
  const [error, setError] = useState("");

  useEffect(() => {
    void Promise.all([loadApplication(applicationId), loadLookups()]);
  }, [applicationId]);

  const loadApplication = async (id: string) => {
    try {
      const data = await api.tutorApplications.get(id);
      setApplication(normalizeTutorApplicationForForm(data));
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load tutor application.",
      );
    }
  };

  const loadLookups = async () => {
    try {
      const data = await api.lookups.list();
      setLookups(data as any);
    } catch (loadError) {
      setError(
        loadError instanceof Error
          ? loadError.message
          : "Failed to load lookup data.",
      );
    }
  };

  const updateApplication = (patch: Record<string, unknown>) => {
    setApplication((current: any) => ({ ...current, ...patch }));
  };

  const toggleRelation = (field: string, optionId: string) => {
    setApplication((current: any) => {
      const selected = Array.isArray(current[field]) ? current[field] : [];
      return {
        ...current,
        [field]: selected.includes(optionId)
          ? selected.filter((id: string) => id !== optionId)
          : [...selected, optionId],
      };
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      const payload = buildTutorApplicationPayload(application);
      const data = await api.tutorApplications.update(applicationId, payload);
      setApplication(normalizeTutorApplicationForForm(data));
    } catch (saveError) {
      setError(
        saveError instanceof Error
          ? saveError.message
          : "Failed to save tutor application.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatusChange = async (status: string) => {
    setError("");
    setIsSaving(true);
    try {
      const data = await api.tutorApplications.update(applicationId, {
        status,
      });
      setApplication(normalizeTutorApplicationForForm(data));
    } catch (statusError) {
      setError(
        statusError instanceof Error
          ? statusError.message
          : "Failed to update application status.",
      );
    } finally {
      setIsSaving(false);
    }
  };

  const handleConvert = async (tutorStatus: "DRAFT" | "PUBLISHED") => {
    const confirmationMessage =
      tutorStatus === "PUBLISHED"
        ? "Publish this approved application as a live tutor profile?"
        : "Convert this application into a draft tutor profile?";
    if (!window.confirm(confirmationMessage)) {
      return;
    }

    setError("");
    setIsConverting(tutorStatus);
    try {
      await api.tutorApplications.update(
        applicationId,
        buildTutorApplicationPayload(application),
      );
      const data = await api.tutorApplications.convert(
        applicationId,
        tutorStatus,
      );
      setApplication(normalizeTutorApplicationForForm(data));
    } catch (convertError) {
      setError(
        convertError instanceof Error
          ? convertError.message
          : "Failed to convert tutor application.",
      );
    } finally {
      setIsConverting("");
    }
  };

  const renderRelationPicker = (
    field: string,
    label: string,
    lookupKey:
      | "boards"
      | "classes"
      | "subjects"
      | "schools"
      | "sectors"
      | "societies",
  ) => {
    const options = lookups[lookupKey] ?? [];
    const selected = Array.isArray(application[field])
      ? application[field]
      : [];

    return (
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400">
          {label}
        </label>
        <div className="max-h-56 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-2">
          {options.length === 0 ? (
            <p className="p-3 text-xs font-medium text-slate-400">
              No options available.
            </p>
          ) : (
            options.map((option) => (
              <label
                key={option.id}
                className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 hover:bg-white"
              >
                <input
                  type="checkbox"
                  checked={selected.includes(option.id)}
                  onChange={() => toggleRelation(field, option.id)}
                />
                <span>{option.name ?? option.title ?? option.slug}</span>
              </label>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-24">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-4">
          <Link href="/dashboard/tutor-applications">
            <Button
              variant="ghost"
              size="icon"
              className="h-10 w-10 border border-slate-200 bg-white"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-2xl font-black uppercase tracking-tight text-slate-900">
                {application.fullName || "Tutor Application"}
              </h1>
              <Badge
                variant="outline"
                className={`font-black uppercase text-[10px] tracking-widest ${getTutorApplicationStatusClasses(
                  application.status,
                )}`}
              >
                {application.status?.replaceAll("_", " ")}
              </Badge>
            </div>
            <p className="text-sm text-slate-500">
              Review, edit, shortlist, approve, and convert this application
              into the live tutor system.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="outline"
            className="border-slate-200 bg-white font-bold"
            onClick={() => void handleStatusChange("SHORTLISTED")}
          >
            <UserCheck className="mr-2 h-4 w-4" />
            Shortlist
          </Button>
          <Button
            variant="outline"
            className="border-slate-200 bg-white font-bold"
            onClick={() => void handleStatusChange("APPROVED")}
          >
            <ShieldCheck className="mr-2 h-4 w-4" />
            Approve
          </Button>
          <Button
            className="bg-primary px-6 font-bold text-white hover:bg-primary/90"
            onClick={() => void handleSave()}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" />
            {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {error ? (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          {error}
        </div>
      ) : null}

      <div className="grid gap-8 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">
                Application profile
              </CardTitle>
              <CardDescription>
                These are the raw application fields submitted by the tutor
                candidate.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Full name
                </label>
                <Input
                  value={application.fullName || ""}
                  onChange={(event) =>
                    updateApplication({ fullName: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Phone
                </label>
                <Input
                  value={application.phone || ""}
                  onChange={(event) =>
                    updateApplication({ phone: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Email
                </label>
                <Input
                  value={application.email || ""}
                  onChange={(event) =>
                    updateApplication({ email: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Gender
                </label>
                <Input
                  value={application.gender || ""}
                  onChange={(event) =>
                    updateApplication({ gender: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  City
                </label>
                <Input
                  value={application.city || ""}
                  onChange={(event) =>
                    updateApplication({ city: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Current location / area
                </label>
                <Input
                  value={application.currentLocation || ""}
                  onChange={(event) =>
                    updateApplication({ currentLocation: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Experience years
                </label>
                <Input
                  type="number"
                  value={application.experienceYears || 0}
                  onChange={(event) =>
                    updateApplication({
                      experienceYears: Number(event.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Preferred mode
                </label>
                <select
                  value={application.preferredTeachingMode || ""}
                  onChange={(event) =>
                    updateApplication({
                      preferredTeachingMode: event.target.value,
                    })
                  }
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-medium"
                >
                  <option value="">Select mode</option>
                  <option value="home tuition">Home tuition</option>
                  <option value="online">Online</option>
                  <option value="both">Both</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Highest qualification
                </label>
                <Input
                  value={application.highestQualification || ""}
                  onChange={(event) =>
                    updateApplication({
                      highestQualification: event.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  University / institution
                </label>
                <Input
                  value={application.universityInstitution || ""}
                  onChange={(event) =>
                    updateApplication({
                      universityInstitution: event.target.value,
                    })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Fee min
                </label>
                <Input
                  type="number"
                  value={application.expectedFeeMin ?? ""}
                  onChange={(event) =>
                    updateApplication({ expectedFeeMin: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Fee max
                </label>
                <Input
                  type="number"
                  value={application.expectedFeeMax ?? ""}
                  onChange={(event) =>
                    updateApplication({ expectedFeeMax: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Availability
                </label>
                <Input
                  value={application.availability || ""}
                  onChange={(event) =>
                    updateApplication({ availability: event.target.value })
                  }
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">
                Teaching detail and supporting notes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Subjects handled
                  </label>
                  <Textarea
                    value={application.subjectsHandledText || ""}
                    onChange={(event) =>
                      updateApplication({
                        subjectsHandledText: event.target.value,
                      })
                    }
                    className="min-h-28 bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Boards handled
                  </label>
                  <Textarea
                    value={application.boardsHandledText || ""}
                    onChange={(event) =>
                      updateApplication({
                        boardsHandledText: event.target.value,
                      })
                    }
                    className="min-h-28 bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Classes handled
                  </label>
                  <Textarea
                    value={application.classesHandledText || ""}
                    onChange={(event) =>
                      updateApplication({
                        classesHandledText: event.target.value,
                      })
                    }
                    className="min-h-28 bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Areas willing to serve
                  </label>
                  <Textarea
                    value={application.areasWillingToServeText || ""}
                    onChange={(event) =>
                      updateApplication({
                        areasWillingToServeText: event.target.value,
                      })
                    }
                    className="min-h-28 bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Schools familiar with
                  </label>
                  <Textarea
                    value={application.schoolsFamiliarWithText || ""}
                    onChange={(event) =>
                      updateApplication({
                        schoolsFamiliarWithText: event.target.value,
                      })
                    }
                    className="min-h-28 bg-slate-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Language fluency
                  </label>
                  <Textarea
                    value={application.languageFluencyText || ""}
                    onChange={(event) =>
                      updateApplication({
                        languageFluencyText: event.target.value,
                      })
                    }
                    className="min-h-28 bg-slate-50"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Professional bio
                </label>
                <Textarea
                  value={application.professionalBio || ""}
                  onChange={(event) =>
                    updateApplication({ professionalBio: event.target.value })
                  }
                  className="min-h-32 bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Teaching approach
                </label>
                <Textarea
                  value={application.teachingApproach || ""}
                  onChange={(event) =>
                    updateApplication({ teachingApproach: event.target.value })
                  }
                  className="min-h-32 bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Board exam specialization
                </label>
                <Textarea
                  value={application.boardExamSpecialization || ""}
                  onChange={(event) =>
                    updateApplication({
                      boardExamSpecialization: event.target.value,
                    })
                  }
                  className="min-h-24 bg-slate-50"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Prior results / achievements
                </label>
                <Textarea
                  value={application.priorResults || ""}
                  onChange={(event) =>
                    updateApplication({ priorResults: event.target.value })
                  }
                  className="min-h-24 bg-slate-50"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">
                Supporting links and references
              </CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Resume URL
                </label>
                <Input
                  value={application.resumeUrl || ""}
                  onChange={(event) =>
                    updateApplication({ resumeUrl: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Profile photo URL
                </label>
                <Input
                  value={application.profilePhotoUrl || ""}
                  onChange={(event) =>
                    updateApplication({ profilePhotoUrl: event.target.value })
                  }
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Portfolio links
                </label>
                <Textarea
                  value={application.portfolioLinksText || ""}
                  onChange={(event) =>
                    updateApplication({
                      portfolioLinksText: event.target.value,
                    })
                  }
                  className="min-h-24 bg-slate-50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Supporting document URLs
                </label>
                <Textarea
                  value={application.supportingDocumentUrlsText || ""}
                  onChange={(event) =>
                    updateApplication({
                      supportingDocumentUrlsText: event.target.value,
                    })
                  }
                  className="min-h-24 bg-slate-50"
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  References / portfolio notes
                </label>
                <Textarea
                  value={application.referenceDetails || ""}
                  onChange={(event) =>
                    updateApplication({ referenceDetails: event.target.value })
                  }
                  className="min-h-24 bg-slate-50"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">
                Review workflow
              </CardTitle>
              <CardDescription>
                Move the application through screening stages and keep internal
                notes.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Status
                </label>
                <select
                  value={application.status || "NEW"}
                  onChange={(event) =>
                    updateApplication({ status: event.target.value })
                  }
                  className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold"
                >
                  {tutorApplicationStatusOptions.map((option) => (
                    <option key={option} value={option}>
                      {option.replaceAll("_", " ")}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                  Internal notes
                </label>
                <Textarea
                  value={application.adminNotes || ""}
                  onChange={(event) =>
                    updateApplication({ adminNotes: event.target.value })
                  }
                  className="min-h-36 bg-slate-50"
                />
              </div>
              <div className="grid gap-3 text-xs text-slate-500">
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <span className="font-black uppercase tracking-widest text-slate-400">
                    Submitted
                  </span>
                  <p className="mt-1 font-medium text-slate-700">
                    {formatTimestamp(application.createdAt)}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <span className="font-black uppercase tracking-widest text-slate-400">
                    Reviewed
                  </span>
                  <p className="mt-1 font-medium text-slate-700">
                    {formatTimestamp(application.reviewedAt)}
                  </p>
                </div>
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3">
                  <span className="font-black uppercase tracking-widest text-slate-400">
                    Published
                  </span>
                  <p className="mt-1 font-medium text-slate-700">
                    {formatTimestamp(application.publishedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">
                Tutor system mapping
              </CardTitle>
              <CardDescription>
                These mappings drive the safe conversion into the existing tutor
                module.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {renderRelationPicker(
                "mappedBoardIds",
                "Mapped Boards",
                "boards",
              )}
              {renderRelationPicker(
                "mappedSubjectIds",
                "Mapped Subjects",
                "subjects",
              )}
              {renderRelationPicker(
                "mappedClassLevelIds",
                "Mapped Classes",
                "classes",
              )}
              {renderRelationPicker(
                "mappedSchoolIds",
                "Mapped Schools",
                "schools",
              )}
              {renderRelationPicker(
                "mappedSectorIds",
                "Mapped Sectors",
                "sectors",
              )}
              {renderRelationPicker(
                "mappedSocietyIds",
                "Mapped Societies",
                "societies",
              )}
            </CardContent>
          </Card>

          <Card className="border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg font-black uppercase tracking-tight">
                Conversion and publish
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {application.publishedTutor ? (
                <div className="rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                  Linked tutor profile:{" "}
                  <Link
                    href={`/dashboard/tutors/${application.publishedTutor.id}`}
                    className="font-bold underline"
                  >
                    {application.publishedTutor.name}
                  </Link>
                </div>
              ) : (
                <div className="rounded-2xl border border-slate-100 bg-slate-50 px-4 py-3 text-sm text-slate-600">
                  No tutor profile has been created from this application yet.
                </div>
              )}

              <Button
                variant="outline"
                className="w-full justify-center border-slate-200 bg-white font-bold"
                onClick={() => void handleConvert("DRAFT")}
                disabled={isConverting !== ""}
              >
                <Send className="mr-2 h-4 w-4" />
                {isConverting === "DRAFT"
                  ? "Converting..."
                  : application.publishedTutor
                    ? "Sync to Draft Tutor Profile"
                    : "Convert to Draft Tutor Profile"}
              </Button>

              <Button
                className="w-full justify-center bg-primary font-bold text-white hover:bg-primary/90"
                onClick={() => void handleConvert("PUBLISHED")}
                disabled={isConverting !== ""}
              >
                <ExternalLink className="mr-2 h-4 w-4" />
                {isConverting === "PUBLISHED"
                  ? "Publishing..."
                  : application.publishedTutor
                    ? "Publish Linked Tutor Profile"
                    : "Publish Tutor Profile"}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="border-amber-200 bg-amber-50 font-bold text-amber-700 hover:bg-amber-100"
                  onClick={() => void handleStatusChange("REJECTED")}
                >
                  Reject
                </Button>
                <Button
                  variant="outline"
                  className="border-slate-200 bg-slate-50 font-bold text-slate-700 hover:bg-slate-100"
                  onClick={() => void handleStatusChange("ARCHIVED")}
                >
                  Archive
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
