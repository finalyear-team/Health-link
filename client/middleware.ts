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
    "/sign-up(.*)",
  ],
  afterAuth: async (auth, req, evt) => {
    // Fetch user asynchronously and handle errors
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
      }

      if (role === "patient") {
        if (req.url.startsWith("/dashboard/patient")) {
          return NextResponse.next();
        } else {
          return NextResponse.rewrite(new URL("/dashboard/patient", req.url));
        }
      }
    } catch (error) {
      console.error("Failed to fetch user:", error);
      // Handle error appropriately (e.g., redirect to an error page)
    }

    // If the user is signed in and trying to access a protected route, allow them to access route
    if (auth.userId && !auth.isPublicRoute) {
      return NextResponse.next();
    }
    // Allow users visiting public routes to access them
    return NextResponse.next();
  },
});

export const config = {
  matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
