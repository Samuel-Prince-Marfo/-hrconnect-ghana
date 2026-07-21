import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/db";
import ApplicationsTable from "@/components/recruitment/ApplicationsTable";

export default async function ApplicationsPage() {
  const session = await auth();
  if (!session || session.user.role !== "HR") redirect("/login");

  const applications = await prisma.application.findMany({
    include: {
      job: {
        select: {
          title: true,
          department: true,
        }
      },
      applicant: {
        select: {
          name: true,
          email: true,
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-semibold text-[#0F766E] mb-1">HR Management</p>
        <h2 className="text-2xl font-extrabold text-slate-900">Applications</h2>
        <p className="text-sm text-slate-500 font-medium mt-1">Review and manage candidate applications.</p>
      </div>

      <ApplicationsTable initialApplications={applications} />
    </div>
  );
}
