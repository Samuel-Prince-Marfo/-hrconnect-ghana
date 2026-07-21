import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileText, Clock, CheckCircle, XCircle } from "lucide-react";
import { prisma } from "@/lib/db";

const statusBadge: Record<string, string> = {
  "Pending": "badge-pending",
  "Under Review": "badge-interview",
  "Interview Scheduled": "badge-interview",
  "Accepted": "badge-selected",
  "Rejected": "badge-rejected",
};

const statusIcon: Record<string, React.ElementType> = {
  "Pending": Clock,
  "Under Review": Clock,
  "Interview Scheduled": CheckCircle,
  "Accepted": CheckCircle,
  "Rejected": XCircle,
};

export default async function MyApplicationsPage() {
  const session = await auth();
  if (!session || session.user.role !== "APPLICANT") redirect("/login");

  const applications = await prisma.application.findMany({
    where: { applicantId: session.user.id },
    include: {
      job: true
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#0F766E] mb-1">My Portal</p>
        <h2 className="text-2xl font-extrabold text-slate-900">My Applications</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Track the status of all your job applications.</p>
      </div>

      {applications.length === 0 ? (
        <div className="card p-12 flex flex-col items-center text-center">
          <FileText className="w-12 h-12 text-slate-300 mb-4" />
          <p className="text-base font-bold text-slate-600">No applications yet</p>
          <p className="text-sm text-slate-400 font-medium mt-1 mb-5">Browse available jobs and click Apply to get started.</p>
          <a href="/applicant/jobs" className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F766E] text-white hover:bg-[#0b5e58] transition-all shadow-md">
            Browse Jobs
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {applications.map(app => {
            const StatusIcon = statusIcon[app.status] ?? Clock;
            return (
              <div key={app.id} className="card p-5 hover:shadow-md transition-all animate-fade-in-up">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-11 h-11 rounded-xl bg-teal-50 border border-teal-100 flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5 text-teal-700" />
                    </div>
                    <div>
                      <p className="text-base font-extrabold text-slate-900">{app.job.title}</p>
                      <p className="text-sm font-medium text-slate-500 mt-0.5">{app.job.department}</p>
                      <p className="text-xs text-slate-400 font-medium mt-1.5">
                        Applied: {new Date(app.createdAt).toLocaleDateString("en-GH", { day: "numeric", month: "long", year: "numeric" })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`badge ${statusBadge[app.status] ?? "badge-pending"}`}>
                      <StatusIcon className="w-3.5 h-3.5 mr-1 inline shrink-0" />{app.status}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="card p-5 border-dashed border-2 text-center border-slate-200">
            <p className="text-sm font-bold text-slate-500">Apply to more jobs to grow your pipeline</p>
            <a href="/applicant/jobs" className="inline-block mt-3 text-sm font-bold text-[#0F766E] hover:underline">Browse all vacancies →</a>
          </div>
        </div>
      )}
    </div>
  );
}
