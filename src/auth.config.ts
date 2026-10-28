import type { NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";

export const authConfig = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || "7e476405-95cf-4a3f-a901-3f6f6700db49-reconstructed",
  debug: process.env.NODE_ENV === "development", // Enable debug in development
  trustHost: true, // Trust the host header
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token }: any) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.status = token.status as string;
        session.user.isAdmin = !!token.isAdmin;
        session.user.isOrganization = !!token.isOrganization;
      }
      return session;
    },
    async jwt({ token, user, trigger, session }: any) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.status = (user as any).status;
        token.isAdmin = (user as any).isAdmin;
        token.isOrganization = (user as any).isOrganization;
      }
      if (trigger === "update" && session) {
        const next = session as Record<string, unknown>;
        if (typeof next.role === "string") token.role = next.role;
        if (typeof next.status === "string") token.status = next.status;
        if (typeof next.isOrganization === "boolean") token.isOrganization = next.isOrganization;
        if (typeof next.isAdmin === "boolean") token.isAdmin = next.isAdmin;
      }
      return token;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth");
      const isPublicApiRoute =
        nextUrl.pathname.startsWith("/api/stats") ||
        nextUrl.pathname.startsWith("/api/projects") ||
        nextUrl.pathname.startsWith("/api/campaigns") ||
        nextUrl.pathname.startsWith("/api/lookup");
      const isPublicRoute =
        nextUrl.pathname === "/" ||
        nextUrl.pathname.startsWith("/campaigns") ||
        nextUrl.pathname.startsWith("/lookup") ||
        nextUrl.pathname.startsWith("/hoa-don") ||
        nextUrl.pathname.startsWith("/chung-tu") ||
        nextUrl.pathname.startsWith("/policy") ||
        nextUrl.pathname.startsWith("/gioi-thieu") ||
        nextUrl.pathname.startsWith("/huong-dan") ||
        nextUrl.pathname.startsWith("/t/");
      const isAuthRoute =
        nextUrl.pathname.startsWith("/auth/login") ||
        nextUrl.pathname.startsWith("/auth/register");

      if (isApiAuthRoute || isPublicApiRoute) return true;

      if (isAuthRoute) {
        if (!isLoggedIn) return true;
        const callbackUrl = nextUrl.searchParams.get("callbackUrl");
        if (callbackUrl && callbackUrl.startsWith("/") && !callbackUrl.startsWith("//")) {
          try {
            const parsedCallback = new URL(callbackUrl, nextUrl.origin);
            if (parsedCallback.origin === nextUrl.origin) {
              return Response.redirect(parsedCallback);
            }
          } catch {
            // Fall through to the safe default below.
          }
        }
        return Response.redirect(new URL("/", nextUrl));
      }

      if (!isLoggedIn && !isPublicRoute) return false;

      return true;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
} satisfies NextAuthConfig;
