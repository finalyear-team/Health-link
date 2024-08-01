import Link from "next/link";
import { BsTwitter, BsLinkedin, BsInstagram } from "react-icons/bs";
import { MdFacebook } from "react-icons/md";
import { Locate, MailOpen, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-primary-100  dark:text-gray-100 dark:bg-slate-900 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="grid gap-4">
            <h4 className="text-lg font-semibold">Services</h4>
            <nav className="grid gap-2">
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Blog
              </Link>
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Forum
              </Link>
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Chat
              </Link>
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Video Chat
              </Link>
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Feed
              </Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-5">
            <h4 className="text-lg font-semibold">About</h4>
            <nav className="grid gap-2">
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                About Us
              </Link>
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Services
              </Link>
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Careers
              </Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-4">
            <h4 className="text-lg font-semibold">Legal</h4>
            <nav className="grid gap-2">
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                className="hover:underline w-fit hover:text-primary-700"
                prefetch={false}
              >
                Terms of Service
              </Link>
            </nav>
          </div>
          <div className="flex flex-col space-y-5">
            <h4 className="text-lg font-semibold">Connect</h4>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className=" hover:text-primary-700"
                prefetch={false}
              >
                <MdFacebook className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className=" hover:text-primary-700"
                prefetch={false}
              >
                <BsTwitter className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className=" hover:text-primary-700"
                prefetch={false}
              >
                <BsLinkedin className="h-6 w-6" />
              </Link>
              <Link
                href="#"
                className=" hover:text-primary-700"
                prefetch={false}
              >
                <BsInstagram className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t-2 border-primary-700 pt-8 md:flex md:items-center md:justify-between">
          <div className="grid gap-4 md:flex md:items-center md:gap-8">
            <div className="flex items-center gap-2">
              <Phone className="h-6 w-6 " />
              <span>+251 910111213</span>
            </div>
            <div className="flex items-center gap-2">
              <MailOpen className="h-6 w-6 " />
              <span>support@healthlink.com</span>
            </div>
            <div className="flex items-center gap-2">
              <Locate className="h-6 w-6 " />
              <span>Bahir dar, Ethiopia</span>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-sm">
          <p>&copy; 2024 HealthLink. All rights reserved.</p>
          <div className="mt-2 flex items-center gap-4">
            <Link href="#" className="hover:underline" prefetch={false}>
              Privacy Policy
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Terms of Service
            </Link>
            <Link href="#" className="hover:underline" prefetch={false}>
              Disclaimer
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
