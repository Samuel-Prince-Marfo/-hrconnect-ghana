import type { NextAuthConfig } from "next-auth";
import { NextResponse } from "next/server";

export const authConfig = {
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const role = (auth?.user as { role?: string })?.role;

      const isOnAdminRoute = nextUrl.pathname.startsWith("/admin");
      const isOnHRRoute = nextUrl.pathname.startsWith("/hr");
      const isOnApplicantRoute = nextUrl.pathname.startsWith("/applicant");
      const isOnAuthRoute =
        nextUrl.pathname.startsWith("/login") ||
        nextUrl.pathname.startsWith("/register");

      // Anonymous users
      if (!isLoggedIn) {
        if (isOnAdminRoute || isOnHRRoute || isOnApplicantRoute) {
          return false; // Auto-redirect to /login
        }
        return true;
      }

      // Logged-in users visiting login or register page
      if (isOnAuthRoute) {
        const dest =
          role === "ADMIN"
            ? "/admin"
            : role === "HR"
            ? "/hr"
            : "/applicant";
        return NextResponse.redirect(new URL(dest, nextUrl));
      }

      // Role enforcement
      if (isOnAdminRoute && role !== "ADMIN") {
        const dest = role === "HR" ? "/hr" : "/applicant";
        return NextResponse.redirect(new URL(dest, nextUrl));
      }
      if (isOnHRRoute && role !== "HR") {
        const dest = role === "ADMIN" ? "/admin" : "/applicant";
        return NextResponse.redirect(new URL(dest, nextUrl));
      }
      if (isOnApplicantRoute && role !== "APPLICANT") {
        const dest = role === "ADMIN" ? "/admin" : "/hr";
        return NextResponse.redirect(new URL(dest, nextUrl));
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
