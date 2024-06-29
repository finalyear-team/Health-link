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

const Appointment = () => {
  const upcomingAppointments = patientAppointments.upcomingAppointments;
  const pastAppointments = patientAppointments.pastAppointments;
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
              {upcomingAppointments.map((value) => (
                <AppointmentCard
                  key={value.id}
                  id={value.id}
                  doctorId={value.doctorId}
                  appointmentDate={value.appointmentDate}
                  appointmentTime={value.appointmentTime}
                  doctorName={value.doctorName}
                  doctorPhoto={value.doctorPhoto}
                  purpose={value.purpose}
                  status={value.status}
                />
              ))}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
              alias sed vero ipsum velit eaque voluptates saepe dolorum maiores
              tenetur!
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
              {pastAppointments.map((value) => (
                <AppointmentCard
                  key={value.id}
                  id={value.id}
                  doctorId={value.doctorId}
                  appointmentDate={value.appointmentDate}
                  appointmentTime={value.appointmentTime}
                  doctorName={value.doctorName}
                  doctorPhoto={value.doctorPhoto}
                  purpose={value.purpose}
                  status={value.status}
                />
              ))}
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Illo
              alias sed vero ipsum velit eaque voluptates saepe dolorum maiores
              tenetur!
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
