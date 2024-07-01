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
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Formik, Form } from "formik";
import { UserCheck, Users } from "lucide-react";
import { useRouter } from "next/navigation";

interface NetworkType {
  id: string;
  name: string;
  username: string;
  bio: string;
  avatar: string;
}

const followers: NetworkType[] = [
  // {
  //   id: 1,
  //   name: "John Doe",
  //   username: "@johndoe",
  //   bio: "Web Developer | Tech Enthusiast",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 2,
  //   name: "Jane Smith",
  //   username: "@janesmith",
  //   bio: "Designer | Creative Visionary",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 3,
  //   name: "Michael Johnson",
  //   username: "@mjohnson",
  //   bio: "Entrepreneur | Growth Hacker",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 4,
  //   name: "Emily Davis",
  //   username: "@emilydavis",
  //   bio: "Photographer | Nature Lover",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 5,
  //   name: "David Lee",
  //   username: "@davidlee",
  //   bio: "Software Engineer | Open Source Contributor",
  //   avatar: "/placeholder-user.jpg",
  // },
];

const following: NetworkType[] = [
  // {
  //   id: 1,
  //   name: "Sarah Lee",
  //   username: "@sarahlee",
  //   bio: "Lifestyle Blogger | Minimalist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 2,
  //   name: "Alex Chen",
  //   username: "@alexchen",
  //   bio: "Product Manager | Growth Strategist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 3,
  //   name: "Olivia Patel",
  //   username: "@oliviapatel",
  //   bio: "Fitness Enthusiast | Wellness Coach",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 4,
  //   name: "Ryan Kim",
  //   username: "@ryankim",
  //   bio: "Data Scientist | Machine Learning Expert",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 5,
  //   name: "Isabella Gonzalez",
  //   username: "@isabellagonzalez",
  //   bio: "Graphic Designer | Brand Strategist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 6,
  //   name: "Sarah Lee",
  //   username: "@sarahlee",
  //   bio: "Lifestyle Blogger | Minimalist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 7,
  //   name: "Alex Chen",
  //   username: "@alexchen",
  //   bio: "Product Manager | Growth Strategist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 8,
  //   name: "Olivia Patel",
  //   username: "@oliviapatel",
  //   bio: "Fitness Enthusiast | Wellness Coach",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 9,
  //   name: "Ryan Kim",
  //   username: "@ryankim",
  //   bio: "Data Scientist | Machine Learning Expert",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 10,
  //   name: "Isabella Gonzalez",
  //   username: "@isabellagonzalez",
  //   bio: "Graphic Designer | Brand Strategist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 11,
  //   name: "Sarah Lee",
  //   username: "@sarahlee",
  //   bio: "Lifestyle Blogger | Minimalist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 12,
  //   name: "Alex Chen",
  //   username: "@alexchen",
  //   bio: "Product Manager | Growth Strategist",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 13,
  //   name: "Olivia Patel",
  //   username: "@oliviapatel",
  //   bio: "Fitness Enthusiast | Wellness Coach",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 14,
  //   name: "Ryan Kim",
  //   username: "@ryankim",
  //   bio: "Data Scientist | Machine Learning Expert",
  //   avatar: "/placeholder-user.jpg",
  // },
  // {
  //   id: 15,
  //   name: "Isabella Gonzalez",
  //   username: "@isabellagonzalez",
  //   bio: "Graphic Designer | Brand Strategist",
  //   avatar: "/placeholder-user.jpg",
  // },
];

const Network = ({ value }: { value: string }) => {
  const router = useRouter();
  const handleFollowingSearch = () => {};
  const handleFollwersSearch = () => {};
  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <span className="text-primary-700 font-medium">Network</span>
          <hr />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-background shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-slate-100 dark:bg-slate-800 flex flex-row flex-wrap items-center justify-between py-4 px-6 ">
                <h2 className="text-lg font-semibold">Followers</h2>
                <Formik
                  initialValues={{ followersSearch: "" }}
                  onSubmit={handleFollwersSearch}
                >
                  {({ isValid, isSubmitting }) => (
                    <Form action="#" method="POST">
                      <Input
                        type="search"
                        name="followersSearch"
                        placeholder="search"
                      />
                    </Form>
                  )}
                </Formik>
              </CardHeader>
              <CardContent className="p-6 grid gap-4 h-fit">
                {followers.length > 0 ? (
                  followers.map((user, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[48px_1fr] items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer rounded-md p-2 transition-colors"
                      onClick={() => router.push(`/profile/${user.username}`)}
                    >
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center w-full space-y-2">
                    <Users className="w-10 h-10 text-slate-500" />
                    <CardDescription>No Followers.</CardDescription>
                  </div>
                )}
              </CardContent>
            </Card>
            <Card className="bg-background shadow-lg rounded-lg overflow-hidden">
              <CardHeader className="bg-slate-100 dark:bg-slate-800  flex flex-row flex-wrap items-center justify-between py-4 px-6">
                <h2 className="text-lg font-semibold">Following</h2>
                <Formik
                  initialValues={{ followingSearch: "" }}
                  onSubmit={handleFollowingSearch}
                >
                  {({ isValid, isSubmitting }) => (
                    <Form action="#" method="POST">
                      <Input
                        type="search"
                        name="followingSearch"
                        placeholder="search"
                      />
                    </Form>
                  )}
                </Formik>
              </CardHeader>
              <CardContent className="p-6 grid gap-4 h-fit">
                {following.length > 0 ? (
                  following.map((user, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-[48px_1fr] items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer rounded-md p-2 transition-colors"
                      onClick={() => router.push(`/profile/${user.username}`)}
                    >
                      <Avatar>
                        <AvatarImage src="/placeholder-user.jpg" />
                        <AvatarFallback>
                          {user.name.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.username}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center w-full space-y-2">
                    <UserCheck className="w-10 h-10 text-slate-500" />
                    <CardDescription>No Following.</CardDescription>
                    <Button variant={"ghost"}>Start Exploring</Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </TabsContent>
  );
};

export default Network;
