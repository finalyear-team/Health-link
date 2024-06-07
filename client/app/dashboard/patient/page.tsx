"use client";

import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Container from "@/components/container/container";
import { Clock, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { MdWavingHand } from "react-icons/md";
import Link from "next/link";
import QuickSettings from "@/components/settings/quick-settings/quick-settings";
import DashboardCard from "@/components/dashboard/card";
import image from "@/public/data/image";
import Loader from "@/common/Loader/Loading";

const PatientDahboard = () => {
  const [currentTime, setCurrentTime] = useState("");
  const [timeString, setTimeString] = useState("");

  useEffect(() => {
    const updateGreetingAndTime = () => {
      const now = new Date();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const amOrPm = hours >= 12 ? "PM" : "AM";

      // Convert hours to 12-hour format
      hours = hours % 12 || 12;

      const formattedTime = `${hours.toString().padStart(2, "0")}:${minutes
        .toString()
        .padStart(2, "0")} ${amOrPm}`;
      setTimeString(formattedTime);

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

  return (
    <div>
      <div className="w-full rounded border border-slate-200 dark:border-slate-600 shadow-md p-6">
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
                Mr. {user?.firstName} {user?.lastName} {!isLoaded && <Loader />}
              </span>{" "}
            </div>
            {/* the time show */}
            <div className="flex items-center space-x-6 mt-4">
              <div className="flex space-x-3 text-3xl font-medium">
                <Clock className="w-8 h-8 mr-2" /> {timeString}
              </div>
              <Button variant={"secondary"}>
                <Link
                  href="/dashboard/patient/setting"
                  className="flex space-x-3"
                >
                  <Settings className="w-4 h-4 mr-2" />
                  Manage Account
                </Link>
              </Button>
            </div>
          </div>
          {/* radio button settings */}
          <div>
            {Role === "provider" ? (
              <Button size={"lg"} className="mb-2">
                Generate a Summary
              </Button>
            ) : null}

            {/* <div className="relative rounded-lg border border-slate-100 dark:border-slate-500 shadow-sm">
              <QuickSettings />
            </div> */}
          </div>
          {/* the illustration part */}
          <div>
            <Image
              src={"/image/product/patient-1-card.svg"}
              width={400}
              height={200}
              alt="user"
            />
          </div>
        </div>
      </div>
      {/* small cards to display more detail */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 mt-2">
        {image.map((value) => (
          <DashboardCard
            key={value.title}
            link={value.link}
            width={value.width}
            height={value.height}
            title={value.title}
            number={value.number}
          />
        ))}
        {/* <DashboardCard />
        <DashboardCard />
        <DashboardCard />
        <DashboardCard /> */}
      </div>
    </div>
  );
};

export default PatientDahboard;
