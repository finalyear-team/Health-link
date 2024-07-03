"use client"
import React from "react";
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
import useAuth from "@/hooks/useAuth";
import { useQuery } from "@apollo/client";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import Loading from "@/common/Loader/Loading";
import { addHours, format, parseISO } from "date-fns";
import formatScheduleTime from "@/utils/formatDate";
import { date } from "yup";
import { UserType } from "@/types/types";

const Appointment = () => {
  const { user, isLoaded, isSignedIn } = useAuth()
  const { data, loading, error } = useQuery(GET_USER_APPOINTMENTS, {
    variables: {
      userID: user?.UserID
    }
  })


  if (loading)
    return <Loading />


  const upcomingAppointments = data?.UserAppointments?.upcomingAppointments;
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
                      doctorId={value.DoctorID}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      doctorName={value.DoctorName}
                      doctorPhoto={value.DoctorPhoto || ""}
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
              {pastAppointments?.length === 0 ? <div>
                No past appointments
              </div> :
                <>
                  {pastAppointments?.map((value: any) => (
                    <AppointmentCard
                      key={value.AppointmentID}
                      id={value.AppointmentID}
                      doctorId={value.DoctorID}
                      appointmentDate={format(addHours(parseISO(value.AppointmentDate), 24), "yyyy-MM-dd")}
                      appointmentTime={formatScheduleTime(value.AppointmentTime)}
                      doctorName={value.DoctorName}
                      doctorPhoto={value.DoctorPhoto || ""}
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

      <Button>
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
