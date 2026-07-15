export interface TicketType {
  id: string;
  name: string;
  price: number;
}

export interface Seat {
  seatId: string;
  place: number;
  ticketTypeId: string;
}

export interface SeatRow {
  seatRow: number;
  seats: Seat[];
}

export interface EventTickets {
  ticketTypes: TicketType[];
  seatRows: SeatRow[];
}
