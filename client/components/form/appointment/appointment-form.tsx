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
  addHours,
  parseISO,
  differenceInDays,
  isAfter,
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
import {
  UPDATE_APPOINTMENT,
  CREATE_APPOINTMENT,
} from "@/graphql/mutations/appointmentMutations";
import { useToast } from "@/components/ui/use-toast";
import useAuth from "@/hooks/useAuth";
import { DoctorProfile } from "@/types";
import client from "@/graphql/apollo-client";
import formatScheduleTime from "@/utils/formatDate";
import { getRoom } from "@/Services/videoCallServices";
import { UpdateAppointmentType } from "@/types/types";
import { validateAppointmentBooking } from "@/utils/validationSchema";
import { GET_USER_APPOINTMENTS } from "@/graphql/queries/appointmentQueries";




const createTimeSlots = (start: Date, end: Date, date: string, excludedRanges: Array<{ start: string; end: string }>) => {
  console.log("from slots")
  let excludeTimes: any[] = [];
  console.log(excludedRanges)
  if (excludedRanges.length > 0) {
    excludeTimes = excludedRanges?.map((time) => ({
      start: parse(time.start, "hh:mm a", new Date()),
      end: parse(time.end, "hh:mm a", new Date())

    }))
  }
  const times = [];
  let current = start;
  const currentDate = date && new Date(date)
  const now = new Date(format(new Date(), "yyyy-MM-dd"))

  if (differenceInDays(currentDate, now) === 0)
    current = addMinutes(setMinutes(new Date(), 0), 5)




  // Generate times in 1-hour increments
  while (isBefore(current, end) || current.getTime() < end.getTime()) {
    let isInExclusionRange = false;
    for (const exclusion of excludeTimes) {
      if (isBefore(current, exclusion.end) && isAfter(current, exclusion.start)) {
        isInExclusionRange = true;
        break;
      }
    }
    if (!isInExclusionRange) {
      times.push(format(current, "hh:mm a"));
    }
    current = addMinutes(current, 5);
  }

  console.log("from slots")
  console.log(times)

  return times;

}

const selectSchedule = (schedules: any[] | null, appointmentTime: string, date: Date | null, excludedRanges: Array<{ start: string; end: string }>) => {
  if (!schedules || schedules.length === 0)
    return
  console.log(schedules)
  const slots = schedules.map((schedule) => (createTimeSlots(parse(formatScheduleTime(schedule.StartTime), "hh:mm a", new Date()), parse(formatScheduleTime(schedule.EndTime), "hh:mm a", new Date()), format(date || "", "yyyy-MM-dd"), excludedRanges)))

  const schedule = slots.map((slot, i) => {
    const time = slot.filter((time) => time.includes(appointmentTime))
    if (time.length > 0)
      return schedules[i]
  })

  return schedule.find((time) => time)
}



const AppointmentForm = ({ doctorId, patientId, name, existingAppointment }: any) => {


  console.log(existingAppointment)

  const [date, setDate] = useState<Date | null>(
    existingAppointment?.date ? existingAppointment.date : null
  );
  const [schedule, setSchedule] = useState<any>(null)
  const [doctorAvailability, setDoctorAvailablity] = useState(null)
  const [appointmentTime, setAppointmentTime] = useState<string>(
    existingAppointment?.time || ""
  );
  const { user } = useAuth();
  const [bookedTimes, setBookedTimes] = useState<any[]>([])
  const patientID = user?.UserID;

  const { refetch } = useQuery(GET_USER_APPOINTMENTS, {
    variables: { userID: user?.UserID },
  });

  const selectedDoctor = useAppointmentStore((state) => state.selectedDoctor);


  const clearSelection = useAppointmentStore((state) => state.clearSelection);

  const { toast } = useToast();

  const [CreateAppointment, { data: createData, error: createError }] = useMutation(CREATE_APPOINTMENT, {
    onCompleted(data, clientOptions) {
      refetch()
      toast({
        title: "Appointment Created",
        description: `Your appointment has been sent successfully, please wait for ${selectedDoctor?.name} to confirm.`,
        variant: "success",
      });
      clearSelection()
    },
    onError: (error) => {
      console.error('Mutation error:', error);
      toast({
        title: "Error Create appointment",
        description: `Error creating appointment ${error.message}`,
        variant: "error",
      });


    }

  });
  const [UpdateAppointment, { data: updateData, error: updateError }] = useMutation(UPDATE_APPOINTMENT, {
    onCompleted(data, clientOptions) {
      refetch()
      toast({
        title: "Appointment Updated",
        description: `Your appointment has been updated successfully, please wait for a confirmation from ${name}`,
        variant: "success",
      });
    },
    onError: (error) => {

      console.error('Mutation error:', error);
      toast({
        title: "Error update appointment",
        description: `Error updating appointment`,
        variant: "error",
      });

    }

  });




  const handleSubmit = async (values: any) => {

    const selectedSchedule = selectSchedule(schedule, appointmentTime, date, bookedTimes)


    if (!date || !appointmentTime || !values.reason)
      return

    // if (date && appointmentTime && values.reason) {
    //   const formattedDateTime = formatDateAndTime();
    // submission logic
    try {
      const createdRoom = await getRoom({
        doctor: selectedDoctor?.id || doctorId,
        patient: patientId || user?.UserID,
        appointmentDate: format(date, "yyyy-MM-dd"),
        appointmentTime
      })

      if (!createdRoom)
        return

      if (existingAppointment) {
        await UpdateAppointment({
          variables: {
            updateAppointmentInput: {
              AppointmentID: existingAppointment.id,
              DoctorID: doctorId,
              PatientID: patientId,
              ScheduleID: selectedSchedule?.ScheduleID,
              AppointmentDate: format(date, "yyyy-MM-dd"),
              AppointmentTime: appointmentTime,
              UpdatedBy: user?.UserID,
              UpdateType: UpdateAppointmentType.RESCHEDULEAPPOINTMENT,
              Note: values.reason,
            }
          },
        });
        clearSelection();
      } else {
        await CreateAppointment({
          variables: {
            createAppointmentInput: {
              DoctorID: selectedDoctor?.id,
              PatientID: patientID,
              ScheduleID: selectedSchedule.ScheduleID,
              AppointmentDate: date,
              AppointmentTime: appointmentTime,
              VideoChatRoomID: createdRoom.room.id,
              Note: values.reason
            },
          },
        });

        clearSelection();
      }
    } catch (error: any) {
      console.error(
        `Error ${existingAppointment ? "updating" : "creating"} appointment:`,
        error.message
      )
      toast({
        title: "Error Create appointment",
        description: `Error creating appointment ${error.message}`,
        variant: "error",
      });

    }
  }

  const initialValues = { reason: "" };

  const today = startOfDay(new Date());

  const isDateDisabled = (day: Date) => isBefore(day, today);



  const getAvailableTimes = (doctorAvailability: any[] | null) => {

    if (!doctorAvailability || doctorAvailability?.length === 0)
      return []

    const range = doctorAvailability.map((date) => ({
      ...date
    }))

    if (!range || range.length === 0)
      return []

    const times = range.map((time) => ({
      start: parse(time.start, "hh:mm a", new Date()),
      end: parse(time.end, "hh:mm a", new Date())

    }))
    const slots = times.map((slot) => createTimeSlots(slot.start, slot.end, format(date || "", "yyyy-MM-dd"), bookedTimes))


    return slots


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
    const availableSlot = async () => {
      try {
        if (date) {
          const selectedDate = format(date, "dd-MM-yyyy")
          console.log("selectedDate")
          console.log(selectedDate)
          const { data, loading, error } = await client.query({
            query: GET_SCHEDULE_BY_DATE,
            variables: {
              doctorID: selectedDoctor?.id || doctorId,
              date: selectedDate
            }
          })
          console.log("from the schedule")
          setSchedule(data.GetScheduleByDate.Schedule)
          const scheduleDates = data.GetScheduleByDate?.Schedule?.map((date: any) => ({
            start: formatScheduleTime(date.StartTime),
            end: formatScheduleTime(date.EndTime)
          }))
          setDoctorAvailablity(scheduleDates)
          setBookedTimes(data.GetScheduleByDate?.BookedTimes?.map((date: any) => ({
            start: formatScheduleTime(date.StartTime),
            end: formatScheduleTime(date.EndTime)
          })))
        }

      } catch (error) {

      }

    }
    availableSlot()

  }, [date])



  console.log("bookedTimes")
  console.log(bookedTimes)

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
                      onSelect={
                        (selectedDate) => {
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
                  {getAvailableTimes(doctorAvailability)?.map((time) => (
                    <>
                      {
                        time.map((slot) => (
                          <SelectItem key={slot} value={slot} >
                            {slot}
                          </SelectItem>
                        ))
                      }
                    </>

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
            {(createError || updateError) && <div className="text-sm text-red-500">
              {createError?.message || updateError?.message}
            </div>}
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
