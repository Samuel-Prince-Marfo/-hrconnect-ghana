import { auth } from "@/lib/auth";
import { Bell, Search, ChevronDown } from "lucide-react";

export default async function TopBar() {
  const session = await auth();
  const role = (session?.user as { role?: string })?.role ?? "APPLICANT";
  const roleLabel = role === "ADMIN" ? "Admin Manager" : role === "HR" ? "HR Manager" : "Candidate";

  return (
    <header className="h-16 bg-white border-b border-slate-200/80 flex items-center px-6 gap-4 sticky top-0 z-30 shadow-sm">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
        <input
          type="text"
          placeholder="Search anything..."
          className="w-full pl-10 pr-14 py-2.5 text-sm font-medium text-slate-700 bg-slate-50 border border-slate-200/70 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 transition-all placeholder:text-slate-400"
        />
        <kbd className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded px-1.5 py-0.5">
          ⌘K
        </kbd>
      </div>

      <div className="flex items-center gap-3 ml-auto">
        {/* Date */}
        <div className="hidden md:flex items-center px-3 py-1.5 bg-slate-50 border border-slate-200/50 rounded-xl">
          <span className="text-sm font-medium text-slate-500">
            {new Date().toLocaleDateString("en-GH", { day: "numeric", month: "short", year: "numeric" })}
          </span>
        </div>

        {/* Bell */}
        <button className="relative w-10 h-10 rounded-xl bg-slate-50 border border-slate-200/70 hover:bg-slate-100 transition-all flex items-center justify-center text-slate-500 cursor-pointer">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
        </button>

        {/* Avatar */}
        <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-extrabold text-sm shadow-sm shrink-0"
            style={{ background: "linear-gradient(135deg, #0F766E, #0b5e58)" }}
          >
            {session?.user?.name?.charAt(0)?.toUpperCase()}
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold text-slate-800 leading-tight">{session?.user?.name}</p>
            <p className="text-xs font-medium text-slate-400 leading-tight mt-0.5">{roleLabel}</p>
          </div>
          <ChevronDown className="w-4 h-4 text-slate-400 hidden sm:block" />
        </div>
      </div>
    </header>
  );
}
