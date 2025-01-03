"use client"
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CircleArrowOutUpRight,
  CircleArrowOutDownLeft,
  CalendarPlus2,
  CalendarOff,
  FileClock,
  Bell,
  BellOff,
} from "lucide-react";
import useAppointmentStore from "@/store/appointmentStore";
import { patientAppointments } from "@/public/data/patient-appointment";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AppointmentCard } from "@/components/appointment/appointment-card";
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { CHECK_OVERDUE_APPOINTMENTS, GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import Loading from "@/common/Loader/Loading";
import { addHours, compareDesc, differenceInYears, format, parse, parseISO } from "date-fns";
import formatScheduleTime from "@/utils/formatDate";
import { date } from "yup";
import { AppointmentStatus, UserType } from "@/types/types";
import { AppointmentNotification } from "@/types";
import NotificationCard from "@/components/form/appointment/notificationCard";
import { io } from "socket.io-client";

const Appointment = () => {
  const { user, isLoaded, isSignedIn } = useAuth()


  const { data, loading, error, refetch } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userID: user?.UserID
    }
  })
  const checkOverdue = useQuery(CHECK_OVERDUE_APPOINTMENTS)

  const [appointmentNotifications, setappointmentNotifications] = useState<AppointmentNotification[] | null | undefined>(null)

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
    socket.on("notification", () => {

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
    const pendingAppointments = data?.UserAppointments?.upcomingAppointments.filter((appointment: any) => appointment.Status === AppointmentStatus.RESCHEDULEPENDING)

    const notifications = pendingAppointments?.map((appointment: any, i: number) => {
      return {
        patientName: appointment.PatientName,
        date: format(new Date(appointment.CreatedAt), "yyyy/MM/dd"),
        age: differenceInYears(new Date(), appointment.PatientDOB),
        appointmentId: appointment.AppointmentID,
        doctorName: appointment.DoctorName,
        duration: appointment?.Duration,
        doctorId: appointment.DoctorID,
        time: format(new Date(appointment.CreatedAt), "hh:mm a"),
        reason: appointment.Note,
        status: appointment.Status,
        gender: appointment.PatientGender,
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





  const upcomingAppointments = data?.UserAppointments?.upcomingAppointments.filter((appointment: any) => appointment.Status !== AppointmentStatus.RESCHEDULEPENDING);

  console.log(upcomingAppointments)
  const pastAppointments = data?.UserAppointments?.pastAppointments;
  console.log(appointmentNotifications)


  if (loading)
    return <Loading />



  return (
    <div className="flex  flex-col space-y-5">
      <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2">
        {appointmentNotifications && appointmentNotifications.length > 0 &&
          <Card>
            <CardHeader>
              <div className="flex text-lg font-bold">
                <Bell className="h-6 w-6 mr-2" /> Rescheduled appointments
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
            <CardHeader className="text-xl font-bold">
              <div className="flex">
                <CircleArrowOutUpRight className="h-6 w-6 mr-2" /> Upcoming
                appointments{" "}
              </div>
              <hr className="mt-2" />
            </CardHeader>
            <CardContent>
              {upcomingAppointments?.length === 0 ? <div className="flex flex-col items-center justify-center text-slate-500 h-full space-y-2">
                <CalendarOff className="w-10 h-10 " /> No Upcoming Appointment
              </div> :
                <>
                  {upcomingAppointments?.map((value: any) => (
                    <AppointmentCard
                      key={value.AppointmentID}
                      id={value.AppointmentID}
                      doctorId={value.DoctorID}
                      patientId={value.PatientID}
                      duration={value?.Duration}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      name={value.DoctorName}
                      photo={value.DoctorPhoto || ""}
                      purpose={value.Note}
                      status={value.Status}
                      gender={value.DoctorGender}
                      role={UserType.DOCTOR}
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
              {pastAppointments?.length === 0 ? <div className="flex flex-col items-center justify-center text-slate-500">
                <FileClock className="w-10 h-10 " /> No Past Appointment
              </div> :
                <>
                  {pastAppointments?.map((value: any) => (
                    <AppointmentCard
                      key={value.AppointmentID}
                      id={value.AppointmentID}
                      doctorId={value.DoctorID}
                      patientId={value.PatientID}
                      duration={value?.Duration}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      name={value.DoctorName}
                      photo={value.DoctorPhoto || ""}
                      purpose={value.Note}
                      status={value.Status}
                      gender={value.DoctorGender}
                      role={UserType.DOCTOR}
                    />
                  ))}

                </>
              }

            </CardContent>
          </Card>
        </div>
      </div>

      <Button className="self-start justify-self-start ">
        <CalendarPlus2 className="h-4 w-4 mr-2" />
        <Link href="/dashboard/patient/consultation">
          {" "}
          Start New Appointment{" "}
        </Link>
      </Button>
    </div>
  );
};

export default Appointment;
