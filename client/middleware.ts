import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
import { clerkClient } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/forgot-password",
    "/accessibility",
    "/blogs(.*)",
    "/faqs",
    "/feedback",
    "/partners",
    "/privacy-policy",
    "/security",
    "/terms-of-services",
    // "/sign-up(.*)",
  ],
  afterAuth: async (auth, req, evt) => {
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // public routes
    if (auth.isPublicRoute) {
      return NextResponse.next();
    }

    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }

    try {
      const user = await clerkClient.users.getUser(auth.userId as string);
      const role = user.unsafeMetadata.role;
      console.log("===============>", role);

      if (role === "provider") {
        if (req.url.startsWith("/dashboard/doctor")) {
          return NextResponse.next();
        } else {
          return NextResponse.rewrite(new URL("/dashboard/doctor", req.url));
        }
      } else if (role === "patient") {
        if (req.url.startsWith("/dashboard/patient")) {
          return NextResponse.next();
        } else {
          return NextResponse.rewrite(new URL("/dashboard/patient", req.url));
        }
      } else {
        // role does not match expected values
        console.error("Unknown role:", role);
        return NextResponse.rewrite(new URL("/error", req.url)); // Redirect to an error page or another route
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      return NextResponse.rewrite(new URL("/error", req.url)); // Redirect to an error page or another route
    }
  },
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
