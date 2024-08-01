import React from "react";
import NavItem from "../shared/nav-item";
import { MdGridView, MdOutlineSettings } from "react-icons/md";
import { UserCog, CalendarCog, FileCog, Flag } from "lucide-react";

const SideBarNavigation = ({
  showText,
  pathname,
}: {
  showText: boolean;
  pathname: string;
}) => {
  return (
    <nav className="space-y-1 font-medium mt-2">
      <NavItem
        showText={showText}
        icon={<MdGridView size={20} />}
        text="Analytics"
        goto={`/dashboard`}
        isActive={pathname === `/dashboard`}
      />
      <NavItem
        showText={showText}
        icon={<UserCog className="w-5 h-5" />}
        text="Users"
        goto={`/dashboard/users`}
        isActive={pathname === `/dashboard/users`}
      />
      <NavItem
        showText={showText}
        icon={<CalendarCog className="w-5 h-5" />}
        text="Appointments"
        goto={`/dashboard/appointments`}
        isActive={pathname === `/dashboard/appointments`}
      />

      <NavItem
        showText={showText}
        icon={<Flag size={20} />}
        text="Reports"
        goto={`/dashboard/reports`}
        isActive={pathname === `/dashboard/reports`}
      />

      <NavItem
        showText={showText}
        icon={<MdOutlineSettings size={20} />}
        text="Setting"
        goto={`/dashboard/setting`}
        isActive={pathname === `/dashboard/setting`}
      />
    </nav>
  );
};

export default SideBarNavigation;
