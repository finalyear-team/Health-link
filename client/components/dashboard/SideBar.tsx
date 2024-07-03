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
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/types";

export const Sidebar = () => {
  const [showText, setShowText] = useState(true);
  const [sideBarOff, setSidebarOff] = useState(false);

  const pathname = usePathname();
  const [role, setRole] = useState("");
  const { user } = useAuth()
  // const { user } = useUser();

  useEffect(() => {
    // if (user && user.unsafeMetadata && user.unsafeMetadata.role) {
    //   if (user.unsafeMetadata.role === "provider") {
    //     setRole("doctor");
    //   } else {
    //     setRole("patient");
    //   }
    // }
    if (user && user.Role && user.Role === UserType.DOCTOR)
      setRole("doctor");
    if (user && user.Role && user.Role === UserType.PATIENT)
      setRole("patient");

  }, [user, pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 600) {
        setShowText(false);
      } else {
        setShowText(true);
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

  return (
    <div className="z-50 h-screen w-fit border border-stroke dark:border-slate-600 bg-white dark:bg-slate-950 dark:text-slate-50 flex flex-col justify-between shadow-sm z-">
      <div className="p-4 relative">
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
            className="w-8 h-8 auto pb-2 border-b"
          />
        </Link>
        <SideBarNavigation
          role={role}
          showText={showText}
          pathname={pathname}
        />
      </div>
      <TooltipProvider>
        <div></div>
        {/* <button>
          <div className="p-4">
            <div className="flex items-center space-x-2  text-red-600 font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className={`w-8 h-8 pl-2 flex items-center`}>
                <Tooltip>
                  <TooltipTrigger>
                    <MdOutlinePowerSettingsNew size={20} />
                  </TooltipTrigger>
                  <TooltipContent align="center" side="right" sideOffset={10}>Logout</TooltipContent>
                </Tooltip>
              </div>
              {showText && <div className="cursor-pointer">Logout</div>}
            </div>
          </div>
        </button> */}
        {/* <SignOutButton>
          <div className="p-4">
            <div className="flex items-center space-x-2  text-red-600 font-medium hover:bg-slate-50 dark:hover:bg-slate-800">
              <div className={`w-8 h-8 pl-2 flex items-center`}>
                <Tooltip>
                  <TooltipTrigger>
                    <MdOutlinePowerSettingsNew size={20} />
                  </TooltipTrigger>
                  <TooltipContent>Logout</TooltipContent>
                </Tooltip>
              </div>
              {showText && <div className="cursor-pointer">Logout</div>}
            </div>
          </div>
        </SignOutButton> */}
      </TooltipProvider>
    </div>
  );
};
