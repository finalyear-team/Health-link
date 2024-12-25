import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware, redirectToSignIn } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";



export default function middleware(req: NextRequest) {



}



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
//     "/sign-in",
//     "/sign-up(.*)",
//   ],
//   afterAuth: async (auth, req, evt) => {
//       const url = new URL(req.url);

//       if (auth.userId) {
//         try {
//           const user = await clerkClient.users.getUser(auth.userId);
//           const role = user.unsafeMetadata.role;

//     if (url.pathname.startsWith("/user/")) {
//       return NextResponse.next();
//     }

//     if (
//       role === "provider" &&
//       !url.pathname.startsWith("/dashboard/doctor")
//     ) {
//       return NextResponse.rewrite(new URL("/dashboard/doctor", req.url));
//     } else if (
//       role === "patient" &&
//       !url.pathname.startsWith("/dashboard/patient")
//     ) {
//       return NextResponse.rewrite(new URL("/dashboard/patient", req.url));
//     }

//           return NextResponse.next();
//         } catch (error) {
//           console.error("Failed to fetch user:", error);
//           return NextResponse.rewrite(new URL("/error", req.url));
//         }
//       } else {
//         if (auth.isPublicRoute) {
//           return NextResponse.next();
//         } else {
//           return redirectToSignIn({ returnBackUrl: req.url });
//         }
//       }
//   },
// });

// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };
