import { parse, isValid, formatISO, format } from 'date-fns';

export function convertToIso(time) {
    // Remove any leading/trailing whitespace
    time = time.trim();
    console.log(time)

    // Regular expressions to identify the format
    const time12HourFormat = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])$/i;
    const time24HourFormat = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;

    let date;

    // Parse 12-hour format time
    if (time12HourFormat.test(time)) {
        date = parse(time, 'h:mm a', new Date());
    }
    // Parse 24-hour format time
    else if (time24HourFormat.test(time)) {
        date = parse(time, 'HH:mm', new Date());
    }
    // Handle invalid formats
    else {
        throw new Error("Invalid time format");
    }

    // Check if the parsed date is valid
    if (!isValid(date)) {
        throw new Error("Invalid time");
    }

    // Return the ISO string representation
    return formatISO(date);
}



import { parseISO, startOfDay, setHours, setMinutes } from 'date-fns';

export function createCurrentDateWithTimeString(timeString: Date) {
    console.log("timeString")
    // Parse the ISO string to get a Date object
    const parsedDate = parseISO(timeString.toISOString());
    console.log(parsedDate)

    // Get the start of the current day
    const todayStart = startOfDay(new Date());

    // Set the hours and minutes from the parsed date to the current day start
    const currentDateWithTime = setMinutes(setHours(todayStart, parsedDate.getHours()), parsedDate.getMinutes());

    console.log(currentDateWithTime)

    return currentDateWithTime;
}


import { subHours, } from 'date-fns';

export const decreaseHourByOne = (date: Date) => {

    const newDate = subHours(date, 1);

    return newDate
};

