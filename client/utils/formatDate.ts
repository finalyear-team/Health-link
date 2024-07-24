import { format, addHours, parseISO, isWithinInterval } from "date-fns";

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
  console.log(newDate)

  // Format the date to the desired format
  // return "null"
  return format(newDate, "hh:mm a");
};

export default formatScheduleTime;


export const isDateIn24Hours = (date: Date) => {
  const now = new Date();
  const in24Hours = addHours(now, 24);

  return isWithinInterval(date, { start: now, end: in24Hours })
};
