import Link from "next/link";
import React from "react";
import Image from "next/image";

const Header = () => {
  return (
    <nav className=" header__custom ">
      <Link href={"/"} >
        <Image src='/image/Logo.png' alt="logo" width={200} height={100} />
      </Link>
      <div className="header__right text-sm">
        <Link href={''}>Find a Doctor</Link>
        <Link href={''}>Services</Link>
        <Link href={''}>About us</Link>
        <Link href={'/login'}>Log in</Link>
        <Link href={'/signup'}>Sign up</Link>
      </div>
    </nav>
  );
};

export default Header;
