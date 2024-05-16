"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { SignOutButton } from "@clerk/nextjs";
import {
  MdGrid3X3,
  MdGridView,
  MdNotificationsNone,
  MdOutlineCalendarMonth,
  MdOutlineMarkUnreadChatAlt,
  MdOutlineForum,
  MdOutlineSettings,
  MdOutlinePowerSettingsNew,
  MdOutlineArticle,
  MdOutlineMenuOpen,
  MdOutlinePlaylistRemove,
} from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const Sidebar = () => {
  const [showText, setShowText] = useState(true);
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

  return (
    <div className="z-50 h-screen w-fit border border-stroke bg-white text-white flex flex-col justify-between shadow-sm z-">
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
        <nav className="space-y-4 font-medium mt-2">
          <NavItem
            showText={showText}
            icon={<MdGridView size={20} />}
            text="Home"
            goto={`/dashboard/${role}`}
            isActive={pathname === `/dashboard/${role}`}
          />
          <NavItem
            showText={showText}
            icon={<MdGrid3X3 size={20} />}
            text="Feed"
            goto={`/dashboard/${role}/feed`}
            isActive={pathname === `/dashboard/${role}/feed`}
          />
          <NavItem
            showText={showText}
            icon={<MdOutlineArticle size={20} />}
            text="Blog"
            goto={`/dashboard/${role}/blog`}
            isActive={pathname === `/dashboard/${role}/blog`}
          />

          <NavItem
            showText={showText}
            icon={<MdOutlineCalendarMonth size={20} />}
            text="Appointment"
            goto={`/dashboard/${role}/appointment`}
            isActive={pathname === `/dashboard/${role}/appointment`}
          />

          <NavItem
            showText={showText}
            icon={<MdNotificationsNone size={20} />}
            text="Notification"
            goto={`/dashboard/${role}/notification`}
            isActive={pathname === `/dashboard/${role}/notification`}
          />

          <NavItem
            showText={showText}
            icon={<MdOutlineMarkUnreadChatAlt size={20} />}
            text="Chat"
            goto={`/dashboard/${role}/chat`}
            isActive={pathname === `/dashboard/${role}/chat`}
          />

          <NavItem
            showText={showText}
            icon={<MdOutlineForum size={20} />}
            text="Forum"
            goto={`/dashboard/${role}/forum`}
            isActive={pathname === `/dashboard/${role}/forum`}
          />
          <NavItem
            showText={showText}
            icon={<MdOutlineSettings size={20} />}
            text="Setting"
            goto={`/dashboard/${role}/setting`}
            isActive={pathname === `/dashboard/${role}/setting`}
          />
        </nav>
      </div>
      <TooltipProvider>
        <SignOutButton>
          <div className="flex items-center space-x-2 p-4">
            <div
              className={`w-8 h-8 flex items-center text-red-600 hover:bg-red-50 justify-center`}
            >
              <Tooltip>
                <TooltipTrigger>
                  <MdOutlinePowerSettingsNew size={20} />
                </TooltipTrigger>
                <TooltipContent>Logout</TooltipContent>
              </Tooltip>
            </div>
            {showText && <div className="text-red-600 font-medium cursor-pointer">Logout</div>}
          </div>
        </SignOutButton>
      </TooltipProvider>
    </div>
  );
};

export const Sidebar2 = (showText: boolean) => {
  return <div className={`${showText ? "w-[200px]" : "w-24"}`}></div>;
};

const NavItem = ({
  showText,
  icon,
  text,
  goto,
  isActive,
}: {
  showText: boolean;
  icon: JSX.Element;
  text: string;
  goto: string;
  isActive: boolean;
}) => (
  <TooltipProvider>
    <Link
      href={goto}
      className={`flex items-center space-x-2 pr-4 ${
        isActive
          ? "border-l-4 border-primary-600 text-primary-600 bg-primary-50"
          : "text-dark-700 hover:bg-slate-50"
      }`}
    >
      <Tooltip>
        <TooltipTrigger>
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center `}
          >
            {icon}
          </div>
        </TooltipTrigger>
        <TooltipContent>{text}</TooltipContent>
      </Tooltip>
      {showText && <div className="">{text}</div>}
    </Link>
  </TooltipProvider>
);

// export default Sidebar;
