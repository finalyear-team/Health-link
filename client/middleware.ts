// import { NextResponse } from "next/server";
// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";

// export default authMiddleware({
//   publicRoutes: [
//     "/",
//     "/forgot-password",
//     "/accessibility",
//     "/blogs(.*)",
//     "/faqs",
//     "/feedback",
//     "/partners",
//     "/privacy-policy",
//     "/security",
//     "/terms-of-services",
//     // "/sign-up(.*)",
//   ],
//   afterAuth: async (auth, req, evt) => {
//     // if logged in then directly redirect to dashboard
//     if (auth.userId) {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }

//     if (!auth.userId && !auth.isPublicRoute) {
//       return redirectToSignIn({ returnBackUrl: req.url });
//     }

//     // public routes
//     if (auth.isPublicRoute) {
//       return NextResponse.next();
//     }

//     // If the user is signed in and trying to access a protected route, allow them to access route
//     if (auth.userId && !auth.isPublicRoute) {
//       return NextResponse.next();
//     }

//     try {
//       const user = await clerkClient.users.getUser(auth.userId as string);
//       const role = user.unsafeMetadata.role;

//       if (role === "provider") {
//         if (req.url.startsWith("/dashboard/doctor")) {
//           return NextResponse.next();
//         } else {
//           return NextResponse.rewrite(new URL("/dashboard/doctor", req.url));
//         }
//       } else if (role === "patient") {
//         if (req.url.startsWith("/dashboard/patient")) {
//           return NextResponse.next();
//         } else {
//           return NextResponse.rewrite(new URL("/dashboard/patient", req.url));
//         }
//       } else {
//         // role does not match expected values
//         console.error("Unknown role:", role);
//         return NextResponse.rewrite(new URL("/error", req.url)); // Redirect to an error page or another route
//       }
//     } catch (error) {
//       console.error("Failed to fetch user:", error);
//       return NextResponse.rewrite(new URL("/error", req.url)); // Redirect to an error page or another route
//     }
//   },
// });

// export const config = {
//   matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
// };


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
  ],
  afterAuth: async (auth, req, evt) => {
    const url = new URL(req.url);

    if (auth.userId) {
      try {
        const user = await clerkClient.users.getUser(auth.userId);
        const role = user.unsafeMetadata.role;

        if (role === "provider" && !url.pathname.startsWith("/dashboard/doctor")) {
          return NextResponse.rewrite(new URL("/dashboard/doctor", req.url));
        } else if (role === "patient" && !url.pathname.startsWith("/dashboard/patient")) {
          return NextResponse.rewrite(new URL("/dashboard/patient", req.url));
        }

        return NextResponse.next();
      } catch (error) {
        console.error("Failed to fetch user:", error);
        return NextResponse.rewrite(new URL("/error", req.url));
      }
    } else {
      if (auth.isPublicRoute) {
        return NextResponse.next();
      } else {
        return redirectToSignIn({ returnBackUrl: req.url });
      }
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
