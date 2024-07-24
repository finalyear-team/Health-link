"use client";

import { useEffect, useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";
import { PopoverNotification } from "@/types";
import Link from "next/link";
import { BellOff } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import useAuth from "@/hooks/useAuth";
import { NotificationStatus, NotificationType, UserType } from "@/types/types";
import { useMutation, useQuery } from "@apollo/client";
import { GET_USER_NOTIFICATION } from "@/graphql/queries/notificationQueries";
import { date } from "yup";
import { formatDistanceToNow } from "date-fns";
import { io } from "socket.io-client";
import { UPDATE_NOTIFICATION_MUTATION } from "@/graphql/mutations/notificationMutation";

const Notification = () => {
  const { user } = useAuth()
  const Role = user?.Role === UserType.PATIENT ? "patient" : "doctor";
  const { data, loading, error, refetch } = useQuery(GET_USER_NOTIFICATION, {
    variables: {
      UserID: user?.UserID
    }
  })
  const pathname = usePathname()
  console.log(pathname)

  const [open, setOpen] = useState(false)

  const [updateNotification, { data: updateNotificationData, loading: updateNotificationLoading, error: updateNotificationError }] = useMutation(UPDATE_NOTIFICATION_MUTATION, {
    onCompleted: (data) => {
      refetch()

    },
    onError: (error) => {
      console.log(error)
    }
  })


  const router = useRouter()
  const notificationsData = data?.UserNotification

  console.log(notificationsData)


  function generateLink(
    notificationType: NotificationType,
    id?: string
  ): string {
    switch (notificationType) {
      case NotificationType.NEW_APPOINTMENT:
        return `/dashboard/${Role}/appointment`;
      case NotificationType.CANCEL_APPOINTMENT:
        return pathname
      case NotificationType.ACCEPT_APPOINTMENT:
        return `/dashboard/${Role}/appointment`;
      case NotificationType.NEW_POST:
        return `/dashboard/${Role}/feed`;
      case NotificationType.NEW_FORUM_ANSWER:
        return `/dashboard/${Role}/forum`;
      case NotificationType.NEW_FORUMQUESTION:
        return `/dashboard/${Role}/forum`;
      case NotificationType.NEW_CHAT:
        return `/dashboard/${Role}/chat/`;
      case NotificationType.NEW_VIDEOCALL:
        return `/dashboard/${Role}/live/`;
      case NotificationType.NEW_COMMENT:
        return `/dashboard/${Role}/posts/`;
      default:
        return "/";
    }
  }




  useEffect(() => {
    if (!user)
      return
    const socket = io("http://localhost:4000", {
      query: {
        userId: user?.UserID,
      }
    })
    socket.on("connect", () => {
      console.log("connected")
    });
    socket.on("notification", ({ message }) => {
      console.log("come on man")
      console.log(message)
      if (message)
        refetch()
    })

    return () => {
      socket.disconnect();
    };
  }, [user])

  return (
    <TooltipProvider>
      <Tooltip>
        <DropdownMenu open={open} onOpenChange={setOpen}>
          <DropdownMenuTrigger asChild>
            <TooltipTrigger className="relative">
              <MdNotificationsNone size={20} />
              {notificationsData && notificationsData.length > 0 &&
                <div className="w-[10px] h-[10px] rounded-[100%] bg-red-600  absolute left-[80%] top-0"></div>
              }
            </TooltipTrigger>
          </DropdownMenuTrigger>
          <TooltipContent>Notification</TooltipContent>
          <DropdownMenuContent className="w-80">
            <DropdownMenuLabel>Notification</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              {notificationsData?.length > 0 ? (
                notificationsData?.map((notification: any) => (
                  <div key={notification.NotificationID}>
                    <DropdownMenuItem
                      className={`border-l-4 border-y-1 border-r-1 my-1 ${notification.Status === "read"
                        ? " border-l-secondary-600"
                        : "border-l-yellow-500"
                        }`}
                      onClick={async () => {
                        await updateNotification({
                          variables: {
                            updateNotificationInput: {
                              NotificationID: notification.NotificationID,
                              ReadAt: new Date(),
                              Status: NotificationStatus.Read,
                            }
                          }
                        });
                        setOpen(false)
                        console.log(notification?.NotificationType)
                        console.log(generateLink(notification.notificationType))
                        // router.push(generateLink(notification.notificationType))
                      }}
                    >
                      <button className="w-full">
                        <p>{notification.Message}</p>
                        <span className="text-xs flex items-end justify-end mt-1 text-slate-600 dark:text-slate-400 italic">
                          {formatDistanceToNow(new Date(parseInt(notification.CreatedAt)))}
                        </span>
                      </button>
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
