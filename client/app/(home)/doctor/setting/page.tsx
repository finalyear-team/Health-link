"use client";
import { useState, useEffect, ChangeEvent } from "react";
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
  Camera,
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
import useAuth from "@/hooks/useAuth";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SCHEDULE } from "@/graphql/mutations/scheduleMutations";
import { GET_SCHEDULES } from "@/graphql/queries/scheduleQueries";
import { addHours, format, parse } from "date-fns";
import { includes } from "lodash";
import { Span } from "next/dist/trace";
import useUserStore from "@/store/userStore";
import { UPDATE_USER } from "@/graphql/mutations/userMutations";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { uploadFile } from "@/utils/fileUpload";

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

const weekdaysOrder = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];

function getWeekdayRange(weekdays: any[]) {
  // Sort the input weekdays based on the weekdaysOrder
  const sortedWeekdays = weekdays?.slice().sort((a, b) => weekdaysOrder.indexOf(a) - weekdaysOrder.indexOf(b));

  // Check if the weekdays are consecutive
  const ranges = [];
  let start = sortedWeekdays && sortedWeekdays[0];
  let end = sortedWeekdays && sortedWeekdays[0];

  for (let i = 1; i < (sortedWeekdays ? sortedWeekdays.length : 0); i++) {
    if (weekdaysOrder.indexOf(sortedWeekdays[i]) === weekdaysOrder.indexOf(end) + 1) {
      // If the current weekday is consecutive
      end = sortedWeekdays[i];
    } else {
      // If the current weekday is not consecutive
      ranges.push(start === end ? start : `${start} - ${end}`);
      start = sortedWeekdays[i];
      end = sortedWeekdays[i];
    }
  }
  // Push the last range
  ranges.push(start === end ? start : `${start} - ${end}`);

  // Combine consecutive ranges
  const finalRanges = [];
  let rangeStart = ranges[0];
  let rangeEnd = ranges[0];

  for (let i = 1; i < ranges.length; i++) {
    if (ranges[i].startsWith(rangeEnd.split(' - ')[1])) {
      rangeEnd = ranges[i];
    } else {
      finalRanges.push(rangeStart === rangeEnd ? rangeStart : rangeStart + ' - ' + rangeEnd.split(' - ')[1]);
      rangeStart = ranges[i];
      rangeEnd = ranges[i];
    }
  }
  finalRanges.push(rangeStart === rangeEnd ? rangeStart : rangeStart + ' - ' + rangeEnd.split(' - ')[1]);

  return finalRanges.join(", ");
}





export default function TabsDemo() {

  const [hover, setHover] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<number | null | any>(0);

  const { user, isLoaded } = useAuth();
  const [image, setImage] = useState(user?.ProfilePicture);


  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted: (data) => {
      toast({
        title: "Success ",
        description: "Profile update success",
      });



    }
  });

  const [startTime, setStartTime] = useState()
  const [endTime, setEndTime] = useState()
  const [weekdays, setWeekdays] = useState()
  const { data: doctorScheudels, error: DoctorSchedulesError, refetch } = useQuery(GET_SCHEDULES, {
    variables: {
      doctorID: user?.UserID
    }
  })
  const { setEducationalBackGround } = useUserStore()

  const { toast } = useToast();
  const [CreateSchedule, { data, loading, error }] = useMutation(CREATE_SCHEDULE, {
    onCompleted: () => {
      refetch()
      toast({
        title: "Create Success",
        description: "You have successfully set Available time",
        variant: "success",
      });

    },
    onError: () => {
      toast({
        title: "Schedule Error",
        description: "Faild to create schedule",
        variant: "error",
      });

    }
  })
  useEffect(() => {
    if (doctorScheudels?.Schedules.length === 0)
      return
    setWeekdays(doctorScheudels?.Schedules?.map((schedule: any) => schedule.WeekDay))
    setStartTime(doctorScheudels?.Schedules?.reduce((acc: any, schedules: any) => {
      if (!schedules.StartTime)
        return null
      acc = format(addHours(schedules.StartTime, 1), 'HH:mm:ss')
      return acc
    }, {}))

    setEndTime(doctorScheudels?.Schedules?.reduce((acc: any, schedules: any) => {
      if (!schedules.EndTime)
        return null
      acc = format(addHours(schedules.EndTime, 1), 'HH:mm:ss')
      return acc
    }, {}))


  }, [doctorScheudels?.Schedules])




  const initialAvailability = {
    startTime: startTime || "10:00",
    endTime: endTime || "12:00",
    weekday: weekdays,
  };

  const Role = user && user?.Role;


  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  // handle availabilty
  const handleAvailablity = async (value: any) => {
    const unselectedDays = weekdaysOrder.filter((days) => !value.weekday.includes(days))
    await CreateSchedule({
      variables: {
        scheduleInput: {
          DoctorID: user.UserID,
          WeekDay: value.weekday,
          StartTime: value.startTime,
          EndTime: value.endTime
        },
        unselectedDays
      }
    })
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        if (!file)
          return

        const imageUrl = await uploadFile(file, "profilePicture", setProgress)
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
    if (!user)
      return

    if (!user.EducationalBackground)
      return

    setEducationalBackGround(JSON.parse(user.EducationalBackground))

  }, [user])


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

  console.log(startTime)
  console.log(endTime)
  console.log(error?.message)
  if (!isLoaded) {
    return (
      <Container>
        <PageLoader />
      </Container>
    );
  }
  const firstName = user?.FirstName;
  const lastName = user?.LastName;
  const userName = user?.Username;
  const userID = user?.UserID;
  // const gender = user?.Gender === "male" ? "Mr." : "Ms.";
  // console.log(user?.Gender);
  const combinedName = firstName + " " + lastName;
  return (
    <div>
      <Head>
        <title>Setting | HealthLink</title>
      </Head>
      {/* <Card className="h-fit">
        <div className="flex items-center space-x-3 p-3 rounded ">
          <div className="flex items-center flex-wrap space-y-">
            <div className="flex items-center space-x-4 ">
              <div
                className="relative w-28 h-28 overflow-hidden  " // Add overflow-hidden here
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

      </Card> */}
      <Card>
        <div className=" flex items-center space-x-3 p-3 rounded">
          <div className="flex items-center flex-wrap space-y-2 ">
            <div className="flex items-center space-x-4 mr-4">
              <div className="flex items-center space-x-3 p-3 rounded ">
                <div className="flex items-center flex-wrap space-y-">
                  <div className="flex items-center space-x-4 ">
                    <div
                      className="relative w-28 h-28 overflow-hidden  " // Add overflow-hidden here
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
                    {/* <div>
                      <h2 className="text-xl font-bold">{combinedName}</h2>
                      <div className="flex items-center space-x-2">
                        <span className="text-slate-400 text-sm">@{userName}</span>
                        <div className="flex items-center space-x-2">
                          <Badge variant={user?.Role}>{user?.Role}</Badge>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
              <div>
                <div className="relative text-xl font-bold">
                  <span>
                    Dr. {firstName} {lastName}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-slate-400">@{user?.Username}</span>{" "}
                  <div className="flex items-center">
                    <MdVerified size={20} className="text-secondary-600" />
                    <Badge>Doctor</Badge>
                  </div>
                </div>

                <span className="text-sm font-medium text-slate-600 dark:text-slate-200">
                  Oncologist
                </span>
                <div className="flex items-center space-x-2">
                  {/* <Rating value={3.3} /> */}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-200 flex items-center">
                  {startTime && endTime && weekdays ?
                    <p className="mr-3">

                      {`${getWeekdayRange(weekdays)} ${startTime && format(parse(startTime ? startTime : "00:00:00", 'HH:mm:ss', new Date()), "hh:mm a")} - ${format(parse(endTime ? endTime : "00:00:00", 'HH:mm:ss', new Date()), "hh:mm a")}`}

                    </p> :
                    <p className="mr-3">
                      no schedules yet
                    </p>
                  }
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="ghost" className="mr-3">
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
                                {!isValid ? (
                                  <span className="text-xs text-red-600 dark:text-red-700">
                                    Incorrect format, try again
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
                        <p className="font-bold text-lg">{user?.Followers}</p>
                      </div>
                      <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Following
                        </p>
                        <p className="font-bold text-lg">{user?.Following}</p>
                      </div>
                      {/* <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Posts
                        </p>
                        <p className="font-bold text-lg">{stats.posts}</p>
                      </div> */}
                      <div>
                        {/* <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Question Answered
                        </p>
                        <p className="font-bold text-lg">
                          {stats.answeredQuestion}
                        </p> */}
                      </div>
                      {/* <div>
                        <p className="text-slate-600 dark:text-slate-100 text-sm">
                          Blog
                        </p>
                        <p className="font-bold text-lg">{stats.blogs}</p>
                      </div> */}
                    </div>
                  </div>
                </div>
              </Card>
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
          {/* <TabsTrigger value="certificates">
            <Award className="w-4 h-4 mr-2" />{" "}
            {isSmallScreen ? null : "Certificates"}
          </TabsTrigger> */}

          <TabsTrigger value="Network">
            <Users className="w-4 h-4 mr-2" />{" "}
            {isSmallScreen ? null : "Network"}
          </TabsTrigger>
          {/* <TabsTrigger value="myPosts">
            <Rss className="w-4 h-4 mr-2" /> {isSmallScreen ? null : "my Posts"}
          </TabsTrigger> */}
        </TabsList>
        <Account value="account" isPatient={false} />
        {/* <LoginAndSecurity value="loginAndSecurity" /> */}
        {/* <Certificates value="certificates" /> */}
        <Network value="Network" isPatient={false} userID={user?.UserID} />
        {/* <MyPosts value="myPosts" /> */}
      </Tabs>
    </div>
  );
}
