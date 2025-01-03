// "use client";

// import { useRouter } from "next/navigation";
// import Head from "next/head";
// import { useQuery } from "@apollo/client";
// import { GET_APPOINTMENT_BY_ID } from "@/graphql/queries/appointmentQueries";
// import Loading from "@/common/Loader/Loading";
// import { Button } from "@/components/ui/button";
// import { ArrowLeft, CookingPot } from "lucide-react";
// import { addHours, format, parseISO } from "date-fns";
// import formatScheduleTime from "@/utils/formatDate";
// import { useEffect } from "react";
// import { getVideoSession } from "@/Services/videoCallServices";
// import { getVideoSesssion } from "@/Services/paymentService";
// import { Gender } from "@/types/types";

// const dummyData = {
//   AppointmentID: "1",
//   DoctorName: "Dr. John Doe",
//   DoctorID: "asdkweoq33",
//   PatientID: "Patient123",
//   ScheduleID: "Schedule456",
//   AppointmentDate: "2024-06-05",
//   AppointmentTime: "10:00 AM",
//   Duration: "30 minutes",
//   Status: "Confirmed",
//   AppointmentType: "Check-up",
//   Note: "Annual check-up",
// };

// const AppointmentDetail = ({
//   params,
// }: {
//   params: { appointmentId: string };
// }) => {
//   const { loading, error, data } = useQuery(GET_APPOINTMENT_BY_ID, {
//     variables: { id: params.appointmentId },
//   });


//   if (loading)
//     return (
//       <div className="flex w-full h-full items-center justify-center">
//         <Loading />
//       </div>
//     );

//   if (error) return <div>Error loading appointment details</div>;

//   const appointment = data.GetAppointmentByID;
//   console.log(appointment)

//   const router = useRouter();




//   return (
//     <div className="min-h-full flex items-center justify-center">
//       <Head>
//         <title>Appointment Details</title>
//       </Head>
//       <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 w-full max-w-lg">
//         <div className="mb-6">
//           <h1 className="text-3xl font-semibold text-gray-800 dark:text-white mb-4">
//             {` Appointment with ${appointment.PatientGender === Gender.MALE ? "Mr. " : "Ms."}  ${appointment.PatientName}`}
//           </h1>
//           <p className="text-gray-600 dark:text-gray-400 mb-2">
//             <strong>Appointment ID:</strong> {params.appointmentId}
//           </p>
//           <p className="text-gray-600 dark:text-gray-400 mb-2">
//             <strong>Date:</strong> {format(addHours(parseISO(appointment.AppointmentDate), 24), "yyyy-MM-dd")}
//           </p>
//           <p className="text-gray-600 dark:text-gray-400 mb-2">
//             <strong>Time:</strong> {formatScheduleTime(appointment.AppointmentTime)}
//           </p>
//           <p className="text-gray-600 dark:text-gray-400 mb-4">
//             <strong>Note:</strong> {appointment.Note}
//           </p>
//           <p className="text-gray-800 dark:text-white font-medium mb-2">
//             <strong>Status:</strong> {appointment.Status}
//           </p>
//           <p className="text-gray-800 dark:text-white font-medium">
//             <strong>Type:</strong> {appointment.AppointmentType}
//           </p>
//         </div>
//         <Button variant={"outline"} onClick={() => router.back()}>
//           <ArrowLeft className="h-5 w-5 mr-2" />
//           Back
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default AppointmentDetail;

"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Calendar, Trash } from "lucide-react"
import Loading from "@/common/Loader/Loading"
import { useRouter } from "next/navigation"
import { useQuery } from "@apollo/client"
import { GET_APPOINTMENT_BY_ID } from "@/graphql/queries/appointmentQueries"
import formatScheduleTime from "@/utils/formatDate"
import formatDate from "@/utils/formatDate"
import { addHours, format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge"



const AppointmentDetail = ({
  params,
}: {
  params: { appointmentId: string };
}) => {

  const { loading, error, data } = useQuery(GET_APPOINTMENT_BY_ID, {
    variables: { id: params.appointmentId },
  });


  if (loading)
    return (
      <div className="flex w-full h-full items-center justify-center">
        <Loading />
      </div>
    );

  if (error) return <div>Error loading appointment details</div>;

  const appointment = data.GetAppointmentByID;
  console.log(appointment)

  const router = useRouter();

  return (
    // <div className="max-w-4xl mx-auto p-6 sm:p-10">
    //   <div className="grid gap-8">
    //     <div className="grid gap-2">
    //       <div className="flex items-center justify-between">
    //         <h1 className="text-2xl font-bold">Appointment Details</h1>
    //         <div className="flex items-center gap-2">
    //           <Button variant="outline" size="sm">
    //             <Calendar className="w-4 h-4" />
    //             Reschedule
    //           </Button>
    //           <Button variant="outline" size="sm">
    //             <Trash className="w-4 h-4" />
    //             Cancel
    //           </Button>
    //         </div>
    //       </div>
    //       <Separator />
    //     </div>
    //     <div className="grid md:grid-cols-2 gap-8">
    //       <div className="grid gap-6">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Appointment Details</CardTitle>
    //           </CardHeader>
    //           <CardContent className="grid gap-4">
    //             <div className="grid gap-1">
    //               <div className="text-sm text-muted-foreground">Appointment ID</div>
    //               <div>{params.appointmentId}</div>
    //             </div>
    //             <div className="grid gap-1">
    //               <div className="text-sm text-muted-foreground">Schedule ID</div>
    //               <div>8c7eb136-7795-4948-a815-9c399f6af3ce</div>
    //             </div>
    //             <div className="grid gap-1">
    //               <div className="text-sm text-muted-foreground">Date</div>
    //               <div>{formatScheduleTime(appointment.AppointmentTime)}</div>
    //             </div>
    //             <div className="grid gap-1">
    //               <div className="text-sm text-muted-foreground">Duration</div>
    //               <div>4 hours</div>
    //             </div>
    //             <div className="grid gap-1">
    //               <div className="text-sm text-muted-foreground">Created</div>
    //               <div>July 25, 2024, 10:09 AM</div>
    //             </div>
    //             <div className="grid gap-1">
    //               <div className="text-sm text-muted-foreground">Type</div>
    //               <div>{appointment.AppointmentType}</div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Patient</CardTitle>
    //           </CardHeader>
    //           <CardContent className="grid gap-4">
    //             <div className="flex items-center gap-4">
    //               <Avatar className="bg-primary text-primary-foreground">
    //                 <AvatarFallback>AY</AvatarFallback>
    //               </Avatar>
    //               <div className="grid gap-1">
    //                 <div className="font-medium">Alhamdu Yajebo</div>
    //                 <div className="text-sm text-muted-foreground">First appointment</div>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </div>
    //       <div className="grid gap-6">
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Provider</CardTitle>
    //           </CardHeader>
    //           <CardContent className="grid gap-4">
    //             <div className="flex items-center gap-4">
    //               <Avatar className="bg-primary text-primary-foreground">
    //                 <AvatarFallback>AW</AvatarFallback>
    //               </Avatar>
    //               <div className="grid gap-1">
    //                 <div className="font-medium">Dr. Abebe Wondwosen</div>
    //                 <div className="text-sm text-muted-foreground">Male Physician</div>
    //               </div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //         <Card>
    //           <CardHeader>
    //             <CardTitle>Notes</CardTitle>
    //           </CardHeader>
    //           <CardContent className="grid gap-4">
    //             <div className="grid gap-1">
    //               <div className="text-sm text-muted-foreground">Appointment Notes</div>
    //               <div>{appointment.Note}</div>
    //             </div>
    //           </CardContent>
    //         </Card>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="max-w-4xl mx-auto p-6 sm:p-10">
      <div className="grid gap-8">
        <div className="grid gap-2">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Appointment Details</h1>

          </div>
          <Separator />
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-1">
                  <div className="text-sm text-muted-foreground">Appointment ID</div>
                  <div>{appointment.AppointmentID}</div>
                </div>

                <div className="grid gap-1">
                  <div className="text-sm text-muted-foreground">Date</div>
                  <div>{format(addHours(parseISO(appointment.AppointmentDate), 24), "yyyy-MM-dd")}</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-muted-foreground">Time</div>
                  <div>{formatScheduleTime(appointment.AppointmentTime)}</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-muted-foreground">Duration</div>
                  <div>{appointment.Duration} hours</div>
                </div>
                <div className="grid gap-1">
                  <div className="text-sm text-muted-foreground">Created</div>
                  <div>{formatDate(appointment.CreatedAt)}</div>
                </div>
                <div className="">
                  <div className="text-sm text-muted-foreground">Type</div>
                  <Badge>{appointment.AppointmentType}</Badge>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Patient</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="bg-primary text-primary-foreground">
                    <AvatarFallback>{appointment.PatientName.slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">{appointment.PatientName}</div>
                    <div className="text-sm text-muted-foreground">{appointment.Note}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Provider</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="flex items-center gap-4">
                  <Avatar className="bg-primary text-primary-foreground">
                    <AvatarFallback>{appointment.DoctorName.slice(0, 1).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="grid gap-1">
                    <div className="font-medium">Dr. {appointment.DoctorName}</div>
                    <div className="text-sm text-muted-foreground">{appointment.DoctorGender === 'male' ? 'Male Physician' : 'Female Physician'}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Notes</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-1">
                  <div className="text-sm text-muted-foreground">Appointment Notes</div>
                  <div>{appointment.Note}</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>

  )
}

export default AppointmentDetail