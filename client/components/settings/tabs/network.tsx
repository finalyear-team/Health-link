"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { TabsContent } from "@/components/ui/tabs";
import { Formik, Form } from "formik";
import { Loader2, UserCheck, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface NetworkType {
  id: number;
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
  // 
];

const Network = ({
  value,
  isPatient,
}: {
  value: string;
  isPatient: boolean;
}) => {
  const router = useRouter();
  const [filteredFollowers, setFilteredFollowers] = useState(followers);
  const [filteredFollowing, setFilteredFollowing] = useState(following);
  const { toast } = useToast();

  // handle search for following
  const handleFollowingSearch = (values: any) => {
    console.log(values);
    const searchTerm = values.followingSearch.toLowerCase();
    const searchedFollowing =
      values.followingSearch.length > 0
        ? following.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm) ||
              item.username.toLowerCase().includes(searchTerm)
          )
        : following;

    setFilteredFollowing(searchedFollowing);
  };

  // handle search for followers

  const handleFollwersSearch = (values: any) => {
    console.log(values);
    const searchTerm = values.followersSearch.toLowerCase();
    const searchedFollowers =
      values.followersSearch.length > 0
        ? followers.filter(
            (item) =>
              item.name.toLowerCase().includes(searchTerm) ||
              item.username.toLowerCase().includes(searchTerm)
          )
        : followers;

    setFilteredFollowers(searchedFollowers);
  };

  // handle the follow and unfollow logic
  const handleFollowUnfollowSubmit = async (
    values: any,
    { setSubmitting }: any
  ) => {
    try {
      // the mutation goes here
      toast({
        title: "Succesfully Unfollowed",
        description:
          "Your have succesfully unfollowed Dr. " + values.name + ".",
        variant: "success",
      });
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Error occured while trying to unfollow. Try again.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <TabsContent value={value}>
      <Card>
        <CardHeader>
          <span className="text-primary-700 font-medium">Network</span>
          <hr />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {!isPatient ? (
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
                          disabled={followers.length > 0 ? false : true}
                        />
                      </Form>
                    )}
                  </Formik>
                </CardHeader>
                <CardContent className="p-6 grid gap-4 h-fit">
                  {filteredFollowers.length > 0 ? (
                    filteredFollowers.map((user, index) => (
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
            ) : null}
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
                        disabled={following.length > 0 ? false : true}
                      />
                    </Form>
                  )}
                </Formik>
              </CardHeader>
              <CardContent className="p-6 grid gap-4 h-fit">
                {filteredFollowing.length > 0 ? (
                  filteredFollowing.map((user, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer rounded-md p-2 transition-colors"
                    >
                      <div
                        className="grid grid-cols-[48px_1fr] items-center gap-4"
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
                      <Formik
                        initialValues={{
                          userId: user.id,
                          name: user.name,
                        }}
                        onSubmit={handleFollowUnfollowSubmit}
                      >
                        {({ isSubmitting }) => (
                          <Form className="space-y-6" action="#" method="POST">
                            <Button variant={"follow"} type="submit">
                              {isSubmitting ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                ""
                              )}
                              Unfollow
                            </Button>
                          </Form>
                        )}
                      </Formik>
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
