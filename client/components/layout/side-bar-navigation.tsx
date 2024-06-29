import React from "react";
import NavItem from "../shared/nav-item";
import {
  MdGrid3X3,
  MdGridView,
  MdOutlineCalendarMonth,
  MdOutlineMarkUnreadChatAlt,
  MdOutlineForum,
  MdOutlineSettings,
  MdOutlineArticle,
  MdOutlineVideoChat,
} from "react-icons/md";

import { FaLaptopMedical } from "react-icons/fa6";

const SideBarNavigation = ({
  role,
  showText,
  pathname,
}: {
  role: string;
  showText: boolean;
  pathname: string;
}) => {
  return (
    <nav className="space-y-1 font-medium mt-2">
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
      {role === "patient" ? (
        <NavItem
          showText={showText}
          icon={<FaLaptopMedical size={20} />}
          text="Consultation"
          goto={`/dashboard/${role}/consultation`}
          isActive={pathname === `/dashboard/${role}/consultation`}
        />
      ) : (
        ""
      )}

      <NavItem
        showText={showText}
        icon={<MdOutlineMarkUnreadChatAlt size={20} />}
        text="Chat"
        goto={`/dashboard/${role}/chat`}
        isActive={pathname === `/dashboard/${role}/chat`}
      />
      <NavItem
        showText={showText}
        icon={<MdOutlineVideoChat size={20} />}
        text="Live"
        goto={`/dashboard/${role}/live`}
        isActive={pathname === `/dashboard/${role}/live`}
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
  );
};

export default SideBarNavigation;
