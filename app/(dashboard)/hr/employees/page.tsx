import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Users, Search, Filter, Mail, Phone } from "lucide-react";

const employees = [
  { id: 1, name: "Ama Serwaa", dept: "ICT", role: "IT Support", email: "ama.serwaa@hrms.gh", phone: "+233 20 111 2222", joined: "20 May 2025", status: "Active" },
  { id: 2, name: "John Doe", dept: "Finance", role: "Finance Officer", email: "john.doe@hrms.gh", phone: "+233 24 333 4444", joined: "19 May 2025", status: "Active" },
  { id: 3, name: "Abena Sarpong", dept: "Legal", role: "Legal Counsel", email: "abena.s@hrms.gh", phone: "+233 27 555 6666", joined: "18 May 2025", status: "Active" },
  { id: 4, name: "Kwame Frimpong", dept: "HR", role: "HR Manager", email: "kwame.f@hrms.gh", phone: "+233 50 777 8888", joined: "01 Jan 2024", status: "Active" },
];

const deptColors: Record<string, string> = {
  ICT: "bg-blue-50 text-blue-700 border-blue-100",
  Finance: "bg-amber-50 text-amber-700 border-amber-100",
  Legal: "bg-purple-50 text-purple-700 border-purple-100",
  HR: "bg-teal-50 text-teal-700 border-teal-100",
};

export default async function EmployeesPage() {
  const session = await auth();
  if (!session || session.user.role !== "HR") redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">HR Management</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Employees</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Active headcount across all departments.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by name, department, or role..." className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
        </div>
        <button className="flex items-center gap-2 px-4 py-3 border border-slate-200 bg-white rounded-xl text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-all">
          <Filter className="w-4 h-4" /> Filter
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {employees.map(emp => (
          <div key={emp.id} className="card p-5 hover:shadow-md transition-all flex items-start gap-4">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-extrabold text-base shrink-0"
              style={{ background: "linear-gradient(135deg, #0F766E, #1E3A8A)" }}
            >
              {emp.name.charAt(0)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-base font-extrabold text-slate-900">{emp.name}</p>
                  <p className="text-sm font-medium text-slate-500 mt-0.5">{emp.role}</p>
                </div>
                <span className={`badge border ${deptColors[emp.dept] ?? "bg-slate-50 text-slate-600 border-slate-100"}`}>{emp.dept}</span>
              </div>
              <div className="mt-3 space-y-1.5">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Mail className="w-4 h-4 text-slate-400 shrink-0" /> {emp.email}
                </div>
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Phone className="w-4 h-4 text-slate-400 shrink-0" /> {emp.phone}
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">Joined {emp.joined}</span>
                <span className="badge badge-active">{emp.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
