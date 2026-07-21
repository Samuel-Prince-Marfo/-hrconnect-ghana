"use client";

import { useState } from "react";
import { postJob } from "@/lib/actions";
import { Plus, X, Loader2, Sparkles } from "lucide-react";

export default function PostJobModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const result = await postJob(fd);
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
        className="flex items-center gap-2 px-5 py-3 bg-[#0F766E] text-white text-sm font-bold rounded-xl shadow-md hover:bg-[#0b5e58] transition-all cursor-pointer"
      >
        <Plus className="w-4.5 h-4.5" /> Post New Vacancy
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
                <h3 className="text-lg font-extrabold text-slate-900">Post Vacancy</h3>
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
                <p className="text-base font-extrabold text-slate-800">Job Posted Successfully!</p>
                <p className="text-sm font-semibold text-slate-400">Updating vacancy register...</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 pt-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold rounded-xl">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Job Title</label>
                  <input
                    name="title"
                    type="text"
                    required
                    placeholder="e.g. Senior Frontend Developer"
                    className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Department</label>
                    <select
                      name="department"
                      required
                      className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800"
                    >
                      <option value="ICT">ICT</option>
                      <option value="Human Resources">Human Resources</option>
                      <option value="Finance">Finance</option>
                      <option value="Legal">Legal</option>
                      <option value="Operations">Operations</option>
                      <option value="Marketing">Marketing</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Job Type</label>
                    <select
                      name="type"
                      required
                      className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800"
                    >
                      <option value="Full-time">Full-time</option>
                      <option value="Part-time">Part-time</option>
                      <option value="Contract">Contract</option>
                      <option value="Remote">Remote</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Salary Range</label>
                    <input
                      name="salary"
                      type="text"
                      required
                      placeholder="e.g. GH₵ 4,000 - 6,000/mo"
                      className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Location</label>
                    <input
                      name="location"
                      type="text"
                      required
                      placeholder="e.g. Accra, Greater Accra"
                      className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Application Deadline</label>
                  <input
                    name="deadline"
                    type="date"
                    required
                    className="w-full px-4 py-3 text-sm font-medium bg-white border border-slate-200 rounded-xl focus:outline-none focus:border-[#0F766E] focus:ring-2 focus:ring-[#0F766E]/10 text-slate-800"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Job Description</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Provide a detailed description of the role, responsibilities, and requirements..."
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
                    {loading ? <><Loader2 className="w-4 h-4 animate-spin" /> Posting...</> : "Post Vacancy"}
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
