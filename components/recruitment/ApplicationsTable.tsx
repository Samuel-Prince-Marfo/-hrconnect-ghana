"use client";

import { useState, useTransition } from "react";
import { updateApplicationStatus } from "@/lib/actions";
import { Eye, CheckCircle, XCircle, Search, Filter, Loader2 } from "lucide-react";

interface ApplicationItem {
  id: string;
  status: string;
  createdAt: Date;
  coverLetter: string | null;
  job: {
    title: string;
    department: string;
  };
  applicant: {
    name: string;
    email: string;
  };
}

interface ApplicationsTableProps {
  initialApplications: ApplicationItem[];
}

const statusBadge: Record<string, string> = {
  Pending: "badge-pending",
  "Under Review": "badge-interview",
  "Interview Scheduled": "badge-interview",
  Accepted: "badge-selected",
  Rejected: "badge-rejected",
};

export default function ApplicationsTable({ initialApplications }: ApplicationsTableProps) {
  const [apps, setApps] = useState<ApplicationItem[]>(initialApplications);
  const [filterStatus, setFilterStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isPending, startTransition] = useTransition();
  const [actioningId, setActioningId] = useState<string | null>(null);

  async function handleStatusUpdate(id: string, newStatus: string) {
    setActioningId(id);
    startTransition(async () => {
      const result = await updateApplicationStatus(id, newStatus);
      if (result.success) {
        setApps(prev => prev.map(a => a.id === id ? { ...a, status: newStatus } : a));
      } else {
        alert(result.error || "Failed to update status.");
      }
      setActioningId(null);
    });
  }

  const filteredApps = apps.filter(app => {
    const matchesStatus = filterStatus === "All" || app.status === filterStatus;
    const matchesSearch =
      app.applicant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.job.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex flex-wrap gap-2">
        {["All", "Pending", "Under Review", "Accepted", "Rejected"].map(s => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all cursor-pointer ${
              filterStatus === s
                ? "bg-[#0F766E] text-white border-[#0F766E]"
                : "bg-white text-slate-600 border-slate-200 hover:border-[#0F766E] hover:text-[#0F766E]"
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search applicants or job departments..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800"
          />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all cursor-pointer">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      {/* Table grid */}
      <div className="card p-6">
        <div className="overflow-x-auto">
          {filteredApps.length === 0 ? (
            <div className="py-12 text-center text-slate-400 font-medium">
              No applications match your current filters.
            </div>
          ) : (
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  {["Applicant", "Email", "Job Applied", "Date", "Status", "Actions"].map(h => (
                    <th key={h} className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider pr-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredApps.map(app => (
                  <tr key={app.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-sm font-extrabold text-slate-700 shrink-0">
                          {app.applicant.name.charAt(0)}
                        </div>
                        <span className="text-sm font-bold text-slate-800">{app.applicant.name}</span>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm text-slate-500">{app.applicant.email}</td>
                    <td className="py-4 pr-4 text-sm font-medium text-slate-600">
                      <div>
                        <p className="font-semibold text-slate-800">{app.job.title}</p>
                        <p className="text-xs text-slate-400">{app.job.department}</p>
                      </div>
                    </td>
                    <td className="py-4 pr-4 text-sm text-slate-400">
                      {new Date(app.createdAt).toLocaleDateString("en-GH", { day: "numeric", month: "short" })}
                    </td>
                    <td className="py-4 pr-4">
                      <span className={`badge ${statusBadge[app.status] ?? "badge-pending"}`}>{app.status}</span>
                    </td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button
                          disabled={actioningId === app.id}
                          onClick={() => {
                            if (app.coverLetter) {
                              alert(`Cover Letter:\n\n"${app.coverLetter}"`);
                            } else {
                              alert("Candidate did not provide a cover letter.");
                            }
                          }}
                          className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all cursor-pointer font-bold"
                          title="View Details"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {actioningId === app.id ? (
                          <Loader2 className="w-4 h-4 animate-spin text-[#0F766E]" />
                        ) : (
                          <>
                            <button
                              disabled={actioningId !== null}
                              onClick={() => handleStatusUpdate(app.id, "Accepted")}
                              className="p-2 rounded-lg hover:bg-emerald-50 text-slate-500 hover:text-emerald-700 transition-all cursor-pointer font-bold"
                              title="Accept Application"
                            >
                              <CheckCircle className="w-4 h-4" />
                            </button>
                            <button
                              disabled={actioningId !== null}
                              onClick={() => handleStatusUpdate(app.id, "Rejected")}
                              className="p-2 rounded-lg hover:bg-red-50 text-slate-500 hover:text-red-700 transition-all cursor-pointer font-bold"
                              title="Reject Application"
                            >
                              <XCircle className="w-4 h-4" />
                            </button>
                          </>
                        )}
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
