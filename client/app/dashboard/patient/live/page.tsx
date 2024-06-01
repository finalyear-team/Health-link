"use client";

import React, { useState, useEffect } from "react";
import VideoChatInitiation from "@/components/layout/video-chat";
import { Button } from "@/components/ui/button";
import AppointmentDetails from "@/components/test/AppointmentDetails";
import CountdownTimer from "@/components/test/CountdownTimer";
import JoinButton from "@/components/test/JoinButton";
import ChatBox from "@/components/test/ChatBox";
import { Formik, Form } from "formik";
import { CircleArrowOutUpRight, Settings2, Trash2 } from "lucide-react";
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";

const Video = () => {
  const [showVideoChat, setShowVideoChat] = useState(false);
  const [isActive, setIsActive] = useState(false);

  const appointmentTime = "2024-06-01T14:50:00";
  useEffect(() => {
    const intervalId = setInterval(() => {
      const currentTime = new Date().toISOString();
      setIsActive(new Date(currentTime) >= new Date(appointmentTime));
    }, 1000);

    return () => clearInterval(intervalId); // Clean up on unmount
  }, [appointmentTime]);

  const initialValues = {
    name: "",
    username: "",
  };

  const handleJoinClick = () => {
    setShowVideoChat(true);
  };

  const handleSchedule = () => {
    // some Logic
  };

  return (
    <div>
      {!showVideoChat && (
        <div className="relative w-full rounded border border-secondary-700 dark:border-slate-600 shadow-sm p-6">
          <div className="flex items-center text-xl font-bold">
            {" "}
            <CircleArrowOutUpRight className="h-6 w-6 mr-2" /> Upcoming Live
            Consultation
          </div>
          <hr className="mt-2" />
          <div className="flex items-center justify-between flex-wrap mt-2">
            <AppointmentDetails
              doctorName="Dr. John Doe"
              doctorPhoto="/image/profile-picture.jpg"
              appointmentTime="June 1, 2024, 10:00 AM"
              purpose="General consultation"
            />
            <div className="mt-4">
              <CountdownTimer targetTime={appointmentTime} />
            </div>
            <div className="mt-4">
              <JoinButton isActive={isActive} onClick={handleJoinClick} />
            </div>
          </div>
          <div className="flex space-x-3 items-center">
            <Dialog>
              <DialogTrigger asChild>
                <Button size={"sm"}>
                  <Settings2 className="w-4 h-4 mr-2" /> Reschedule
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle className="flex">
                    {" "}
                    <Settings2 className="w-4 h-4 mr-2" /> Reschedule
                    Appointment
                  </DialogTitle>
                  <DialogDescription>
                    Make changes to the Appointment here. Click save when
                    you&apos;re done.
                  </DialogDescription>
                </DialogHeader>
                <Formik
                  initialValues={initialValues}
                  onSubmit={handleSchedule}
                  // validationSchema={validationSchema}
                >
                  {({ isValid, isSubmitting }) => (
                    <Form className="mt-8 space-y-4" action="#" method="POST">
                      <div className="py-4">
                        <div className="">
                          <Input type="text" name="name" label="Name" />
                        </div>
                        <div className="mt-2">
                          <Input type="text" name="username" label="Username" />
                        </div>
                      </div>

                      <DialogFooter>
                        <Button type="submit">Save changes</Button>
                      </DialogFooter>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </Dialog>

            {/* Show dialog for the cancel appointment */}

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button size={"sm"} variant={"destructive"}>
                  <Trash2 className="w-4 h-4 mr-2" /> Cancel
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. It will permanently delete
                    your current appointment and remove all its related data
                    from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      )}

      {/* conditionally showing the video chat */}
      {showVideoChat && (
        <div>
          <VideoChatInitiation role={"patient"} />
        </div>
      )}
    </div>
  );
};

export default Video;
