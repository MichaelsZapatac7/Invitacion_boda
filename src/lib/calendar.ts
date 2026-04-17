import { calendarEventConfig } from "@/config/weddingConfig";

const formatUtcDate = (dateTime: string) =>
  new Date(dateTime).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";

export const createGoogleCalendarUrl = () => {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: calendarEventConfig.title,
    details: calendarEventConfig.description,
    location: calendarEventConfig.location,
    dates: `${formatUtcDate(calendarEventConfig.startDateTime)}/${formatUtcDate(
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
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}`,
    `DTSTAMP:${now}`,
    `DTSTART:${formatUtcDate(calendarEventConfig.startDateTime)}`,
    `DTEND:${formatUtcDate(calendarEventConfig.endDateTime)}`,
    `SUMMARY:${calendarEventConfig.title}`,
    `DESCRIPTION:${calendarEventConfig.description}`,
    `LOCATION:${calendarEventConfig.location}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ].join("\r\n");
};
