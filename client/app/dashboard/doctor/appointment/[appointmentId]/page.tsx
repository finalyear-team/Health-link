"use client";

import { useRouter } from "next/navigation";
import Head from "next/head";
import { useQuery } from "@apollo/client";
import { GET_APPOINTMENT_BY_ID } from "@/graphql/queries/appointmentQueries";
import Loading from "@/common/Loader/Loading";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const dummyData = {
  AppointmentID: "1",
  DoctorName: "Dr. John Doe",
  DoctorID: "asdkweoq33",
  PatientID: "Patient123",
  ScheduleID: "Schedule456",
  AppointmentDate: "2024-06-05",
  AppointmentTime: "10:00 AM",
  Duration: "30 minutes",
  Status: "Confirmed",
  AppointmentType: "Check-up",
  Note: "Annual check-up",
};

const AppointmentDetail = ({
  params,
}: {
  params: { appointmentId: string };
}) => {
  // const { loading, error, data } = useQuery(GET_APPOINTMENT_BY_ID, {
  //   variables: { id: params.appointmentId },
  // });

  // if (loading)
  //   return (
  //     <div className="flex w-full h-full items-center justify-center">
  //       <Loading />
  //     </div>
  //   );
  // if (error) return <div>Error loading appointment details</div>;

  // const appointment = data.GetAppointmentByID;

  const router = useRouter();

  return (
    <div className="min-h-full flex items-center justify-center">
      <Head>
        <title>Appointment Details</title>
      </Head>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
            Appointment with Dr. {dummyData.DoctorName}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            <strong>Appointment ID:</strong> {params.appointmentId}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            <strong>Date:</strong> {dummyData.AppointmentDate}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            <strong>Time:</strong> {dummyData.AppointmentTime}
          </p>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            <strong>Note:</strong> {dummyData.Note}
          </p>
          <p className="text-gray-800 dark:text-white font-medium mb-2">
            <strong>Status:</strong> {dummyData.Status}
          </p>
          <p className="text-gray-800 dark:text-white font-medium">
            <strong>Type:</strong> {dummyData.AppointmentType}
          </p>
        </div>
        <Button variant={"outline"} onClick={() => router.back()}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </Button>
      </div>
    </div>
  );
};

export default AppointmentDetail;
