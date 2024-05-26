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

import appointments from "@/public/data/appointment";
import { MdNotificationsNone } from "react-icons/md";
import { usePathname } from "next/navigation";

const Notification = () => {
  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger>
              <MdNotificationsNone size={20} />
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>Notification</TooltipContent>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Notification</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {appointments.map((appointment) => (
                <div key={appointment.key}>
                  <DropdownMenuItem>
                    <span>{appointment.description}</span>
                  </DropdownMenuItem>
                </div>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Notification;
