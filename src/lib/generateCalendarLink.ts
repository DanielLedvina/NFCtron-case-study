import type { Event } from "@/types";

function toGoogleCalendarDate(iso: string): string {
  return new Date(iso).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}

export function generateGoogleCalendarUrl(event: Event): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: event.namePub,
    dates: `${toGoogleCalendarDate(event.dateFrom)}/${toGoogleCalendarDate(event.dateTo)}`,
    details: event.description,
    location: event.place,
  });

  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}
