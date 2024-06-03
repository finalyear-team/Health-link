// "use client";

// import React, { useState, useEffect } from "react";
// import * as Yup from "yup";
// import PaymentForm from "../payment/payment-form";
// import Container from "@/components/container/container";
// import {
//   addDays,
//   format,
//   setHours,
//   setMinutes,
//   setSeconds,
//   isBefore,
//   startOfDay,
// } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Formik, Form, Field } from "formik";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import useAppointmentStore from "@/store/appointmentStore";
// import { useQuery, useMutation } from "@apollo/client";
// import {
//   GET_SCHEDULES,
//   GET_SCHEDULE_BY_DATE,
// } from "@/graphql/queries/scheduleQueries";
// import { CREATE_SCHEDULE } from "@/graphql/mutations/scheduleMutations";

// const doctorAvailability = {
//   Monday: { start: "03:00 AM", end: "08:00 AM" },
//   Tuesday: { start: "09:00 AM", end: "12:00 PM" },
//   Wednesday: { start: "01:00 PM", end: "05:00 PM" },
//   Thursday: { start: "07:00 AM", end: "11:00 AM" },
//   Friday: { start: "02:00 PM", end: "06:00 PM" },
//   Saturday: { start: "10:00 AM", end: "03:00 PM" },
//   Sunday: { start: "12:00 PM", end: "04:00 PM" },
// };

// const getTimeRangeForDay = (day: string) => {
//   return doctorAvailability[day as keyof typeof doctorAvailability];
// };

// const AppointmentForm = ({ doctorId, existingAppointment }: any) => {
//   // const [date, setDate] = useState<Date>();
//   // const [appointmentTime, setAppointmentTime] = useState("");
//   const [date, setDate] = useState<Date | null>(
//     existingAppointment?.date ? new Date(existingAppointment.date) : null
//   );
//   const [appointmentTime, setAppointmentTime] = useState(
//     existingAppointment?.time || ""
//   );
//   const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);
//   const clearSelection = useAppointmentStore((state) => state.clearSelection);
//   const [createSchedule] = useMutation(CREATE_SCHEDULE);
//   const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

//   // getting data
//   const { data, loading, error } = useQuery(GET_SCHEDULE_BY_DATE, {
//     variables: {
//       doctorID: selectedDoctor?.id,
//       date: date ? format(date, "yyyy-MM-dd") : "",
//     },
//     skip: !selectedDoctor?.id || !date, // Skip the query if doctorID or date is not set
//   });

//   const handleSubmit = async (values: any) => {
//     console.log(values);
//     if (date && appointmentTime && values.reason) {
//       // the doctorId comes from the rescheduling
//       console.log(
//         doctorId,
//         format(date, "yyyy-MM-dd"),
//         appointmentTime,
//         values.reason
//       );
//       // submission logic

//       // try {
//       //   const { data } = await createSchedule({
//       //     variables: {},
//       //   });

//       //   console.log("Schedule created:", data.CreateSchedule);
//       // } catch (error) {
//       //   console.error("Error creating schedule:", error);
//       // }
//     }
//   };

//   const initialValues = {
//     reason: "",
//   };

//   const [todayDay, setTodayDat] = useState(null);
//   const today = startOfDay(new Date());

//   // Function to determine if a date is disabled
//   const isDateDisabled = (todayDay: any) => {
//     return isBefore(todayDay, today);
//   };

//   const getAvailableTimes = () => {
//     if (!date) return [];
//     const dayOfWeek = date.toLocaleDateString("en-US", {
//       weekday: "long",
//     });
//     const range = getTimeRangeForDay(dayOfWeek);

//     if (!range) return [];

//     const [startHour, startMinutes] = range.start.split(/[: ]/).map(Number);
//     const [endHour, endMinutes] = range.end.split(/[: ]/).map(Number);
//     const startPeriod = range.start.split(" ")[1];
//     const endPeriod = range.end.split(" ")[1];

//     const start = new Date();
//     start.setHours(
//       startPeriod === "AM" ? startHour : startHour + 12,
//       startMinutes
//     );

//     const end = new Date();
//     end.setHours(endPeriod === "AM" ? endHour : endHour + 12, endMinutes);

//     const times = [];
//     const current = new Date(start);

//     while (current <= end) {
//       times.push(
//         current.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         })
//       );
//       current.setMinutes(current.getMinutes() + 60);
//     }

//     return times;
//   };

//   const formatDateAndTime = () => {
//     if (date && appointmentTime) {
//       const [time, period] = appointmentTime.split(" ");
//       let [hours, minutes] = time.split(":").map(Number);

//       if (period === "PM" && hours !== 12) {
//         hours += 12;
//       } else if (period === "AM" && hours === 12) {
//         hours = 0;
//       }

//       const combinedDateTime = setSeconds(
//         setMinutes(setHours(new Date(date), hours), minutes),
//         0
//       );
//       return format(combinedDateTime, "MM-dd-yyyy HH:mm:ss");
//     }
//     return "";
//   };

//   return (
//     <div className="p-6">
//       <div>
//         <Formik
//           initialValues={initialValues}
//           onSubmit={handleSubmit}
//           // validationSchema={validatePaymentInformation}
//           enableReinitialize
//         >
//           {({ isValid, isSubmitting }) => (
//             <Form>
//               <div className="mb-4">
//                 <Popover>
//                   <PopoverTrigger asChild>
//                     <Button
//                       variant={"outline"}
//                       className={cn(
//                         "w-[280px] justify-start text-left font-normal",
//                         !date && "text-muted-foreground"
//                       )}
//                     >
//                       <CalendarIcon className="mr-2 h-4 w-4" />
//                       {date ? format(date, "PPP") : <span>Pick a date</span>}
//                     </Button>
//                   </PopoverTrigger>
//                   <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
//                     <Select
//                       onValueChange={(value) =>
//                         setDate(addDays(new Date(), parseInt(value)))
//                       }
//                     >
//                       <SelectTrigger>
//                         <SelectValue placeholder="Select" />
//                       </SelectTrigger>
//                       <SelectContent position="popper">
//                         <SelectItem value="0">Today</SelectItem>
//                         <SelectItem value="1">Tomorrow</SelectItem>
//                         <SelectItem value="3">In 3 days</SelectItem>
//                         <SelectItem value="7">In a week</SelectItem>
//                         <SelectItem value="30">In a month</SelectItem>
//                       </SelectContent>
//                     </Select>
//                     <div className="rounded-md border">
//                       <Calendar
//                         mode="single"
//                         selected={date}
//                         onSelect={setDate}
//                         disabled={isDateDisabled}
//                       />
//                     </div>
//                   </PopoverContent>
//                 </Popover>
//               </div>
//               <div className="mb-4">
//                 <Select onValueChange={(value) => setAppointmentTime(value)}>
//                   <SelectTrigger className="w-[280px]">
//                     <SelectValue placeholder="Select Time" />
//                   </SelectTrigger>
//                   <SelectContent position="popper">
//                     {getAvailableTimes().map((time: any) => (
//                       <SelectItem key={time} value={time}>
//                         {time}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="mb-4">
//                 <Field
//                   as={Input}
//                   type="textarea"
//                   name="reason"
//                   label="Enter the Appointment Reason"
//                   placeholder="Appointment Reason"
//                 />
//               </div>
//               <div className="flex items-center space-x-4 flex-wrap">
//                 <Button type="submit">Book</Button>
//                 <Button
//                   type="button"
//                   onClick={() => clearSelection()}
//                   variant={"destructive"}
//                 >
//                   Cancel
//                 </Button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AppointmentForm;

// "use client";

// import React, { useState, useEffect } from "react";
// import {
//   addDays,
//   format,
//   setHours,
//   setMinutes,
//   setSeconds,
//   isBefore,
//   startOfDay,
// } from "date-fns";
// import { Calendar as CalendarIcon } from "lucide-react";
// import { cn } from "@/lib/utils";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Formik, Form, Field } from "formik";
// import { Calendar } from "@/components/ui/calendar";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import useAppointmentStore from "@/store/appointmentStore";
// import { useQuery, useMutation } from "@apollo/client";
// import {
//   GET_SCHEDULES,
//   GET_SCHEDULE_BY_DATE,
// } from "@/graphql/queries/scheduleQueries";
// import {
//   CREATE_SCHEDULE,
//   UPDATE_SCHEDULE,
// } from "@/graphql/mutations/scheduleMutations";

// type DayOfWeek =
//   | "Monday"
//   | "Tuesday"
//   | "Wednesday"
//   | "Thursday"
//   | "Friday"
//   | "Saturday"
//   | "Sunday";

// const doctorAvailability = {
//   Monday: { start: "03:00 AM", end: "08:00 AM" },
//   Tuesday: { start: "09:00 AM", end: "12:00 PM" },
//   Wednesday: { start: "01:00 PM", end: "05:00 PM" },
//   Thursday: { start: "07:00 AM", end: "11:00 AM" },
//   Friday: { start: "02:00 PM", end: "06:00 PM" },
//   Saturday: { start: "10:00 AM", end: "03:00 PM" },
//   Sunday: { start: "12:00 PM", end: "04:00 PM" },
// };

// // const getTimeRangeForDay = (day : any) => doctorAvailability[day];

// const getTimeRangeForDay = (day: DayOfWeek) => doctorAvailability[day];

// const AppointmentForm = ({ doctorId, existingAppointment }: any) => {
//   const [date, setDate] = useState(
//     existingAppointment?.date ? new Date(existingAppointment.date) : null
//   );
//   const [appointmentTime, setAppointmentTime] = useState(
//     existingAppointment?.time || ""
//   );
//   const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);
//   const clearSelection = useAppointmentStore((state) => state.clearSelection);

//   const { data, loading, error } = useQuery(GET_SCHEDULE_BY_DATE, {
//     variables: {
//       doctorID: selectedDoctor?.id,
//       date: date ? format(date, "yyyy-MM-dd") : "",
//     },
//     skip: !selectedDoctor?.id || !date,
//   });

//   const [createSchedule] = useMutation(CREATE_SCHEDULE);
//   const [updateSchedule] = useMutation(UPDATE_SCHEDULE);

//   const handleSubmit = async (values: any) => {
//     if (date && appointmentTime && values.reason) {
//       const formattedDateTime = formatDateAndTime();
//       console.log(date, appointmentTime, values.reason, formattedDateTime);
//     }
//   };

//   const initialValues = { reason: existingAppointment?.reason || "" };

//   const today = startOfDay(new Date());

//   const isDateDisabled = (day: any) => isBefore(day, today);

//   const getAvailableTimes = () => {
//     if (!date) return [];
//     const dayOfWeek = date.toLocaleDateString("en-US", { weekday: "long" });
//     const range = getTimeRangeForDay(dayOfWeek);

//     if (!range) return [];

//     const [startHour, startMinutes] = range.start.split(/[: ]/).map(Number);
//     const [endHour, endMinutes] = range.end.split(/[: ]/).map(Number);
//     const startPeriod = range.start.split(" ")[1];
//     const endPeriod = range.end.split(" ")[1];

//     const start = new Date();
//     start.setHours(
//       startPeriod === "AM" ? startHour : startHour + 12,
//       startMinutes
//     );

//     const end = new Date();
//     end.setHours(endPeriod === "AM" ? endHour : endHour + 12, endMinutes);

//     const times = [];
//     const current = new Date(start);

//     while (current <= end) {
//       times.push(
//         current.toLocaleTimeString("en-US", {
//           hour: "2-digit",
//           minute: "2-digit",
//           hour12: true,
//         })
//       );
//       current.setMinutes(current.getMinutes() + 60);
//     }

//     return times;
//   };

//   const formatDateAndTime = () => {
//     if (date && appointmentTime) {
//       const [time, period] = appointmentTime.split(" ");
//       let [hours, minutes] = time.split(":").map(Number);

//       if (period === "PM" && hours !== 12) {
//         hours += 12;
//       } else if (period === "AM" && hours === 12) {
//         hours = 0;
//       }

//       const combinedDateTime = setSeconds(
//         setMinutes(setHours(new Date(date), hours), minutes),
//         0
//       );
//       return format(combinedDateTime, "yyyy-MM-dd HH:mm:ss");
//     }
//     return "";
//   };

//   useEffect(() => {
//     setDate(
//       existingAppointment?.date ? new Date(existingAppointment.date) : null
//     );
//     setAppointmentTime(existingAppointment?.time || "");
//   }, [doctorId, existingAppointment]);

//   return (
//     <div className="p-6">
//       <Formik
//         initialValues={initialValues}
//         onSubmit={handleSubmit}
//         enableReinitialize
//       >
//         {({ isValid, isSubmitting }) => (
//           <Form>
//             <div className="mb-4">
//               <Popover>
//                 <PopoverTrigger asChild>
//                   <Button
//                     variant={"outline"}
//                     className={cn(
//                       "w-[280px] justify-start text-left font-normal",
//                       !date && "text-muted-foreground"
//                     )}
//                   >
//                     <CalendarIcon className="mr-2 h-4 w-4" />
//                     {date ? format(date, "PPP") : <span>Pick a date</span>}
//                   </Button>
//                 </PopoverTrigger>
//                 <PopoverContent className="flex w-auto flex-col space-y-2 p-2">
//                   <Select
//                     onValueChange={(value) =>
//                       setDate(addDays(new Date(), parseInt(value)))
//                     }
//                   >
//                     <SelectTrigger>
//                       <SelectValue placeholder="Select" />
//                     </SelectTrigger>
//                     <SelectContent position="popper">
//                       <SelectItem value="0">Today</SelectItem>
//                       <SelectItem value="1">Tomorrow</SelectItem>
//                       <SelectItem value="3">In 3 days</SelectItem>
//                       <SelectItem value="7">In a week</SelectItem>
//                       <SelectItem value="30">In a month</SelectItem>
//                     </SelectContent>
//                   </Select>
//                   <div className="rounded-md border">
//                     <Calendar
//                       mode="single"
//                       selected={date ?? undefined}
//                       onSelect={setDate}
//                       disabled={isDateDisabled}
//                     />
//                   </div>
//                 </PopoverContent>
//               </Popover>
//             </div>
//             <div className="mb-4">
//               <Select onValueChange={(value) => setAppointmentTime(value)}>
//                 <SelectTrigger className="w-[280px]">
//                   <SelectValue placeholder="Select Time" />
//                 </SelectTrigger>
//                 <SelectContent position="popper">
//                   {getAvailableTimes().map((time) => (
//                     <SelectItem key={time} value={time}>
//                       {time}
//                     </SelectItem>
//                   ))}
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="mb-4">
//               <Field
//                 as={Input}
//                 type="textarea"
//                 name="reason"
//                 label="Enter the Appointment Reason"
//                 placeholder="Appointment Reason"
//               />
//             </div>
//             <div className="flex items-center space-x-4 flex-wrap">
//               <Button type="submit" disabled={!isValid || isSubmitting}>
//                 {existingAppointment ? "Reschedule" : "Book"}
//               </Button>
//               <Button
//                 type="button"
//                 onClick={() => clearSelection()}
//                 variant={"destructive"}
//               >
//                 Cancel
//               </Button>
//             </div>
//           </Form>
//         )}
//       </Formik>
//     </div>
//   );
// };

// export default AppointmentForm;

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
import { useQuery, useMutation } from "@apollo/client";
import {
  GET_SCHEDULES,
  GET_SCHEDULE_BY_DATE,
} from "@/graphql/queries/scheduleQueries";

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
  const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);
  const clearSelection = useAppointmentStore((state) => state.clearSelection);

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
      console.log(
        format(date, "yyyy-MM-dd"),
        appointmentTime,
        values.reason,
        formattedDateTime
      );
    }
  };

  const initialValues = { reason: existingAppointment?.reason || "" };

  const today = startOfDay(new Date());

  const isDateDisabled = (day: Date) => isBefore(day, today);

  const getAvailableTimes = () => {
    if (!date) return [];
    const dayOfWeek = date.toLocaleDateString("en-US", {
      weekday: "long",
    }) as DayOfWeek;
    const range = getTimeRangeForDay(dayOfWeek);

    if (!range) return [];

    const [startHour, startMinutes] = range.start.split(/[: ]/).map(Number);
    const [endHour, endMinutes] = range.end.split(/[: ]/).map(Number);
    const startPeriod = range.start.split(" ")[1];
    const endPeriod = range.end.split(" ")[1];

    const start = new Date(date);
    start.setHours(
      startPeriod === "AM" ? startHour : startHour + 12,
      startMinutes
    );

    const end = new Date(date);
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
                      // onSelect={setDate}
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
              <Button
                type="button"
                onClick={clearSelection}
                variant={"outline"}
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AppointmentForm;
