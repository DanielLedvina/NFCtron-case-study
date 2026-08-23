import { Button } from "@/components/ui/button.tsx";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover.tsx";
import { cn } from "@/lib/utils.ts";
import React from "react";
import type { Seat as SeatData, TicketType } from "@/types";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seat: SeatData;
  ticketType: TicketType | undefined;
  isInCart: boolean;
  onSeatSelect: (seatId: string) => void;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  ({ seat, ticketType, isInCart, onSeatSelect, ...props }, ref) => {
    return (
      <Popover>
        <PopoverTrigger>
          <div
            className={cn(
              "size-8 rounded-full bg-zinc-100 hover:bg-zinc-200 transition-color",
              props.className,
            )}
            ref={ref}
            onClick={() => onSeatSelect(seat.seatId)}
          >
            <span className="text-xs text-zinc-400 font-medium">
              {seat.place}
            </span>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <pre>{JSON.stringify({ seat, ticketType }, null, 2)}</pre>

          <footer className="flex flex-col">
            {isInCart ? (
              <Button
                variant="destructive"
                size="sm"
                onClick={() => onSeatSelect(seat.seatId)}
              >
                Remove from cart
              </Button>
            ) : (
              <Button
                variant="default"
                size="sm"
                onClick={() => onSeatSelect(seat.seatId)}
              >
                Add to cart
              </Button>
            )}
          </footer>
        </PopoverContent>
      </Popover>
    );
  },
);
