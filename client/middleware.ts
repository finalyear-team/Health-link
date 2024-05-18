import { NextResponse } from "next/server";
import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";

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
    "/sign-in",
  ],
  afterAuth(auth, req, evt) {

    // Handle users who aren't authenticated
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // console.log("User Role:", auth.user?.unsafeMetadata.role);

    if (auth.user?.unsafeMetadata.role === "provider") {
      // Allow provider to access dashboard/doctor
      if (req.url.startsWith("/dashboard/doctor")) {
        return NextResponse.next();
      } else {
        // Redirect doctor to their dashboard
        return NextResponse.redirect("/dashboard/doctor");
      }
    }

    if (auth.user?.unsafeMetadata.role === "patient") {
      // Allow patient to access dashboard/patient
      if (req.url.startsWith("/dashboard/patient")) {
        return NextResponse.next();
      } else {
        // Redirect patient to their dashboard
        return NextResponse.redirect("/dashboard/patient");
      }
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