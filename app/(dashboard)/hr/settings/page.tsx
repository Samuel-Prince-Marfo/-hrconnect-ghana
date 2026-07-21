import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Settings, Bell, Lock, User, Building2, Globe } from "lucide-react";

export default async function HRSettingsPage() {
  const session = await auth();
  if (!session || session.user.role !== "HR") redirect("/login");

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#0F766E] mb-1">HR Management</p>
        <h2 className="text-2xl font-extrabold text-slate-900">Settings</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Manage your account and notification preferences.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar nav */}
        <div className="card p-4 h-fit">
          <nav className="space-y-1">
            {[
              { label: "Profile", icon: User, active: true },
              { label: "Security", icon: Lock, active: false },
              { label: "Notifications", icon: Bell, active: false },
              { label: "Organization", icon: Building2, active: false },
            ].map(item => {
              const Icon = item.icon;
              return (
                <button key={item.label} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all text-left ${item.active ? "bg-[#0F766E] text-white" : "text-slate-600 hover:bg-slate-50"}`}>
                  <Icon className="w-4 h-4" /> {item.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Profile form */}
        <div className="lg:col-span-2 card p-6 space-y-5">
          <h3 className="text-base font-extrabold text-slate-900">Profile Information</h3>

          {/* Avatar */}
          <div className="flex items-center gap-4">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center text-white font-extrabold text-xl"
              style={{ background: "linear-gradient(135deg, #0F766E, #1E3A8A)" }}
            >
              {session.user.name?.charAt(0)?.toUpperCase()}
            </div>
            <div>
              <p className="text-sm font-bold text-slate-700">{session.user.name}</p>
              <p className="text-sm text-slate-400">{session.user.email}</p>
              <button className="mt-1 text-sm font-bold text-[#0F766E] hover:underline">Change photo</button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
              <input defaultValue={session.user.name ?? ""} className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
              <input defaultValue={session.user.email ?? ""} disabled className="w-full px-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Department</label>
              <input defaultValue="Human Resources" className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
              <input placeholder="+233 XX XXX XXXX" className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">Cancel</button>
            <button className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F766E] text-white hover:bg-[#0b5e58] transition-all shadow-md">Save Changes</button>
          </div>
        </div>
      </div>
    </div>
  );
}
