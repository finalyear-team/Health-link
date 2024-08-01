import React from "react";
import Image from "next/image";

interface ProfileProps {
  imageUrl: string;
  altText?: string;
  name: string;
  email: string;
}

const UserAvatar: React.FC<ProfileProps> = ({
  imageUrl,
  altText = "User Profile",
  name,
  email,
}) => {
  return (
    <div className="max-w-sm mx-auto bg-white dark:bg-slate-950 rounded-xl overflow-hidden md:max-w-2xl">
      <div className="md:flex items-center p-4">
        <div className="flex-shrink-0">
          <Image
            height={48}
            width={48}
            className="rounded-full border-2 border-primary-600 dark:border-slate-700"
            src={imageUrl}
            alt={altText}
          />
        </div>
        <div className="ml-4">
          <div className="uppercase tracking-wide text-sm font-semibold">
            {name}
          </div>
          <p className="mt-2 text-gray-500">{email}</p>
        </div>
      </div>
    </div>
  );
};

export default UserAvatar;
