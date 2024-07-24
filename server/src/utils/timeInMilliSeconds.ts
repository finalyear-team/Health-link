import { getDate, getHours, getMilliseconds, getMinutes, getMonth, getSeconds, getYear, set } from "date-fns";

export const getTimeMilliSeconds = (date: Date) => {
    return date.getHours() * 3600 * 1000 + date.getMinutes() * 60 * 1000 + date.getSeconds() * 1000
}

export const mergeDates = (date1: Date, date2: Date) => {
    // Extract the date components from the first date
    const year = getYear(date1);
    const month = getMonth(date1);
    const day = getDate(date1);


    // Extract the time components from the second date
    const hours = getHours(date2);
    const minutes = getMinutes(date2);
    const seconds = getSeconds(date2);
    const milliseconds = getMilliseconds(date2);

    // Create a new date with the extracted components
    const mergedDate = set(new Date(year, month, day), {
        hours,
        minutes,
        seconds,
        milliseconds,
    });

    return mergedDate;
}