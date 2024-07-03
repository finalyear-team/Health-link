
"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

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
import { Loader2 } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/components/ui/use-toast";
import { validateSetAvailability } from "@/utils/validationSchema";
import useAuth from "@/hooks/useAuth";
import { useMutation } from "@apollo/client";
import { CREATE_SCHEDULE } from "@/graphql/mutations/scheduleMutations";

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
  // const { user, isLoaded } = useUser();
  const { user, isLoaded, isSignedIn } = useAuth()
  const [CreateSchedule, { data, loading, error }] = useMutation(CREATE_SCHEDULE)

  // const Role = user?.unsafeMetadata.role;
  // const firstName = user?.firstName;
  // const lastName = user?.lastName;

  const Role = user && user?.Role;
  const firstName = user && user.FirstName;
  const lastName = user && user.LastName;

  const { toast } = useToast();

  // handle availabilty
  const handleAvailablity = async (value: any) => {
    console.log(value)
    await CreateSchedule({
      variables: {
        scheduleInput: {
          DoctorID: user.UserID,
          WeekDay: value.weekday,
          StartTime: value.startTime,
          EndTime: value.endTime
        }
      }
    })

    // console.log("weekdays: ", value.weekday);
    // console.log("startTime: ", value.startTime);
    // console.log("endTime: ", value.endTime);
    console.log(error)
    if (data)
      toast({
        title: "Set: Available Time",
        description: "You have successfully set Available time",
        variant: "success",
      });
  };

  console.log(error?.message)
  if (!isLoaded) {
    return (
      <Container>
        <Loader2 className="w-10 h-10" />
      </Container>
    );
  }
  return (
    <div>
      <head>
        <title>Setting | HealthLink</title>
      </head>
      {/* profile section */}
      <Card>
        <div className="h-[200px] flex items-center space-x-3 p-3 rounded">
          <div className="flex items-center ">
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
                  <span>Dr. </span> {firstName} {lastName}
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
                  <span className="mr-3">Monday to Friday: 10 AM - 11 PM</span>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost">
                        <Settings2 className="w-4 h-4 cursor-pointer" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-80">
                      <div className="grid gap-4">
                        <Formik
                          initialValues={initialAvailability}
                          onSubmit={handleAvailablity}
                          validationSchema={validateSetAvailability}
                        >
                          {({ isValid, isSubmitting }) => (
                            <Form
                              className="space-y-6"
                              action="#"
                              method="POST"
                            >
                              <div className="space-y-2">
                                <h4 className="font-medium leading-none flex">
                                  <AlarmClockCheck className="w-4 h-4 mr-2" />{" "}
                                  Available Time
                                </h4>
                                <hr className="border dark:border-slate-500" />
                                <p className="text-sm text-slate-600 dark:text-slate-400">
                                  Set Available time for appointment.
                                </p>
                              </div>
                              <div className="grid gap-2">
                                <div className="">
                                  <div className="grid gap-4">
                                    <p className="text-sm font-medium">
                                      Select your prefered days.
                                    </p>

                                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                                      <div className="flex items-center gap-2">
                                        <Field
                                          name="weekday"
                                          type="checkbox"
                                          value="monday"
                                          id="monday"
                                        />
                                        <Label htmlFor="monday">Monday</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Field
                                          name="weekday"
                                          type="checkbox"
                                          value="tuesday"
                                          id="tuesday"
                                        />
                                        <Label htmlFor="tuesday">Tuesday</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Field
                                          name="weekday"
                                          type="checkbox"
                                          value="wednesday"
                                          id="wednesday"
                                        />
                                        <Label htmlFor="wednesday">
                                          Wednesday
                                        </Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Field
                                          name="weekday"
                                          type="checkbox"
                                          value="thursday"
                                          id="thursday"
                                        />
                                        <Label htmlFor="thursday">
                                          Thursday
                                        </Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Field
                                          name="weekday"
                                          type="checkbox"
                                          value="friday"
                                          id="friday"
                                        />
                                        <Label htmlFor="friday">Friday</Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Field
                                          name="weekday"
                                          type="checkbox"
                                          value="saturday"
                                          id="saturday"
                                        />
                                        <Label htmlFor="saturday">
                                          Saturday
                                        </Label>
                                      </div>
                                      <div className="flex items-center gap-2">
                                        <Field
                                          name="weekday"
                                          type="checkbox"
                                          value="sunday"
                                          id="sunday"
                                        />
                                        <Label htmlFor="sunday">Sunday</Label>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <hr className="border dark:border-slate-500" />
                                <div className="">
                                  <Input
                                    name="startTime"
                                    type="time"
                                    label="Starting Time"
                                    placeholder="Starting Time"
                                  />
                                </div>
                                <div className="">
                                  <Input
                                    type="time"
                                    name="endTime"
                                    placeholder="End Time"
                                    label="End Time"
                                  />
                                </div>
                                <hr className="border dark:border-slate-500" />
                                {error ? (
                                  <span className="text-xs text-red-600 dark:text-red-700">
                                    {error?.message}
                                  </span>
                                ) : null}
                                <Button
                                  type="submit"
                                  disabled={!isValid}
                                  className={`${!isValid ? "cursor-not-allowed" : ""
                                    }`}
                                >
                                  Set
                                </Button>
                              </div>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            <div className="flex space-x-4 ml-auto">
              <Card>
                <div className="sm:flex sm:items-center px-6 py-4">
                  <div className="text-center sm:text-left sm:flex-grow">
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Followers
                        </p>
                        <p className="font-bold text-lg">{stats.followers}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Following
                        </p>
                        <p className="font-bold text-lg">{stats.following}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Posts
                        </p>
                        <p className="font-bold text-lg">{stats.posts}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Question Answered
                        </p>
                        <p className="font-bold text-lg">
                          {stats.answeredQuestion}
                        </p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Blog
                        </p>
                        <p className="font-bold text-lg">{stats.blogs}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </Card>
      <Tabs defaultValue="account" className="relative mt-2">
        <TabsList className="sticky -top-2 bg-white dark:bg-slate-800 grid w-full grid-cols-7">
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
