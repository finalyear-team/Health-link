"use client"
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

import { SignOutButton } from "@clerk/nextjs";
import { signout } from "@/Services/authService";
import { useRouter, redirect } from "next/navigation";
import Link from "next/link";

const Profile = () => {
  const router = useRouter()

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              <User className="mr-2 h-5 w-5" />
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>Profile</TooltipContent>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Profile</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdOutlineSecurity size={20} className="mr-2" />
                <span>Security</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <MdOutlineKey size={20} className="mr-2" />
                <span>Password</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem >
              {/* <SignOutButton> */}
              <Link href={"/sign-out"}>
                <div className="flex items-center space-x-2 text-red-400">
                  <MdOutlinePowerSettingsNew size={20} />
                  <span>Log out</span>
                </div>
              </Link>
              {/* </SignOutButton> */}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Profile;
