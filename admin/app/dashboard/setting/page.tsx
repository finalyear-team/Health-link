"use client";

import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import Head from "next/head";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/tabs/account";
import LoginAndSecurity from "@/components/tabs/login-and-security";
import { Badge } from "@/components/ui/badge";
import { KeyRound, User } from "lucide-react";
import PageLoader from "@/common/Loader/PageLoader";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera } from "lucide-react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/lib/firebaseConfig";
import Loading from "@/common/Loader/Loading";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import { useMutation } from "@apollo/client";
import useAuth from "@/hooks/useAuth";

export default function TabsDemo() {
  const [hover, setHover] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [updateUser] = useMutation(UPDATE_USER);
  const { user, isLoaded } = useAuth();
  const [image, setImage] = useState(user?.ProfilePicture);

  const { toast } = useToast();
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

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
        const storageRef = ref(storage, `profileImages/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        setUploading(true);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(progress);
            console.log(`Upload is ${progress}% done`);
          },
          (error) => {
            console.error("Upload error:", error);
            setUploading(false);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              setImage(downloadURL);
              setUploading(false);
              console.log("File available at", downloadURL);
              updateUser({
                variables: {
                  updateUserInput: {
                    UserID: user?.UserID,
                    ProfilePicture: downloadURL,
                  },
                },
              })
                .then(() => {
                  toast({
                    title: "Success",
                    description: "Profile image updated successfully",
                  });
                })
                .catch((error) => {
                  console.error("Error updating profile picture:", error);
                  toast({
                    title: "Failed",
                    description: "Failed to update profile picture, try again!",
                  });
                });
            });
          }
        );
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

    checkScreenSize();

    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  if (!isLoaded) {
    return (
      <div className="w-full flex items-center justify-center">
        <PageLoader />
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>Setting | HealthLink</title>
      </Head>
      <Card>
        <div className="flex items-center space-x-3 p-3 rounded">
          <div className="flex items-center flex-wrap space-y-2 ">
            <div className="flex items-center space-x-4">
              <div
                className="relative w-32 h-32"
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
              >
                <Avatar className="rounded-full w-32 h-32 border-2 border-secondary-700 overflow-hidden">
                  <AvatarImage
                    src={user?.ProfilePicture}
                    alt="Profile Picture"
                    className="object-cover w-full h-full"
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
                    <Badge variant={"admin"}>Admin</Badge>
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
        </TabsList>
        <Account value="account" isPatient={true} />
        <LoginAndSecurity value="loginAndSecurity" />
      </Tabs>
    </div>
  );
}
