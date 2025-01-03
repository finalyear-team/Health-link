"use client";
import React, { useState } from "react";
import VideoChatInitiation from "@/components/layout/video-chat";
import VideoAppointmentCard from "@/components/appointment/video-appointment-card";
import { CircleArrowOutUpRight } from "lucide-react";
import { useQuery } from "@apollo/client";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import useAuth from "@/hooks/useAuth";
import Loading from "@/common/Loader/Loading";
import { UserType } from "@/types/types";
import useVideoCallInfoStore from "@/store/videoCallInfo";
import { addHours, format } from "date-fns";
import formatScheduleTime from "@/utils/formatDate";
import useAppointmentStore from "@/store/appointmentStore";

const Video = () => {
  const { user } = useAuth();
  const { selectedAppointment, selectAppointment, showVideoChat, setShowVideoChat } = useAppointmentStore()
  const { data, loading, error } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userID: user?.UserID,
    },
  });

  const {
    appointmentId,
    doctorId, patientId,
    setVideoCallInfo,
  } = useVideoCallInfoStore();

  if (loading) return <Loading />;

  const upcomingAppointments = data?.UserAppointments?.upcomingAppointments.filter(
    (appointment: any) => appointment.Status === "booked"
  );


  const handleJoinClick = (
    appointmentId: string,
    doctorId: string,
    patientId: string,
    appointmentDate: string,
    appointmentTime: string
  ) => {
    setVideoCallInfo(appointmentId, doctorId, patientId, appointmentDate, appointmentTime);
    setShowVideoChat()
  };
  const handleEndLeaveCall = () => {

  }

  console.log(showVideoChat)

  return (
    <div>
      {!showVideoChat && (
        <div className="relative w-full rounded border border-secondary-700 dark:border-slate-600 shadow-sm p-6">
          <div className="flex items-center text-xl font-bold">
            <CircleArrowOutUpRight className="h-6 w-6 mr-2" /> Upcoming Live
            Consultation
          </div>
          <hr className="my-2" />
          {upcomingAppointments?.length === 0 ? (
            <div className="flex">
              <CircleArrowOutUpRight className="h-6 w-6 mr-2" /> Upcoming
              appointments{" "}
            </div>
          ) : (
            <>
              {upcomingAppointments?.map((value: any) => (
                <VideoAppointmentCard
                  key={value.AppointmentID}
                  dummyData={{
                    appointmentId: value.AppointmentID,
                    patientId: value.PatientID,
                    userName: value.DoctorName,
                    doctorId: value.DoctorID,
                    duration: value.Duration,
                    appointmentTime: value.AppointmentTime,
                    appointmentDate: value.AppointmentDate,
                    name: value.PatientName,
                    photo: value.PatientPhoto,
                    purpose: value.Note,
                    gender: value.PatientGender,
                    role: UserType.PATIENT,
                  }}
                  appointmentTime={value.AppointmentTime}
                  onJoinClick={() => {
                    selectAppointment(value)
                    handleJoinClick(
                      value.AppointmentID,
                      value.DoctorID,
                      value.PatientID,
                      format(addHours(value.AppointmentDate, 24), "yyyy-MM-dd"),
                      formatScheduleTime(value.AppointmentTime)
                    )
                  }
                  }
                />
              ))}
            </>
          )}
        </div>
      )}

      {showVideoChat && (
        <div>
          <VideoChatInitiation role={UserType.DOCTOR} />
        </div>
      )}
    </div>
  );
};

export default Video;
