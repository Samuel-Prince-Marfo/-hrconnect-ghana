import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Activity, Download } from "lucide-react";

const logs = [
  { time: "2026-07-20 03:15", action: "User Login", user: "hr@hrms.gh", role: "HR", ip: "10.2.0.2", result: "Success" },
  { time: "2026-07-20 03:10", action: "Application Reviewed", user: "hr@hrms.gh", role: "HR", ip: "10.2.0.2", result: "Success" },
  { time: "2026-07-20 02:58", action: "User Login", user: "admin@hrms.gh", role: "Admin", ip: "10.2.0.2", result: "Success" },
  { time: "2026-07-20 02:40", action: "DB Migration Run", user: "system", role: "System", ip: "localhost", result: "Success" },
  { time: "2026-07-20 02:38", action: "Seed Executed", user: "system", role: "System", ip: "localhost", result: "Success" },
];

export default async function AuditsPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">Administration</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Reports & Audits</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">System activity log and compliance reports.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 border border-slate-200 bg-white text-slate-700 text-sm font-bold rounded-xl hover:bg-slate-50 transition-all">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="card p-6">
        <div className="flex items-center gap-2 mb-5">
          <Activity className="w-5 h-5 text-[#0F766E]" />
          <h3 className="text-base font-extrabold text-slate-900">System Audit Trail</h3>
          <span className="ml-auto text-xs font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-2.5 py-1 rounded-full">Live</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Timestamp", "Action", "User", "Role", "IP Address", "Result"].map(h => (
                  <th key={h} className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {logs.map((log, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-3.5 pr-4 text-sm font-mono text-slate-500">{log.time}</td>
                  <td className="py-3.5 pr-4 text-sm font-bold text-slate-800">{log.action}</td>
                  <td className="py-3.5 pr-4 text-sm text-slate-500">{log.user}</td>
                  <td className="py-3.5 pr-4 text-sm text-slate-500">{log.role}</td>
                  <td className="py-3.5 pr-4 text-sm font-mono text-slate-400">{log.ip}</td>
                  <td className="py-3.5">
                    <span className="badge badge-active">{log.result}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
