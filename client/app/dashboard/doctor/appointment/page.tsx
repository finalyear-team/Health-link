
"use client"

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CircleArrowOutUpRight,
  CircleArrowOutDownLeft,
  Bell,
  X,
  BellOff,
  CalendarOff,
  FileClock,
} from "lucide-react";
import useAppointmentStore from "@/store/appointmentStore";
import { patientAppointments } from "@/public/data/patient-appointment";
import { AppointmentCard } from "@/components/appointment/appointment-card";
import Loading from "@/common/Loader/Loading";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import { useQuery } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/types";
import formatScheduleTime from "@/utils/formatDate";
import { addHours, format, parseISO } from "date-fns";
import { io } from "socket.io-client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import NotificationCard from "@/components/form/appointment/notificationCard";

interface NotificationCardProps {
  patientName: string;
  date: Date;
  time: string;
  reason: string;
  details: string;
}

const notification: NotificationCardProps[] = [
  {
    patientName: "John Doe",
    date: new Date("2024-07-02"),
    time: "10:30 AM",
    reason: "Requesting a follow-up appointment to discuss test results.",
    details:
      "John Doe is requesting a follow-up appointment to discuss the results of his recent medical tests. He would like to meet with you as soon as possible to go over the findings and determine the next steps in his treatment plan.",
  },
  {
    patientName: "Jane Smith",
    date: new Date("2024-07-01"),
    time: "2:00 PM",
    reason: "Seeking a consultation for a new medical concern.",
    details:
      "Jane Smith is requesting a consultation with you to discuss a new medical concern she has been experiencing. She would like to schedule an appointment to have you examine her and provide your professional opinion on the best course of action.",
  },
  {
    patientName: "Michael Johnson",
    date: new Date("2024-06-30"),
    time: "9:00 AM",
    reason: "Requesting a prescription refill.",
    details:
      "Michael Johnson is requesting a refill of his prescription medication. He has been a patient of yours for several years and would like to schedule a quick appointment to have the refill authorized.",
  },
  {
    patientName: "Emily Davis",
    date: new Date("2024-06-29"),
    time: "4:30 PM",
    reason: "Seeking a referral to a specialist.",
    details:
      "Emily Davis is requesting a referral to a specialist in your network. She has been experiencing a specific medical issue and would like your recommendation on the best specialist to see for further evaluation and treatment.",
  },
];

const Appointment = () => {
  const { user, isLoaded, isSignedIn } = useAuth()
  useEffect(() => {
    console.log(user)
    const socket = io("http://localhost:4000", {
      query: {
        userId: user?.UserID,
      }
    })
    socket.on("connect", () => {
      console.log("connected");
    });
    socket.on("new-appointment", (appointment, Message) => {
      console.log("new appointment")
      console.log(appointment)

    })
  }, [user])

  const { data, loading, error } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userID: user?.UserID
    }
  })

  if (loading)
    return <Loading />



  const upcomingAppointments = data?.UserAppointments?.upcomingAppointments.filter((appointment: any) => appointment.Status === "booked");

  const pastAppointments = data?.UserAppointments?.pastAppointments;

  return (
    <div className="flex flex-col space-y-5">
      {/* Notifications  */}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex text-lg font-bold">
              <Bell className="h-6 w-6 mr-2" /> Notifications
            </div>
            <hr className="mt-2" />
          </CardHeader>
          <CardContent className="overflow-y-scroll max-h-96 custome-scrollbar">
            {notification.length > 0 ? (
              notification.map((item, index) => (
                <NotificationCard key={index} {...item} />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center text-slate-500 h-full space-y-2">
                <BellOff className="w-10 h-10 " /> No Notifications
              </div>
            )}
          </CardContent>
        </Card>

        <div className="">
          {/* upcoming appointments */}
          <Card className="border border-secondary-700 hover:shadow-lg">
            <CardHeader className="text-lg font-bold">
              <div className="flex">
                <CircleArrowOutUpRight className="h-6 w-6 mr-2" /> Upcoming
                appointments{" "}
              </div>
              <hr className="mt-2" />
            </CardHeader>
            <CardContent>
              {upcomingAppointments?.length === 0 ?
                <div className="flex flex-col items-center justify-center text-slate-500 h-full space-y-2">
                  <CalendarOff className="w-10 h-10 " /> No Upcoming Appointment
                </div> :
                <>
                  {upcomingAppointments?.map((value: any) => (
                    <AppointmentCard
                      key={value.AppointmentID}
                      id={value.AppointmentID}
                      doctorId={value.PatientID}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      doctorName={value.PatientName}
                      doctorPhoto={value.PatientPhoto || ""}
                      purpose={value.Note}
                      status={value.Status}
                      gender={value.PatientGender}
                      role={UserType.PATIENT}
                    />
                  ))}
                </>
              }
            </CardContent>
          </Card>
        </div>
        <div className="">
          <Card className="border border-green-700 hover:shadow-lg">
            <CardHeader className="text-xl font-bold">
              <div className="flex">
                <CircleArrowOutDownLeft className="h-6 w-6 mr-2" /> Past
                appointments{" "}
              </div>
              <hr className="mt-2" />
            </CardHeader>
            <CardContent>
              {pastAppointments?.length === 0 ?
                <div className="flex flex-col items-center justify-center text-slate-500">
                  <FileClock className="w-10 h-10 " /> No Past Appointment
                </div> :
                <>
                  {pastAppointments?.map((value: any) => (
                    <AppointmentCard
                      key={value.AppointmentID}
                      id={value.AppointmentID}
                      doctorId={value.PatientID}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      doctorName={value.PatientName}
                      doctorPhoto={value.PatientPhoto || ""}
                      purpose={value.Note}
                      status={value.Status}
                      gender={value.PatientGender}
                      role={UserType.DOCTOR}
                    />
                  ))}

                </>
              }

            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
