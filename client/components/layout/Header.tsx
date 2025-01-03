"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { MdDehaze, MdOutlineKey, MdOutlinePowerSettingsNew, MdOutlineSecurity } from "react-icons/md";
import { useQuery } from "@apollo/client";
import { GET_SIGNEDIN_USER } from "@/graphql/queries/userQueries";
import { refreshAccessToken } from "@/Services/authService";
import useAuth from "@/hooks/useAuth";
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
import { Button } from "../ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";

const Header = () => {
  // const { isSignedIn } = useUser();
  const userInformation=useUserStore()
  const { user, isSignedIn } = useAuth();

  console.log(user);
  console.log(isSignedIn);
  const [showMenu, setShowMenu] = useState(false);
  const router = useRouter()
  const handleSignOut = () => {
    router.push("/sign-out")

  }

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <nav className="header__custom">
      <Link href={"/"}>
        <Image
          src="/image/brand/logo.svg"
          alt="logo"
          width={150}
          height={70}
          priority={true}
          className="auto"
        />
      </Link>
      <div>
        <div className="menu-toggle">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">
                <MdDehaze className="w-6 h-6" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Health Link</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem>
                  {isSignedIn ? (
                    <Link href={`${user.Role}/${user.UserID}`} className="txt_dasbrd">
                      Dashboard
                    </Link>
                  ) : (
                    ""
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/patient/consultation"}>
                    Find a Doctor
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={""}>Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={""}>About us</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/sign-in"}>Log in</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/sign-up"}>Sign up</Link>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <div className="header__right horizontal_nav text-sm">
          {isSignedIn ? (
            <Link href={"/dashboard"} className="txt_dasbrd">
              Dashboard
            </Link>
          ) : (
            ""
          )}
          <Link href={"/dashboard/patient/consultation"} className="hover:underline">
            Find a Doctor
          </Link>
          <Link href={""} className="hover:underline">
            Services
          </Link>
          <Link href={""} className="hover:underline">
            About us
          </Link>
          {!isSignedIn ? (
            <div className="header__right text-sm">
              {" "}
              <Link href={"/sign-in"} className="hover:underline">
                Log in
              </Link>
              <Link href={"/sign-up"} className="hover:underline">
                Sign up
              </Link>{" "}
            </div>
          ) : (
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
                        <Link href={`/dashboard/${user?.Role}/setting`}>
                          <div className="flex items-center space-x-2">
                            <User className="mr-2 h-4 w-4" />
                            <span>Account</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/${user?.Role}/setting`}>
                          <div className="flex items-center space-x-2">
                            <Settings className="mr-2 h-4 w-4" />
                            <span>Settings</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/${user?.Role}/setting`}>
                          <div className="flex items-center space-x-2">
                            <MdOutlineSecurity size={20} className="mr-2" />
                            <span>Security</span>
                          </div>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/dashboard/${user?.Role}/setting`}>
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
          )}
        </div>
      </div>
      {showMenu && (
        <div className="sidebar text-sm">
          {isSignedIn ? (
            <Link href={"/dashboard"} className="txt_dasbrd">
              Dashboard
            </Link>
          ) : (
            ""
          )}
          <Link href={""}>Find a Doctor</Link>
          <Link href={""}>Services</Link>
          <Link href={""}>About us</Link>
          {!isSignedIn ? (
            <div className="flex flex-col">
              {" "}
              <Link href={"/sign-in"}>Log in</Link>
              <Link href={"/sign-up"}>Sign up</Link>{" "}
            </div>
          ) : (
            <div>userbutton</div>
            // <UserButton showName afterSignOutUrl="/sign-in" />
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
