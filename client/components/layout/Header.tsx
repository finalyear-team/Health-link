"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { MdDehaze } from "react-icons/md";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuSubTrigger,
  DropdownMenuSub,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const { isSignedIn } = useUser();
  
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
                  <Link href={""}>Find a Doctor</Link>
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
          <Link href={""} className="hover:underline">
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
            <UserButton showName afterSignOutUrl="/sign-in" />
          )}
        </div>
      </div>
    </nav>
  );
};

export default Header;
