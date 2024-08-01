"use client";

import { useState, useEffect } from "react";
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
import { useQuery, useMutation, gql } from "@apollo/client";
import { GET_FOLLOWERS, GET_FOLLOWING } from "@/graphql/queries/userQueries";
import useAuth from "@/hooks/useAuth";
import client from "@/graphql/apollo-client";
import { UNFOLLOW_DOCTOR } from "@/graphql/mutations/userMutations";



const Network = ({
  value,
  isPatient,
  userID,
}: {
  value: string;
  isPatient: boolean;
  userID: string;
}) => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();
  const [filteredFollowers, setFilteredFollowers] = useState<any>([]);
  const [filteredFollowing, setFilteredFollowing] = useState<any[]>([]);
  const [followersdata, setFollowersData] = useState<any[]>([]);
  const [followingdata, setFollowingData] = useState<any[]>([]);

  // Use Apollo Client's useMutation hook for unfollow
  const [unfollowDoctor] = useMutation(UNFOLLOW_DOCTOR);

  useEffect(() => {
    if (!user) return;
    const getFollowers = async () => {
      const { data: getFollowers } = await client.query({
        query: GET_FOLLOWERS,
        variables: {
          userID: user?.UserID,
        },
      });
      const { data: getFollowing } = await client.query({
        query: GET_FOLLOWING,
        variables: {
          userID: user?.UserID,
        },
      });

      console.log(getFollowers);
      console.log(getFollowing);

      setFollowersData(getFollowers?.GetFollowers);
      setFollowingData(getFollowing?.GetFollowing);
    };
    getFollowers();
  }, [user]);

  // handle search for following
  const handleFollowingSearch = (values: any) => {
    console.log(values);
    const searchTerm = values.followingSearch.toLowerCase();
    const searchedFollowing =
      values.followingSearch.length > 0
        ? followingdata?.filter(
          (item: any) =>
            item.FirstName.toLowerCase().includes(searchTerm) ||
            item.Username.toLowerCase().includes(searchTerm)
        )
        : followingdata;

    setFilteredFollowing(searchedFollowing || []);
  };

  // handle search for followers
  const handleFollwersSearch = (values: any) => {
    console.log(values);
    const searchTerm = values.followersSearch.toLowerCase();
    const searchedFollowers =
      values.followersSearch.length > 0
        ? followersdata.filter(
          (item: any) =>
            item.FirstName.toLowerCase().includes(searchTerm) ||
            item.Username.toLowerCase().includes(searchTerm)
        )
        : followersdata;

    setFilteredFollowers(searchedFollowers || []);
  };

  // handle the follow and unfollow logic
  const handleFollowUnfollowSubmit = async (
    values: any,
    { setSubmitting }: any
  ) => {
    try {
      // Execute the unfollow mutation
      await unfollowDoctor({
        variables: {
          FollowerID: user?.UserID,
          FollowingID: values.userId,
        },
      });
      setFollowingData(followingdata?.filter((follow) => follow.UserID !== values.userId))
      toast({
        title: "Successfully Unfollowed",
        description: "You have successfully unfollowed " + values.name + ".",
        variant: "success",
      });
      // Optionally, refresh the followers and following lists
    } catch (error) {
      console.error("Error:", error);
      toast({
        title: "Error",
        description: "Error occurred while trying to unfollow. Try again.",
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
                          disabled={followersdata.length > 0 ? false : true}
                        />
                      </Form>
                    )}
                  </Formik>
                </CardHeader>
                <CardContent className="p-6 grid gap-4 h-fit">
                  {followersdata.length > 0 ? (
                    followersdata?.map((user: any, index: number) => (
                      <div
                        key={index}
                        className="grid grid-cols-[48px_1fr] items-center gap-4 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer rounded-md p-2 transition-colors"
                        onClick={() => router.push(`/profile/${user.UserID}`)}
                      >
                        <Avatar>
                          <AvatarImage src={user.ProfilePicture || "/placeholder-user.jpg"} />
                          <AvatarFallback>
                            {user.FirstName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-medium">{user.FirstName}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.Username}
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
                        disabled={followingdata.length > 0 ? false : true}
                      />
                    </Form>
                  )}
                </Formik>
              </CardHeader>
              <CardContent className="p-6 grid gap-4 h-fit">
                {followingdata.length > 0 ? (
                  followingdata.map((user: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer rounded-md p-2 transition-colors"
                    >
                      <div
                        className="grid grid-cols-[48px_1fr] items-center gap-4"
                        onClick={() => router.push(`/profile/${user.Username}`)}
                      >
                        <Avatar>
                          <AvatarImage src={user.ProfilePicture || "/placeholder-user.jpg"} />
                          <AvatarFallback>
                            {user.FirstName.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="space-y-1">
                          <div className="font-medium">{user.FirstName}</div>
                          <div className="text-sm text-muted-foreground">
                            {user.Username}
                          </div>
                        </div>
                      </div>
                      <Formik
                        initialValues={{
                          userId: user.UserID,
                          name: user.FirstName,
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
                    {/* <Button variant={"ghost"}>Start Exploring</Button> */}
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
