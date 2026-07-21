import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  Briefcase, Users, Calendar, UserCheck, Search,
  Bell, ArrowRight, ArrowUpRight, Clock,
} from "lucide-react";

const recentApplications = [
  { name: "Kwame Mensah", title: "Software Developer", date: "20 May 2025", status: "Pending", badge: "badge-pending" },
  { name: "Akosua Owusu", title: "HR Assistant", date: "19 May 2025", status: "Under Review", badge: "badge-interview" },
  { name: "Kofi Asante", title: "Network Engineer", date: "18 May 2025", status: "Interview", badge: "badge-interview" },
  { name: "Ama Boateng", title: "Accountant", date: "17 May 2025", status: "Pending", badge: "badge-pending" },
  { name: "Abena Sarpong", title: "Legal Counsel", date: "16 May 2025", status: "Selected", badge: "badge-selected" },
];

const upcomingInterviews = [
  { name: "Kwame Mensah", role: "Software Developer", date: "23 May", time: "10:00 AM" },
  { name: "Akosua Owusu", role: "HR Assistant", date: "24 May", time: "2:00 PM" },
  { name: "Abena Sarpong", role: "Legal Counsel", date: "25 May", time: "11:30 AM" },
];

const recentHires = [
  { name: "Ama Serwaa", dept: "IT Support", date: "20 May 2025" },
  { name: "John Doe", dept: "Finance", date: "19 May 2025" },
];

export default async function HRDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "HR") redirect("/login");

  const stats = [
    { value: "25", label: "Total Jobs", sub: "4 closing soon", icon: Briefcase, accent: "stat-accent-teal", iconBg: "bg-teal-50 text-teal-700 border-teal-100", href: "/hr/jobs" },
    { value: "320", label: "Applications", sub: "+18 today", icon: Users, accent: "stat-accent-blue", iconBg: "bg-blue-50 text-blue-700 border-blue-100", href: "/hr/applications" },
    { value: "18", label: "Interviews", sub: "5 this week", icon: Calendar, accent: "stat-accent-amber", iconBg: "bg-amber-50 text-amber-700 border-amber-100", href: "/hr/interviews" },
    { value: "150", label: "Employees", sub: "Active headcount", icon: UserCheck, accent: "stat-accent-green", iconBg: "bg-emerald-50 text-emerald-700 border-emerald-100", href: "/hr/employees" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">HR Recruitment Hub</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Dashboard</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Welcome back, {session.user.name}. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="/hr/jobs"
            className="flex items-center gap-2 px-4 py-2.5 bg-[#0F766E] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0b5e58] transition-all">
            + New Vacancy
          </a>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 stagger">
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
        {/* Recent Applications Table */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-extrabold text-slate-900">Recent Applications</h3>
            <a href="/hr/applications" className="text-sm font-bold text-[#0F766E] hover:underline flex items-center gap-1">
              View all <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Applicant</th>
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider">Position</th>
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider hidden sm:table-cell">Date</th>
                  <th className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {recentApplications.map((app) => (
                  <tr key={app.name} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 pr-3">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-sm font-bold text-slate-700 shrink-0">
                          {app.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-800">{app.name}</span>
                      </div>
                    </td>
                    <td className="py-3.5 pr-3 text-sm font-medium text-slate-500">{app.title}</td>
                    <td className="py-3.5 pr-3 text-sm font-medium text-slate-400 hidden sm:table-cell">{app.date}</td>
                    <td className="py-3.5 text-right">
                      <span className={`badge ${app.badge}`}>{app.status}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right column */}
        <div className="space-y-5">
          {/* Upcoming Interviews */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-slate-900">Upcoming Interviews</h3>
              <a href="/hr/interviews" className="text-sm font-bold text-[#0F766E] hover:underline">View all</a>
            </div>
            <div className="space-y-3">
              {upcomingInterviews.map((iv) => (
                <div key={iv.name} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{iv.name}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{iv.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-[#0F766E]">{iv.date}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{iv.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Hires */}
          <div className="card p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-extrabold text-slate-900">Recent Hires</h3>
              <a href="/hr/employees" className="text-sm font-bold text-[#0F766E] hover:underline">View all</a>
            </div>
            <div className="space-y-3">
              {recentHires.map((h) => (
                <div key={h.name} className="flex justify-between items-center p-3 rounded-xl bg-slate-50 hover:bg-slate-100 transition-colors border border-slate-100">
                  <div>
                    <p className="text-sm font-bold text-slate-800">{h.name}</p>
                    <p className="text-xs font-medium text-slate-500 mt-0.5">{h.dept}</p>
                  </div>
                  <p className="text-xs font-medium text-slate-400">{h.date}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
