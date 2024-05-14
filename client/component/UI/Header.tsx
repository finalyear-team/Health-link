import Link from "next/link";
import React from "react";
import Image from "next/image";
import { useUser, UserButton } from "@clerk/nextjs";
import Button from "./Button";

const Header = () => {
  const { isSignedIn } = useUser();

  return (
    <nav className=" header__custom ">
      <Link href={"/"}>
        <Image
          src="/image/Logo.png"
          alt="logo"
          width={120}
          height={100}
          priority={true}
          className="auto"
        />
      </Link>
      <div className="header__right text-sm">
        <Link href={"/dashboard"} className="txt_dasbrd">Dashboard</Link>
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
          <UserButton showName/>
        )}
      </div>
    </nav>
  );
};

export default Header;
