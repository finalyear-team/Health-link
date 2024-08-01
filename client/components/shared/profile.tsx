// "use client"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { CreditCard, Settings, User } from "lucide-react";

// import {
//   MdOutlinePowerSettingsNew,
//   MdOutlineSecurity,
//   MdOutlineKey,
// } from "react-icons/md";

// import { SignOutButton } from "@clerk/nextjs";
// import { signout } from "@/Services/authService";
// import { useRouter, redirect } from "next/navigation";
// import Link from "next/link";

// const Profile = () => {
//   const router = useRouter()

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <TooltipTrigger>
//               <User className="mr-2 h-5 w-5" />
//             </TooltipTrigger>
//           </DropdownMenuTrigger>
//           <TooltipContent>Profile</TooltipContent>
//           <DropdownMenuContent className="w-56">
//             <DropdownMenuLabel>Profile</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Account</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <MdOutlineSecurity size={20} className="mr-2" />
//                 <span>Security</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <MdOutlineKey size={20} className="mr-2" />
//                 <span>Password</span>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem >
//               {/* <SignOutButton> */}
//               <Link href={"/sign-out"}>
//                 <div className="flex items-center space-x-2 text-red-400">
//                   <MdOutlinePowerSettingsNew size={20} />
//                   <span>Log out</span>
//                 </div>
//               </Link>
//               {/* </SignOutButton> */}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// export default Profile;
// "use client";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from "@/components/ui/tooltip";

// import { CreditCard, Settings, User } from "lucide-react";

// import {
//   MdOutlinePowerSettingsNew,
//   MdOutlineSecurity,
//   MdOutlineKey,
// } from "react-icons/md";

// // import { SignOutButton } from "@clerk/nextjs";
// import { signout } from "@/Services/authService";
// import { useRouter, redirect } from "next/navigation";
// import Link from "next/link";
// import useAuth from "@/hooks/useAuth";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// const Profile = () => {
//   const { user, isSignedIn, isLoaded } = useAuth();
//   const router = useRouter();

//   return (
//     <TooltipProvider>
//       <Tooltip>
//         <DropdownMenu>
//           <DropdownMenuTrigger asChild>
//             <TooltipTrigger>
//               {/* <User className="mr-2 h-5 w-5" /> */}
//               <Avatar>
//                 <AvatarImage src={user?.ProfilePicture} alt="user" />
//                 <AvatarFallback>
//                   {user?.FirstName.charAt(0).toUpperCase()}
//                   {user?.LastName.charAt(0).toUpperCase()}
//                 </AvatarFallback>
//               </Avatar>
//             </TooltipTrigger>
//           </DropdownMenuTrigger>
//           <TooltipContent>Profile</TooltipContent>
//           <DropdownMenuContent className="w-56">
//             <DropdownMenuLabel>Profile</DropdownMenuLabel>
//             <DropdownMenuSeparator />
//             <DropdownMenuGroup>
//               <DropdownMenuItem>
//                 <User className="mr-2 h-4 w-4" />
//                 <span>Account</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <Settings className="mr-2 h-4 w-4" />
//                 <span>Settings</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <MdOutlineSecurity size={20} className="mr-2" />
//                 <span>Security</span>
//               </DropdownMenuItem>
//               <DropdownMenuItem>
//                 <MdOutlineKey size={20} className="mr-2" />
//                 <span>Password</span>
//               </DropdownMenuItem>
//             </DropdownMenuGroup>
//             <DropdownMenuSeparator />
//             <DropdownMenuItem>
//               {/* <SignOutButton> */}
//               <Link href={"/sign-out"}>
//                 <div className="flex items-center space-x-2 text-red-400">
//                   <MdOutlinePowerSettingsNew size={20} />
//                   <span>Log out</span>
//                 </div>
//               </Link>
//               {/* </SignOutButton> */}
//             </DropdownMenuItem>
//           </DropdownMenuContent>
//         </DropdownMenu>
//       </Tooltip>
//     </TooltipProvider>
//   );
// };

// export default Profile;

"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CreditCard, Settings, User } from "lucide-react";
import {
  MdOutlinePowerSettingsNew,
  MdOutlineSecurity,
  MdOutlineKey,
} from "react-icons/md";

import { signout } from "@/Services/authService";
import { useRouter } from "next/navigation";
import Link from "next/link";
import useAuth from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Profile = () => {
  const { user, isSignedIn, isLoaded } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signout();
      router.push("/sign-in");
    } catch (error) {
      console.error("Sign out error:", error);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              <Avatar>
                <AvatarImage
                  src={user?.ProfilePicture}
                  alt="User Profile Picture"
                />
                <AvatarFallback>
                  {user?.FirstName.charAt(0).toUpperCase()}
                  {user?.LastName.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>Profile</TooltipContent>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>
              <div className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage
                    src={user?.ProfilePicture}
                    alt="User Profile Picture"
                  />
                  <AvatarFallback>
                    {user?.FirstName.charAt(0).toUpperCase()}
                    {user?.LastName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">
                    {user?.FirstName} {user?.LastName}
                  </div>
                  <div className="text-xs font-normal text-slate-600 dark:text-slate-500">@{user?.Username}</div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/account">
                  <div className="flex items-center space-x-2">
                    <User className="mr-2 h-4 w-4" />
                    <span>Account</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">
                  <div className="flex items-center space-x-2">
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/security">
                  <div className="flex items-center space-x-2">
                    <MdOutlineSecurity size={20} className="mr-2" />
                    <span>Security</span>
                  </div>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/password">
                  <div className="flex items-center space-x-2">
                    <MdOutlineKey size={20} className="mr-2" />
                    <span>Password</span>
                  </div>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              <div className="flex items-center space-x-2 text-red-400">
                <MdOutlinePowerSettingsNew size={20} />
                <span>Log out</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Profile;

