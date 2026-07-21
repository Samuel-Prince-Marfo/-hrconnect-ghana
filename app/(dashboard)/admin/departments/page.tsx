import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Building2, Plus, Users } from "lucide-react";

const departments = [
  { id: 1, name: "ICT Department", head: "Kwame Frimpong", employees: 24, open: 3 },
  { id: 2, name: "Finance & Accounts", head: "Ama Boateng", employees: 18, open: 1 },
  { id: 3, name: "Human Resources", head: "HR Officer", employees: 8, open: 2 },
  { id: 4, name: "Legal & Compliance", head: "Abena Sarpong", employees: 5, open: 1 },
  { id: 5, name: "Operations", head: "Kofi Asante", employees: 32, open: 0 },
  { id: 6, name: "Marketing & Comms", head: "Akosua Owusu", employees: 14, open: 2 },
];

const colors = ["bg-teal-50 border-teal-200 text-teal-700", "bg-blue-50 border-blue-200 text-blue-700", "bg-amber-50 border-amber-200 text-amber-700", "bg-purple-50 border-purple-200 text-purple-700", "bg-emerald-50 border-emerald-200 text-emerald-700", "bg-rose-50 border-rose-200 text-rose-700"];

export default async function DepartmentsPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">Administration</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Departments</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Manage organizational structure and department heads.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-[#0F766E] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0b5e58] transition-all">
          <Plus className="w-4 h-4" /> Add Department
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {departments.map((dept, i) => (
          <div key={dept.id} className="card p-5 hover:shadow-md transition-all">
            <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-4 ${colors[i % colors.length]}`}>
              <Building2 className="w-6 h-6" />
            </div>
            <h3 className="text-base font-extrabold text-slate-900">{dept.name}</h3>
            <p className="text-sm text-slate-500 font-medium mt-1">Head: {dept.head}</p>
            <div className="mt-4 pt-4 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-sm font-semibold text-slate-600">
                <Users className="w-4 h-4 text-slate-400" /> {dept.employees} staff
              </div>
              {dept.open > 0
                ? <span className="badge badge-pending">{dept.open} open roles</span>
                : <span className="badge badge-active">Fully staffed</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
