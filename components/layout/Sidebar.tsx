"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logout } from "@/lib/actions";
import {
  LayoutDashboard, Users, Briefcase, Settings, LogOut,
  ChevronRight, FileText, UserCheck, Building2,
  MessagesSquare, FileBadge, Activity, Database,
} from "lucide-react";

type NavItem = { href: string; label: string; icon: React.ElementType };

const adminNav: NavItem[] = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/departments", label: "Departments", icon: Building2 },
  { href: "/admin/audits", label: "Reports & Audits", icon: Activity },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];
const hrNav: NavItem[] = [
  { href: "/hr", label: "Dashboard", icon: LayoutDashboard },
  { href: "/hr/jobs", label: "Job Vacancies", icon: Briefcase },
  { href: "/hr/applications", label: "Applications", icon: FileText },
  { href: "/hr/interviews", label: "Interviews", icon: MessagesSquare },
  { href: "/hr/offers", label: "Offer Letters", icon: FileBadge },
  { href: "/hr/employees", label: "Employees", icon: Users },
  { href: "/hr/settings", label: "Settings", icon: Settings },
];
const applicantNav: NavItem[] = [
  { href: "/applicant", label: "Dashboard", icon: LayoutDashboard },
  { href: "/applicant/jobs", label: "Browse Jobs", icon: Briefcase },
  { href: "/applicant/applications", label: "My Applications", icon: FileText },
  { href: "/applicant/profile", label: "My Profile", icon: UserCheck },
];

interface SidebarProps {
  role: string;
  userName: string;
  userEmail: string;
}

export default function Sidebar({ role, userName, userEmail }: SidebarProps) {
  const pathname = usePathname();
  const nav = role === "ADMIN" ? adminNav : role === "HR" ? hrNav : applicantNav;
  const roleLabel = role === "ADMIN" ? "Admin Manager" : role === "HR" ? "HR Manager" : "Candidate";

  return (
    <aside className="w-72 bg-[#0b1e2d] text-slate-300 flex flex-col h-screen sticky top-0 shrink-0 border-r border-[#152e42]/50">
      
      {/* Brand area */}
      <div className="flex flex-col items-center text-center px-6 pt-8 pb-6 border-b border-[#1a3347]/60">
        <div className="w-18 h-18 mb-4 flex items-center justify-center">
          <svg viewBox="0 0 100 100" className="w-16 h-16">
            <circle cx="50" cy="45" r="32" fill="none" stroke="#F59E0B" strokeWidth="2.5" strokeDasharray="4 4" />
            <circle cx="50" cy="45" r="27" fill="none" stroke="#0F766E" strokeWidth="2.5" />
            <path d="M26 62 C 34 76, 66 76, 74 62 C 65 67, 35 67, 26 62" fill="#F59E0B" />
            <circle cx="50" cy="28" r="6" fill="#0F766E" />
            <rect x="42" y="37" width="16" height="13" rx="2.5" fill="#1E3A8A" />
            <path d="M46 37V34H54V37" fill="none" stroke="#1E3A8A" strokeWidth="2" />
            <circle cx="33" cy="41" r="4.5" fill="#0F766E" />
            <path d="M28.5 48C28.5 44.5 37.5 44.5 37.5 48" fill="#0F766E" />
            <circle cx="67" cy="41" r="4.5" fill="#0F766E" />
            <path d="M62.5 48C62.5 44.5 71.5 44.5 71.5 48" fill="#0F766E" />
          </svg>
        </div>
        <h1 className="text-white font-extrabold text-xl tracking-tight">HRConnect</h1>
        <p className="text-[#F59E0B] font-extrabold text-xs uppercase tracking-widest mt-0.5">— GHANA —</p>
        <p className="text-slate-500 text-xs font-medium mt-2 leading-relaxed">Connecting Talent. Building Futures.</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-5 space-y-1.5 overflow-y-auto">
        {nav.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== `/${role.toLowerCase()}` && pathname.startsWith(item.href));
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                isActive
                  ? "sidebar-link-active"
                  : "text-slate-400 hover:bg-[#11293c] hover:text-white"
              }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              <span className="flex-1">{item.label}</span>
              {isActive && <ChevronRight className="w-4 h-4 opacity-70" />}
            </Link>
          );
        })}
      </nav>

      {/* Project Team */}
      <div className="px-4 py-3.5 mx-4 my-2 rounded-xl bg-[#11293c]/40 border border-[#1a3347]/30">
        <p className="text-xs font-bold text-[#F59E0B] uppercase tracking-wider mb-2">Student Authors</p>
        <div className="space-y-2 text-xs">
          <div className="border-b border-[#1a3347]/20 pb-1.5 last:border-0 last:pb-0">
            <p className="font-bold text-white">M. KINGSLEY KWASI K. K.</p>
            <p className="text-slate-500 font-mono text-[10px] mt-0.5">UEB3256022</p>
          </div>
          <div className="border-b border-[#1a3347]/20 pb-1.5 last:border-0 last:pb-0">
            <p className="font-bold text-white">SAMUEL PRINCE MARFO</p>
            <p className="text-slate-500 font-mono text-[10px] mt-0.5">UEB3252022</p>
          </div>
          <div className="border-b border-[#1a3347]/20 pb-1.5 last:border-0 last:pb-0">
            <p className="font-bold text-white">YAHYA SAMUDEEN</p>
            <p className="text-slate-500 font-mono text-[10px] mt-0.5">UEB3257822</p>
          </div>
          <div className="border-b border-[#1a3347]/20 pb-1.5 last:border-0 last:pb-0">
            <p className="font-bold text-white">Philip Agyapong</p>
            <p className="text-slate-500 font-mono text-[10px] mt-0.5">UEB3262722</p>
          </div>
          <div className="border-b border-[#1a3347]/20 pb-1.5 last:border-0 last:pb-0">
            <p className="font-bold text-white">EFFAH REGINALD</p>
            <p className="text-slate-500 font-mono text-[10px] mt-0.5">UEB3265422</p>
          </div>
        </div>
      </div>

      {/* User footer */}
      <div className="p-4 border-t border-[#1a3347]/60 bg-[#071520]">
        <div className="flex items-center gap-3 mb-3 p-3 bg-[#0b1e2d] rounded-xl border border-[#1a3347]/40">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-base shrink-0"
            style={{ background: "linear-gradient(135deg, #0F766E, #0b5e58)" }}
          >
            {userName?.charAt(0)?.toUpperCase()}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-bold text-white truncate">{userName}</p>
            <p className="text-xs text-slate-500 truncate mt-0.5">{roleLabel}</p>
          </div>
        </div>
        <form action={logout}>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl text-sm font-bold text-slate-400 hover:bg-red-950/40 hover:text-red-400 border border-transparent hover:border-red-900/30 transition-all cursor-pointer"
          >
            <LogOut className="w-4.5 h-4.5" />
            Sign Out
          </button>
        </form>
        <p className="text-xs text-[#F59E0B]/40 text-center font-semibold mt-3 uppercase tracking-wider">
          © 2026 HRConnect Ghana
        </p>
      </div>
    </aside>
  );
}
