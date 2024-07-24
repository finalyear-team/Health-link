/**
 * Converts a timestamp or ISO string into a JavaScript Date object.
 * @param {string | number} dateString - The date string or timestamp.
 * @returns {Date} - The normalized Date object.
 */
export function parseDate(dateString: string) {
    if (typeof dateString === 'string') {
        // Check if the string is an ISO format
        if (dateString.match(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/)) {
            return new Date(dateString);
        }
    }

    // Assume the dateString is a timestamp if it's a number or doesn't match ISO format
    return new Date(parseInt(dateString));
}

/**
 * Compares two date strings or timestamps.
 * @param {string | number} date1 - The first date string or timestamp.
 * @param {string | number} date2 - The second date string or timestamp.
 * @returns {number} - Returns 0 if dates are equal, -1 if date1 is earlier, 1 if date1 is later.
 */
export default function compareDates(date1: string, date2: string) {
    const d1 = parseDate(date1);
    const d2 = parseDate(date2);

    if (d1.getTime() === d2.getTime()) return 0;
    return d1.getTime() < d2.getTime() ? -1 : 1;
}

// Example usage
const date1 = '1721829635110'; // Timestamp
const date2 = '2024-07-24T14:03:38.694Z'; // ISO string

const comparisonResult = compareDates(date1, date2);

if (comparisonResult === 0) {
    console.log('Dates are equal');
} else if (comparisonResult === -1) {
    console.log('Date1 is earlier than Date2');
} else {
    console.log('Date1 is later than Date2');
}
