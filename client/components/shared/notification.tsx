"use client";

import { useState } from "react";
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
import { PopoverNotification } from "@/types";
import Link from "next/link";
import { BellOff } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import { NotificationType } from "@/types";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/types";

const Notification = () => {
  const { user } = useAuth()
  const Role = user?.Role === UserType.PATIENT ? "patient" : "doctor";

  function generateLink(
    notificationType: NotificationType,
    id: string
  ): string {
    switch (notificationType) {
      case NotificationType.newAppointment:
      case NotificationType.cancelAppointment:
      case NotificationType.acceptAppointment:
        return `/dashboard/${Role}/appointment/${id}`;
      case NotificationType.newPost:
        return `/dashboard/${Role}/feed/${id}`;
      case NotificationType.newForumQuestion:
        return `/dashboard/${Role}/forum/${id}`;
      case NotificationType.newForumAnswer:
        return `/dashboard/${Role}/forum/${id}`;
      case NotificationType.newChat:
        return `/dashboard/${Role}/chat/`;
      case NotificationType.newVideoCall:
        return `/dashboard/${Role}/live/`;
      case NotificationType.newComment:
        return `/dashboard/${Role}/posts/${id}`;
      default:
        return "/";
    }
  }

  const notificationsData: PopoverNotification[] = [
    {
      NotificationID: "1",
      UserID: "user123",
      Message: "Your appointment has been accepted.",
      CreatedAt: "4 minute ago",
      UpdatedAt: "1 minute ago",
      Link: generateLink(NotificationType.acceptAppointment, "1"),
      Type: NotificationType.acceptAppointment,
      Status: "unread",
    },
    {
      NotificationID: "2",
      UserID: "user456",
      Message: "A new post has been made by someone you follow.",
      CreatedAt: "30 minute ago",
      UpdatedAt: "5 minute ago",
      Link: generateLink(NotificationType.newPost, "2"),
      Type: NotificationType.newPost,
      Status: "unread",
    },
    {
      NotificationID: "3",
      UserID: "user123",
      Message: "Your appointment has been cancelled.",
      CreatedAt: "2 minutes ago",
      UpdatedAt: "1 minutes ago",
      Link: generateLink(NotificationType.cancelAppointment, "3"),
      Type: NotificationType.cancelAppointment,
      Status: "read",
    },
  ];
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
              {notificationsData.length > 0 ? (
                notificationsData.map((notification) => (
                  <div key={notification.NotificationID}>
                    <DropdownMenuItem
                      className={`border-l-4 border-y-1 border-r-1 my-1 ${notification.Status === "read"
                        ? " border-l-secondary-600"
                        : "border-l-yellow-500"
                        }`}
                    >
                      <Link href={notification.Link} className="w-full">
                        <p>{notification.Message}</p>
                        <span className="text-xs flex items-end justify-end mt-1 text-slate-600 dark:text-slate-400 italic">
                          {notification.CreatedAt}
                        </span>
                      </Link>
                    </DropdownMenuItem>
                  </div>
                ))
              ) : (
                <div className="flex items-center justify-center text-slate-500 min-h-20">
                  <BellOff className="w-4 h-4 mr-2" /> No notification
                </div>
              )}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Tooltip>
    </TooltipProvider>
  );
};

export default Notification;
