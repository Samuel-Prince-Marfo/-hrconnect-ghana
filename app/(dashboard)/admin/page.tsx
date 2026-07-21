import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import {
  ShieldAlert as ShieldIcon,
  Users, Building, Key, Database,
  ArrowRight, ArrowUpRight, Activity,
} from "lucide-react";

const auditLogs = [
  { idx: 1, component: "Prisma (better-sqlite3)", event: "ORM connected to dev.db successfully", stable: true },
  { idx: 2, component: "NextAuth v5 Edge Middleware", event: "Role-based route authorization is active", stable: true },
  { idx: 3, component: "Seed Engine", event: "Admin, HR, Applicant records injected", stable: true },
];

export default async function AdminDashboard() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  const stats = [
    { value: "8", label: "Departments", sub: "Ghana Main Branch", icon: Building, accent: "stat-accent-teal", iconBg: "bg-teal-50 text-teal-700 border-teal-100", href: "/admin/departments" },
    { value: "3", label: "System Roles", sub: "Admin · HR · Applicant", icon: Key, accent: "stat-accent-blue", iconBg: "bg-blue-50 text-blue-700 border-blue-100", href: "/admin/settings" },
    { value: "2", label: "Pending Approvals", sub: "Awaiting action", icon: Users, accent: "stat-accent-amber", iconBg: "bg-amber-50 text-amber-700 border-amber-100", href: "/admin/audits" },
    { value: "100%", label: "Database Sync", sub: "SQLite adapter live", icon: Database, accent: "stat-accent-green", iconBg: "bg-emerald-50 text-emerald-700 border-emerald-100", href: "/admin/status" },
  ];

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">System Administration</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Admin Console</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Welcome back, {session.user.name}. Core systems are stable.</p>
        </div>
        <div
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 self-start"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          All Systems Operational
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
        {/* Audit Logs */}
        <div className="xl:col-span-2 card p-6">
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-base font-extrabold text-slate-900">Infrastructure Audit Log</h3>
            <span className="flex items-center gap-1.5 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Activity className="w-4 h-4" /> Live
            </span>
          </div>
          <div className="space-y-3">
            {auditLogs.map((log) => (
              <div key={log.idx} className="flex items-start gap-4 p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                <div className="w-8 h-8 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-sm font-bold text-slate-500 shrink-0">
                  {log.idx}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-bold text-slate-800 font-mono truncate">{log.component}</p>
                    {log.stable && <span className="badge badge-active shrink-0">stable</span>}
                  </div>
                  <p className="text-sm text-slate-500 font-medium mt-1">{log.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DB Status */}
        <div className="card p-5 flex flex-col gap-5">
          <div>
            <h3 className="text-base font-extrabold text-slate-900 mb-4">Database Profile</h3>
            <div className="space-y-3 p-4 rounded-xl bg-teal-50/40 border border-teal-100">
              <div className="flex items-start gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse mt-1 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-teal-900">Connection Active</p>
                  <p className="text-xs font-mono text-teal-700 mt-0.5">SQLite / dev.db</p>
                </div>
              </div>
              <div className="pt-3 border-t border-teal-100 space-y-2">
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span>ORM Version</span>
                  <span className="font-mono font-bold text-slate-700">Prisma 7</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span>Driver</span>
                  <span className="font-mono font-bold text-slate-700">better-sqlite3</span>
                </div>
                <div className="flex justify-between text-sm font-medium text-slate-600">
                  <span>Auth</span>
                  <span className="font-mono font-bold text-slate-700">NextAuth v5 JWT</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex gap-3">
            <ShieldIcon className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-amber-800">Local Sandbox</p>
              <p className="text-sm text-amber-700 font-medium mt-1 leading-relaxed">SQLite is for development only. Run migrations before production deployment.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
