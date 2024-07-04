import React from "react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import { MdVerified } from "react-icons/md";
import { Badge } from "../ui/badge";
import Image from "next/image";

interface SocialMediaHeaderCardProps {
  profilePicture: string;
  name: string;
  isVerified: boolean;
  username: string;
  userType: string;
  postTime: Date;
}

const ProfileHeader: FC<SocialMediaHeaderCardProps> = ({
  profilePicture,
  name,
  isVerified,
  username,
  userType,
  postTime,
}) => {
  return (
    <div>
      <div className="flex items-center m-2">
        <Image
          src={profilePicture}
          alt={name}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full mr-3"
        />
        <div className="flex flex-col justify-start -space-y-2">
          <div className="font-semibold text-sm flex items-center">
            {name}
            <MdVerified size={16} className="text-secondary-600 mx-1" /> •
            <Button
              variant="link"
              className="text-primary-600 dark:text-primary-700"
            >
              Follow
            </Button>
          </div>
          <div className="text-sm text-slate-400">
            @{username} • <Badge>{userType}</Badge> •{" "}
            {postTime.toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
