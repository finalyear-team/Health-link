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
import { Award, KeyRound, Rss, Settings2, User, Users } from "lucide-react";
import Certificates from "@/components/settings/tabs/certificates";

interface StatsCardProps {
  followers: number;
  following: number;
  posts: number;
}

const stats = {
  followers: 1000,
  following: 100,
  posts: 20,
  blogs:10,
  answeredQuestion:10,
};
export default function TabsDemo() {
  const { user, isLoaded } = useUser();
  const Role = user?.unsafeMetadata.role;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  return (
    <div>
      {/* profile section */}
      <Card>
        <div className="h-[200px] flex items-center space-x-3 p-3 rounded">
          <div className="flex items-center space-x-4">
            <Image
              src="/image/profile-picture.jpg"
              width={128}
              height={128}
              alt="profile picture"
              className="rounded-full border-2 border-secondary-700"
            />
            <div>
              <h2 className="text-xl font-bold">
                <span>Dr. </span> {firstName} {lastName}{" "}
                {!isLoaded ? <Loader /> : null}
              </h2>
              <p className="text-slate-400">@alexisSan</p>
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-200">
                  Oncologist
                </span>
                <MdVerified size={20} className="text-secondary-600 ml-2" />
                <Badge>Doctor</Badge>
              </div>
              <div className="flex items-center space-x-2">
                <Rating value={4.5} />
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-200 flex items-center">
                Monday to Friday: 9 AM - 5 PM
                <Settings2 className="w-4 h-4 ml-2 cursor-pointer" />
              </div>
            </div>
            {/* <div className="flex space-x-4 ml-auto">
              <Button variant="default">Follow</Button>
              <Button variant="outline">Make Appointment</Button>
            </div> */}
            <div className="flex space-x-4 ml-auto">
              {/* <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden"> */}
              <Card>
                <div className="sm:flex sm:items-center px-6 py-4">
                  <div className="text-center sm:text-left sm:flex-grow">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">Followers</p>
                        <p className="font-bold text-lg">
                          {stats.followers}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">Following</p>
                        <p className="font-bold text-lg">
                          {stats.following}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">Posts</p>
                        <p className="font-bold text-lg">{stats.posts}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">Question Answered</p>
                        <p className="font-bold text-lg">{stats.answeredQuestion}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">Blog</p>
                        <p className="font-bold text-lg">{stats.blogs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
              {/* </div> */}
            </div>
          </div>
        </div>
      </Card>
      <Tabs defaultValue="account" className="relative mt-2">
        <TabsList className="sticky top-0 bg-white dark:bg-slate-800 grid w-full grid-cols-7">
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2" /> Account
          </TabsTrigger>
          <TabsTrigger value="certificates">
            <Award className="w-4 h-4 mr-2" /> Certificates
          </TabsTrigger>
          <TabsTrigger value="loginAndSecurity">
            <KeyRound className="w-4 h-4 mr-2" /> Password
          </TabsTrigger>
          <TabsTrigger value="Network">
            <Users className="w-4 h-4 mr-2" /> Network
          </TabsTrigger>
          <TabsTrigger value="myPosts">
            <Rss className="w-4 h-4 mr-2" /> my Posts
          </TabsTrigger>
        </TabsList>
        <Account value="account" />
        <Certificates value="certificates" />
        <LoginAndSecurity value="loginAndSecurity" />
        <Network value="Network" />
        <MyPosts value="myPosts" />
      </Tabs>
    </div>
  );
}
