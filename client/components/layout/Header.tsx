"use client";

import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import { MdDehaze } from "react-icons/md";

const Header = () => {
  const { isSignedIn } = useUser();
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
        <div className="menu-toggle" onClick={toggleMenu}>
          <MdDehaze size={20} />
        </div>
        <div className="header__right horizontal_nav text-sm">
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
            <div className="header__right text-sm">
              {" "}
              <Link href={"/sign-in"}>Log in</Link>
              <Link href={"/sign-up"}>Sign up</Link>{" "}
            </div>
          ) : (
            <UserButton showName afterSignOutUrl="/sign-in" />
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
            <UserButton showName afterSignOutUrl="/sign-in" />
          )}
        </div>
      )}
    </nav>
  );
};

export default Header;
