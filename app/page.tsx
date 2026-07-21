import Link from "next/link";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { BadgeCheck, Briefcase, Users, UserPlus, FileCheck, ArrowRight, CheckCircle2, Star } from "lucide-react";

export default async function HomePage() {
  const session = await auth();
  if (session) {
    const role = (session.user as { role?: string })?.role;
    if (role === "ADMIN") redirect("/admin");
    if (role === "HR") redirect("/hr");
    redirect("/applicant");
  }

  return (
    <main className="min-h-screen bg-white flex flex-col relative overflow-hidden">
      {/* Ghana flag top stripe */}
      <div className="w-full h-1.5 flex shrink-0">
        <div className="flex-1 bg-[#EF4444]" />
        <div className="flex-1 bg-[#F59E0B]" />
        <div className="flex-1 bg-[#0F766E]" />
      </div>

      {/* Subtle background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_10%_20%,rgba(15,118,110,0.05)_0%,transparent_50%),radial-gradient(circle_at_90%_80%,rgba(30,58,138,0.04)_0%,transparent_50%)] pointer-events-none" />

      {/* Navbar */}
      <nav className="w-full max-w-7xl mx-auto px-6 py-5 flex items-center justify-between z-10">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 shrink-0">
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
            <p className="font-extrabold text-slate-900 text-lg tracking-tight leading-none">HRConnect</p>
            <p className="text-[#F59E0B] font-extrabold text-xs uppercase tracking-widest mt-0.5">Ghana</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/login" className="text-base font-semibold text-slate-700 hover:text-[#0F766E] transition-colors">
            Sign In
          </Link>
          <Link
            href="/register"
            className="px-5 py-2.5 rounded-xl text-base font-bold text-white bg-[#0F766E] hover:bg-[#0b5e58] transition-all shadow-md"
          >
            Apply Now
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center px-6 pt-10 pb-20 z-10 max-w-5xl mx-auto w-full text-center">
        {/* Live badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-50 border border-teal-100 mb-8 text-sm font-bold text-teal-800">
          <span className="w-2 h-2 rounded-full bg-[#0F766E] animate-pulse" />
          Phase 1 Live – Foundation Complete
        </div>

        {/* Headline */}
        <h1 className="text-5xl sm:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1] max-w-3xl">
          Connecting Talent.<br />
          <span style={{ color: "#0F766E" }}>Building Futures.</span>
        </h1>

        <p className="text-lg text-slate-500 font-medium mt-6 max-w-2xl leading-relaxed">
          HRConnect Ghana is a comprehensive HR Management System built for Ghanaian organizations —
          from vacancy creation to onboarding, fully compliant with local regulatory standards.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <Link
            href="/register"
            className="px-8 py-4 rounded-2xl font-bold text-white text-base bg-[#0F766E] hover:bg-[#0b5e58] transition-all shadow-lg flex items-center gap-2"
          >
            Create Candidate Account <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/login"
            className="px-8 py-4 rounded-2xl font-bold text-slate-700 text-base bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm flex items-center gap-2"
          >
            Manager / Staff Login
          </Link>
        </div>

        {/* Trust row */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-10 text-sm font-semibold text-slate-400">
          {["Role-based Access", "Secure Auth (NextAuth v5)", "Ghana Card Ready", "Open Source"].map((t) => (
            <span key={t} className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#0F766E]" /> {t}
            </span>
          ))}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 w-full text-left">
          {[
            {
              icon: <UserPlus className="w-6 h-6 text-[#0F766E]" />,
              title: "Candidate Registry",
              desc: "Fast onboarding with email registration, secure credentials, and instant role-based access to the applicant dashboard.",
              phase: "Phase 1 ✓",
            },
            {
              icon: <Briefcase className="w-6 h-6 text-[#1E3A8A]" />,
              title: "Job & Application Hub",
              desc: "HR managers can create vacancies, review CVs, and manage the full recruitment pipeline from a single interface.",
              phase: "Phase 2–3",
            },
            {
              icon: <FileCheck className="w-6 h-6 text-[#F59E0B]" />,
              title: "Ghana Compliance",
              desc: "Dedicated fields for NIA Ghana Card, SSNIT numbers, and local bank details — ready for payroll and formal onboarding.",
              phase: "Phase 6",
            },
          ].map((f) => (
            <div key={f.title} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col">
              <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-5">
                {f.icon}
              </div>
              <h3 className="text-lg font-extrabold text-slate-900 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 font-medium leading-relaxed flex-1">{f.desc}</p>
              <p className="text-sm font-bold text-[#0F766E] mt-4 pt-4 border-t border-slate-100">{f.phase}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full max-w-7xl mx-auto py-8 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between px-6 gap-3">
        <p className="text-sm font-semibold text-slate-400">© {new Date().getFullYear()} HRConnect Ghana. All Rights Reserved.</p>
        <div className="flex items-center gap-1.5 text-sm font-bold text-[#0F766E]">
          <BadgeCheck className="w-4 h-4" /> Secure Development Environment
        </div>
      </footer>
    </main>
  );
}
