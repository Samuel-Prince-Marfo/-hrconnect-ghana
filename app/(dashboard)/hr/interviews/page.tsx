import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Calendar, Plus, Video, MapPin, Clock } from "lucide-react";

const interviews = [
  { id: 1, candidate: "Kwame Mensah", job: "Software Developer", date: "23 May 2025", time: "10:00 AM", mode: "In-Person", interviewer: "HR Officer", status: "Scheduled" },
  { id: 2, candidate: "Akosua Owusu", job: "HR Assistant", date: "24 May 2025", time: "2:00 PM", mode: "Video Call", interviewer: "HR Officer", status: "Scheduled" },
  { id: 3, candidate: "Abena Sarpong", job: "Legal Counsel", date: "25 May 2025", time: "11:30 AM", mode: "In-Person", interviewer: "HR Officer", status: "Scheduled" },
  { id: 4, candidate: "Kofi Asante", job: "Network Engineer", date: "18 May 2025", time: "9:00 AM", mode: "Video Call", interviewer: "HR Officer", status: "Completed" },
];

export default async function InterviewsPage() {
  const session = await auth();
  if (!session || session.user.role !== "HR") redirect("/login");

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-[#0F766E] mb-1">HR Management</p>
          <h2 className="text-2xl font-extrabold text-slate-900">Interviews</h2>
          <p className="text-sm text-slate-500 font-medium mt-1">Schedule and manage candidate interviews.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-3 bg-[#0F766E] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0b5e58] transition-all">
          <Plus className="w-4 h-4" /> Schedule Interview
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {interviews.map(iv => (
          <div key={iv.id} className="card p-5 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-base font-extrabold text-slate-900">{iv.candidate}</p>
                <p className="text-sm font-medium text-slate-500 mt-0.5">{iv.job}</p>
              </div>
              <span className={`badge ${iv.status === "Scheduled" ? "badge-interview" : "badge-selected"}`}>{iv.status}</span>
            </div>
            <div className="space-y-2 mt-4">
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Calendar className="w-4 h-4 text-slate-400 shrink-0" />
                {iv.date} at {iv.time}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                {iv.mode === "Video Call"
                  ? <Video className="w-4 h-4 text-slate-400 shrink-0" />
                  : <MapPin className="w-4 h-4 text-slate-400 shrink-0" />}
                {iv.mode}
              </div>
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <Clock className="w-4 h-4 text-slate-400 shrink-0" />
                Interviewer: {iv.interviewer}
              </div>
            </div>
            <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
              <button className="flex-1 py-2 rounded-xl text-sm font-bold border border-slate-200 hover:bg-slate-50 text-slate-600 transition-all">Reschedule</button>
              <button className="flex-1 py-2 rounded-xl text-sm font-bold bg-[#0F766E] text-white hover:bg-[#0b5e58] transition-all">View Feedback</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
