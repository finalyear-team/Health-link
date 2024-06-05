"use client";

import React, { useState, useEffect } from "react";
import AppointmentDetails from "@/components/test/AppointmentDetails";
import CountdownTimer from "@/components/test/CountdownTimer";
import JoinButton from "@/components/test/JoinButton";
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
import { useMutation } from "@apollo/client";
import { REMOVE_APPOINTMENT } from "@/graphql/mutations/appointmentMutations";
import { useToast } from "../ui/use-toast";
import Loading from "@/common/Loader/Loading";

const VideoAppointmentCard = ({ dummyData, onJoinClick }: any) => {
  const [ISOFormattedtime, setISOFormattedTime] = useState("");
  const [isActive, setIsActive] = useState(false);
  const [expire, setExpire] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [RemoveAppointment, { data, loading, error }] =
    useMutation(REMOVE_APPOINTMENT);
  const { toast } = useToast();

  // convert string format date and time into combined ISO format
  const convertToISO = (date: string, time: string): string => {
    const dateTime = new Date(`${date}T${time}`);
    return dateTime.toISOString();
  };

  // assign combined ISO format date and time to state
  useEffect(() => {
    const formattedTime = convertToISO(
      dummyData.appointmentDate,
      dummyData.appointmentTime
    );
    setISOFormattedTime(formattedTime);

    const intervalId = setInterval(() => {
      const currentTime = new Date();
      const appointmentTime = new Date(formattedTime);
      const oneHourLater = new Date(appointmentTime.getTime() + 3600 * 1000);

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
  }, [dummyData.appointmentDate, dummyData.appointmentTime]);

  const RemoveAppointmentHandler = async () => {
    try {
      await RemoveAppointment({
        variables: { Id: dummyData.appointmentId },
      });
      console.log("appointment Removed");
      toast({
        title: "Appointment Removed",
        description: "Your appointment has been removed successfully.",
        variant: "success",
      });
    } catch (error) {
      console.error("Error removing appointment: ", error);
      toast({
        title: "Error removing appointment",
        description: "Please try again.",
        variant: "destructive",
      });
    }
  };

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
          doctorName={dummyData.doctorName}
          doctorPhoto={dummyData.doctorPhoto}
          appointmentId={dummyData.appointmentId}
          appointmentTime={`${dummyData.appointmentDate} | ${dummyData.appointmentTime}`}
          purpose={dummyData.purpose}
        />
        <CountdownTimer targetTime={ISOFormattedtime} expire={expire} />
        <JoinButton isActive={isActive} onClick={onJoinClick} />
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
                  doctorId={dummyData.doctorId}
                  existingAppointment={{
                    date: dummyData.appointmentDate,
                    time: dummyData.appointmentTime,
                    reason: dummyData.purpose,
                  }}
                />
              </DialogContent>
            </Dialog>
          )}
          <AlertDialog>
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
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. It will permanently delete your
                  current appointment and remove all its related data from our
                  servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={RemoveAppointmentHandler}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default VideoAppointmentCard;
