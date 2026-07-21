"use client";

import { useState } from "react";
import Link from "next/link";
import { register } from "@/lib/actions";
import { Eye, EyeOff, Mail, Lock, User, Loader2, BadgePlus, CheckCircle2, Circle } from "lucide-react";

export default function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  const checks = [
    { label: "At least 8 characters", ok: password.length >= 8 },
    { label: "One uppercase letter", ok: /[A-Z]/.test(password) },
    { label: "One number", ok: /[0-9]/.test(password) },
  ];

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const fd = new FormData(e.currentTarget);
    const result = await register(fd);
    if (result?.error) setError(result.error);
    setLoading(false);
  }

  return (
    <main className="min-h-screen auth-ambient-bg flex items-center justify-center p-4 py-12">
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
          <p className="text-base text-slate-500 font-medium mt-2">Create your candidate profile</p>
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
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Kofi Mensah"
                  className="w-full pl-11 pr-4 py-3.5 form-input-custom rounded-xl text-base font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="kofi@example.com"
                  className="w-full pl-11 pr-4 py-3.5 form-input-custom rounded-xl text-base font-medium text-slate-800 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-12 py-3.5 form-input-custom rounded-xl text-base font-medium text-slate-800"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {/* Password strength */}
              <div className="mt-3 space-y-1.5">
                {checks.map((c) => (
                  <div key={c.label} className="flex items-center gap-2">
                    {c.ok
                      ? <CheckCircle2 className="w-4 h-4 text-[#0F766E] shrink-0" />
                      : <Circle className="w-4 h-4 text-slate-300 shrink-0" />}
                    <span className={`text-sm font-medium ${c.ok ? "text-[#0F766E]" : "text-slate-400"}`}>{c.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  name="confirmPassword"
                  type={showConfirm ? "text" : "password"}
                  required
                  placeholder="Repeat your password"
                  className="w-full pl-11 pr-12 py-3.5 form-input-custom rounded-xl text-base font-medium text-slate-800"
                />
                <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl font-bold text-white text-base flex items-center justify-center gap-2.5 transition-all bg-[#0F766E] hover:bg-[#0b5e58] shadow-md disabled:opacity-60 disabled:cursor-not-allowed mt-2"
            >
              {loading
                ? <><Loader2 className="w-5 h-5 animate-spin" /> Creating account…</>
                : <><BadgePlus className="w-5 h-5" /> Register Account</>}
            </button>
          </form>

          <p className="mt-6 text-center text-sm font-medium text-slate-500">
            Already have an account?{" "}
            <Link href="/login" className="font-bold text-[#0F766E] hover:underline">Sign in here</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
