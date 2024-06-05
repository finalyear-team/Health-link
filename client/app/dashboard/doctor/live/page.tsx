"use client";

import React, { useState } from "react";
import VideoChatInitiation from "@/components/layout/video-chat";
import VideoAppointmentCard from "@/components/appointment/video-appointment-card";
import { CircleArrowOutUpRight } from "lucide-react";
import { patientAppointments } from "@/public/data/patient-appointment";

const Video = () => {
  const [showVideoChat, setShowVideoChat] = useState(false);
  const upcomingAppointments = patientAppointments.upcomingAppointments;

  const handleJoinClick = () => {
    setShowVideoChat(true);
  };

  return (
    <div>
      {!showVideoChat && (
        <div className="relative w-full rounded border border-secondary-700 dark:border-slate-600 shadow-sm p-6">
          <div className="flex items-center text-xl font-bold">
            <CircleArrowOutUpRight className="h-6 w-6 mr-2" /> Upcoming Live
            Consultation
          </div>
          <hr className="my-2" />
          {upcomingAppointments.map((value) => (
            <VideoAppointmentCard
              key={value.id}
              dummyData={{
                appointmentId: value.id,
                doctorId: value.id,
                appointmentTime: value.appointmentTime,
                appointmentDate: value.appointmentDate,
                doctorName: value.doctorName,
                doctorPhoto: value.doctorPhoto,
                purpose: value.purpose,
              }}
              appointmentTime={value.appointmentTime}
              onJoinClick={handleJoinClick}
            />
          ))}
        </div>
      )}

      {showVideoChat && (
        <div>
          <VideoChatInitiation role={"doctor"} />
        </div>
      )}
    </div>
  );
};

export default Video;
