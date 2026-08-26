import { fetchApi } from "./fetchApi";
import { eventTicketsSchema } from "@/lib/schema/ticket";
import type { EventTickets } from "@/types";

export async function getEventTickets(
  eventId: string,
): Promise<EventTickets> {
  return fetchApi(
    // Escape eventId in case it ever contains characters (&, =, ...) that would break the query string.
    `/event-tickets?eventId=${encodeURIComponent(eventId)}`,
    eventTicketsSchema,
    {},
    "The event was not found",
  );
}
