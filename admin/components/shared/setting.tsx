import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { CreditCard, Settings, User, Keyboard } from "lucide-react";

import { MdOutlineSettings } from "react-icons/md";
import Link from "next/link";

const Appointment = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              <MdOutlineSettings size={20} />
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>Setting</TooltipContent>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Setting</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <span>Account</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Keyboard className="mr-2 h-4 w-4" />
                <span>Video</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Appointment;
