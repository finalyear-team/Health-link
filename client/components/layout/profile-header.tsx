import React from "react";
import { FC, useState } from "react";
import { Button } from "../ui/button";
import {
  MdVerified,
} from "react-icons/md";
import { Badge } from "../ui/badge";
import Image from "next/image";

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
      <div className="flex items-center m-2">
        <img
          src={profilePicture}
          alt={name}
          className="w-12 h-12 rounded-full mr-3 border border-stroke"
        />
        <div>
          <div className="flex items-center">
            <h2 className="font-semibold">{name}</h2>

            <MdVerified size={16} className="text-secondary-600 ml-2" />
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
