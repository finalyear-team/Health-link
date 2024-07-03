"use client";

import React, { useState } from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Link from "next/link";
import { AppointmentType } from "@/types/index";
import Image from "next/image";
import { Settings2, Trash2 } from "lucide-react";
import { useUser } from "@clerk/nextjs";
import AppointmentForm from "../form/appointment/appointment-form";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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
import { useMutation, useQuery } from "@apollo/client";
import { useToast } from "../ui/use-toast";
import { REMOVE_APPOINTMENT } from "@/graphql/mutations/appointmentMutations";
import Loading from "@/common/Loader/Loading";
import useAuth from "@/hooks/useAuth";
import { Gender, UserType } from "@/types/types";

export const AppointmentCard = ({
  id,
  doctorPhoto,
  appointmentDate,
  appointmentTime,
  doctorId,
  doctorName,
  purpose,
  status,
  gender,
  role

}: AppointmentType) => {
  console.log(appointmentDate)
  const [year, month, day] = appointmentDate?.split("-");
  const [isHovered, setIsHovered] = useState(false);
  const [RemoveAppointment, { data, loading, error }] =
    useMutation(REMOVE_APPOINTMENT);
  const { toast } = useToast();
  // const { user } = useUser();
  const { user, isLoaded, isSignedIn } = useAuth()

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
  // const Role = user?.unsafeMetadata.role === "provider" ? "doctor" : "Patient";
  const Role = user && user.Role === UserType.DOCTOR ? "doctor" : "patient"
  const RemoveAppointmentHandler = async () => {
    try {
      await RemoveAppointment({
        variables: { Id: id },
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
  ;
  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
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
            <span className="text-lg md:text-xl font-bold">{role === UserType.DOCTOR ? "Dr.  " : (gender === Gender.MALE ? "Mr . " : "Ms")}{doctorName}</span>
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
              href={`/dashboard/${Role}/appointment/${id}`}
              className="hover:underline text-sm text-center"
            >
              view detail
            </Link>
          </div>
        </div>
      </div>
      {/* buttons */}
      <div className="absolute top-0 right-2 flex space-x-2 items-center">
        {/* <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              {status !== "Completed" ? (
                <Settings2 className="w-4 h-4 cursor-pointer" />
              ) : (
                ""
              )}
            </TooltipTrigger>
            <TooltipContent>
              <p>Reschedule</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Trash2 className="w-4 h-4 cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>
              <p>Delete</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
        <TooltipProvider>
          <Dialog>
            <Tooltip>
              <TooltipTrigger>
                <DialogTrigger asChild>
                  <div
                    className="hover:bg-slate-100 p-2 rounded-full dark:hover:bg-slate-600 transition-opacity duration-300"
                    style={{ opacity: isHovered ? 1 : 0 }}
                  >
                    {status !== "Completed" ? (
                      <Settings2 className="w-4 h-4 cursor-pointer" />
                    ) : (
                      ""
                    )}
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
                  <Settings2 className="w-4 h-4 mr-2" /> Reschedule Appointment
                </DialogTitle>
                <DialogDescription>
                  Make changes to the Appointment here. Click save when
                  you&apos;re done.
                </DialogDescription>
              </DialogHeader>
              <AppointmentForm
                doctorId={doctorId}
                existingAppointment={{
                  date: appointmentDate,
                  time: appointmentTime,
                  reason: purpose,
                }}
              />
            </DialogContent>
          </Dialog>
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
