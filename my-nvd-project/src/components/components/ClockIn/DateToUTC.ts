import { parseISO, startOfDay, formatISO } from "date-fns";

export const normalizeDateToUTC = (dateString: string) => {
  // Parse the date string
  const parsedDate = parseISO(dateString);
  // Set the time part to the start of the day in UTC
  const startOfDayUTC = startOfDay(parsedDate);
  // Format the date in ISO 8601 format without time
  return formatISO(startOfDayUTC, { representation: "date" });
};
