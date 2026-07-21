"use client";

import { useState } from "react";
import Link from "next/link";
import { login } from "@/lib/actions";
import { Eye, EyeOff, Mail, Lock, Loader2, KeyRound, Terminal } from "lucide-react";

const DEMO_ACCOUNTS = [
  { label: "Administrator", email: "admin@hrms.gh", pass: "Admin@1234", color: "#EF4444" },
  { label: "HR Manager", email: "hr@hrms.gh", pass: "HR@12345", color: "#1E3A8A" },
  { label: "Applicant", email: "applicant@hrms.gh", pass: "App@1234", color: "#0F766E" },
];

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData();
    fd.set("email", email);
    fd.set("password", password);
    const result = await login(fd);
    if (result?.error) setError(result.error);
    setLoading(false);
  }

  return (
    <main className="min-h-screen auth-ambient-bg flex items-center justify-center p-4">
      <div className="absolute top-0 left-0 right-0 h-1 flex">
        <div className="flex-1 bg-[#EF4444]" />
        <div className="flex-1 bg-[#F59E0B]" />
        <div className="flex-1 bg-[#0F766E]" />
      </div>

      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex flex-col items-center gap-2">
            <div className="w-20 h-20">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <circle cx="50" cy="45" r="32" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 4" />
                <circle cx="50" cy="45" r="27" fill="none" stroke="#0F766E" strokeWidth="2.5" />
                <path d="M26 62 C 34 76, 66 76, 74 62 C 65 67, 35 67, 26 62" fill="#F59E0B" />
                <circle cx="50" cy="28" r="6" fill="#0F766E" />
                <rect x="42" y="37" width="16" height="13" rx="2.5" fill="#1E3A8A" />
                <path d="M46 37V34H54V37" fill="none" stroke="#1E3A8A" strokeWidth="2" />
                <circle cx="33" cy="41" r="4.5" fill="#0F766E" />
                <path d="M28.5 48C28.5 44.5 37.5 44.5 37.5 48" fill="#0F766E" />
                <circle cx="67" cy="41" r="4.5" fill="#0F766E" />
                <path d="M62.5 48C62.5 44.5 71.5 44.5 71.5 48" fill="#0F766E" />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">HRConnect</h1>
              <p className="text-sm font-bold text-[#F59E0B] uppercase tracking-widest">— Ghana —</p>
            </div>
          </Link>
          <p className="text-base text-slate-500 font-medium mt-2">Sign in to your portal</p>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-5 p-4 rounded-xl bg-red-50 border border-red-200 text-red-800 text-sm font-semibold flex items-start gap-3">
            <span className="text-lg mt-0.5">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Card */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  placeholder="name@organization.gh"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3.5 form-input-custom rounded-xl text-base font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-bold text-slate-700">Password</label>
                <Link href="#" className="text-sm font-semibold text-[#0F766E] hover:underline">Forgot password?</Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 form-input-custom rounded-xl text-base font-medium text-slate-800"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2.5 transition-all bg-[#0F766E] hover:bg-[#0b5e58] shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /> Verifying…</> : <><KeyRound className="w-5 h-5" /> Sign In to Portal</>}
            </button>
          </form>

          {/* Demo accounts */}
          <div className="mt-7 pt-6 border-t border-slate-100">
            <div className="flex items-center gap-2 mb-4">
              <Terminal className="w-4 h-4 text-slate-400" />
              <span className="text-sm font-bold text-slate-400 uppercase tracking-wider">Dev Quick Fill</span>
            </div>
            <div className="space-y-2.5">
              {DEMO_ACCOUNTS.map((acc) => (
                <button
                  key={acc.label}
                  type="button"
                  onClick={() => { setEmail(acc.email); setPassword(acc.pass); }}
                  className="w-full text-left p-3.5 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 transition-all flex items-center justify-between group"
                >
                  <div>
                    <p className="text-sm font-bold text-slate-800">{acc.label}</p>
                    <p className="text-sm text-slate-500 font-medium mt-0.5">{acc.email}</p>
                  </div>
                  <span
                    className="text-xs font-bold px-2.5 py-1 rounded-lg text-white"
                    style={{ backgroundColor: acc.color }}
                  >
                    Fill
                  </span>
                </button>
              ))}
            </div>
          </div>

          <p className="mt-6 text-center text-sm font-medium text-slate-500">
            New candidate?{" "}
            <Link href="/register" className="font-bold text-[#0F766E] hover:underline">Create an account</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
