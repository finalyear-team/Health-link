import React from "react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { BadgeCheck } from "lucide-react";
import { Badge } from "../ui/badge";

interface SocialMediaHeaderCardProps {
  profilePicture: string;
  name: string;
  isVerified: boolean;
  username: string;
  userType: string;
}

const ProfileHeader: FC<SocialMediaHeaderCardProps> = ({
  profilePicture,
  name,
  isVerified,
  username,
  userType,
}) => {
  return (
    <div>
      <div className="flex items-center border border-slate-200 shadow-sm dark:border-slate-500  p-2 rounded">
        <img
          src={profilePicture}
          alt={name}
          className="w-12 h-12 rounded-full mr-3 border border-stroke"
        />
        <div>
          <div className="flex items-center">
            <h2 className="font-semibold">{name}</h2>

            <BadgeCheck className="w-4 h-4 text-secondary-600 ml-2" />
          </div>
          <div className="text-sm text-gray-500">
            @{username} - <Badge>{userType}</Badge>
          </div>
        </div>
        <div className="mx-2">
          <Button variant={"follow"}>Follow</Button>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
