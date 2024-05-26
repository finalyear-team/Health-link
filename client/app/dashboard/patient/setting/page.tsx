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

export default function TabsDemo() {
  const { user, isLoaded } = useUser();
  const Role = user?.unsafeMetadata.role;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  return (
    <div>
      {/* profile section */}
      <div className="h-[200px] bg-slate-100 dark:bg-slate-800 flex items-center space-x-3">
        <Image
          src="/image/profile-picture.jpg"
          width={150}
          height={150}
          alt="profile picture"
          className="rounded-full"
        />
        <h1 className="text-center text-2xl font-bold mt-5 ml-2">
          {" "}
          {firstName} {lastName} {!isLoaded ? <Loader /> : null}
        </h1>
      </div>
      <Tabs defaultValue="account" className=" mt-4">
        <TabsList className="bg-white dark:bg-slate-800 grid w-full grid-cols-7">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="loginAndSecurity">login & Security</TabsTrigger>
          <TabsTrigger value="Network">Network</TabsTrigger>
          <TabsTrigger value="myPosts">my Posts</TabsTrigger>
          <TabsTrigger value="Records">Records</TabsTrigger>
          <TabsTrigger value="saved">saved</TabsTrigger>
        </TabsList>
        <Account value="account" />
        <LoginAndSecurity value="loginAndSecurity" />
        <Network value="Network" />
        <MyPosts value="myPosts" />
        <Records value="Records" />
        <Saved value="saved" />
      </Tabs>
    </div>
  );
}
