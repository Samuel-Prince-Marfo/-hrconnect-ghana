import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { FileBadge, Plus, Download, Eye } from "lucide-react";

const offers = [
  { id: 1, candidate: "Abena Sarpong", job: "Legal Counsel", salary: "GH₵ 6,500/mo", issued: "21 May 2025", expiry: "28 May 2025", status: "Pending Acceptance" },
  { id: 2, candidate: "Ama Serwaa", job: "IT Support", salary: "GH₵ 4,200/mo", issued: "20 May 2025", expiry: "27 May 2025", status: "Accepted" },
  { id: 3, candidate: "John Doe", job: "Finance Officer", salary: "GH₵ 5,800/mo", issued: "19 May 2025", expiry: "26 May 2025", status: "Accepted" },
];

const statusBadge: Record<string, string> = {
  "Pending Acceptance": "badge-pending",
  "Accepted": "badge-selected",
  "Declined": "badge-rejected",
};

export default async function OffersPage() {
  const session = await auth();
  if (!session || session.user.role !== "HR") redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">HR Management</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Offer Letters</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Create and track formal employment offers.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-[#0F766E] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0b5e58] transition-all">
          <Plus className="w-4 h-4" /> Draft Offer Letter
        </button>
      </div>

      <div className="card p-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-slate-100">
                {["Candidate", "Position", "Salary", "Issued", "Expiry", "Status", "Actions"].map(h => (
                  <th key={h} className="pb-3 text-xs font-bold text-slate-400 uppercase tracking-wider pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {offers.map(offer => (
                <tr key={offer.id} className="hover:bg-slate-50/50 transition-colors">
                  <td className="py-4 pr-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center text-sm font-extrabold text-blue-700 shrink-0">
                        {offer.candidate.charAt(0)}
                      </div>
                      <span className="text-sm font-bold text-slate-800">{offer.candidate}</span>
                    </div>
                  </td>
                  <td className="py-4 pr-4 text-sm font-medium text-slate-500">{offer.job}</td>
                  <td className="py-4 pr-4 text-sm font-bold text-slate-700">{offer.salary}</td>
                  <td className="py-4 pr-4 text-sm text-slate-400">{offer.issued}</td>
                  <td className="py-4 pr-4 text-sm text-slate-400">{offer.expiry}</td>
                  <td className="py-4 pr-4">
                    <span className={`badge ${statusBadge[offer.status] ?? "badge-pending"}`}>{offer.status}</span>
                  </td>
                  <td className="py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-all" title="View"><Eye className="w-4 h-4" /></button>
                      <button className="p-2 rounded-lg hover:bg-blue-50 text-slate-500 hover:text-blue-700 transition-all" title="Download PDF"><Download className="w-4 h-4" /></button>
                    </div>
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
