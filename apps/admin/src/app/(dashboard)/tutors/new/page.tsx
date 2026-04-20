"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  ArrowLeft, Save, User, BookOpen, School, 
  MapPin, Image as ImageIcon, Sparkles, Star,
  ShieldCheck, CheckCircle2, X
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function NewTutorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    slug: "",
    tagline: "",
    about: "",
    methodology: "",
    experienceYrs: 0,
    studentsTaught: 0,
    boards: [] as string[],
    subjects: [] as string[],
    locations: [] as string[],
    isVerified: true,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Saving Tutor Profile:", formData);
      setLoading(false);
      router.push("/dashboard/tutors");
    }, 1500);
  };

  const toggleItem = (list: string[], item: string, field: string) => {
    const newList = list.includes(item) 
      ? list.filter(i => i !== item) 
      : [...list, item];
    setFormData({ ...formData, [field]: newList });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-32">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/tutors" className="p-3 hover:bg-white rounded-2xl border border-transparent hover:border-slate-200 transition-all text-slate-400 hover:text-slate-600">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">Create Educator Profile</h1>
            <p className="text-slate-500 font-medium">Build a premium, high-converting tutor profile for the platform.</p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column: Main Info */}
        <div className="lg:col-span-2 space-y-10">
          <Card className="rounded-[2.5rem] border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
            <CardContent className="p-10 space-y-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <User className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">Personal Identity</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Full Name</label>
                  <input 
                    required
                    type="text" 
                    placeholder="e.g., Dr. Ananya Sharma" 
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value, slug: e.target.value.toLowerCase().replace(/ /g, '-') })}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Profile URL Slug</label>
                  <input 
                    type="text" 
                    placeholder="dr-ananya-sharma" 
                    className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-500 font-bold focus:ring-2 focus:ring-blue-500 transition-all"
                    value={formData.slug}
                    readOnly
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Tagline / Professional Summary</label>
                <input 
                  type="text" 
                  placeholder="e.g., Senior IB Physics Faculty with 12+ years of expertise" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.tagline}
                  onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Professional Biography</label>
                <textarea 
                  rows={6}
                  placeholder="Tell the student's journey and achievements..." 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-medium focus:ring-2 focus:ring-blue-500 transition-all leading-relaxed"
                  value={formData.about}
                  onChange={(e) => setFormData({ ...formData, about: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Teaching Philosophy</label>
                <textarea 
                  rows={4}
                  placeholder="How do you ensure student success?" 
                  className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-medium italic focus:ring-2 focus:ring-blue-500 transition-all"
                  value={formData.methodology}
                  onChange={(e) => setFormData({ ...formData, methodology: e.target.value })}
                />
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
            <CardContent className="p-10 space-y-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-lg shadow-emerald-500/30">
                  <BookOpen className="w-5 h-5" />
                </div>
                <h2 className="text-xl font-extrabold text-slate-900">Academic Expertise</h2>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1 block mb-3">Target Boards</label>
                  <div className="flex flex-wrap gap-2">
                    {["CBSE", "ICSE", "ISC", "IB DP", "IB MYP", "IGCSE", "Cambridge"].map(board => (
                      <button
                        key={board}
                        type="button"
                        onClick={() => toggleItem(formData.boards, board, 'boards')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                          formData.boards.includes(board)
                            ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"
                        }`}
                      >
                        {board}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1 block mb-3">Subjects Specialist</label>
                  <div className="flex flex-wrap gap-2">
                    {["Mathematics", "Physics", "Chemistry", "Biology", "Economics", "Accountancy", "English", "History"].map(sub => (
                      <button
                        key={sub}
                        type="button"
                        onClick={() => toggleItem(formData.subjects, sub, 'subjects')}
                        className={`px-4 py-2 rounded-xl text-sm font-bold transition-all border-2 ${
                          formData.subjects.includes(sub)
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-lg shadow-emerald-500/20"
                            : "bg-white border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600"
                        }`}
                      >
                        {sub}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Profile Settings */}
        <div className="space-y-10">
          <Card className="rounded-[2.5rem] border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
            <CardContent className="p-8 space-y-8">
              <div className="space-y-4">
                <div className="w-full aspect-square rounded-3xl bg-slate-100 border-4 border-white shadow-inner flex flex-col items-center justify-center text-slate-400 gap-3 group cursor-pointer hover:bg-slate-50 transition-all border-dashed border-slate-200">
                  <ImageIcon className="w-10 h-10 group-hover:scale-110 transition-transform" />
                  <p className="text-xs font-bold uppercase tracking-widest">Upload Photo</p>
                </div>
                <p className="text-[10px] text-center text-slate-400 font-medium uppercase tracking-tighter">Square JPG/PNG, Max 2MB</p>
              </div>

              <div className="space-y-6 pt-4">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-50 border border-blue-100">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-bold text-blue-900 uppercase tracking-tight">Verified Status</span>
                  </div>
                  <div 
                    onClick={() => setFormData({...formData, isVerified: !formData.isVerified})}
                    className={`w-12 h-6 rounded-full transition-all cursor-pointer relative ${formData.isVerified ? 'bg-blue-600' : 'bg-slate-300'}`}
                  >
                    <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${formData.isVerified ? 'right-1' : 'left-1'}`} />
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Years of Experience</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-bold focus:ring-2 focus:ring-blue-500"
                      value={formData.experienceYrs}
                      onChange={(e) => setFormData({...formData, experienceYrs: parseInt(e.target.value)})}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">Years</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest ml-1">Students Taught</label>
                  <div className="relative">
                    <input 
                      type="number" 
                      className="w-full p-4 rounded-2xl bg-slate-50 border-none text-slate-900 font-bold focus:ring-2 focus:ring-blue-500"
                      value={formData.studentsTaught}
                      onChange={(e) => setFormData({...formData, studentsTaught: parseInt(e.target.value)})}
                    />
                    <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">Plus</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-[2.5rem] border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden bg-white">
            <CardContent className="p-8 space-y-6">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-rose-500" />
                <h3 className="font-extrabold text-slate-900">Coverage Areas</h3>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {["DLF Phase 1", "DLF Phase 5", "Sushant Lok", "Golf Course Rd", "Sector 45", "Sector 56", "Sohna Road", "New Gurgaon"].map(loc => (
                  <button
                    key={loc}
                    type="button"
                    onClick={() => toggleItem(formData.locations, loc, 'locations')}
                    className={`px-3 py-2 rounded-xl text-[10px] font-bold uppercase tracking-tight transition-all border ${
                      formData.locations.includes(loc)
                        ? "bg-rose-50 border-rose-200 text-rose-600"
                        : "bg-white border-slate-100 text-slate-400 hover:border-slate-200"
                    }`}
                  >
                    {loc}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="sticky bottom-10 space-y-4 pt-4">
            <Button 
              disabled={loading}
              className="w-full h-16 rounded-3xl bg-blue-600 text-white hover:bg-blue-700 shadow-2xl shadow-blue-600/30 text-lg font-extrabold gap-3"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-6 h-6 fill-white/20" />
                  Publish Profile
                </>
              )}
            </Button>
            <Link href="/dashboard/tutors" className="block">
              <Button type="button" variant="outline" className="w-full h-12 rounded-2xl border-slate-200 text-slate-500 font-bold hover:bg-slate-50">
                Save as Draft
              </Button>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
