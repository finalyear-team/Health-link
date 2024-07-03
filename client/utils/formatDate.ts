import { format, addHours, parseISO } from "date-fns";

const formatScheduleTime = (time: string) => {
  let date;

  // Check if the input is a number (timestamp) or a string (ISO format)
  if (!isNaN(Number(time))) {
    // If the time is a number, convert it to an integer and create a date object
    date = new Date(parseInt(time));
  } else {
    // If the time is an ISO string, parse it directly
    date = parseISO(time);
  }

  // Add 1 hour to the date
  const newDate = addHours(date, 1);

  // Format the date to the desired format
  return format(newDate, "hh:mm a");
};

export default formatScheduleTime;
