"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Container from "@/components/container/container";
import { Clock, CalendarClock, X, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdWavingHand } from "react-icons/md";
import Link from "next/link";
import Loader from "@/common/Loader/Loading";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import Analytics from "@/components/dashboard/DoctorAnalytics";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Loader2 } from "lucide-react";

const PatientDahboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateGreetingAndTime = () => {
      const now = new Date();
      const formattedTime = format(now, "hh:mm aa");

      setTimeString(formattedTime);

      const hours = now.getHours();
      if (hours >= 5 && hours < 12) {
        setCurrentTime("Good morning");
      } else if (hours >= 12 && hours < 17) {
        setCurrentTime("Good afternoon");
      } else {
        setCurrentTime("Good evening");
      }
    };

    // Initial call to set the state
    updateGreetingAndTime();

    // Set up an interval to update the time every minute
    const intervalId = setInterval(updateGreetingAndTime, 60000);

    // Clean up the interval on unmount
    return () => clearInterval(intervalId);
  }, []);
  const { user, isSignedIn, isLoaded } = useUser();
  const Role = user?.unsafeMetadata.role;

  if (!isLoaded) {
    return (
      <Container>
        <Loader2 className="w-10 h-10" />
      </Container>
    );
  }

  return (
    <div>
      <Card>
        <div className="flex items-center justify-between p-3">
          <div className="flex flex-col justify-between p-3">
            {/* the greeting and the name part */}
            <div className="flex flex-col space-y-4 text-4xl font-bold text-center">
              <div className="flex space-x-3 items-center">
                {" "}
                <MdWavingHand size={30} color="#ffd700" className="mr-2" />{" "}
                {currentTime}{" "}
              </div>
              <span className="text-primary-600 dark:text-primary-700 flex items-center space-x-2">
                Dr. {user?.firstName} {user?.lastName} {!isLoaded && <Loader />}
              </span>{" "}
            </div>
            {/* the time show */}
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex space-x-3 text-3xl font-medium">
                <Clock className="w-8 h-8 mr-2" /> {timeString}
              </div>
              <Button variant={"secondary"}>
                <Link
                  href="/dashboard/doctor/appointment"
                  className="flex space-x-3"
                >
                  <CalendarClock className="w-4 h-4 mr-2" />
                  Manage Calendar
                </Link>
              </Button>
            </div>
          </div>

          {/* the illustration part */}
          <div>
            <Image
              src={"/image/product/doctor(357x253).svg"}
              width={357}
              height={253}
              alt="user"
            />
          </div>
        </div>
      </Card>

      <div>
        <div className="flex items-center flex-between p-4">
          <div className="font-semibold text-lg md:text-xl flex flex-row items-center">
            <PieChart className="w-6 h-6 mr-3" /> Analytics
          </div>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" className="hidden sm:flex">
              Today
            </Button>
            <Button variant="outline" className="hidden md:flex">
              This Month
            </Button>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  June 01, 2023 - June 30, 2023
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar initialFocus mode="range" numberOfMonths={2} />
              </PopoverContent>
            </Popover>
          </div>
        </div>
        <Analytics />
      </div>
    </div>
  );
};

export default PatientDahboard;
