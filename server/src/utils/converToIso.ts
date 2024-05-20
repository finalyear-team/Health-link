export function convertToIso(time) {
    // Remove any leading/trailing whitespace
    time = time.trim();

    // Regular expressions to identify the format
    const time12HourFormat = /^(1[0-2]|0?[1-9]):([0-5][0-9]) ?([AaPp][Mm])$/;
    const time24HourFormat = /^([01]?[0-9]|2[0-3]):([0-5][0-9])(:([0-5][0-9]))?$/;

    let date = new Date();
    
    // Parse 12-hour format time
    if (time12HourFormat.test(time)) {
        const [_, hour, minute, period] = time.match(time12HourFormat);
        let hours = parseInt(hour, 10);
        if (/pm/i.test(period) && hours !== 12) {
            hours += 12;
        } else if (/am/i.test(period) && hours === 12) {
            hours = 0;
        }
        date.setHours(hours, parseInt(minute, 10), 0, 0);
    } 
    // Parse 24-hour format time
    else if (time24HourFormat.test(time)) {
        const [_hour, minute, _second] = time.match(time24HourFormat);
        date.setHours(parseInt(_hour, 10), parseInt(minute, 10), _second ? parseInt(_second, 10) : 0, 0);
    } 
    // Handle invalid formats
    else {
        throw new Error("Invalid time format");
    }

    // Return the ISO string representation
    return date.toISOString();
}
