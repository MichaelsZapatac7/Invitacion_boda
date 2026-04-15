import { calendarEventConfig } from "@/config/weddingConfig";

const formatGoogleDate = (dateTime: string) => dateTime.replace(/[-:]/g, "").replace(".000", "");

export const createGoogleCalendarUrl = () => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: calendarEventConfig.title,
    details: calendarEventConfig.description,
    location: calendarEventConfig.location,
    dates: `${formatGoogleDate(calendarEventConfig.startDateTime)}/${formatGoogleDate(
      calendarEventConfig.endDateTime
    )}`
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
};

export const createIcsFile = () => {
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const uid = `michael-juliana-wedding-${calendarEventConfig.startDateTime}`;

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//MichaelJuliana//Wedding Invitation//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${calendarEventConfig.startDateTime.replace(/[-:]/g, "")}`,
    `DTEND:${calendarEventConfig.endDateTime.replace(/[-:]/g, "")}`,
    `SUMMARY:${calendarEventConfig.title}`,
    `DESCRIPTION:${calendarEventConfig.description}`,
    `LOCATION:${calendarEventConfig.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
};
