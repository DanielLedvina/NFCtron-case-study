export interface OrderTicketRequest {
  ticketTypeId: string;
  seatId: string;
}

export interface OrderUser {
  email: string;
  firstName: string;
  lastName: string;
}

export interface CreateOrderRequest {
  eventId: string;
  tickets: OrderTicketRequest[];
  user: OrderUser;
}

export interface CreateOrderResponse {
  message: string;
  orderId: string;
  tickets: OrderTicketRequest[];
  user: OrderUser;
  totalAmount: number;
}
