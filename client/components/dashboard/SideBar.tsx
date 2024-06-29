"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import SideBarNavigation from "../layout/side-bar-navigation";

import {
  MdOutlineMenuOpen,
  MdOutlinePlaylistRemove,
  MdOutlinePowerSettingsNew,
} from "react-icons/md";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Sidebar = () => {
  const [showText, setShowText] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      const storedShowText = localStorage.getItem("showText");
      return storedShowText === "true";
    }
    // default usecase for the showText
    return false;
  });

  const pathname = usePathname();
  const [role, setRole] = useState("");
  const { user } = useUser();

  useEffect(() => {
    if (user && user.unsafeMetadata && user.unsafeMetadata.role) {
      if (user.unsafeMetadata.role === "provider") {
        setRole("doctor");
      } else {
        setRole("patient");
      }
    }
  }, [user, pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setShowText(false);
      }
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Call the handler once to set the initial state
    handleResize();

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    // Update localStorage whenever 'showText' state changes
    localStorage.setItem("showText", showText.toString());
  }, [showText]);

  return (
    <div className="z-50 h-screen w-fit border border-stroke dark:border-slate-600 bg-white dark:bg-slate-950 dark:text-slate-50 flex flex-col justify-between shadow-sm">
      <div className="py-4 relative">
        <div className="absolute top-0 -right-9">
          <button
            className="w-10 h-10 text-white flex items-center justify-center"
            onClick={() => setShowText(!showText)}
          >
            {showText ? (
              <MdOutlineMenuOpen size={20} />
            ) : (
              <MdOutlinePlaylistRemove size={25} />
            )}
          </button>
        </div>
        <Link href="/">
          <Image
            src={`/image/brand/${showText ? "logo" : "logo-icon-sm"}.svg`}
            width={81}
            height={72}
            alt="Logo"
            className="w-8 h-8 auto pb-2 mx-4 border-b"
          />
        </Link>
        <SideBarNavigation
          role={role}
          showText={showText}
          pathname={pathname}
        />
      </div>
      <TooltipProvider>
        <SignOutButton>
          <div className="px-4 hover:bg-slate-50 dark:hover:bg-slate-800 py-1">
            <div className="flex items-center pl-2  text-red-600 font-medium ">
              <div className={`w-8 h-8 flex items-center`}>
                <Tooltip>
                  <TooltipTrigger>
                    <MdOutlinePowerSettingsNew size={20} />
                  </TooltipTrigger>
                  <TooltipContent align="center" side="right" sideOffset={20}>
                    Logout
                  </TooltipContent>
                </Tooltip>
              </div>
              {showText && <div className="cursor-pointer">Logout</div>}
            </div>
          </div>
        </SignOutButton>
      </TooltipProvider>
    </div>
  );
};
