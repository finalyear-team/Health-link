// import React from 'react'

// const Appointment = () => {
//   return (
//     <div className='text-3xl font-bold'>Your Appointment page</div>
//   )
// }

// export default Appointment
"use client"

import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  CircleArrowOutUpRight,
  CircleArrowOutDownLeft,
  CalendarPlus2,
} from "lucide-react";
import useAppointmentStore from "@/store/appointmentStore";
import { patientAppointments } from "@/public/data/patient-appointment";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { AppointmentCard } from "@/components/appointment/appointment-card";
import Loading from "@/common/Loader/Loading";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import { useQuery } from "@apollo/client";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/types";
import formatScheduleTime from "@/utils/formatDate";
import { addHours, format, parseISO } from "date-fns";
import { io } from "socket.io-client";


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
    <div className="flex items-start flex-col space-y-5">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              {upcomingAppointments?.length === 0 ? <div>
                No upcoming appointments
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
              {pastAppointments?.length === 0 ? <div>
                No past appointments
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
