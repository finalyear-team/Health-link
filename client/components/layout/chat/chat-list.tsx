import React, { Dispatch, SetStateAction } from "react";
import Link from "next/link";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { UserType } from "@/types/types";
interface membersType {
  UserID: string
  Role: string
  Username: string
  FirstName: string
  LastName: string
  ProfilePicture?: string

}
export interface RecentChat {
  ChannelID: string
  ChannelName?: string
  Description?: string
  Disease?: string
  Member: membersType
}
interface RecentChatsProps {
  recentChats: RecentChat[] | null
  selectChat: Dispatch<SetStateAction<any>>
}




const RecentChats = ({ recentChats, selectChat }: RecentChatsProps) => {
  return (
    <div className="text-lg font-medium text-gray-900 dark:text-gray-50 border-r border-slate-200 bg-white p-4 dark:border-slate-600 dark:bg-slate-950">
      {!recentChats ? <>
        no chats yet
      </> : <>
        <div className="p-3 mb-2 border-b dark:border-slate-600 border-slate-200">
          Recent Chats
        </div>
        <div className="space-y-4">
          {recentChats.map(chat => <div>
            <button
              key={chat?.ChannelID}
              type="button"
              className="w-full flex items-center gap-3 rounded-lg bg-slate-100 p-3 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700"
              onClick={() => selectChat(chat)}
            >
              <Avatar className="h-10 w-10 border-2 border-[#00b894]">
                <AvatarImage src="/placeholder-user.jpg" />
                <AvatarFallback>{`${chat.Member.FirstName?.charAt(0).toUpperCase()}${chat.Member.LastName?.charAt(0).toUpperCase()}`}</AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <div className="text-sm font-medium text-gray-900 dark:text-gray-50">
                  {`${chat.Member.Role === UserType.DOCTOR ? "Dr." : ""}${chat.Member.FirstName} ${chat.Member.LastName}`}

                </div>

              </div>
              <Badge variant={"secondary"}>2</Badge>
            </button>


          </div>)}
        </div>

      </>
      }
    </div>
  );
};

export default RecentChats;
