import { parse, isValid, formatISO, format } from 'date-fns';


export function convertToIso(time) {
    // Remove any leading/trailing whitespace
    time = time.trim();
    console.log(time)

    // Regular expressions to identify the format
    const time12HourFormat = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])$/i;
    const time24HourFormat = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;

    // Get the current date
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // Note: 0-indexed
    const day = now.getDate();

    let hours, minutes;

    // Parse 12-hour format time
    if (time12HourFormat.test(time)) {
        const parsedTime = parse(time, 'h:mm a', new Date());
        hours = parsedTime.getHours();
        minutes = parsedTime.getMinutes();
    }
    // Parse 24-hour format time
    else if (time24HourFormat.test(time)) {
        const parsedTime = parse(time, 'HH:mm', new Date());
        hours = parsedTime.getHours();
        minutes = parsedTime.getMinutes();
    }
    // Handle invalid formats
    else {
        throw new Error("Invalid time format");
    }

    // Create a new Date object with the current date and parsed time
    const date = new Date(year, month, day, hours, minutes);

    // Check if the date is valid
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


import { getHours, getMinutes, getSeconds } from 'date-fns'

const timeToSeconds = (date) => {
    const hours = getHours(date)
    const minutes = getMinutes(date)
    const seconds = getSeconds(date)

    return hours * 3600 + minutes * 60 + seconds
}

export const compareTimeOnly = (date1, date2) => {
    const seconds1 = timeToSeconds(date1)
    const seconds2 = timeToSeconds(date2)

    return seconds1 - seconds2
}

