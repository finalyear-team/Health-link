import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <nav className="header__custom">
      <div >
        <div className="font-bold text-primary-600 text-lg">HealthLink.</div>
      </div>
      <div className="header__right">
        <Link href={''}>Find Doctor</Link>
        <Link href={''}>Services</Link>
        <Link href={''}>lorem</Link>
        <Link href={''}>lorems</Link>
      </div>
    </nav>
  );
};

export default Header;
