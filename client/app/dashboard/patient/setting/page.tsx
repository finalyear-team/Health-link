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
import { Camera, KeyRound, Rss, User, Users } from "lucide-react";
import Container from "@/components/container/container";
import PageLoader from "@/common/Loader/PageLoader";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { uploadFile } from "@/utils/fileUpload";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";

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
  const [hover, setHover] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null | any>(0);

  const { user, isLoaded } = useAuth();
  const [image, setImage] = useState(user?.ProfilePicture);

  const { toast } = useToast();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      toast({
        title: "Success ",
        description: "Profile update success",
      });



    }
  });

  const firstName = user?.FirstName;
  const lastName = user?.LastName;
  const userName = user?.Username;
  const userID = user?.UserID;
  // const gender = user?.Gender === "male" ? "Mr." : "Ms.";
  // console.log(user?.Gender);
  const combinedName = firstName + " " + lastName;

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file)
          return

        const imageUrl = await uploadFile(file, "profilePicture", setProgress)

        console.log(imageUrl)

        if (!imageUrl)
          return
        updateUser({
          variables: {
            updateUserInput: {
              UserID: user?.UserID,
              ProfilePicture: imageUrl,
            },
          },
        })
      }
    } catch (error) {
      toast({
        title: "Failed",
        description: "Failed to update your profile picture, try again!",
      });
    }
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
  console.log(user)
  return (
    <div>
      <Head>
        <title>Setting | HealthLink</title>
      </Head>
      {/* profile section */}
      <Card>
        <div className="flex items-center space-x-3 p-3 rounded">
          <div className="flex items-center flex-wrap space-y-2 ">
            <div className="flex items-center space-x-4">
              <div
                className="relative w-32 h-32"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Avatar className="absolute inset-0  rounded-full cursor-pointer    w-28 h-28 ">
                  <AvatarImage
                    src={user?.ProfilePicture}
                    alt="Profile Picture"
                    className="object-cover w-full h-full rounded-full"
                  />
                  <AvatarFallback className="text-2xl font-medium">
                    {firstName?.charAt(0).toUpperCase()}
                    {lastName?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                {hover && (
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer">
                    <Camera className="text-white text-2xl" />
                    <input
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      className="absolute inset-0 opacity-0 cursor-pointer"
                      onChange={handleImageChange}
                    />
                  </div>
                )}
              </div>
              <div>
                <h2 className="text-xl font-bold">{combinedName}</h2>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400 text-sm">@{userName}</span>
                  <div className="flex items-center space-x-2">
                    <Badge variant={user?.Role}>{user?.Role}</Badge>
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
          {/* <TabsTrigger value="loginAndSecurity">
            <KeyRound className="w-4 h-4 mr-2" />{" "}
            {isSmallScreen ? null : "Password"}
          </TabsTrigger> */}
          <TabsTrigger value="Network">
            <Users className="w-4 h-4 mr-2" />
            {isSmallScreen ? null : "Network"}
          </TabsTrigger>
          {/* <TabsTrigger value="myPosts">
            <Rss className="w-4 h-4 mr-2" /> {isSmallScreen ? null : "my Posts"}
          </TabsTrigger> */}
        </TabsList>
        <Account value="account" isPatient={true} />
        {/* <LoginAndSecurity value="loginAndSecurity" /> */}
        <Network value="Network" isPatient={true} userID={user?.UserID} />
        {/* <MyPosts value="myPosts" /> */}
      </Tabs>
    </div>
  );
}
