"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { CalendarDays, X } from "lucide-react";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Formik, Form, Field } from "formik";
import { useMutation, useQuery } from "@apollo/client";
import { ACCEPT_APPOINTMENT, DECLINE_APPOINTMENT, UPDATE_APPOINTMENT } from "@/graphql/mutations/appointmentMutations";
import { useToast } from "@/components/ui/use-toast";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";
import useAuth from "@/hooks/useAuth";
import { AppointmentStatus, UserType } from "@/types/types";

interface AppointmentNotification {
  patientName: string;
  date: string;
  age: string;
  appointmentId: string;
  doctorName: string;
  doctorId: string;
  time: string;
  reason: string;
  duration?: number;
  details: string;
  status?: string;
  appointmentDate: string;
  appointmentTime: string;
  gender: string;
  removePendingAppointment: (appointmentId: string) => void
}


const NotificationCard = ({
  patientName,
  date,
  time,
  reason,
  details,
  age,
  duration,
  appointmentId,
  doctorName,
  doctorId,
  appointmentDate,
  appointmentTime,
  status,
  gender,
  removePendingAppointment
}: AppointmentNotification) => {
  const [showDuration, setShowDuration] = useState(false);
  const [showReason, setShowReason] = useState(false)
  const { toast } = useToast()
  const { user } = useAuth()


  console.log(duration)

  const { refetch } = useQuery(GET_USER_APPOINTMENTS, {
    variables: { userID: user?.UserID },
  });
  const [acceptAppointment, { data: acceptAppointmentData, loading: acceptLoading, error: acceptError }] = useMutation(ACCEPT_APPOINTMENT, {
    onCompleted(data, clientOptions) {
      refetch()
      toast({
        title: "Appointment Accepted",
        description: ``,
        variant: "success",
      });
      removePendingAppointment(appointmentId)

      setShowDuration(false)
    },
    onError: (error) => {
      toast({
        title: "Faild to Accept Appointment",
        description: ``,
        variant: "error",
      });
    }

  })

  const [declineAppointment, { data: declineAppointmentData, loading: declineLoading, error: declineError }] = useMutation(DECLINE_APPOINTMENT, {
    onCompleted(data, clientOptions) {
      refetch()
      setShowReason(false)
      toast({
        title: "Appointment Declined successfully",
        description: ``,
        variant: "success",
      });
      removePendingAppointment(appointmentId)
    },
    onError: (error) => {
      toast({
        title: "Faild to Decline Appointment",
        description: ``,
        variant: "error",
      });
    }

  })

  const onSubmitAccept = (values: any) => {
    console.log(status)
    acceptAppointment({
      variables: {
        AppointmentID: appointmentId!, DoctorID: doctorId, Duration: values?.duration,
        Status: status
      }
    })
  };


  const handleDecline = async (value: any) => {
    await declineAppointment(
      {
        variables: {
          CancelledBy: doctorId
          , AppointmentID: appointmentId
          , CancelledReason: value.cancelReason
        }
      }
    )
  };

  const initialValues = {
    name: patientName,
    age,
    gender,
    reason,
    cancelReason: "",
    date: appointmentDate,
    appointmentTime,
    duration: 1,
  };



  return (
    <Card className="relative mb-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          {/* header */}
          <div className="flex items-center gap-2">
            <Avatar className="border border-secondary-700 flex items-center justify-center">
              {status === AppointmentStatus.PENDING ? patientName?.charAt(0) : doctorName?.charAt(0)}
            </Avatar>
            <div className="space-y-1">
              <p className="font-medium">{`${status === AppointmentStatus.PENDING ? patientName : "Dr . " + doctorName}`}</p>
              <p className="text-xs">
                {appointmentDate} at {appointmentTime}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{reason}</CardDescription>
        <div className="flex gap-2">
          {!showReason &&
            <Button
              variant="link"
              size="sm"
              className="px-1"
              type="button"
              onClick={() => {
                setShowDuration(false)
                setShowReason(true)
              }}
            >
              Decline
            </Button>
          }

          {(!showDuration || status === AppointmentStatus.RESCHEDULEPENDING) &&
            <Button
              size="sm"
              variant="link"
              className="px-1"
              type="button"
              onClick={() => {
                setShowReason(false)
                status === AppointmentStatus.RESCHEDULEPENDING && onSubmitAccept({ duration })
                setShowDuration(true)
              }}
            >
              Accept
            </Button>}


          {/* Dialog with Second Form */}
          {status === AppointmentStatus.PENDING && <>

            <Dialog>
              <DialogTrigger asChild>
                <Button size="sm" variant="link" className="px-1" onClick={() => {
                  setShowDuration(false)
                  setShowReason(false)

                }}>
                  Read More
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>Patient Details</DialogTitle>
                  <DialogDescription>
                    Review the patient&apos;s information before the appointment.
                  </DialogDescription>
                </DialogHeader>
                <Formik initialValues={initialValues} onSubmit={onSubmitAccept}>
                  {({ isValid, isSubmitting }) => (
                    <Form className="space-y-6" action="#" method="POST">
                      <div className="grid gap-6 py-6">
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="name">Name</Label>
                            <Field
                              id="name"
                              name="name"
                              as={Input}
                              type="text"
                              disabled
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="age">Age</Label>
                            <Field
                              id="age"
                              name="age"
                              as={Input}
                              type="number"
                              disabled
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="gender">Gender</Label>
                            <Field
                              id="gender"
                              name="gender"
                              as={Input}
                              type="text"
                              disabled
                            />
                          </div>
                        </div>
                        <Separator />
                        <div className="space-y-4">
                          <div className="space-y-1.5">
                            <Label htmlFor="reason">Reason for Appointment</Label>
                            <Field
                              id="reason"
                              name="reason"
                              as={Textarea}
                              placeholder="Enter the reason for the appointment request"
                              className="max-h-[120px]"
                              disabled
                            />
                          </div>
                          <div className="grid grid-cols-3 gap-4">
                            <div className="space-y-1.5">
                              <Label>Preferred Date</Label>
                              <Field name="date">
                                {({ field }: any) => (
                                  <Popover>
                                    <PopoverTrigger asChild>
                                      <Button
                                        variant="outline"
                                        className="w-full justify-start text-left font-normal"
                                        disabled
                                      >
                                        <CalendarDays className="mr-2 h-4 w-4" />
                                        {field.value}
                                      </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="p-0">
                                      <Calendar mode="single" {...field} />
                                    </PopoverContent>
                                  </Popover>
                                )}
                              </Field>
                            </div>
                            <div className="space-y-1.5">
                              <Label>Preferred Time</Label>
                              <Field
                                name="appointmentTime"
                                as={Input}
                                type="text"
                                disabled
                              />
                            </div>
                            {!showReason &&
                              <div className="space-y-1.5">
                                <Label htmlFor="duration">Duration</Label>
                                <Field
                                  id="duration"
                                  name="duration"
                                  as={Input}
                                  type="number"
                                />
                              </div>}

                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" type="submit">
                          Accept
                        </Button>
                        <Button
                          variant="outline"
                          type="button"
                          onClick={handleDecline}
                        >
                          Decline
                        </Button>
                        <DialogClose>
                          <Button variant="outline" type="button">
                            Cancel
                          </Button>
                        </DialogClose>
                      </DialogFooter>
                    </Form>
                  )}
                </Formik>
              </DialogContent>
            </Dialog>
          </>}

        </div>
        {showReason && (
          <Formik initialValues={initialValues} onSubmit={handleDecline}>
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
                <Button size="sm" variant="link" className="px-1" type="submit">
                  Decline
                </Button>
              </Form>
            )}
          </Formik>
        )}
        {showDuration && status === AppointmentStatus.PENDING && (
          <Formik initialValues={initialValues} onSubmit={onSubmitAccept}>
            {({ isValid, isSubmitting }) => (
              <Form className="space-y-6" action="#" method="POST">
                <div className="space-y-1.5">
                  <Label htmlFor="duration">Duration</Label>
                  <Field
                    id="duration"
                    name="duration"
                    as={Input}
                    type="number"
                  />
                </div>
                <Button size="sm" variant="link" className="px-1" type="submit">
                  Accept
                </Button>
              </Form>
            )}
          </Formik>
        )}
      </CardContent>
      <X className="w-5 h-5 absolute top-4 right-4 cursor-pointer" />
    </Card>
  );
};

export default NotificationCard;
