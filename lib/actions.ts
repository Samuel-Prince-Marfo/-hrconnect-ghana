"use server";

import { signIn, signOut, auth } from "@/lib/auth";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";
import { registerSchema, loginSchema } from "@/lib/validations";
import bcrypt from "bcryptjs";
import { AuthError } from "next-auth";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const parsed = loginSchema.safeParse(data);
  if (!parsed.success) {
    return { error: "Invalid email or password format." };
  }

  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password." };
    }
    throw error;
  }

  // Determine redirect based on role
  const user = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (!user) return { error: "User not found." };

  const dest =
    user.role === "ADMIN"
      ? "/admin"
      : user.role === "HR"
      ? "/hr"
      : "/applicant";

  redirect(dest);
}

export async function register(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };

  const parsed = registerSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message;
    return { error: firstError ?? "Validation failed." };
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: parsed.data.email },
  });
  if (existingUser) {
    return { error: "An account with this email already exists." };
  }

  const hashedPassword = await bcrypt.hash(parsed.data.password, 12);

  await prisma.user.create({
    data: {
      name: parsed.data.name,
      email: parsed.data.email,
      password: hashedPassword,
      role: "APPLICANT",
    },
  });

  // Auto-login after registration
  try {
    await signIn("credentials", {
      email: parsed.data.email,
      password: parsed.data.password,
      redirect: false,
    });
  } catch {
    redirect("/login");
  }

  redirect("/applicant");
}

export async function logout() {
  await signOut({ redirectTo: "/login" });
}

export async function postJob(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "HR") {
    return { error: "Unauthorized access." };
  }

  const title = formData.get("title") as string;
  const department = formData.get("department") as string;
  const type = formData.get("type") as string;
  const salary = formData.get("salary") as string;
  const location = formData.get("location") as string;
  const deadline = formData.get("deadline") as string;
  const description = formData.get("description") as string;

  if (!title || !department || !type || !salary || !location || !deadline || !description) {
    return { error: "All fields are required." };
  }

  try {
    await prisma.job.create({
      data: {
        title,
        department,
        type,
        salary,
        location,
        deadline,
        description,
      },
    });

    revalidatePath("/hr/jobs");
    revalidatePath("/hr");
    revalidatePath("/applicant/jobs");
    revalidatePath("/applicant");
    return { success: true };
  } catch (error) {
    console.error("postJob error:", error);
    return { error: "Failed to post vacancy." };
  }
}

export async function applyToJob(formData: FormData) {
  const session = await auth();
  if (!session || session.user.role !== "APPLICANT") {
    return { error: "Unauthorized access. Please log in as an applicant." };
  }

  const jobId = formData.get("jobId") as string;
  const coverLetter = formData.get("coverLetter") as string;

  if (!jobId) {
    return { error: "Job vacancy ID is required." };
  }

  try {
    // Check if copy has already applied
    const existing = await prisma.application.findFirst({
      where: {
        jobId,
        applicantId: session.user.id,
      },
    });

    if (existing) {
      return { error: "You have already applied for this vacancy." };
    }

    await prisma.application.create({
      data: {
        jobId,
        applicantId: session.user.id,
        coverLetter,
        cvUrl: null, // Placeholder URL, Phase 2 upload later
      },
    });

    revalidatePath("/applicant/applications");
    revalidatePath("/applicant");
    revalidatePath("/hr/applications");
    revalidatePath("/hr");
    return { success: true };
  } catch (error) {
    console.error("applyToJob error:", error);
    return { error: "Failed to submit application." };
  }
}

export async function updateApplicationStatus(applicationId: string, status: string) {
  const session = await auth();
  if (!session || session.user.role !== "HR") {
    return { error: "Unauthorized access." };
  }

  try {
    await prisma.application.update({
      where: { id: applicationId },
      data: { status },
    });

    revalidatePath("/hr/applications");
    revalidatePath("/hr");
    revalidatePath("/applicant/applications");
    revalidatePath("/applicant");
    return { success: true };
  } catch (error) {
    console.error("updateApplicationStatus error:", error);
    return { error: "Failed to update status." };
  }
}

