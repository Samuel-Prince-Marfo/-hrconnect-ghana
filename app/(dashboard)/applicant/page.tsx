import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Briefcase, Clock, UserCheck, Building, MapPin,
  ArrowRight, ArrowUpRight, CheckCircle2, Circle,
} from "lucide-react";

const jobListings = [
  { title: "Junior Software Developer", comp: "Ghana Tech Hubs Ltd", loc: "Accra, Greater Accra", salary: "GH₵ 4,000–6,000 / mo" },
  { title: "Finance Associate", comp: "National Bank of Ghana", loc: "Kumasi, Ashanti Region", salary: "Negotiable" },
  { title: "Administrative Officer", comp: "Ghana Health Service", loc: "Takoradi, Western Region", salary: "GH₵ 3,500–5,000 / mo" },
];

const checklistItems = [
  { label: "Create account", done: true },
  { label: "Complete profile with bio & contacts (Phase 2)", done: false },
  { label: "Upload your CV document (Phase 2)", done: false },
  { label: "Apply to a job vacancy (Phase 2)", done: false },
];

export default async function ApplicantDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "APPLICANT") redirect("/login");

  const stats = [
    { value: "0", label: "Jobs Applied", sub: "Start applying in Phase 2", icon: Briefcase, accent: "stat-accent-teal", iconBg: "bg-teal-50 text-teal-700 border-teal-100", href: "/applicant/jobs" },
    { value: "0", label: "In Review", sub: "Awaiting HR feedback", icon: Clock, accent: "stat-accent-amber", iconBg: "bg-amber-50 text-amber-700 border-amber-100", href: "/applicant/applications" },
    { value: "15%", label: "Profile Complete", sub: "Upload CV to boost score", icon: UserCheck, accent: "stat-accent-blue", iconBg: "bg-blue-50 text-blue-700 border-blue-100", href: "/applicant/profile" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Welcome banner */}
      <div
        className="rounded-2xl p-8 text-white relative overflow-hidden shadow-md"
        style={{ background: "linear-gradient(135deg, #0b1e2d 0%, #0F766E 100%)" }}
      >
        <div className="absolute right-[-5%] top-[-10%] w-64 h-64 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <div>
            <p className="text-sm font-semibold text-teal-200 mb-2">Welcome to your workspace</p>
            <h2 className="text-2xl font-extrabold">Akwaaba, {session.user.name}! 👋</h2>
            <p className="text-base text-slate-300 font-medium mt-2 max-w-lg leading-relaxed">
              Your applicant dashboard is ready. Browse active vacancies, track your applications, and complete your profile to improve your match score.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a href="/applicant/jobs"
              className="px-5 py-3 rounded-xl text-sm font-bold transition-all bg-[#F59E0B] hover:bg-[#d97706] text-[#0b1e2d] shadow-md">
              Browse Job Openings
            </a>
            <a href="/applicant/profile"
              className="px-5 py-3 rounded-xl text-sm font-bold transition-all border border-white/20 bg-white/10 hover:bg-white/20 text-white">
              Setup Profile
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 stagger">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className={`dashboard-stat-card ${s.accent} p-5 animate-fade-in-up`}>
              <div className="flex items-center justify-between mb-4">
                <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${s.iconBg}`}>
                  <Icon className="w-5.5 h-5.5" />
                </div>
                <a href={s.href} className="text-slate-400 hover:text-[#0F766E] transition-colors">
                  <ArrowUpRight className="w-4.5 h-4.5" />
                </a>
              </div>
              <p className="text-3xl font-extrabold text-slate-900">{s.value}</p>
              <p className="text-sm font-bold text-slate-600 mt-1">{s.label}</p>
              <div className="mt-4 pt-3 border-t border-slate-100">
                <p className="text-xs text-slate-400 font-medium">{s.sub}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Job Listings */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-extrabold text-slate-900">Latest Vacancies</h3>
            <a href="/applicant/jobs" className="text-sm font-bold text-[#0F766E] hover:underline flex items-center gap-1">
              Browse all <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="space-y-3">
            {jobListings.map((job) => (
              <div key={job.title}
                className="p-4 rounded-xl border border-slate-100 bg-slate-50/30 hover:bg-slate-50 hover:border-slate-200 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex gap-3.5 items-start sm:items-center">
                  <div className="w-10 h-10 rounded-xl bg-white border border-slate-200 flex items-center justify-center shrink-0 shadow-sm text-slate-500">
                    <Building className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900">{job.title}</p>
                    <p className="text-sm font-medium text-slate-500 mt-0.5">{job.comp}</p>
                    <div className="flex items-center gap-1.5 text-xs font-medium text-slate-400 mt-1.5">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      <span>{job.loc}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between sm:justify-end gap-4 pt-3 sm:pt-0 border-t sm:border-0 border-slate-100">
                  <div className="text-left sm:text-right">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Salary</p>
                    <p className="text-sm font-bold text-slate-800 mt-0.5">{job.salary}</p>
                  </div>
                  <button className="px-4 py-2 bg-white border border-slate-200 hover:border-[#0F766E] hover:text-[#0F766E] text-slate-700 text-sm font-bold rounded-xl transition-all shadow-sm">
                    Apply
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Checklist */}
        <div className="card p-5 flex flex-col gap-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-4">Getting Started</h3>
            <div className="space-y-3.5">
              {checklistItems.map((item) => (
                <div key={item.label} className="flex items-start gap-3">
                  {item.done
                    ? <CheckCircle2 className="w-5 h-5 text-[#0F766E] shrink-0 mt-0.5" />
                    : <Circle className="w-5 h-5 text-slate-300 shrink-0 mt-0.5" />}
                  <span className={`text-sm font-semibold leading-snug ${item.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-auto p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
            <span className="text-2xl">🇬🇭</span>
            <div>
              <p className="text-sm font-bold text-amber-800">Ghana Compliance</p>
              <p className="text-sm text-amber-700 font-medium mt-1 leading-relaxed">
                Your NIA Ghana Card and SSNIT details will be captured during onboarding in Phase 6.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
