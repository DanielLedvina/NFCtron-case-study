import { fetchApi } from "./fetchApi";
import { eventTicketsSchema } from "@/lib/schema/ticket";
import type { EventTickets } from "@/types";

export async function getEventTickets(
  eventId: string,
): Promise<EventTickets> {
  return fetchApi(
    `/event-tickets?eventId=${eventId}`,
    eventTicketsSchema,
    {},
    "The event was not found",
  );
}
