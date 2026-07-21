import { PrismaClient, Role } from "@prisma/client";

import bcrypt from "bcryptjs";
import * as dotenv from "dotenv";

dotenv.config();


const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  const hashedAdmin = await bcrypt.hash("Admin@1234", 12);
  const hashedHR = await bcrypt.hash("HR@12345", 12);
  const hashedApplicant = await bcrypt.hash("App@1234", 12);

  await prisma.user.upsert({
    where: { email: "admin@hrms.gh" },
    update: {},
    create: {
      name: "System Administrator",
      email: "admin@hrms.gh",
      password: hashedAdmin,
      role: Role.ADMIN,
    },
  });

  await prisma.user.upsert({
    where: { email: "hr@hrms.gh" },
    update: {},
    create: {
      name: "HR Officer",
      email: "hr@hrms.gh",
      password: hashedHR,
      role: Role.HR,
    },
  });

  await prisma.user.upsert({
    where: { email: "applicant@hrms.gh" },
    update: {},
    create: {
      name: "John Mensah",
      email: "applicant@hrms.gh",
      password: hashedApplicant,
      role: Role.APPLICANT,
    },
  });

  console.log("✅ Seeding complete!");
  console.log("  Admin:     admin@hrms.gh     / Admin@1234");
  console.log("  HR:        hr@hrms.gh        / HR@12345");
  console.log("  Applicant: applicant@hrms.gh / App@1234");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
