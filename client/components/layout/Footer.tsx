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
          <Link href={"/faqs"} className="hover:underline">FAQs</Link>
          <Link href={"/terms-of-service"} className="hover:underline">Terms of Services</Link>
          <Link href={"/privacy-policy"} className="hover:underline">Privacy Policy</Link>
          <Link href={"/security"} className="hover:underline">Security</Link>
          <Link href={"/accessibility"} className="hover:underline">Accessibility</Link>
        </div>
      </div>
      <div className="footer__custom">
        <span className="footer__custome__title">Resources</span>
        <div className="footer__custome__list">
          <Link href={"/blogs"} className="hover:underline">Blogs</Link>
          <Link href={"/feedback"} className="hover:underline">Feedback and Suggestion</Link>
          <Link href={"/partners"} className="hover:underline">Partnership</Link>
        </div>
      </div>
      <div className="footer__custom">
        <span className="footer__custome__title">Contact us</span>
        <div className="footer__custome__list">
          <Link href={""} className="hover:underline">contact@HealthLink.com</Link>
          <Link href={""} className="hover:underline">+251908403423</Link>
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
