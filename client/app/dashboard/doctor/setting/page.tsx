"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import Account from "@/components/settings/tabs/account";
import Password from "@/components/settings/tabs/password";
import LoginAndSecurity from "@/components/settings/tabs/login-and-security";
import Network from "@/components/settings/tabs/network";
import MyPosts from "@/components/settings/tabs/myPosts";
import Records from "@/components/settings/tabs/records";
import Saved from "@/components/settings/tabs/saved";
import Image from "next/image";
import Loader from "@/common/Loader/Loading";
import { useUser } from "@clerk/nextjs";
import Rating from "@/components/shared/Rating";
import { MdVerified } from "react-icons/md";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Settings2 } from "lucide-react";
import Certificates from "@/components/settings/tabs/certificates";

export default function TabsDemo() {
  const { user, isLoaded } = useUser();
  const Role = user?.unsafeMetadata.role;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  return (
    <div>
      {/* profile section */}
      <div className="h-[200px] bg-slate-100 dark:bg-slate-800 flex items-center space-x-3 p-3 rounded">
        <div className="flex items-center space-x-4">
          <Image
            src="/image/profile-picture.jpg"
            width={128}
            height={128}
            alt="profile picture"
            className="rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">
            <span>Dr. </span>  {firstName} {lastName} {!isLoaded ? <Loader /> : null}
            </h2>
            <p className="text-slate-400">@alexisSan</p>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-slate-600">
                Oncologist
              </span>
              <MdVerified size={20} className="text-secondary-600 ml-2" />
              <Badge>Doctor</Badge>
            </div>
            <div className="flex items-center space-x-2">
              <Rating value={4.5}/>
            </div>
            <div className="text-sm text-slate-600 flex items-center">
              Monday to Friday: 9 AM - 5 PM
              <Settings2 className="w-4 h-4 ml-2 cursor-pointer"/>
            </div>
          </div>
          <div className="flex space-x-4 ml-auto">
            <Button variant="default">Follow</Button>
            <Button variant="outline">Make Appointment</Button>
          </div>
        </div>
      </div>
      <Tabs defaultValue="account" className=" mt-4">
        <TabsList className="bg-white dark:bg-slate-800 grid w-full grid-cols-7">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="certificates">Certificates</TabsTrigger>
          <TabsTrigger value="loginAndSecurity">login & Security</TabsTrigger>
          <TabsTrigger value="Network">Network</TabsTrigger>
          <TabsTrigger value="myPosts">my Posts</TabsTrigger>
          <TabsTrigger value="Records">Records</TabsTrigger>
          <TabsTrigger value="saved">saved</TabsTrigger>
        </TabsList>
        <Account value="account" />
        <Certificates value="certificates"/>
        <LoginAndSecurity value="loginAndSecurity" />
        <Network value="Network" />
        <MyPosts value="myPosts" />
        <Records value="Records" />
        <Saved value="saved" />
      </Tabs>
    </div>
  );
}
