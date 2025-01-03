import { ref } from "firebase/storage";
import { NextRequest, NextResponse } from "next/server";

const publicRoutes= [
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
    "/sign-in",
    "/sign-up(.*)",
  ]


const validateAccessToken=async(access_token:string)=>{
    try {
        const response = await fetch(`http://localhost:4000/auth/validate`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${access_token}`,
            },
          });
      
          if (response.ok) {
            return true;
          }

          
        } catch (error:any) {
            console.error("Access token validation error:", error?.message);
            
        }
        return false

}
const refreshAccessToken=async(refresh_token:string)=>{
    try {
        console.log(refresh_token)
        const response = await fetch(`http://localhost:4000/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({  refresh_token }),
        });
    
        if (response.ok) {
          return await response.json();
        }
      } catch (error:any) {
        console.error("Refresh token error:", error.message);
      }
      return null;
  

}

export default async function middleware(req: NextRequest) {
    const {pathname} = req.nextUrl
    const res=NextResponse.next()
    const access_token = req.cookies.get("access_token")?.value;
    const refresh_token = req.cookies.get("refresh_token")?.value;
    console.log("refresh_token")
    console.log(refresh_token)


    if (publicRoutes.some((route) => new RegExp(`^${route}$`).test(pathname))) {
        return NextResponse.next();
      }
    
      if (!access_token && !refresh_token) {
        const url = req.nextUrl.clone();
        url.pathname = "/sign-in";
        url.searchParams.set("redirect", pathname); // Preserve original path
        return NextResponse.redirect(url);
      }

      try {
            
      if (access_token && (await validateAccessToken(access_token))) {
        return NextResponse.next();
      }

      if(refresh_token) {
        const newTokens=await refreshAccessToken(refresh_token)
        console.log(newTokens)        
        if(newTokens&&newTokens.access_token)
            res.cookies.set("access_token",newTokens.access_token,{
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 15 * 60 * 1000),
                path: '/'
            })
            
        if(newTokens&&newTokens.refresh_token)   
            res.cookies.set("refresh_token",newTokens.refresh_token,{
                httpOnly: true,
                secure: true,
                sameSite: 'none',
                expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                path: '/',
              })

              return res


      }
    }
     catch (error:any) {
        console.error("Middleware authentication error:", error.message);
        const url = req.nextUrl.clone();
        url.pathname = "/sign-in";
        url.searchParams.set("redirect", pathname);
        return NextResponse.redirect(url);
      }
        
    }



export const config = {
    matcher: [
        '/patient/:path*',
        '/profile/:path*',
        '/doctor/:path*',
      ]
  };



// export default authMiddleware({
 
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
