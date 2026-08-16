import * as z from "zod";

export const ticketTypeSchema = z.object({
  id: z.uuid(),
  name: z.string(),
  price: z.number(),
});

export const seatSchema = z.object({
  seatId: z.uuid(),
  place: z.number(),
  ticketTypeId: z.uuid(),
});

export const seatRowSchema = z.object({
  seatRow: z.number(),
  seats: z.array(seatSchema),
});

export const eventTicketsSchema = z.object({
  ticketTypes: z.array(ticketTypeSchema),
  seatRows: z.array(seatRowSchema),
});

export type TicketType = z.infer<typeof ticketTypeSchema>;
export type Seat = z.infer<typeof seatSchema>;
export type SeatRow = z.infer<typeof seatRowSchema>;
export type EventTickets = z.infer<typeof eventTicketsSchema>;
