import { format, addDays, getDay, parseISO } from 'date-fns';

const weekDays = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

export function getNextWeekday(currentDate: Date, targetWeekday: string): Date {
  const currentDayIndex = getDay(currentDate);
  const targetDayIndex = weekDays.indexOf(targetWeekday.toLowerCase());

  if (targetDayIndex === -1) {
    throw new Error('Invalid weekday provided');
  }

  let daysToAdd = targetDayIndex - currentDayIndex;
  if (daysToAdd <= 0) {
    daysToAdd += 7;
  }

  return addDays(currentDate, daysToAdd);
}