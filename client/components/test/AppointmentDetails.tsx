import Image from "next/image";
import React from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";

interface AppointmentDetailsProps {
  doctorName: string;
  doctorPhoto: string;
  appointmentId: string;
  appointmentTime: string;
  purpose: string;
}

const AppointmentDetails: React.FC<AppointmentDetailsProps> = ({
  doctorName,
  doctorPhoto,
  appointmentId,
  appointmentTime,
  purpose,
}) => {
  const { user } = useUser();
  const Role = user?.unsafeMetadata.role === "provider" ? "doctor" : "patient";
  return (
    <div className="flex items-center p-4">
      <Image
        src={doctorPhoto}
        alt={doctorName}
        width={64}
        height={64}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h2 className="text-lg md:text-xl font-bold">{doctorName}</h2>
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
