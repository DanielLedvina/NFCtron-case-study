import * as z from "zod";

export const orderTicketSchema = z.object({
  ticketTypeId: z.uuid(),
  seatId: z.uuid(),
});

export const orderUserSchema = z.object({
  email: z.email(),
  firstName: z.string(),
  lastName: z.string(),
});

export const createOrderRequestSchema = z.object({
  eventId: z.uuid(),
  tickets: z.array(orderTicketSchema),
  user: orderUserSchema,
});

export const createOrderResponseSchema = z.object({
  message: z.string(),
  orderId: z.uuid(),
  tickets: z.array(orderTicketSchema),
  user: orderUserSchema,
  totalAmount: z.number(),
});

export type OrderTicketRequest = z.infer<typeof orderTicketSchema>;
export type OrderUser = z.infer<typeof orderUserSchema>;
export type CreateOrderRequest = z.infer<typeof createOrderRequestSchema>;
export type CreateOrderResponse = z.infer<typeof createOrderResponseSchema>;
