// "use client";

// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";

// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// import Account from "@/components/settings/tabs/account";
// import Password from "@/components/settings/tabs/password";
// import LoginAndSecurity from "@/components/settings/tabs/login-and-security";
// import Network from "@/components/settings/tabs/network";
// import MyPosts from "@/components/settings/tabs/myPosts";
// import Records from "@/components/settings/tabs/records";
// import Saved from "@/components/settings/tabs/saved";
// import Image from "next/image";
// import Loader from "@/common/Loader/Loading";
// import { useUser } from "@clerk/nextjs";
// import Rating from "@/components/shared/Rating";
// import { MdVerified } from "react-icons/md";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Settings2 } from "lucide-react";

// export default function TabsDemo() {
//   const { user, isLoaded } = useUser();
//   const Role = user?.unsafeMetadata.role;
//   const firstName = user?.firstName;
//   const lastName = user?.lastName;
//   return (
//     <div>
//       {/* profile section */}
//       <div className="h-[200px] bg-slate-100 dark:bg-slate-800 flex items-center space-x-3 p-3 rounded">
//         <div className="flex items-center space-x-4">
//           <Image
//             src="/image/profile-picture.jpg"
//             width={128}
//             height={128}
//             alt="profile picture"
//             className="rounded-full"
//           />
//           <div>
//             <h2 className="text-xl font-bold">
//             <span>Dr. </span>  {firstName} {lastName} {!isLoaded ? <Loader /> : null}
//             </h2>
//             <p className="text-slate-400">@alexisSan</p>
//             <div className="flex items-center space-x-2">
//               <span className="text-sm font-medium text-slate-600">
//                 Oncologist
//               </span>
//               <MdVerified size={20} className="text-secondary-600 ml-2" />
//               <Badge>Doctor</Badge>
//             </div>
//             <div className="flex items-center space-x-2">
//               <Rating value={4.5}/>
//             </div>
//             <div className="text-sm text-slate-600 flex items-center">
//               Monday to Friday: 9 AM - 5 PM
//               <Settings2 className="w-4 h-4 ml-2 cursor-pointer"/>
//             </div>
//           </div>
//           <div className="flex space-x-4 ml-auto">
//             <Button variant="default">Follow</Button>
//             <Button variant="outline">Make Appointment</Button>
//           </div>
//         </div>
//       </div>
//       <Tabs defaultValue="account" className=" mt-4">
//         <TabsList className="bg-white dark:bg-slate-800 grid w-full grid-cols-7">
//           <TabsTrigger value="account">Account</TabsTrigger>
//           <TabsTrigger value="loginAndSecurity">login & Security</TabsTrigger>
//           <TabsTrigger value="Network">Network</TabsTrigger>
//           <TabsTrigger value="myPosts">my Posts</TabsTrigger>
//           <TabsTrigger value="Records">Records</TabsTrigger>
//           <TabsTrigger value="saved">saved</TabsTrigger>
//         </TabsList>
//         <Account value="account" />
//         <LoginAndSecurity value="loginAndSecurity" />
//         <Network value="Network" />
//         <MyPosts value="myPosts" />
//         <Records value="Records" />
//         <Saved value="saved" />
//       </Tabs>
//     </div>
//   );
// }

"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Head from "next/head";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Account from "@/components/settings/tabs/account";
import Password from "@/components/settings/tabs/password";
import LoginAndSecurity from "@/components/settings/tabs/login-and-security";
import Network from "@/components/settings/tabs/network";
import MyPosts from "@/components/settings/tabs/myPosts";
import Image from "next/image";
import Loader from "@/common/Loader/Loading";
import { useUser } from "@clerk/nextjs";
import Rating from "@/components/shared/Rating";
import { MdVerified } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import {
  Award,
  KeyRound,
  Rss,
  Settings2,
  User,
  Users,
  AlarmClockCheck,
} from "lucide-react";
import Certificates from "@/components/settings/tabs/certificates";
import { Formik, Form, Field } from "formik";
import Container from "@/components/container/container";
import PageLoader from "@/common/Loader/PageLoader";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { validateSetAvailability } from "@/utils/validationSchema";

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
  const { user, isLoaded } = useUser();
  const Role = user?.unsafeMetadata.role;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
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
                <p className="text-slate-400">@alexisSan</p>
                <div className="flex items-center space-x-2">
                  <Badge variant={"secondary"}>Patient</Badge>
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
