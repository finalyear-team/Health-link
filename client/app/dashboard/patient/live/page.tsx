"use client";

import React, { useState } from "react";
import VideoChatInitiation from "@/components/layout/video-chat";
import { Button } from "@/components/ui/button";
import AppointmentDetails from "@/components/test/AppointmentDetails";
import CountdownTimer from "@/components/test/CountdownTimer";
import JoinButton from "@/components/test/JoinButton";
import ChatBox from "@/components/test/ChatBox";
import {
  CircleArrowOutUpRight,
  CircleArrowOutDownLeft,
  CalendarPlus2,
  Info,
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Video = () => {
  const [showVideoChat, setShowVideoChat] = useState(false);

  const appointmentTime = "2024-05-31T23:32:00";
  const currentTime = new Date().toISOString();
  const isActive = new Date(currentTime) >= new Date(appointmentTime);

  const handleJoinClick = () => {
    setShowVideoChat(true);
  };

  return (
    <div>
      {!showVideoChat && (
        <div className="relative w-full rounded border border-secondary-700 dark:border-slate-600 shadow-sm p-6">
          <div className="flex items-center text-xl font-bold">
            {" "}
            <CircleArrowOutUpRight className="h-6 w-6 mr-2" /> Upcoming Live
            Consultation
          </div>
          <hr className="mt-2" />
          <div className="flex items-center justify-between flex-wrap mt-2">
            <AppointmentDetails
              doctorName="Dr. John Doe"
              doctorPhoto="/image/profile-picture.jpg"
              appointmentTime="June 1, 2024, 10:00 AM"
              purpose="General consultation"
            />
            <div className="mt-4">
              <CountdownTimer targetTime={appointmentTime} />
            </div>
            <div className="mt-4">
              <JoinButton isActive={isActive} onClick={handleJoinClick} />
            </div>
          </div>
        </div>
      )}

      {/* conditionally showing the video chat */}
      {showVideoChat && (
        <div>
          <VideoChatInitiation role={"patient"} />
        </div>
      )}
    </div>
  );
};

export default Video;
