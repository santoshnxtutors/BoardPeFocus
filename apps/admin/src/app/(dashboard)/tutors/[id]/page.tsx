"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  GraduationCap,
  Award,
  School,
  BookOpen,
  MapPin,
  MessageSquare,
  Globe,
  ImageIcon,
  Plus,
  Trash2
} from "lucide-react";
import Link from "next/link";

const emptyTutor = {
  name: "",
  slug: "",
  displayName: "",
  email: "",
  phone: "",
  photoUrl: "",
  videoUrl: "",
  tagline: "",
  bio: "",
  about: "",
  methodology: "",
  teachingMethod: "",
  experienceYrs: 0,
  studentsTaught: 0,
  hourlyRateMin: "",
  hourlyRateMax: "",
  rating: 0,
  reviewsCount: 0,
  priority: 0,
  isFeatured: false,
  isVerified: true,
  status: "PUBLISHED",
  seoTitle: "",
  metaDescription: "",
  canonical: "",
  ogTitle: "",
  ogDescription: "",
  ogImage: "",
  boardIds: [],
  subjectIds: [],
  classLevelIds: [],
  schoolIds: [],
  sectorIds: [],
  societyIds: [],
  qualifications: [],
  achievements: [],
  faqs: [],
};

function relationIds(rows: any[], idKey: string, nestedKey?: string) {
  return (Array.isArray(rows) ? rows : [])
    .map((row) => row?.[idKey] ?? (nestedKey ? row?.[nestedKey]?.id : undefined))
    .filter(Boolean);
}

function normalizeTutorForForm(data: any) {
  return {
    ...emptyTutor,
    ...data,
    boardIds: relationIds(data.boards, "boardId", "board"),
    subjectIds: relationIds(data.subjects, "subjectId", "subject"),
    classLevelIds: relationIds(data.classes, "classLevelId", "classLevel"),
    schoolIds: relationIds(data.schools, "schoolId", "school"),
    sectorIds: (Array.isArray(data.locations) ? data.locations : [])
      .map((row: any) => row?.sectorId ?? row?.sector?.id)
      .filter(Boolean),
    societyIds: (Array.isArray(data.locations) ? data.locations : [])
      .map((row: any) => row?.societyId ?? row?.society?.id)
      .filter(Boolean),
    qualifications: Array.isArray(data.qualifications) ? data.qualifications : [],
    achievements: Array.isArray(data.achievements) ? data.achievements : [],
    faqs: Array.isArray(data.faqs) ? data.faqs : [],
  };
}

function cleanNumber(value: any) {
  if (value === "" || value === null || value === undefined) return undefined;
  const numericValue = Number(value);
  return Number.isFinite(numericValue) ? numericValue : undefined;
}

function cleanOptionalString(value: any) {
  if (value === undefined || value === null) return null;
  const normalized = String(value).trim();
  return normalized.length > 0 ? normalized : null;
}

function cleanSlug(value: any) {
  const normalized = cleanOptionalString(value);
  return normalized ?? undefined;
}

function buildTutorPayload(tutor: any) {
  return {
    name: tutor.name,
    slug: cleanSlug(tutor.slug),
    displayName: cleanOptionalString(tutor.displayName),
    email: cleanOptionalString(tutor.email),
    phone: cleanOptionalString(tutor.phone),
    photoUrl: cleanOptionalString(tutor.photoUrl),
    videoUrl: cleanOptionalString(tutor.videoUrl),
    tagline: cleanOptionalString(tutor.tagline),
    bio: cleanOptionalString(tutor.bio),
    about: cleanOptionalString(tutor.about),
    methodology: cleanOptionalString(tutor.methodology),
    teachingMethod: cleanOptionalString(tutor.teachingMethod),
    experienceYrs: cleanNumber(tutor.experienceYrs) ?? 0,
    studentsTaught: cleanNumber(tutor.studentsTaught) ?? 0,
    hourlyRateMin: cleanNumber(tutor.hourlyRateMin) ?? null,
    hourlyRateMax: cleanNumber(tutor.hourlyRateMax) ?? null,
    rating: cleanNumber(tutor.rating) ?? 0,
    reviewsCount: cleanNumber(tutor.reviewsCount) ?? 0,
    priority: cleanNumber(tutor.priority) ?? 0,
    isFeatured: Boolean(tutor.isFeatured),
    isVerified: Boolean(tutor.isVerified),
    status: tutor.status || "DRAFT",
    seoTitle: cleanOptionalString(tutor.seoTitle),
    metaDescription: cleanOptionalString(tutor.metaDescription),
    canonical: cleanOptionalString(tutor.canonical),
    ogTitle: cleanOptionalString(tutor.ogTitle),
    ogDescription: cleanOptionalString(tutor.ogDescription),
    ogImage: cleanOptionalString(tutor.ogImage),
    boardIds: tutor.boardIds ?? [],
    subjectIds: tutor.subjectIds ?? [],
    classLevelIds: tutor.classLevelIds ?? [],
    schoolIds: tutor.schoolIds ?? [],
    sectorIds: tutor.sectorIds ?? [],
    societyIds: tutor.societyIds ?? [],
    qualifications: (tutor.qualifications ?? [])
      .map((item: any) => ({
        degree: cleanOptionalString(item.degree),
        institution: cleanOptionalString(item.institution),
        year: cleanNumber(item.year),
      }))
      .filter((item: any) => item.degree && item.institution),
    achievements: (tutor.achievements ?? [])
      .map((item: any) => ({
        title: cleanOptionalString(item.title),
        description: cleanOptionalString(item.description),
        year: cleanNumber(item.year),
      }))
      .filter((item: any) => item.title),
    faqs: (tutor.faqs ?? [])
      .map((item: any, index: number) => ({
        question: cleanOptionalString(item.question),
        answer: cleanOptionalString(item.answer),
        order: cleanNumber(item.order) ?? index,
      }))
      .filter((item: any) => item.question && item.answer),
  };
}

export default function TutorDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tutor, setTutor] = useState<any>(emptyTutor);
  const [lookups, setLookups] = useState<Record<string, any[]>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [error, setError] = useState("");

  useEffect(() => {
    void loadLookups();
    if (id && id !== "new") {
      loadTutor(id as string);
    } else {
      setTutor(emptyTutor);
    }
  }, [id]);

  const loadLookups = async () => {
    try {
      const data = await api.lookups.list();
      setLookups(data as any);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load tutor lookup data.");
    }
  };

  const loadTutor = async (tutorId: string) => {
    try {
      const data = await api.tutors.get(tutorId);
      setTutor(normalizeTutorForForm(data));
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load tutor.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      if (!cleanOptionalString(tutor.name)) {
        throw new Error("Tutor name is required.");
      }
      const payload = buildTutorPayload(tutor);
      if (id === "new") {
        await api.tutors.create(payload);
      } else {
        await api.tutors.update(id as string, payload);
      }
      router.push("/dashboard/tutors");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save tutor.");
    } finally {
      setIsSaving(false);
    }
  };

  const updateTutor = (patch: Record<string, any>) => {
    setTutor((current: any) => ({ ...current, ...patch }));
  };

  const toggleRelation = (name: string, optionId: string) => {
    setTutor((current: any) => {
      const selected = Array.isArray(current[name]) ? current[name] : [];
      return {
        ...current,
        [name]: selected.includes(optionId)
          ? selected.filter((id: string) => id !== optionId)
          : [...selected, optionId],
      };
    });
  };

  const addCollectionItem = (name: "qualifications" | "achievements" | "faqs", item: any) => {
    setTutor((current: any) => ({
      ...current,
      [name]: [...(Array.isArray(current[name]) ? current[name] : []), item],
    }));
  };

  const updateCollectionItem = (name: "qualifications" | "achievements" | "faqs", index: number, patch: Record<string, any>) => {
    setTutor((current: any) => ({
      ...current,
      [name]: (Array.isArray(current[name]) ? current[name] : []).map((item: any, itemIndex: number) =>
        itemIndex === index ? { ...item, ...patch } : item,
      ),
    }));
  };

  const removeCollectionItem = (name: "qualifications" | "achievements" | "faqs", index: number) => {
    setTutor((current: any) => ({
      ...current,
      [name]: (Array.isArray(current[name]) ? current[name] : []).filter((_: any, itemIndex: number) => itemIndex !== index),
    }));
  };

  const tabs = [
    { id: "general", label: "General Info", icon: GraduationCap },
    { id: "content", label: "Long-form Content", icon: BookOpen },
    { id: "academic", label: "Academic & Experience", icon: Award },
    { id: "coverage", label: "Location Coverage", icon: MapPin },
    { id: "interactions", label: "Reviews & FAQs", icon: MessageSquare },
    { id: "seo", label: "SEO & Publish", icon: Globe },
  ];

  const renderRelationPicker = (
    name: string,
    label: string,
    lookupKey: "boards" | "classes" | "subjects" | "schools" | "sectors" | "societies",
    icon?: React.ReactNode,
  ) => {
    const options = lookups[lookupKey] ?? [];
    const selected = Array.isArray(tutor[name]) ? tutor[name] : [];

    return (
      <div className="space-y-2">
        <label className="text-xs font-black uppercase tracking-widest text-slate-400">{label}</label>
        <div className="max-h-52 overflow-y-auto rounded-2xl border border-slate-100 bg-slate-50 p-2">
          {options.length === 0 ? (
            <p className="p-3 text-xs font-medium text-slate-400">No options available.</p>
          ) : (
            options.map((option) => (
              <label key={option.id} className="flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-xs font-bold text-slate-600 hover:bg-white">
                <input
                  type="checkbox"
                  checked={selected.includes(option.id)}
                  onChange={() => toggleRelation(name, option.id)}
                />
                {icon}
                <span>{option.name ?? option.title ?? option.slug}</span>
              </label>
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-8 pb-32">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/tutors">
            <Button variant="ghost" size="icon" className="h-10 w-10 border border-slate-200 bg-white">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-black text-slate-900 uppercase tracking-tight">
                {id === "new" ? "Add New Tutor" : tutor.name}
              </h1>
              {tutor.status && (
                <Badge variant="outline" className={`uppercase text-[10px] font-black ${
                  tutor.status === 'PUBLISHED' ? "bg-green-50 text-green-700 border-green-200" : "bg-slate-100 text-slate-600 border-slate-200"
                }`}>
                  {tutor.status}
                </Badge>
              )}
            </div>
            <p className="text-sm text-slate-500">Manage high-fidelity profile data and eligibility.</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" className="font-bold border-slate-200 bg-white">
            <Eye className="mr-2 h-4 w-4" /> Preview Profile
          </Button>
          <Button 
            className="bg-primary hover:bg-primary/90 text-white font-bold px-8 shadow-xl shadow-primary/20"
            onClick={handleSave}
            disabled={isSaving}
          >
            <Save className="mr-2 h-4 w-4" /> {isSaving ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </div>

      {error && (
        <div className="rounded-xl border border-rose-100 bg-rose-50 p-4 text-sm font-medium text-rose-700">
          {error}
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="lg:w-64 shrink-0 space-y-1">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all text-left ${
                  activeTab === tab.id 
                    ? "bg-primary text-white shadow-lg shadow-primary/20 border-primary" 
                    : "text-slate-500 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <Icon className={`w-4 h-4 ${activeTab === tab.id ? "text-white" : "text-slate-400"}`} />
                {tab.label}
              </button>
            );
          })}
        </aside>

        <main className="flex-1 space-y-8">
          {activeTab === "general" && (
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Identity & Branding</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-start gap-8">
                    <div className="space-y-4">
                       <label className="text-xs font-black uppercase tracking-widest text-slate-400">Profile Photo</label>
                       <div className="w-32 h-32 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400 overflow-hidden relative group">
                         {tutor.photoUrl ? (
                           <img src={tutor.photoUrl} alt="Preview" className="w-full h-full object-cover" />
                         ) : (
                           <>
                             <ImageIcon className="w-8 h-8 mb-2" />
                             <span className="text-[10px] font-black uppercase">Upload</span>
                           </>
                         )}
                         <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <Button size="sm" variant="secondary" className="text-[10px] h-8">Change</Button>
                         </div>
                       </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Full Legal Name</label>
                          <Input 
                            value={tutor.name || ""} 
                            onChange={(e) => updateTutor({ name: e.target.value })}
                            className="bg-slate-50 border-slate-100 font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Public Display Name</label>
                          <Input 
                            value={tutor.displayName || ""} 
                            onChange={(e) => updateTutor({ displayName: e.target.value })}
                            className="bg-slate-50 border-slate-100"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Slug</label>
                          <Input
                            value={tutor.slug || ""}
                            onChange={(e) => updateTutor({ slug: e.target.value })}
                            placeholder="Auto-generated from name if blank"
                            className="bg-slate-50 border-slate-100 font-mono text-xs"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Profile Photo URL</label>
                          <Input
                            value={tutor.photoUrl || ""}
                            onChange={(e) => updateTutor({ photoUrl: e.target.value })}
                            className="bg-slate-50 border-slate-100"
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Email</label>
                          <Input
                            value={tutor.email || ""}
                            onChange={(e) => updateTutor({ email: e.target.value })}
                            className="bg-slate-50 border-slate-100"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Phone</label>
                          <Input
                            value={tutor.phone || ""}
                            onChange={(e) => updateTutor({ phone: e.target.value })}
                            className="bg-slate-50 border-slate-100"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Profile Tagline</label>
                        <Input 
                          value={tutor.tagline || ""} 
                          onChange={(e) => updateTutor({ tagline: e.target.value })}
                          placeholder="e.g. IB DP Physics Specialist | 10+ Years Results"
                          className="bg-slate-50 border-slate-100 font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Trust Indicators</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
                   <div className="space-y-4">
                      <div className="flex items-center justify-between">
                         <label className="text-xs font-black uppercase tracking-widest text-slate-400">Verification Status</label>
                         <Badge className={tutor.isVerified ? "bg-green-500" : "bg-slate-300"}>
                           {tutor.isVerified ? "VERIFIED" : "UNVERIFIED"}
                         </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-sm font-bold">Featured on Home Page</span>
                        <input 
                          type="checkbox" 
                          checked={tutor.isFeatured} 
                          onChange={(e) => updateTutor({ isFeatured: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-sm font-bold">Verified Tutor</span>
                        <input
                          type="checkbox"
                          checked={Boolean(tutor.isVerified)}
                          onChange={(e) => updateTutor({ isVerified: e.target.checked })}
                          className="w-5 h-5 rounded border-slate-300"
                        />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Experience (Yrs)</label>
                        <Input type="number" value={tutor.experienceYrs || 0} onChange={(e) => updateTutor({ experienceYrs: Number(e.target.value) || 0 })} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Students Taught</label>
                        <Input type="number" value={tutor.studentsTaught || 0} onChange={(e) => updateTutor({ studentsTaught: Number(e.target.value) || 0 })} />
                      </div>
                   </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "content" && (
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Long-form Narrative</CardTitle>
                  <CardDescription>Target 1500-2200 words for maximum SEO authority.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">About the Tutor</label>
                    <Textarea 
                      value={tutor.about || ""} 
                      onChange={(e) => updateTutor({ about: e.target.value })}
                      className="min-h-[250px] bg-slate-50 border-slate-100 focus:bg-white transition-all"
                      placeholder="Detailed professional journey, passion for teaching, and personal background..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Teaching Philosophy</label>
                    <Textarea 
                      value={tutor.teachingMethod || ""} 
                      onChange={(e) => updateTutor({ teachingMethod: e.target.value })}
                      className="min-h-[150px] bg-slate-50 border-slate-100"
                      placeholder="Core beliefs about education and student engagement..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Methodology & Approach</label>
                    <Textarea 
                      value={tutor.methodology || ""} 
                      onChange={(e) => updateTutor({ methodology: e.target.value })}
                      className="min-h-[150px] bg-slate-50 border-slate-100"
                      placeholder="Specific steps taken to ensure board success (Answer framing, rubric mapping, etc.)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "academic" && (
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Academic Mapping</CardTitle>
                  <CardDescription>Connect this tutor to boards, classes, and subjects used by public tutor discovery.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {renderRelationPicker("boardIds", "Boards Handled", "boards", <BookOpen className="w-3.5 h-3.5 text-slate-400" />)}
                  {renderRelationPicker("classLevelIds", "Classes Handled", "classes", <GraduationCap className="w-3.5 h-3.5 text-slate-400" />)}
                  {renderRelationPicker("subjectIds", "Subjects Handled", "subjects", <BookOpen className="w-3.5 h-3.5 text-slate-400" />)}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight">Qualifications</CardTitle>
                    <CardDescription>Saved to the tutor profile and used for publish-readiness.</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="font-bold border-slate-200 bg-white" onClick={() => addCollectionItem("qualifications", { degree: "", institution: "", year: "" })}>
                    <Plus className="mr-2 h-4 w-4" /> Add Qualification
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(tutor.qualifications ?? []).length === 0 ? (
                    <p className="text-sm text-slate-400">No qualifications added.</p>
                  ) : (
                    (tutor.qualifications ?? []).map((qualification: any, index: number) => (
                      <div key={qualification.id ?? index} className="grid grid-cols-[1fr_1fr_100px_40px] gap-3">
                        <Input value={qualification.degree ?? ""} onChange={(event) => updateCollectionItem("qualifications", index, { degree: event.target.value })} placeholder="Degree" />
                        <Input value={qualification.institution ?? ""} onChange={(event) => updateCollectionItem("qualifications", index, { institution: event.target.value })} placeholder="Institution" />
                        <Input type="number" value={qualification.year ?? ""} onChange={(event) => updateCollectionItem("qualifications", index, { year: event.target.value })} placeholder="Year" />
                        <Button variant="ghost" size="icon" className="h-10 w-10 hover:text-rose-600" onClick={() => removeCollectionItem("qualifications", index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight">Achievements</CardTitle>
                    <CardDescription>Optional profile proof points and recognitions.</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="font-bold border-slate-200 bg-white" onClick={() => addCollectionItem("achievements", { title: "", description: "", year: "" })}>
                    <Plus className="mr-2 h-4 w-4" /> Add Achievement
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {(tutor.achievements ?? []).length === 0 ? (
                    <p className="text-sm text-slate-400">No achievements added.</p>
                  ) : (
                    (tutor.achievements ?? []).map((achievement: any, index: number) => (
                      <div key={achievement.id ?? index} className="grid grid-cols-[1fr_1fr_100px_40px] gap-3">
                        <Input value={achievement.title ?? ""} onChange={(event) => updateCollectionItem("achievements", index, { title: event.target.value })} placeholder="Title" />
                        <Input value={achievement.description ?? ""} onChange={(event) => updateCollectionItem("achievements", index, { description: event.target.value })} placeholder="Description" />
                        <Input type="number" value={achievement.year ?? ""} onChange={(event) => updateCollectionItem("achievements", index, { year: event.target.value })} placeholder="Year" />
                        <Button variant="ghost" size="icon" className="h-10 w-10 hover:text-rose-600" onClick={() => removeCollectionItem("achievements", index)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "coverage" && (
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Location Intelligence</CardTitle>
                  <CardDescription>Select sectors and societies for hyper-local SEO relevance.</CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {renderRelationPicker("sectorIds", "Sectors Served", "sectors", <MapPin className="w-3.5 h-3.5 text-slate-400" />)}
                  {renderRelationPicker("societyIds", "Societies Served", "societies", <MapPin className="w-3.5 h-3.5 text-slate-400" />)}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">School Familiarity</CardTitle>
                  <CardDescription>Schools where students currently or previously attended.</CardDescription>
                </CardHeader>
                <CardContent>
                  {renderRelationPicker("schoolIds", "Schools", "schools", <School className="w-3.5 h-3.5 text-slate-400" />)}
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Metadata & Indexing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">SEO Title Tag</label>
                    <Input 
                      value={tutor.seoTitle || ""} 
                      onChange={(e) => updateTutor({ seoTitle: e.target.value })}
                      placeholder="Auto-generated if left blank"
                      className="bg-slate-50 border-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Meta Description</label>
                    <Textarea 
                      value={tutor.metaDescription || ""} 
                      onChange={(e) => updateTutor({ metaDescription: e.target.value })}
                      className="h-24 bg-slate-50 border-slate-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Publish State</label>
                      <select
                        value={tutor.status || "DRAFT"}
                        onChange={(e) => updateTutor({ status: e.target.value })}
                        className="h-10 w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm font-bold"
                      >
                        <option value="DRAFT">Draft</option>
                        <option value="PENDING_REVIEW">Pending Review</option>
                        <option value="PUBLISHED">Published</option>
                        <option value="ARCHIVED">Archived</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Canonical URL</label>
                      <Input value={tutor.canonical || ""} onChange={(e) => updateTutor({ canonical: e.target.value })} placeholder={`/tutors/${tutor.slug || "tutor-slug"}`} className="bg-slate-50 border-slate-100 font-mono text-xs" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Search Visibility</label>
                      <div className="flex items-center gap-4 pt-2">
                        <Badge className="bg-green-500">INDEXABLE</Badge>
                        <Badge variant="outline" className="border-slate-200">FOLLOW</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-primary/5 border border-primary/10 overflow-hidden">
                <CardContent className="p-8 flex items-center justify-between">
                  <div className="space-y-2">
                     <h4 className="font-black text-primary uppercase tracking-tight">Profile Eligibility Score</h4>
                     <p className="text-xs text-muted-foreground font-medium">Profile must score &gt; 80 for public indexing.</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <span className="text-4xl font-black text-primary">92%</span>
                    <Badge className="bg-green-500 mt-2">READY TO PUBLISH</Badge>
                  </div>
                </CardContent>
                <div className="h-1.5 w-full bg-slate-100">
                  <div className="h-full bg-primary w-[92%]"></div>
                </div>
              </Card>
            </div>
          )}

          {activeTab === "interactions" && (
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight">Tutor FAQs</CardTitle>
                    <CardDescription>Questions saved directly on this tutor profile and shown on the public tutor page.</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="font-bold border-slate-200 bg-white" onClick={() => addCollectionItem("faqs", { question: "", answer: "", order: (tutor.faqs ?? []).length })}>
                    <Plus className="mr-2 h-4 w-4" /> Add FAQ
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {(tutor.faqs ?? []).length === 0 ? (
                    <p className="text-sm text-slate-400">No tutor FAQs added.</p>
                  ) : (
                    (tutor.faqs ?? []).map((faq: any, index: number) => (
                      <div key={faq.id ?? index} className="rounded-2xl border border-slate-100 bg-slate-50 p-4 space-y-3">
                        <div className="grid grid-cols-[1fr_90px_40px] gap-3">
                          <Input value={faq.question ?? ""} onChange={(event) => updateCollectionItem("faqs", index, { question: event.target.value })} placeholder="Question" />
                          <Input type="number" value={faq.order ?? index} onChange={(event) => updateCollectionItem("faqs", index, { order: event.target.value })} placeholder="Order" />
                          <Button variant="ghost" size="icon" className="h-10 w-10 hover:text-rose-600" onClick={() => removeCollectionItem("faqs", index)}>
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                        <Textarea value={faq.answer ?? ""} onChange={(event) => updateCollectionItem("faqs", index, { answer: event.target.value })} placeholder="Answer" className="min-h-24 bg-white" />
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg font-black uppercase tracking-tight">Reviews</CardTitle>
                  <CardDescription>Reviews are moderated from the Results / Testimonials section.</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {(tutor.reviews ?? []).length === 0 ? (
                      <p className="text-sm text-slate-400">No tutor reviews found.</p>
                    ) : (
                      (tutor.reviews ?? []).map((review: any) => (
                        <Badge key={review.id} variant="outline" className="px-3 py-1.5 rounded-xl border-slate-200 bg-white text-slate-600">
                          {review.parentName} - {review.status}
                        </Badge>
                      ))
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
