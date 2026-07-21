import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Briefcase, Search, Filter, Eye, Pencil, X } from "lucide-react";
import { prisma } from "@/lib/db";
import PostJobModal from "@/components/recruitment/PostJobModal";

export default async function JobsPage() {
  const session = await auth();
  if (!session || session.user.role !== "HR") redirect("/login");

  const jobs = await prisma.job.findMany({
    include: {
      _count: {
        select: { applications: true }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">HR Management</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Job Vacancies</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage and track all open positions in your organization.</p>
        </div>
        <PostJobModal />
      </div>

      {/* Search + Filter bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by title or department..." className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Vacancies", value: jobs.length },
          { label: "Open", value: jobs.filter(j => j.status === "Open").length },
          { label: "Closed", value: jobs.filter(j => j.status === "Closed").length },
        ].map(s => (
          <div key={s.label} className="card p-4 text-center">
            <p className="text-2xl font-extrabold text-slate-900">{s.value}</p>
            <p className="text-sm font-semibold text-slate-500 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Jobs table */}
      <div className="card p-6">
        <div className="overflow-x-auto">
          {jobs.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-medium">
              No vacancies posted yet. Click "Post New Vacancy" above to add one.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Job Title", "Department", "Type", "Deadline", "Applications", "Status", "Actions"].map(h => (
                    <th key={h} className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {jobs.map(job => (
                  <tr key={job.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                          <Briefcase className="w-4 h-4 text-teal-700" />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800">{job.title}</p>
                          <p className="text-xs text-slate-500 font-medium mt-0.5">{job.location}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm font-medium text-slate-500">{job.department}</td>
                    <td className="py-4 pr-4 text-sm font-medium text-slate-500">{job.type}</td>
                    <td className="py-4 pr-4 text-sm font-medium text-slate-500">{job.deadline}</td>
                    <td className="py-4 pr-4 text-sm font-bold text-slate-700">{job._count.applications}</td>
                    <td className="py-4 pr-4">
                      <span className={`badge ${job.status === "Open" ? "badge-active" : "badge-rejected"}`}>{job.status}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all font-bold" title="View">
                          <Eye className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-500 hover:text-blue-700 transition-all font-bold" title="Edit">
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-700 transition-all font-bold" title="Close">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
