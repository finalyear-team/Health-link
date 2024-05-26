"use client";

import { FC, useState } from "react";
import { Card } from "../ui/card";
import {
  BadgeCheck,
  BellPlus,
  BookMarked,
  Ellipsis,
  Flag,
  MessageCircle,
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
    <Card className="shadow rounded-lg p-4 mb-4 max-w-lg">
      <div className="flex items-center">
        <img
          src={profilePicture}
          alt={name}
          className="w-12 h-12 rounded-full mr-3 border border-stroke"
        />
        <div>
          <div className="flex items-center">
            <h2 className="font-semibold">{name}</h2>
            {isVerified && (
              <BadgeCheck className="w-4 h-4 text-secondary-600 ml-2" />
            )}
          </div>
          <div className="text-sm text-gray-500">
            @{username} - <Badge>{userType}</Badge>
          </div>
        </div>
        <div className="mx-2">
          <Button variant={"follow"}>Follow</Button>
        </div>
        <div className="ml-auto relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="text-gray-500"
          >
            <Ellipsis className="w-6 h-6" />
          </button>
          {dropdownOpen && (
            <div className="absolute bg-slate-50 right-0 mt-2 w-40 border rounded shadow-lg">
              <button className="flex space-x-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                <BookMarked className="w-4 h-4 mr-2" /> Save
              </button>
              <hr className="" />
              <button className="flex space-x-2 items-center w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                <Flag className="w-4 h-4 mr-2" /> Report
              </button>
            </div>
          )}
        </div>
      </div>
      <p className="mt-4">{postContent}</p>
      {postImage && (
        <img src={postImage} alt="Post content" className="mt-4 rounded-lg" />
      )}

      <TooltipProvider>
        <div className="flex justify-around mt-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <Share className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Share</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <ThumbsUp className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Like</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <button>
                <MessageCircle className="w-4 h-4" />
              </button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Comment</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </TooltipProvider>
    </Card>
  );
};

export default SocialMediaCard;
