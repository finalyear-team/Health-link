import Link from "next/link";
import React from "react";
import { BsTwitter, BsLinkedin } from "react-icons/bs";
import { MdFacebook } from "react-icons/md";
import Image from "next/image";

const Footer = () => {
  let currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer__custom">
        <div>
          <div>
            <Image
              src="/image/brand/logo-icon.svg"
              alt="HealthLink"
              width={100}
              height={150}
              className="auto"
            />
            &copy;
            {currentYear} All Rights Reserved.
          </div>
        </div>
      </div>
      <div className="footer__custom">
        <span className="footer__custome__title">User Support and Info</span>
        <div className="footer__custome__list">
          <Link href={"/faqs"}>FAQs</Link>
          <Link href={"/terms-of-service"}>Terms of Services</Link>
          <Link href={"/privacy-policy"}>Privacy Policy</Link>
          <Link href={"/security"}>Security</Link>
          <Link href={"/accessibility"}>Accessibility</Link>
        </div>
      </div>
      <div className="footer__custom">
        <span className="footer__custome__title">Resources</span>
        <div className="footer__custome__list">
          <Link href={"/blogs"}>Blogs</Link>
          <Link href={"/feedback"}>Feedback and Suggestion</Link>
          <Link href={"/partners"}>Partnership</Link>
        </div>
      </div>
      <div className="footer__custom">
        <span className="footer__custome__title">Contact us</span>
        <div className="footer__custome__list">
          <Link href={""}>contact@HealthLink.com</Link>
          <Link href={""}>+251908403423</Link>
          <div className="footer__custome__social">
            <Link href={""}>
              <MdFacebook size={20} />
            </Link>
            <Link href={""}>
              <BsTwitter size={20} />
            </Link>
            <Link href={""}>
              <BsLinkedin size={20} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
