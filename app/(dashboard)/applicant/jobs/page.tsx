import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Briefcase, Search, Filter, MapPin, Building } from "lucide-react";
import { prisma } from "@/lib/db";
import ApplyJobModal from "@/components/recruitment/ApplyJobModal";

export default async function BrowseJobsPage() {
  const session = await auth();
  if (!session || session.user.role !== "APPLICANT") redirect("/login");

  const jobs = await prisma.job.findMany({
    where: { status: "Open" },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#0F766E] mb-1">Job Search</p>
        <h2 className="text-2xl font-extrabold text-slate-900">Browse Vacancies</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Find and apply for open positions across Ghana.</p>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search job title, company, location..." className="w-full pl-10 pr-4 py-3.5 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
        </div>
        <button className="flex items-center gap-2 px-4 py-3.5 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all font-bold">
          <Filter className="w-4 h-4" /> Filters
        </button>
      </div>

      {/* Type filter */}
      <div className="flex flex-wrap gap-2">
        {["All Types", "Full-time", "Part-time", "Contract", "Remote"].map(t => (
          <button key={t} className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${t === "All Types" ? "bg-[#0F766E] text-white border-[#0F766E]" : "bg-white text-slate-600 border-slate-200 hover:border-[#0F766E] hover:text-[#0F766E] cursor-pointer"}`}>
            {t}
          </button>
        ))}
      </div>

      {/* Job Cards */}
      <div className="space-y-4">
        {jobs.length === 0 ? (
          <div className="card p-12 text-center text-slate-400 font-medium">
            No vacancies are currently open. Please check back later.
          </div>
        ) : (
          jobs.map(job => (
            <div key={job.id} className="card p-5 hover:shadow-md transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex gap-4 items-start sm:items-center">
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0">
                  <Building className="w-6 h-6 text-slate-500" />
                </div>
                <div>
                  <p className="text-base font-extrabold text-slate-900">{job.title}</p>
                  <p className="text-sm font-semibold text-slate-500 mt-0.5">{job.department}</p>
                  <div className="flex flex-wrap items-center gap-3 mt-2">
                    <span className="flex items-center gap-2 text-sm text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5" /> {job.location}
                    </span>
                    <span className="badge badge-interview">{job.type}</span>
                    <span className="text-sm text-slate-400 font-medium font-bold">Closes {job.deadline}</span>
                  </div>
                </div>
              </div>
              <div className="flex flex-col sm:items-end gap-3 shrink-0">
                <p className="text-base font-extrabold text-slate-800">{job.salary}</p>
                <ApplyJobModal jobId={job.id} jobTitle={job.title} companyName="HRConnect Ghana" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
