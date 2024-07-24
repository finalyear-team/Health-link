"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Head from "next/head";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/settings/tabs/account";
import LoginAndSecurity from "@/components/settings/tabs/login-and-security";
import Network from "@/components/settings/tabs/network";
import MyPosts from "@/components/settings/tabs/myPosts";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { Badge } from "@/components/ui/badge";
import { KeyRound, Rss, User, Users } from "lucide-react";
import Container from "@/components/container/container";
import PageLoader from "@/common/Loader/PageLoader";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";

interface StatsCardProps {
  followers: number;
  following: number;
  posts: number;
}

const stats = {
  followers: 1000,
  following: 100,
  posts: 20,
  blogs: 10,
  answeredQuestion: 10,
};

const initialAvailability = {
  startTime: "10:00",
  endTime: "11:00",
  weekday: [],
};

export default function TabsDemo() {
  const { user, isLoaded } = useAuth();
  const Role = user?.Role;
  const firstName = user?.FirstName;
  const lastName = user?.LastName;
  const { toast } = useToast();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // handle availabilty
  const handleAvailablity = (value: any) => {
    console.log("weekdays: ", value.weekday);
    console.log("startTime: ", value.startTime);
    console.log("endTime: ", value.endTime);

    toast({
      title: "Set: Available Time",
      description: "You have successfully set Available time",
      variant: "success",
    });
  };

  useEffect(() => {
    const checkScreenSize = () => {
      if (window.innerWidth < 750) {
        setIsSmallScreen(true);
      } else {
        setIsSmallScreen(false);
      }
    };

    // Initial check
    checkScreenSize();

    // Add event listener
    window.addEventListener("resize", checkScreenSize);

    // Clean up event listener on component unmount
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isLoaded) {
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }
  return (
    <div>
      <Head>
        <title>Setting | HealthLink</title>
      </Head>
      {/* profile section */}
      <Card>
        <div className=" flex items-center space-x-3 p-3 rounded">
          <div className="flex items-center flex-wrap space-y-2 ">
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
                  <span>Mr. </span> {firstName} {lastName}
                </h2>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">@{user?.Username}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={"secondary"}>Patient</Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <Tabs defaultValue="account" className="relative mt-2">
        <TabsList className="sticky -top-2 z-10 bg-white dark:bg-slate-800 w-full grid grid-cols-5">
          <TabsTrigger value="account">
            <User className="w-4 h-4 mr-2" /> {isSmallScreen ? null : "Account"}
          </TabsTrigger>
          <TabsTrigger value="loginAndSecurity">
            <KeyRound className="w-4 h-4 mr-2" />{" "}
            {isSmallScreen ? null : "Password"}
          </TabsTrigger>
          <TabsTrigger value="Network">
            <Users className="w-4 h-4 mr-2" />
            {isSmallScreen ? null : "Network"}
          </TabsTrigger>
          <TabsTrigger value="myPosts">
            <Rss className="w-4 h-4 mr-2" /> {isSmallScreen ? null : "my Posts"}
          </TabsTrigger>
        </TabsList>
        <Account value="account" isPatient={true} />
        <LoginAndSecurity value="loginAndSecurity" />
        <Network value="Network" isPatient={true} />
        <MyPosts value="myPosts" />
      </Tabs>
    </div>
  );
}
