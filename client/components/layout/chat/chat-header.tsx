import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Video,
  Phone,
  Ellipsis,
  File,
  BookImage,
  Pill,
  Trash,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

const ChatHeader = () => {
  return (
    <div className="flex items-center justify-between border-b border-slate-300 dark:border-slate-600 p-3 mb-2">
      <div className="flex items-center gap-2">
        <Avatar className="h-8 w-8 border-2 border-[#00b894]">
          <AvatarImage src="/placeholder-user.jpg" />
          <AvatarFallback>JD</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <span className="text-sm font-medium text-gray-900 dark:text-gray-50">
            Dr. Jane Doe
          </span>
          <span className="text-xs text-slate-500 dark:text-gray-400">
            Online
          </span>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="icon">
          <Video className="h-5 w-5 text-[#00b894]" />
          <span className="sr-only">Video Call</span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <Ellipsis className="h-5 w-5 text-[#00b894]" />
              <span className="sr-only">More Options</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <File className="mr-2 h-4 w-4" />
              Share File
            </DropdownMenuItem>
            <DropdownMenuItem>
              <BookImage className="mr-2 h-4 w-4" />
              Share Image
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Pill className="mr-2 h-4 w-4" />
              View Prescription
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Trash className="mr-2 h-4 w-4" />
              Delete Chat
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default ChatHeader;
