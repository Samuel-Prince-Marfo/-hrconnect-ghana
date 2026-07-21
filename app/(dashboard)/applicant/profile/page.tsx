import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { User, Mail, Phone, MapPin, FileText, Upload, CheckCircle2, Circle } from "lucide-react";

export default async function ProfilePage() {
  const session = await auth();
  if (!session || session.user.role !== "APPLICANT") redirect("/login");

  const completionItems = [
    { label: "Account registered", done: true },
    { label: "Full name set", done: !!session.user.name },
    { label: "Profile photo uploaded", done: false },
    { label: "Phone number added", done: false },
    { label: "Address provided", done: false },
    { label: "CV / Resume uploaded", done: false },
  ];

  const done = completionItems.filter(c => c.done).length;
  const pct = Math.round((done / completionItems.length) * 100);

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#0F766E] mb-1">My Portal</p>
        <h2 className="text-2xl font-extrabold text-slate-900">My Profile</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Complete your profile to improve job match scores.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress card */}
        <div className="card p-5 flex flex-col gap-5">
          {/* Avatar */}
          <div className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-white font-extrabold text-3xl mb-3"
              style={{ background: "linear-gradient(135deg, #0F766E, #1E3A8A)" }}
            >
              {session.user.name?.charAt(0)?.toUpperCase()}
            </div>
            <p className="text-base font-extrabold text-slate-900">{session.user.name}</p>
            <p className="text-sm text-slate-500 font-medium mt-0.5">{session.user.email}</p>
            <span className="badge badge-active mt-2">Candidate</span>
          </div>

          {/* Profile strength */}
          <div>
            <div className="flex justify-between text-sm font-bold text-slate-700 mb-2">
              <span>Profile Strength</span>
              <span className="text-[#0F766E]">{pct}%</span>
            </div>
            <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all"
                style={{ width: `${pct}%`, background: "linear-gradient(90deg, #0F766E, #10B981)" }}
              />
            </div>
          </div>

          {/* Checklist */}
          <div className="space-y-2.5">
            {completionItems.map(item => (
              <div key={item.label} className="flex items-center gap-2.5">
                {item.done
                  ? <CheckCircle2 className="w-4.5 h-4.5 text-[#0F766E] shrink-0" />
                  : <Circle className="w-4.5 h-4.5 text-slate-300 shrink-0" />}
                <span className={`text-sm font-medium ${item.done ? "text-slate-400 line-through" : "text-slate-700"}`}>
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="card p-6 space-y-5">
            <h3 className="text-base font-extrabold text-slate-900">Personal Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input defaultValue={session.user.name ?? ""} className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Email</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input defaultValue={session.user.email ?? ""} disabled className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-slate-50 border border-slate-200 rounded-xl text-slate-500 cursor-not-allowed" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input placeholder="+233 XX XXX XXXX" className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input placeholder="Accra, Greater Accra" className="w-full pl-10 pr-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800" />
                </div>
              </div>
              <div className="sm:col-span-2">
                <label className="block text-sm font-bold text-slate-700 mb-2">Professional Summary</label>
                <textarea rows={3} placeholder="Brief summary of your skills and experience..." className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800 resize-none" />
              </div>
            </div>
            <div className="pt-4 border-t border-slate-100 flex justify-end gap-3">
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-200 text-slate-600 hover:bg-slate-50 transition-all">Discard</button>
              <button className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F766E] text-white hover:bg-[#0b5e58] transition-all shadow-md">Save Profile</button>
            </div>
          </div>

          {/* CV Upload */}
          <div className="card p-6">
            <h3 className="text-base font-extrabold text-slate-900 mb-4">CV / Resume</h3>
            <label className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50 hover:bg-slate-100 hover:border-[#0F766E] transition-all cursor-pointer text-center">
              <Upload className="w-8 h-8 text-slate-400 mb-3" />
              <p className="text-sm font-bold text-slate-700">Click to upload your CV</p>
              <p className="text-xs font-medium text-slate-400 mt-1">PDF, DOC, DOCX · Max 5MB</p>
              <input type="file" accept=".pdf,.doc,.docx" className="hidden" />
              <span className="mt-4 px-4 py-2 bg-[#0F766E] text-white text-sm font-bold rounded-xl hover:bg-[#0b5e58] transition-all">Choose File</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
