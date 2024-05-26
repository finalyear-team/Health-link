import React, { useState } from "react";
import * as Yup from "yup";
import PaymentForm from "../payment/payment-form";
import Container from "@/components/container/container";

import { addDays, format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

type AppointmentFormInputs = {
  date: Date;
  time: string;
  reason: string;
};

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
  const [date, setDate] = React.useState<Date>();

  const handleSubmit = () => {
    setSubmitted(true);
  };

  //   const initialValues: {
  //           appointmentDate: new Date(),
  //           time: "",
  //           reason: "",
  //         },

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
        })
      );
      current.setMinutes(current.getMinutes() + 30);
    }

    return times;
  };

  return (
    <Container>
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg w-[800px]">
        {!submitted ? (
          <div>
            <h2 className="text-2xl font-bold mb-5 text-gray-900 dark:text-gray-100">
              Book an Appointment
            </h2>
            <form onSubmit={handleSubmit}>
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
                      </SelectContent>
                    </Select>
                    <div className="rounded-md border">
                      <Calendar
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                      />
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="time"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Select Time
                </label>
                <select
                  id="time"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="" label="Select time" />
                  {getAvailableTimes().map((time) => (
                    <option key={time} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-4">
                <label
                  htmlFor="reason"
                  className="block text-gray-700 dark:text-gray-300"
                >
                  Reason for Appointment
                </label>
                <textarea
                  id="reason"
                  className="mt-1 block w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  rows={4}
                />
              </div>
              <Button type="submit">Book Appointment</Button>
            </form>
          </div>
        ) : (
          <PaymentForm />
        )}
      </div>
    </Container>
  );
};

export default AppointmentForm;
