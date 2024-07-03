"use client"
import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { Gender, UserType } from "@/types/types";
import useAuth from "@/hooks/useAuth";

interface AppointmentDetailsProps {
  doctorName: string;
  doctorPhoto: string;
  appointmentId: string;
  appointmentTime: string;
  purpose: string;
  role?: UserType;
  gender?: Gender
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  doctorName,
  doctorPhoto,
  appointmentId,
  appointmentTime,
  purpose,
  role,
  gender
}) => {
  const { user } = useAuth();
  const Role = user?.Role === UserType.DOCTOR ? "doctor" : "patient";
  return (
    <div className="flex items-center p-4">
      <Image
        src={doctorPhoto || ""}
        alt={doctorName}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg md:text-xl font-bold">{role === UserType.DOCTOR ? "Dr . " : (gender === Gender.MALE ? "Mr . " : "Ms.   ")}{doctorName}</h2>
        <p className="text-slate-500 dark:text-slate-300">{appointmentTime}</p>
        <p className="font-medium text-primary-600 dark:text-primary-700">
          {purpose}
        </p>
        <Link
          href={`/dashboard/${Role}/appointment/${appointmentId}`}
          className="hover:underline text-sm text-center"
        >
          view detail
        </Link>
      </div>
    </div>
  );
};

export default AppointmentDetails;
