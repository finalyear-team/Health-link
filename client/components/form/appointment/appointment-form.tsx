"use client";

import React, { useState, useEffect } from "react";
import {
  addDays,
  format,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  startOfDay,
  parse,
  addMinutes,
} from "date-fns";
import { useUser } from "@clerk/nextjs";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Formik, Form, Field } from "formik";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useAppointmentStore from "@/store/appointmentStore";
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_SCHEDULES,
  GET_SCHEDULE_BY_DATE,
} from "@/graphql/queries/scheduleQueries";
import {
  UPDATE_APPOINTMENT,
  CREATE_APPOINTMENT,
} from "@/graphql/mutations/appointmentMutations";
import { useToast } from "@/components/ui/use-toast";

type DayOfWeek = keyof typeof doctorAvailability;

const doctorAvailability = {
  Monday: { start: "03:00 AM", end: "08:00 AM" },
  Tuesday: { start: "09:00 AM", end: "12:00 PM" },
  Wednesday: { start: "01:00 PM", end: "05:00 PM" },
  Thursday: { start: "07:00 AM", end: "11:00 AM" },
  Friday: { start: "02:00 PM", end: "06:00 PM" },
  Saturday: { start: "10:00 AM", end: "03:00 PM" },
  Sunday: { start: "12:00 PM", end: "04:00 PM" },
};

const getTimeRangeForDay = (day: DayOfWeek) => doctorAvailability[day];

const AppointmentForm = ({ doctorId, existingAppointment }: any) => {
  const [date, setDate] = useState<Date | null>(
    existingAppointment?.date ? new Date(existingAppointment.date) : null
  );
  const [appointmentTime, setAppointmentTime] = useState<string>(
    existingAppointment?.time || ""
  );
  const { user } = useUser();
  const patientID = user?.id;
  const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);
  const clearSelection = useAppointmentStore((state) => state.clearSelection);

  const [CreateAppointment] = useMutation(CREATE_APPOINTMENT);
  const [UpdateAppointment] = useMutation(UPDATE_APPOINTMENT);

  const { toast } = useToast();

  const { data } = useQuery(GET_SCHEDULE_BY_DATE, {
    variables: {
      doctorID: selectedDoctor?.id,
      date: date ? format(date, "yyyy-MM-dd") : "",
    },
    skip: !selectedDoctor?.id || !date,
  });

  const handleSubmit = async (values: any) => {
    if (date && appointmentTime && values.reason) {
      const formattedDateTime = formatDateAndTime();
      // submission logic
      try {
        if (existingAppointment) {
          await UpdateAppointment({
            variables: {
              AppointmentID: existingAppointment.id,
              DoctorID: selectedDoctor?.id,
              PatientID: patientID,
              AppointmentDate: format(date, "yyyy-MM-dd"),
              AppointmentTime: appointmentTime,
              Note: values.reason,
            },
          });
          console.log("appointment updated");
          toast({
            title: "Appointment Updated",
            description: `Your appointment has been updated successfully, please wait for response from ${selectedDoctor?.name} to confirm`,
            variant: "success",
          });
          clearSelection();
        } else {
          await CreateAppointment({
            variables: {
              DoctorID: selectedDoctor?.id,
              PatientID: patientID,
              AppointmentDate: format(date, "yyyy-MM-dd"),
              AppointmentTime: appointmentTime,
              Note: values.reason,
            },
          });
          console.log("appointment created");
          toast({
            title: "Appointment Created",
            description: `Your appointment has been sent successfully, please wait for response from ${selectedDoctor?.name} to confirm.`,
            variant: "success",
          });
          clearSelection();
        }
      } catch (error) {
        console.error(
          `Error ${existingAppointment ? "updating" : "creating"} appointment:`,
          error
        );
        toast({
          title: `Error ${
            existingAppointment ? "updating" : "creating"
          } appointment`,
          description: "Please try again.",
          variant: "destructive",
        });
      }
    }
  };

  const initialValues = { reason: existingAppointment?.reason || "" };

  const today = startOfDay(new Date());

  const isDateDisabled = (day: Date) => isBefore(day, today);

  const getAvailableTimes = () => {
    if (!date) return [];

    // Get the day of the week
    const dayOfWeek = format(date, "EEEE") as DayOfWeek;
    const range = getTimeRangeForDay(dayOfWeek);

    if (!range) return [];

    // Parse the start and end times
    const start = parse(range.start, "hh:mm a", date);
    const end = parse(range.end, "hh:mm a", date);

    const times = [];
    let current = start;

    // Generate times in 1-hour increments
    while (isBefore(current, end) || current.getTime() === end.getTime()) {
      times.push(format(current, "hh:mm a"));
      current = addMinutes(current, 60);
    }

    return times;
  };

  // Function to format date and time into a specific combined string format
  const formatDateAndTime = () => {
    if (date && appointmentTime) {
      const [time, period] = appointmentTime.split(" ");

      let [hours, minutes] = time.split(":").map(Number);

      // Convert hours to 24-hour format based on the period
      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      // Create a new date object
      const combinedDateTime = setSeconds(
        setMinutes(setHours(new Date(date), hours), minutes),
        0
      );

      return format(combinedDateTime, "yyyy-MM-dd HH:mm:ss");
    }

    return "";
  };

  useEffect(() => {
    setDate(
      existingAppointment?.date ? new Date(existingAppointment.date) : null
    );
    setAppointmentTime(existingAppointment?.time || "");
  }, [doctorId, existingAppointment]);

  return (
    <div className="p-6">
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ isValid, isSubmitting }) => (
          <Form>
            <div className="mb-4">
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-[280px] justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
                  <Select
                    onValueChange={(value) =>
                      setDate(addDays(new Date(), parseInt(value)))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="0">Today</SelectItem>
                      <SelectItem value="1">Tomorrow</SelectItem>
                      <SelectItem value="3">In 3 days</SelectItem>
                      <SelectItem value="7">In a week</SelectItem>
                      <SelectItem value="30">In a month</SelectItem>
                    </SelectContent>
                  </Select>
                  <div className="rounded-md border">
                    <Calendar
                      mode="single"
                      selected={date ?? undefined}
                      onSelect={(selectedDate) => {
                        if (selectedDate !== undefined) {
                          setDate(selectedDate);
                        } else {
                          setDate(null); // Explicitly setting to null if selectedDate is undefined
                        }
                      }}
                      disabled={isDateDisabled}
                    />
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            <div className="mb-4">
              <Select onValueChange={(value) => setAppointmentTime(value)}>
                <SelectTrigger className="w-[280px]">
                  <SelectValue placeholder="Select Time" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {getAvailableTimes().map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="mb-4">
              <Field
                as={Input}
                type="textarea"
                name="reason"
                label="Enter the Appointment Reason"
                placeholder="Appointment Reason"
              />
            </div>
            <div className="flex items-center space-x-4 flex-wrap">
              <Button type="submit" disabled={!isValid || isSubmitting}>
                {existingAppointment ? "Reschedule" : "Book"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
