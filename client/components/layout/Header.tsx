"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { MdDehaze } from "react-icons/md";
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
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

const Header = () => {
  // const { isSignedIn } = useUser();
  const { user, isSignedIn } = useAuth();

  console.log(user);
  console.log(isSignedIn);
  const [showMenu, setShowMenu] = useState(false);

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
                    <Link href={"/dashboard"} className="txt_dasbrd">
                      Dashboard
                    </Link>
                  ) : (
                    ""
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/dashboard/patient/consultation"}>
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
            <div>userbutton</div>
            // <UserButton showName afterSignOutUrl="/sign-in" />
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
