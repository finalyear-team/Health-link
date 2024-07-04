"use client";

import React from "react";
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
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Formik, Form, Field } from "formik";
import { date } from "yup";

interface NotificationCardProps {
  patientName: string;
  date: Date;
  time: string;
  reason: string;
  details: string;
}

const NotificationCard = ({
  patientName,
  date,
  time,
  reason,
  details,
}: NotificationCardProps) => {
  const onSubmitAccept = () => {
    console.log("Accepted");
  };
  const handleDecline = () => {
    console.log("Declined")
  };

  const initialValues = {
    name: "Alemu",
    age: 21,
    gender: "Male",
    reason: "lorem ipsum dolor sdfsdff sdfsd sdfs fsd ",
    date: new Date("2022-01-01"),
    time: "10:00",
    duration: 1,
  };
  return (
    <Card className="relative mb-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          {/* header */}
          <div className="flex items-center gap-2">
            <Avatar className="border border-secondary-700 flex items-center justify-center">
              {patientName.charAt(0)}
            </Avatar>
            <div className="space-y-1">
              <p className="font-medium">{patientName}</p>
              <p className="text-xs">
                {date.toLocaleDateString()} at {time}
              </p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription>{reason}</CardDescription>
        <div className="flex gap-2">
          <Formik initialValues={initialValues} onSubmit={onSubmitAccept}>
            {({ isValid, isSubmitting }) => (
              <Form className="space-y-6" action="#" method="POST">
                <Button
                  variant="link"
                  size="sm"
                  className="px-1"
                  type="button"
                  onClick={handleDecline}
                >
                  Decline
                </Button>
                <Button size="sm" variant="link" className="px-1" type="submit">
                  Accept
                </Button>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="link" className="px-1">
                      Read More
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Patient Details</DialogTitle>
                      <DialogDescription>
                        Review the patient&apos;s information before the
                        appointment.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-6 py-6">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Input
                            name="name"
                            label="Name"
                            type="text"
                            disabled
                          />
                        </div>
                        <div className="space-y-1.5">
                          <Input
                            name="age"
                            label="Age"
                            type="number"
                            disabled
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                          <Input
                            name="gender"
                            label="Gender"
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
                                      {field.value.toLocaleDateString()}
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
                            <Input type="time" name="time" disabled />
                          </div>
                          <div className="space-y-1.5">
                            <Label htmlFor="duration">Duration</Label>
                            <Input type="number" name="duration" disabled />
                          </div>
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
                  </DialogContent>
                </Dialog>
              </Form>
            )}
          </Formik>
        </div>
      </CardContent>
      <X className="w-5 h-5 absolute top-4 right-4 cursor-pointer" />
    </Card>
  );
};

export default NotificationCard;
