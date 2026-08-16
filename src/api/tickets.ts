import { fetchApi } from "./fetchApi";
import { eventTicketsSchema } from "@/lib/schema/ticket";
import type { EventTickets } from "@/types";

export const getEventTickets = async (
  eventId: string,
): Promise<EventTickets> => {
  return fetchApi(
    `/event-tickets?eventId=${eventId}`,
    eventTicketsSchema,
    {},
    "The event was not found",
  );
};
