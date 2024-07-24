"use client";

import React, { useState, useEffect } from "react";
import AppointmentDetails from "@/components/test/AppointmentDetails";
import CountdownTimer from "@/components/test/CountdownTimer";
import JoinButton from "@/components/test/JoinButton";
import { Button } from "@/components/ui/button";
import { Video } from "lucide-react";
import AppointmentForm from "@/components/form/appointment/appointment-form";
import { Settings2, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useMutation, useQuery } from "@apollo/client";
import { DECLINE_APPOINTMENT, REMOVE_APPOINTMENT, UPDATE_APPOINTMENT } from "@/graphql/mutations/appointmentMutations";
import { useToast } from "../ui/use-toast";
import Loading from "@/common/Loader/Loading";
import { addDays, addHours, format, isValid, parse, setHours, setMinutes, setSeconds } from 'date-fns';
import formatScheduleTime from "@/utils/formatDate";
import { add } from "lodash";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import useAuth from "@/hooks/useAuth";
import { Field, Form, Formik } from "formik";
import { Label } from "@radix-ui/react-label";
import { Input } from "../ui/input";
import { formatInTimeZone } from "date-fns-tz";
import { getFormatedDate, getFormatedTime } from "@/utils/TimeZoneConverter";
import { AppointmentStatus } from "@/types/types";

const VideoAppointmentCard = ({ dummyData, onJoinClick }: any) => {
  const [ISOFormattedtime, setISOFormattedTime] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [expire, setExpire] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [open, setOpen] = useState(false)
  const { user } = useAuth()


  const { refetch } = useQuery(GET_USER_APPOINTMENTS, {
    variables: { userID: user?.UserID },
  });

  const [declineAppointment, { data: declineAppointmentData, loading, error }] = useMutation(DECLINE_APPOINTMENT, {
    onCompleted(data, clientOptions) {
      refetch()
      console.error("Error removing appointment: ", error);
      toast({
        title: "Appointment Declined appointment",
        description: "Please try again.",
        variant: "success",
      });
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      console.error("Error removing appointment: ", error);
      toast({
        title: "Error cancelling appointment",
        description: "Please try again.",
        variant: "destructive",
      });
    }

  })
  const [updateAppointmentStatus, { data: updatedAppointment }] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted(data, clientOptions) {
      refetch()

    },
    onError: (error) => {
      console.error('Mutation error:', error);
      console.error("Error tment: ", error);

    }

  })

  const { toast } = useToast();




  const combineDateAndTime = (firstDateStr: string, secondDateStr: string): string => {

    const year = addDays(new Date(firstDateStr), 1).getFullYear();
    const month = addDays(new Date(firstDateStr), 1).getMonth();
    const day = addDays(new Date(firstDateStr), 1).getDate()
    const hours = addHours(new Date(secondDateStr), 1).getHours();
    const minutes = addHours(new Date(secondDateStr), 1).getMinutes();

    const combinedDate = new Date(year, month, day, hours, minutes, 0, 0);

    return combinedDate.toISOString()

  };









  const parsedTime = parse(dummyData.appointmentTime, 'HH:mm:ss', new Date());





  const formattedTime = formatScheduleTime(dummyData.appointmentTime)


  // assign combined ISO format date and time to state
  useEffect(() => {
    const formattedDateTime = combineDateAndTime(
      dummyData.appointmentDate,
      dummyData.appointmentTime)


    setISOFormattedTime(formattedDateTime)

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const appointmentTime = new Date(formattedDateTime);
      const oneHourLater = addHours(appointmentTime, dummyData.duration);

      if (currentTime >= appointmentTime && currentTime <= oneHourLater) {
        setIsActive(true);
        setExpire(false);
      } else if (currentTime > oneHourLater) {
        setExpire(true);
        setIsActive(false);
      } else {
        setIsActive(false);
        setExpire(false);
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [dummyData.appointmentDate, dummyData.appointmentTime, dummyData.duration,]);




  const cancelAppointmentHandler = async (value: any) => {
    try {
      await declineAppointment(
        {
          variables: {
            CancelledBy: user?.UserID
            , AppointmentID: dummyData.appointmentId
            , CancelledReason: value?.cancelReason
          }
        }
      )
    } catch (error) {

    }
  };


  useEffect(() => {

    if (expire)
      updateAppointmentStatus({
        variables: {
          updateAppointmentInput: {
            AppointmentID: dummyData.appointmentId,
            DoctorID: dummyData.doctorId,
            PatientID: dummyData.patientId,
            Status: AppointmentStatus.OVERDUE
          }


        }
      }
      )


  }, [expire])

  if (loading)
    return (
      <div className="w-full flex justify-center my-2">
        <Loading />
      </div>
    );

  return (
    <div
      className="relative rounded border border-slate-200 dark:border-slate-600 p-3 mb-2"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between flex-wrap">
        <AppointmentDetails
          doctorName={dummyData.name}
          doctorPhoto={dummyData.photo}
          appointmentId={dummyData.appointmentId}
          appointmentTime={`${format(addHours(dummyData.appointmentDate, 24), "EEE, d MMM yyyy")} | ${formattedTime}`}
          purpose={dummyData.purpose}
          role={dummyData?.role}
          gender={dummyData.gender}
        />
        <CountdownTimer targetTime={ISOFormattedtime} expire={expire} />

        <div className="">
          {isActive && <Button
            onClick={onJoinClick}
            className={`${isActive ? "opacity-100" : "bg-slate-300 cursor-not-allowed"}`}
            disabled={!isActive}
          >
            <Video className="w-4 h-4 mr-2" /> Join Live Consultation
          </Button>}
        </div>


      </div>

      <div className="absolute right-3 top-1 flex space-x-1 items-center">
        <TooltipProvider>
          {!expire && (
            <Dialog>
              <Tooltip>
                <TooltipTrigger>
                  <DialogTrigger asChild>
                    <div
                      className="hover:bg-slate-100 p-2 rounded-full dark:hover:bg-slate-600 transition-opacity duration-300"
                      style={{ opacity: isHovered ? 1 : 0 }}
                    >
                      <Settings2 className="w-4 h-4 cursor-pointer" />
                    </div>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Reschedule</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="">
                <DialogHeader>
                  <DialogTitle className="flex items-center mb-2">
                    <Settings2 className="w-4 h-4 mr-2" /> Reschedule
                    Appointment
                  </DialogTitle>
                  <DialogDescription>
                    Make changes to the Appointment here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <AppointmentForm
                  patientId={dummyData.patientId}
                  doctorId={dummyData.doctorId}
                  existingAppointment={{
                    id: dummyData.appointmentId,
                    date: addDays(dummyData.appointmentDate, 1),
                    time: dummyData.appointmentTime,
                    reason: dummyData.purpose,
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
          <AlertDialog open={open} onOpenChange={setOpen}>
            <Tooltip>
              <TooltipTrigger>
                <AlertDialogTrigger asChild>
                  <div
                    className="hover:bg-slate-100 p-2 rounded-full dark:hover:bg-slate-600 transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  >
                    <Trash2 className="w-4 h-4 cursor-pointer" />{" "}
                  </div>
                </AlertDialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Cancel</p>
              </TooltipContent>
            </Tooltip>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to cancel this appointment?</AlertDialogTitle>
                <AlertDialogDescription>
                  Please provide a reason for cancellation:
                </AlertDialogDescription>
              </AlertDialogHeader>
              <Formik initialValues={{ cancelReason: "" }} onSubmit={cancelAppointmentHandler}>
                {({ isValid, isSubmitting }) => (
                  <Form className="space-y-6" action="#" method="POST">
                    <div className="space-y-1.5">
                      <Label htmlFor="reason">Reason</Label>
                      <Field
                        id="cancelReason"
                        name="cancelReason"
                        as={Input}
                        type="text"
                      />
                    </div>
                    <AlertDialogFooter>
                      <AlertDialogCancel asChild>
                        <button
                          type="button"
                          onClick={() => setOpen(false)}
                          className="btn-cancel "
                        >
                          Cancel
                        </button>
                      </AlertDialogCancel>
                      <button
                        type="submit"
                        className={`px-2 text-sm rounded-md text-black bg-slate-50 font-medium ${isSubmitting ? "opacity-50 cursor-not-allowed" : "opacity-100 cursor-pointer"}`}
                        disabled={isSubmitting}
                      >
                        Continue
                      </button>
                    </AlertDialogFooter>
                  </Form>
                )}
              </Formik>

            </AlertDialogContent>
          </AlertDialog>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default VideoAppointmentCard;
