import React from "react";
import { Badge } from "../ui/badge";
import Link from "next/link";
import { AppointmentType } from "@/types/index";

export const UpcomingAppointment = ({
  id,
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
      {/* the Date holder */}
      <div className="p-2 rounded border border-stroke dark:border-slate-600 flex items-center justify-between space-x-2 w-1/4 flex-wrap">
        <div className="text-5xl font-bold">{day}</div>
        <div className="text-slate-500 dark:text-slate-300 flex justify-between items-center flex-col space-y-2">
          <span> {monthText}</span> {year}
        </div>
      </div>

      {/* the content */}
      <div className="flex justify-between items-start flex-col p-3 w-2/4">
        <span className="text-xl md:text-2xl font-bold">{doctorName}</span>
        <div className="flex items-center justify-center flex-wrap">
          <span className="text-slate-500 dark:text-slate-300">
            {appointmentTime}
          </span>
          <span className="font-medium text-primary-600 dark:text-primary-700 ml-2">
            {purpose}
          </span>
        </div>
      </div>
      {/* the button and status */}
      <div className="flex items-end justify-between flex-col space-y-2 p-2 w-1/4">
        <Badge variant={"secondary"}>{status}</Badge>
        <Link
          href={`/dashboard/patient/appointment/${id}`}
          className="hover:underline text-sm text-center"
        >
          view detail
        </Link>
      </div>
    </div>
  );
};
