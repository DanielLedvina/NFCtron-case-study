import { useCallback, useMemo, useState } from "react";
import type { Seat, TicketType } from "@/types";

export interface CartItem {
  seat: Seat;
  seatRow: number;
  ticketType: TicketType | undefined;
}

export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);

  const isInCart = useCallback(
    (seatId: string) => items.some((item) => item.seat.seatId === seatId),
    [items],
  );

  const addItem = useCallback((item: CartItem) => {
    setItems((current) =>
      current.some((existing) => existing.seat.seatId === item.seat.seatId)
        ? current
        : [...current, item],
    );
  }, []);

  const removeItem = useCallback((seatId: string) => {
    setItems((current) =>
      current.filter((item) => item.seat.seatId !== seatId),
    );
  }, []);

  const toggleItem = useCallback((item: CartItem) => {
    setItems((current) =>
      current.some((existing) => existing.seat.seatId === item.seat.seatId)
        ? current.filter(
            (existing) => existing.seat.seatId !== item.seat.seatId,
          )
        : [...current, item],
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const totalAmount = useMemo(
    () => items.reduce((sum, item) => sum + (item.ticketType?.price ?? 0), 0),
    [items],
  );

  return {
    items,
    isInCart,
    addItem,
    removeItem,
    toggleItem,
    clear,
    totalAmount,
  };
}
