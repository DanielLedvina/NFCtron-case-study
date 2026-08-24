import type { TicketType } from "@/types";

const TICKET_TYPE_PALETTE = [
  "#9d4edd",
  "#f72585",
  "#e85d04",
  "#ffb703",
  "#c77dff",
  "#7209b7",
];

export function getTicketTypeColor(
  ticketTypeId: string,
  ticketTypes: TicketType[],
): string {
  const index = ticketTypes.findIndex((type) => type.id === ticketTypeId);
  return TICKET_TYPE_PALETTE[index % TICKET_TYPE_PALETTE.length];
}
