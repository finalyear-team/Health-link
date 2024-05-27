"use client";

import React, { useState } from "react";
import * as Yup from "yup";
import PaymentForm from "../payment/payment-form";
import Container from "@/components/container/container";
import {
  addDays,
  format,
  setHours,
  setMinutes,
  setSeconds,
  isBefore,
  startOfDay,
} from "date-fns";
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

const doctorAvailability = {
  Monday: { start: "03:00 AM", end: "08:00 AM" },
  Tuesday: { start: "09:00 AM", end: "12:00 PM" },
  Wednesday: { start: "01:00 PM", end: "05:00 PM" },
  Thursday: { start: "07:00 AM", end: "11:00 AM" },
  Friday: { start: "02:00 PM", end: "06:00 PM" },
  Saturday: { start: "10:00 AM", end: "03:00 PM" },
  Sunday: { start: "12:00 PM", end: "04:00 PM" },
};

const getTimeRangeForDay = (day: string) => {
  return doctorAvailability[day as keyof typeof doctorAvailability];
};

const AppointmentForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const [date, setDate] = useState<Date>();
  const [appointmentTime, setAppointmentTime] = useState("");
  const clearSelection = useAppointmentStore((state) => state.clearSelection);

  const handleSubmit = (values: any) => {
    if (date && appointmentTime && values.reason) {
      setSubmitted(true);
    }
  };

  const initialValues = {
    reason: "",
  };

  const [todayDay, setTodayDat] = useState(null);
  const today = startOfDay(new Date());

  // Function to determine if a date is disabled
  const isDateDisabled = (todayDay: any) => {
    return isBefore(todayDay, today);
  };

  const getAvailableTimes = () => {
    if (!date) return [];
    const dayOfWeek = date.toLocaleDateString("en-US", {
      weekday: "long",
    });
    const range = getTimeRangeForDay(dayOfWeek);

    if (!range) return [];

    const [startHour, startMinutes] = range.start.split(/[: ]/).map(Number);
    const [endHour, endMinutes] = range.end.split(/[: ]/).map(Number);
    const startPeriod = range.start.split(" ")[1];
    const endPeriod = range.end.split(" ")[1];

    const start = new Date();
    start.setHours(
      startPeriod === "AM" ? startHour : startHour + 12,
      startMinutes
    );

    const end = new Date();
    end.setHours(endPeriod === "AM" ? endHour : endHour + 12, endMinutes);

    const times = [];
    const current = new Date(start);

    while (current <= end) {
      times.push(
        current.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
      );
      current.setMinutes(current.getMinutes() + 60);
    }

    return times;
  };

  const formatDateAndTime = () => {
    if (date && appointmentTime) {
      const [time, period] = appointmentTime.split(" ");
      let [hours, minutes] = time.split(":").map(Number);

      if (period === "PM" && hours !== 12) {
        hours += 12;
      } else if (period === "AM" && hours === 12) {
        hours = 0;
      }

      const combinedDateTime = setSeconds(
        setMinutes(setHours(new Date(date), hours), minutes),
        0
      );
      return format(combinedDateTime, "MM-dd-yyyy HH:mm:ss");
    }
    return "";
  };

  return (
    <Container>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[800px]">
        {!submitted ? (
          <div>
            <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
              Book an Appointment
            </h2>

            <Formik
              initialValues={initialValues}
              onSubmit={handleSubmit}
              // validationSchema={validatePaymentInformation}
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
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
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
                            selected={date}
                            onSelect={setDate}
                            disabled={isDateDisabled}
                          />
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="mb-4">
                    <Select
                      onValueChange={(value) => setAppointmentTime(value)}
                    >
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
                    <Button type="submit">Book Appointment</Button>
                    <Button
                      type="button"
                      onClick={() => clearSelection()}
                      variant={"destructive"}
                    >
                      Cancel Appointment
                    </Button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        ) : (
          <PaymentForm />
        )}
      </div>
    </Container>
  );
};

export default AppointmentForm;
