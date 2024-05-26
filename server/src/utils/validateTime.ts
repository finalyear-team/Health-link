
export function validateEndTime(isoString1, isoString2) {
    const startTime =Date.parse(isoString1);
    const EndTime = Date.parse(isoString2);

    // Check if both dates are valid
    if (isNaN(startTime) || isNaN(EndTime)) {
        throw new Error("Invalid ISO string format");
    }

    if (startTime >=EndTime) {
        return false;
    } else if (startTime < EndTime) {
        return true;
    } else {
        return 0;
    }
}
