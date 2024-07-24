
"use client"

import React, { useEffect, useState } from "react";
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
import { CHECK_OVERDUE_APPOINTMENTS, GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import { useQuery } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import { AppointmentStatus, Gender, NotificationType, UserType } from "@/types/types";
import formatScheduleTime from "@/utils/formatDate";
import { addHours, compareDesc, differenceInYears, format, parse, parseISO } from "date-fns";
import { io } from "socket.io-client";

import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
  CardDescription,
} from "@/components/ui/card";
import NotificationCard from "@/components/form/appointment/notificationCard";
import { GET_USER_NOTIFICATION } from "@/graphql/queries/notificationQueries";
import { getVideoSesssion } from "@/Services/paymentService";
import { AppointmentNotification } from "@/types";

interface NotificationCardProps {
  patientName: string;
  date: Date;
  time: string;
  reason: string;
  details: string;
}


const Appointment = () => {

  const { user } = useAuth()
  const checkOverdue = useQuery(CHECK_OVERDUE_APPOINTMENTS)
  const [appointmentNotifications, setappointmentNotifications] = useState<AppointmentNotification[] | null | undefined>(null)
  const { data: userNotification } = useQuery(GET_USER_NOTIFICATION, {
    variables: {
      UserID: user?.UserID
    }
  })

  const { data, loading, error } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userID: user?.UserID
    }
  })


  useEffect(() => {
    if (!user)
      return
    const socket = io("http://localhost:4000", {
      query: {
        userId: user?.UserID,
      }
    })
    socket.on("connect", () => {
      console.log("connected")
    });
    socket.on("new-appointment", ({ message }) => {
      console.log(message)
      if (message)
        setappointmentNotifications((prevState) => {
          const exists = prevState?.some(state => state.appointmentId === message.appointmentId);

          if (!exists && prevState) {
            return [message, ...prevState];
          }
          return prevState;
        });

    })

    return () => {
      socket.disconnect();
    };
  }, [user])


  const removePendingAppointment = (appointmentId: string) => {
    setappointmentNotifications(appointmentNotifications?.filter(appointment => appointment.appointmentId !== appointmentId))
  }

  useEffect(() => {
    if (!data?.UserAppointments?.upcomingAppointments)
      return
    const pendingAppointments = data?.UserAppointments?.upcomingAppointments.filter((appointment: any) => appointment.Status === AppointmentStatus.PENDING)

    const notifications = pendingAppointments?.map((appointment: any, i: number) => {
      return {
        patientName: appointment.PatientName,
        date: format(new Date(appointment.CreatedAt), "yyyy/MM/dd"),
        age: differenceInYears(new Date(), appointment.PatientDOB),
        appointmentId: appointment.AppointmentID,
        doctorName: appointment.DoctorName,
        doctorId: appointment.DoctorID,
        time: format(new Date(appointment.CreatedAt), "hh:mm a"),
        reason: appointment.Note,
        gender: appointment.PatientGender,
        status: appointment.Status,
        appointmentDate: format(addHours(parseISO(appointment.AppointmentDate), 24), "yyyy-MM-dd"),
        appointmentTime: formatScheduleTime(appointment.AppointmentTime
        )
      }
    })


    notifications.sort((a: any, b: any) => {
      const dateComparison = compareDesc(parse(a.date, "yyyy/MM/dd", new Date()), parse(b.date, "yyyy/MM/dd", new Date()));
      if (dateComparison === 0) {
        return compareDesc(parse(a.time, "hh:mm a", new Date()), parse(b.time, "hh:mm a", new Date()));
      }
      return dateComparison;
    });
    setappointmentNotifications(notifications)

  }, [data])







  if (loading)
    return <Loading />

  console.log(data)


  const upcomingAppointments = data?.UserAppointments?.upcomingAppointments.filter((appointment: any) => appointment.Status === "booked" || appointment.Status === "reschedulePending");

  const pastAppointments = data?.UserAppointments?.pastAppointments;

  console.log(pastAppointments)
  console.log(upcomingAppointments)



  return (
    <div className="flex flex-col space-y-5">
      {/* Notifications  */}

      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {appointmentNotifications && appointmentNotifications.length > 0 &&
          <Card>
            <CardHeader>
              <div className="flex text-lg font-bold">
                <Bell className="h-6 w-6 mr-2" /> Pending appointments
              </div>
              <hr className="mt-2" />
            </CardHeader>
            <CardContent className="overflow-y-scroll max-h-96 custome-scrollbar">
              {appointmentNotifications && appointmentNotifications?.length > 0 ? (
                appointmentNotifications.map((item, index) => (
                  <NotificationCard key={index} {...item} removePendingAppointment={removePendingAppointment} />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center text-slate-500 h-full space-y-2">
                  <BellOff className="w-10 h-10 " /> No Notifications
                </div>
              )}
            </CardContent>
          </Card>
        }

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
                      doctorId={value.DoctorID}
                      patientId={value.PatientID}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      name={value.PatientName}
                      photo={value.PatientPhoto || ""}
                      purpose={value.Note}
                      status={value.Status === "reschedulePending" ? "Pending" : value.Status}
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
                      doctorId={value.DoctorID}
                      patientId={value.PatientID}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      name={value.PatientName}
                      photo={value.PatientPhoto || ""}
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
      </div>
    </div>
  );
};

export default Appointment;