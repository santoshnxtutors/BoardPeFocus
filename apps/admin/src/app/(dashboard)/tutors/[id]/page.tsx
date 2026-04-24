"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { Tutor, TutorStatus } from "@boardpefocus/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  ExternalLink,
  GraduationCap,
  Award,
  School,
  BookOpen,
  MapPin,
  MessageSquare,
  Globe,
  ImageIcon,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function TutorDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [tutor, setTutor] = useState<any>({});
  const [isSaving, setIsSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [error, setError] = useState("");

  useEffect(() => {
    if (id && id !== "new") {
      loadTutor(id as string);
    }
  }, [id]);

  const loadTutor = async (tutorId: string) => {
    try {
      const data = await api.tutors.get(tutorId);
      setTutor(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to load tutor.");
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError("");
    try {
      if (id === "new") {
        await api.tutors.create(tutor);
      } else {
        await api.tutors.update(id as string, tutor);
      }
      router.push("/dashboard/tutors");
    } catch (error) {
      setError(error instanceof Error ? error.message : "Failed to save tutor.");
    } finally {
      setIsSaving(false);
    }
  };

  const tabs = [
    { id: "general", label: "General Info", icon: GraduationCap },
    { id: "content", label: "Long-form Content", icon: BookOpen },
    { id: "academic", label: "Academic & Experience", icon: Award },
    { id: "coverage", label: "Location Coverage", icon: MapPin },
    { id: "interactions", label: "Reviews & FAQs", icon: MessageSquare },
    { id: "seo", label: "SEO & Publish", icon: Globe },
  ];

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
                            onChange={(e) => setTutor({...tutor, name: e.target.value})}
                            className="bg-slate-50 border-slate-100 font-bold"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black uppercase tracking-widest text-slate-400">Public Display Name</label>
                          <Input 
                            value={tutor.displayName || ""} 
                            onChange={(e) => setTutor({...tutor, displayName: e.target.value})}
                            className="bg-slate-50 border-slate-100"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Profile Tagline</label>
                        <Input 
                          value={tutor.tagline || ""} 
                          onChange={(e) => setTutor({...tutor, tagline: e.target.value})}
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
                          onChange={(e) => setTutor({...tutor, isFeatured: e.target.checked})}
                          className="w-5 h-5 rounded border-slate-300"
                        />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100">
                        <span className="text-sm font-bold">Verified Tutor</span>
                        <input
                          type="checkbox"
                          checked={Boolean(tutor.isVerified)}
                          onChange={(e) => setTutor({...tutor, isVerified: e.target.checked})}
                          className="w-5 h-5 rounded border-slate-300"
                        />
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Experience (Yrs)</label>
                        <Input type="number" value={tutor.experienceYrs || 0} onChange={(e) => setTutor({...tutor, experienceYrs: Number(e.target.value) || 0})} />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black uppercase tracking-widest text-slate-400">Students Taught</label>
                        <Input type="number" value={tutor.studentsTaught || 0} onChange={(e) => setTutor({...tutor, studentsTaught: Number(e.target.value) || 0})} />
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
                      onChange={(e) => setTutor({...tutor, about: e.target.value})}
                      className="min-h-[250px] bg-slate-50 border-slate-100 focus:bg-white transition-all"
                      placeholder="Detailed professional journey, passion for teaching, and personal background..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Teaching Philosophy</label>
                    <Textarea 
                      value={tutor.teachingPhilosophy || ""} 
                      onChange={(e) => setTutor({...tutor, teachingPhilosophy: e.target.value})}
                      className="min-h-[150px] bg-slate-50 border-slate-100"
                      placeholder="Core beliefs about education and student engagement..."
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Methodology & Approach</label>
                    <Textarea 
                      value={tutor.methodology || ""} 
                      onChange={(e) => setTutor({...tutor, methodology: e.target.value})}
                      className="min-h-[150px] bg-slate-50 border-slate-100"
                      placeholder="Specific steps taken to ensure board success (Answer framing, rubric mapping, etc.)"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {activeTab === "coverage" && (
            <div className="space-y-6">
              <Card className="shadow-sm border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight">Location Intelligence</CardTitle>
                    <CardDescription>Select sectors and societies for hyper-local SEO relevance.</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="font-bold border-slate-200 bg-white">
                    <Plus className="mr-2 h-4 w-4" /> Add Location
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {/* Mocked relations for UI demonstration */}
                    {['Sector 42', 'Sector 54', 'DLF Phase 5', 'Aralias', 'Magnolias'].map(loc => (
                      <Badge key={loc} variant="secondary" className="px-3 py-1.5 rounded-xl border border-slate-100 bg-slate-50 text-slate-600 flex items-center gap-2">
                        {loc} <Trash2 className="w-3 h-3 cursor-pointer hover:text-rose-500" />
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-sm border-slate-200">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-lg font-black uppercase tracking-tight">School Familiarity</CardTitle>
                    <CardDescription>Schools where students currently or previously attended.</CardDescription>
                  </div>
                  <Button size="sm" variant="outline" className="font-bold border-slate-200 bg-white">
                    <Plus className="mr-2 h-4 w-4" /> Add School
                  </Button>
                </CardHeader>
                <CardContent>
                   <div className="flex flex-wrap gap-2">
                    {['The Heritage School', 'Shri Ram School', 'DPS International'].map(school => (
                      <Badge key={school} variant="outline" className="px-3 py-1.5 rounded-xl border-blue-100 bg-blue-50 text-blue-600 flex items-center gap-2 font-bold">
                        <School className="w-3.5 h-3.5" /> {school} <Trash2 className="w-3 h-3 cursor-pointer hover:text-rose-500" />
                      </Badge>
                    ))}
                  </div>
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
                      onChange={(e) => setTutor({...tutor, seoTitle: e.target.value})}
                      placeholder="Auto-generated if left blank"
                      className="bg-slate-50 border-slate-100"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-slate-400">Meta Description</label>
                    <Textarea 
                      value={tutor.seoDesc || ""} 
                      onChange={(e) => setTutor({...tutor, seoDesc: e.target.value})}
                      className="h-24 bg-slate-50 border-slate-100"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-slate-400">Publish State</label>
                      <select
                        value={tutor.status || "DRAFT"}
                        onChange={(e) => setTutor({...tutor, status: e.target.value})}
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
                      <Input value={`/tutors/${tutor.slug}`} disabled className="bg-slate-50 border-slate-100 font-mono text-xs" />
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
            <div className="flex flex-col items-center justify-center h-96 bg-slate-50 border-2 border-dashed border-slate-200 rounded-[3rem] text-center p-12">
               <div className="w-16 h-16 bg-white rounded-2xl shadow-xl flex items-center justify-center text-primary mb-6">
                 <MessageSquare className="w-8 h-8" />
               </div>
               <h3 className="text-xl font-black text-primary uppercase tracking-tight mb-2">Interactions Manager</h3>
               <p className="text-sm text-slate-500 max-w-sm mb-6">Manage verified reviews from parents and FAQs specifically answered by this tutor.</p>
               <div className="flex gap-4">
                 <Button className="bg-primary hover:bg-primary/90 text-white font-bold px-6">Add Review</Button>
                 <Button variant="outline" className="font-bold border-slate-200 bg-white">Add FAQ</Button>
               </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
