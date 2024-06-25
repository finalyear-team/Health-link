import React from "react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
          ? "border-l-4 rounded-tr-sm rounded-br-sm border-primary-600 text-primary-600 dark:text-primary-700 dark:border-primary-700 bg-primary-50 dark:bg-slate-800"
          : "text-dark-700 hover:bg-slate-50 dark:hover:bg-slate-800 dark:text-slate-50"
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
        <TooltipContent align="center" side="right" sideOffset={20}>
          {text}
        </TooltipContent>
      </Tooltip>
      {showText && <div className="">{text}</div>}
    </Link>
  </TooltipProvider>
);

export default NavItem;
