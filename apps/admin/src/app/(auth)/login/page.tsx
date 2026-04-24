"use client";

import React, { useState } from "react";
import { useAuth } from "@/lib/auth-context";
import { Button } from "@/components/ui/button";
import { Lock, Mail, ChevronRight, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await login(email, password);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <div className="w-16 h-16 rounded-2xl bg-blue-600 mx-auto flex items-center justify-center text-3xl font-bold text-white shadow-xl shadow-blue-500/20 mb-6">
            BP
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Portal</h1>
          <p className="text-slate-500 mt-2">Sign in to manage BoardPeFocus platform.</p>
        </div>

        <div className="bg-white p-8 rounded-[2rem] border shadow-2xl shadow-slate-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-100 flex items-start gap-3 text-rose-600 text-sm">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <p className="font-medium">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@example.com"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="w-full pl-12 pr-4 py-3 bg-slate-50 border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                />
              </div>
            </div>

            <Button
              type="submit"
              disabled={loading}
              className="w-full h-12 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 shadow-lg shadow-blue-500/20 transition-all flex items-center justify-center gap-2 group"
            >
              {loading ? "Authenticating..." : "Sign In"}
              {!loading && <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
            </Button>
          </form>
        </div>

        <p className="text-center text-slate-400 text-sm mt-8">
          &copy; 2026 BoardPeFocus Operations. All rights reserved.
        </p>
      </div>
    </div>
  );
}
