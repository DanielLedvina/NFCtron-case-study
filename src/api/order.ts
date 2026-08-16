import type { CreateOrderRequest, CreateOrderResponse } from "@/types";
import { fetchApi } from "./fetchApi";
import { createOrderResponseSchema } from "@/lib/schema/order";

export async function createOrder(
  requestBody: CreateOrderRequest,
): Promise<CreateOrderResponse> {
  const { eventId, tickets, user } = requestBody;

  return fetchApi(
    "/order",
    createOrderResponseSchema,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId,
        tickets: tickets.map((ticket) => ({
          ticketTypeId: ticket.ticketTypeId,
          seatId: ticket.seatId,
        })),
        user: {
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
        },
      }),
    },
    "The order could not be created",
  );
}
