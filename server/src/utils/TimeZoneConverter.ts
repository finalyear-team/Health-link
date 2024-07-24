import { formatInTimeZone } from 'date-fns-tz';

/**
 * Get the current date in the Africa/Addis_Ababa time zone.
 * @returns The formatted date string in the specified time zone.
 */
export function getFormatedDate(date: Date): string {
    const timeZone = 'Africa/Addis_Ababa';
    const formatString = 'yyyy-MM-dd'; // Adjust the format as needed
    return formatInTimeZone(date, timeZone, formatString);
}

/**
 * @returns The formatted time string in the specified time zone.
 */
export function getFormatedTime(date: Date): string {
    const timeZone = 'Africa/Addis_Ababa';
    const formatString = 'hh:mm a'; // 12-hour format
    return formatInTimeZone(date, timeZone, formatString);
}
