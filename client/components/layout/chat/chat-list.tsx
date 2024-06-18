import React from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

const RecentChats = () => {
  return (
    <div className="text-lg font-medium text-gray-900 dark:text-gray-50 border-r border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-950">
      <div className="p-3 mb-2 border-b dark:border-slate-600 border-slate-200">
        Recent Chats
      </div>
      <div className="space-y-4">
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg bg-slate-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          prefetch={false}
        >
          <Avatar className="h-10 w-10 border-2 border-[#00b894]">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
              John Doe
            </div>
            <div className="text-xs text-slate-500 dark:text-gray-400">
              Hello, how are you feeling today?
            </div>
          </div>
          <Badge variant={"secondary"}>2</Badge>
        </Link>
        <Link
          href="#"
          className="flex items-center gap-3 rounded-lg bg-slate-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
          prefetch={false}
        >
          <Avatar className="h-10 w-10 border-2 border-[#00b894]">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>JS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
              Jane Smith
            </div>
            <div className="text-xs text-slate-500 dark:text-gray-400">
              I have a question about my medication.
            </div>
          </div>
          <Badge variant={"secondary"}>1</Badge>
        </Link>
      </div>
    </div>
  );
};

export default RecentChats;
