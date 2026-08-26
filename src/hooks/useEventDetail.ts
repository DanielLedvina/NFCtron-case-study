import { useQuery } from "@tanstack/react-query";
import { getEvent } from "@/api/event";
import { getEventTickets } from "@/api/tickets";

export function useEventDetail() {
  const eventQuery = useQuery({
    queryKey: ["event"],
    queryFn: getEvent,
  });

  const eventId = eventQuery.data?.eventId;

  // Ticket fetch depends on the event's id, so it only runs once the event query resolves.
  const ticketQuery = useQuery({
    queryKey: ["tickets", eventId],
    queryFn: () => {
      if (!eventId) throw new Error("Cannot load tickets without an event");
      return getEventTickets(eventId);
    },
    enabled: !!eventId,
  });

  return {
    event: eventQuery.data,
    ticket: ticketQuery.data,
    isPending: eventQuery.isPending || ticketQuery.isPending,
    error: eventQuery.error ?? ticketQuery.error,
  };
}
