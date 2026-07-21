"use client";

import { useState } from "react";
import { applyToJob } from "@/lib/actions";
import { X, Loader2, Sparkles, FileText } from "lucide-react";

interface ApplyJobModalProps {
  jobId: string;
  jobTitle: string;
  companyName: string;
}

export default function ApplyJobModal({ jobId, jobTitle, companyName }: ApplyJobModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    fd.append("jobId", jobId);

    const result = await applyToJob(fd);
    setLoading(false);

    if (result.error) {
      setError(result.error);
    } else {
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setIsOpen(false);
      }, 1500);
    }
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="px-5 py-2.5 rounded-xl text-sm font-bold bg-[#0F766E] text-white hover:bg-[#0b5e58] transition-all shadow-sm cursor-pointer shrink-0"
      >
        Apply Now
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop overlay */}
          <div onClick={() => !loading && setIsOpen(false)} className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" />

          {/* Dialog Container */}
          <div className="relative w-full max-w-lg bg-white rounded-2xl border border-slate-200 shadow-2xl p-6 overflow-y-auto max-h-[90vh] animate-scale-in">
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-[#F59E0B]" />
                <div>
                  <h3 className="text-base font-extrabold text-slate-900">Submit Application</h3>
                  <p className="text-xs font-semibold text-slate-500 mt-0.5">{jobTitle} at {companyName}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                disabled={loading}
                className="p-1 rounded-lg text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {success ? (
              <div className="py-12 text-center space-y-3">
                <span className="inline-flex w-12 h-12 rounded-full bg-emerald-50 text-emerald-600 items-center justify-center text-2xl font-bold">✓</span>
                <p className="text-base font-extrabold text-slate-800">Application Submitted!</p>
                <p className="text-sm font-semibold text-slate-400">Your candidate portal has been updated.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl">
                    {error}
                  </div>
                )}

                <div className="p-4 bg-teal-50/50 border border-teal-150 rounded-xl space-y-1.5">
                  <div className="flex items-center gap-2 text-sm font-bold text-teal-800">
                    <FileText className="w-4 h-4 shrink-0" />
                    Applicant CV Info
                  </div>
                  <p className="text-xs text-teal-700 font-medium leading-relaxed">
                    By submitting, your global account contact information and registered resume will be shared with the recruiter for {companyName}.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Cover Letter (Optional)</label>
                  <textarea
                    name="coverLetter"
                    rows={5}
                    placeholder="Introduce yourself to the hiring team and highlight why you are a great fit..."
                    className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800 resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                  <button
                    type="button"
                    disabled={loading}
                    onClick={() => setIsOpen(false)}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold border border-slate-250 text-slate-650 hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-5 py-2.5 rounded-xl text-sm font-bold text-white bg-[#0F766E] hover:bg-[#0b5e58] disabled:opacity-50 flex items-center gap-2 shadow-md cursor-pointer"
                  >
                    {loading ? <><Loader2 className="w-4.5 h-4.5 animate-spin" /> Submitting...</> : "Submit Application"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
