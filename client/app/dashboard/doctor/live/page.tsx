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

const Video = () => {
  const [showVideoChat, setShowVideoChat] = useState(false);
  const { user } = useAuth();
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

  console.log(upcomingAppointments);

  const handleJoinClick = (
    appointmentId: string,
    doctorId: string,
    patientId: string,
    appointmentDate: string,
    appointmentTime: string
  ) => {
    console.log(appointmentId, doctorId, patientId)
    setVideoCallInfo(appointmentId, doctorId, patientId, appointmentDate, appointmentTime);
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
          {upcomingAppointments?.length === 0 ? (
            <div>No upcoming appointments</div>
          ) : (
            <>
              {upcomingAppointments?.map((value: any) => (
                <VideoAppointmentCard
                  key={value.AppointmentID}
                  dummyData={{
                    appointmentId: value.AppointmentID,
                    doctorId: value.DoctorID,
                    appointmentTime: value.AppointmentTime,
                    appointmentDate: value.AppointmentDate,
                    doctorName: value.DoctorName,
                    doctorPhoto: value.DoctorPhoto,
                    purpose: value.Note,
                    role: UserType.DOCTOR,
                  }}
                  appointmentTime={value.AppointmentTime}
                  onJoinClick={() =>
                    handleJoinClick(
                      value.AppointmentID,
                      value.DoctorID,
                      value.PatientID,
                      format(addHours(value.AppointmentDate, 24), "yyyy-MM-dd"),
                      formatScheduleTime(value.AppointmentDate)
                    )
                  }
                />
              ))}
            </>
          )}
        </div>
      )}

      {showVideoChat && (
        <div>
          <VideoChatInitiation role={UserType.PATIENT} />
        </div>
      )}
    </div>
  );
};

export default Video;
