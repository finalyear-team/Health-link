"use client";

import { FC, useState } from "react";
import {
  BadgeCheck,
  BellPlus,
  BookMarked,
  Bookmark,
  BookmarkCheck,
  Ellipsis,
  Flag,
  Heart,
  MessageCircle,
  MoveHorizontal,
  Share,
  ThumbsUp,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Image from "next/image";

import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

interface SocialMediaCardProps {
  profilePicture: string;
  name: string;
  isVerified: boolean;
  username: string;
  userType: string;
  postContent: string;
  postImage: string;
}

const SocialMediaCard: FC<SocialMediaCardProps> = ({
  profilePicture,
  name,
  isVerified,
  username,
  userType,
  postContent,
  postImage,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    // <Card className="border-0 shadow-lg max-w-lg">
    //   <div className="flex items-center">
    //     <Image
    //       src={profilePicture}
    //       alt={name}
    //       width={50}
    //       height={50}
    //       className="w-12 h-12 rounded-full mr-3 border border-stroke"
    //     />
    //     <div>
    //       <div className="flex items-center">
    //         <h2 className="font-semibold">{name}</h2>
    //         {isVerified && (
    //           <BadgeCheck className="w-4 h-4 text-secondary-600 ml-2" />
    //         )}
    //       </div>
    //       <div className="text-sm text-gray-500">
    //         @{username} - <Badge>{userType}</Badge>
    //       </div>
    //     </div>
    //     <div className="mx-2">
    //       <Button variant={"follow"}>Follow</Button>
    //     </div>
    //     <div className="ml-auto relative">
    //       <button
    //         onClick={() => setDropdownOpen(!dropdownOpen)}
    //         className="text-gray-500"
    //       >
    //         <Ellipsis className="w-6 h-6" />
    //       </button>
    //       {dropdownOpen && (
    //         <div className="absolute bg-slate-50 right-0 mt-2 w-40 border rounded shadow-lg">
    //           <button className="flex space-x-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
    //             <BookMarked className="w-4 h-4 mr-2" /> Save
    //           </button>
    //           <hr className="" />
    //           <button className="flex space-x-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
    //             <Flag className="w-4 h-4 mr-2" /> Report
    //           </button>
    //         </div>
    //       )}
    //     </div>
    //   </div>
    //   <p className="mt-4">{postContent}</p>
    //   {postImage && (
    //     <img src={postImage} alt="Post content" className="mt-4 rounded-lg" />
    //   )}

    //   <TooltipProvider>
    //     <div className="flex justify-around mt-4">
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <button>
    //             <Share className="w-4 h-4" />
    //           </button>
    //         </TooltipTrigger>
    //         <TooltipContent>
    //           <p>Share</p>
    //         </TooltipContent>
    //       </Tooltip>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <button>
    //             <ThumbsUp className="w-4 h-4" />
    //           </button>
    //         </TooltipTrigger>
    //         <TooltipContent>
    //           <p>Like</p>
    //         </TooltipContent>
    //       </Tooltip>
    //       <Tooltip>
    //         <TooltipTrigger asChild>
    //           <button>
    //             <MessageCircle className="w-4 h-4" />
    //           </button>
    //         </TooltipTrigger>
    //         <TooltipContent>
    //           <p>Comment</p>
    //         </TooltipContent>
    //       </Tooltip>
    //     </div>
    //   </TooltipProvider>
    // </Card>
    <Card className="shadow-lg max-w-lg">
      <CardHeader>
        <div className="flex items-center">
          <Image
            src={profilePicture}
            alt={name}
            width={50}
            height={50}
            className="w-12 h-12 rounded-full mr-3 border border-stroke"
          />
          <div>
            <div className="flex items-center">
              <h2 className="font-semibold">{name}</h2>
              {isVerified && (
                <BadgeCheck className="w-4 h-4 text-secondary-600 ml-2" />
              )}
            </div>
            <div className="text-sm text-slate-500 dark:text-slate-300">
              @{username} - <Badge>{userType}</Badge>
            </div>
          </div>
          <div className="mx-2">
            <Button variant={"follow"}>Follow</Button>
          </div>
          <div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Ellipsis className="w-6 h-6" />
                  <span className="sr-only">More options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Bookmark className="w-4 h-4 mr-2" />
                  Save
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>

      <CardContent>
        <p className="mt-4">{postContent}</p>
        {postImage && (
          <img src={postImage} alt="Post content" className="mt-4 rounded-lg" />
        )}
      </CardContent>

      <CardFooter>
        <TooltipProvider>
          <div className="flex justify-around mt-4">
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <ThumbsUp className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Like</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <MessageCircle className="w-4 h-4" />
                  <span className="sr-only">Like</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Comment</p>
              </TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Share className="w-4 h-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Share</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </CardFooter>
    </Card>
  );
};

export default SocialMediaCard;
