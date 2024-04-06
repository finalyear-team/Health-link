import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="header__custom">
      <div >
        <div className="font-bold text-primary-600 text-lg">HealthLink.</div>
      </div>
      <div className="header__right font-medium">
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
