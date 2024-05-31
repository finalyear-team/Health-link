import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { AppointmentType } from "@/types/index";
import Image from "next/image";
import { Circle } from "lucide-react";

export const AppointmentCard = ({
  id,
  doctorPhoto,
  appointmentDate,
  appointmentTime,
  doctorName,
  purpose,
  status,
}: AppointmentType) => {
  const [year, month, day] = appointmentDate.split("-");
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Numeric month value
  const monthNumber = month ? parseInt(month) : 0;

  const monthText = monthNames[monthNumber - 1];
  return (
    <div className="py-2 px-3 rounded border border-stroke dark:border-slate-600 flex items-center justify-between md:space-x-6 space-x-3 mb-3">
      {/* doctor profile image and name of the doctor container */}
      <div className="flex items-center justify-start space-x-2 w-2/4 lg:flex-nowrap flex-wrap p-3">
        <Image
          src={doctorPhoto}
          alt={doctorName}
          width={64}
          height={64}
          className="w-16 h-16 rounded-full"
        />
        {/* the content */}
        <div className="flex justify-between items-start flex-col">
          <span className="text-lg md:text-xl font-bold">{doctorName}</span>
          <div className="flex items-center flex-wrap">
            <span className="text-slate-500 dark:text-slate-300 mr-2">
              {appointmentTime}
            </span>
            <span className="font-medium text-primary-600 dark:text-primary-700">
              {purpose}
            </span>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-start space-x-2 w-2/4 lg:flex-nowrap flex-wrap">
        {/* the Date holder */}
        <div className="p-2 rounded border-b-2 border-secondary-700 dark:border-slate-600 flex items-center justify-center space-x-2 w-1/2 flex-wrap">
          <div className="text-4xl font-bold">{day}</div>
          <div className="text-slate-500 dark:text-slate-300 flex justify-between items-center flex-col space-y-2">
            <span> {monthText}</span> {year}
          </div>
        </div>

        {/* the button and status */}
        <div className="flex items-end justify-between flex-col space-y-2 p-2 w-1/2">
          <Badge variant={"secondary"}>{status}</Badge>
          <Link
            href={`/dashboard/patient/appointment/${id}`}
            className="hover:underline text-sm text-center"
          >
            view detail
          </Link>
        </div>
      </div>
    </div>
  );
};
