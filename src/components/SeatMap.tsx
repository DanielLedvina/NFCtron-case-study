import { useMemo } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Button } from "@/components/ui/button.tsx";
import { Seat } from "@/components/Seat.tsx";
import { formatCurrency } from "@/lib/formatCurrency.ts";
import { getTicketTypeColor } from "@/lib/ticketTypeColors.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import { Minus, Plus, RotateCcw } from "lucide-react";
import type { SeatRow, TicketType } from "@/types";

interface SeatMapProps {
  seatRows: SeatRow[];
  ticketTypes: TicketType[];
  currencyIso: string;
  isInCart: (seatId: string) => boolean;
  onSeatSelect: (seatId: string) => void;
}

export const SeatMap = ({
  seatRows,
  ticketTypes,
  currencyIso,
  isInCart,
  onSeatSelect,
}: SeatMapProps) => {
  const { t, dateLocale } = useLocale();

  // API doesn't guarantee row/seat order, so sort explicitly before rendering.
  const sortedRows = useMemo(
    () =>
      [...seatRows]
        .sort((a, b) => a.seatRow - b.seatRow)
        .map((row) => ({
          ...row,
          seats: [...row.seats].sort((a, b) => a.place - b.place),
        })),
    [seatRows],
  );

  const maxPlace = useMemo(
    () =>
      Math.max(
        1,
        ...sortedRows.flatMap((row) => row.seats.map((seat) => seat.place)),
      ),
    [sortedRows],
  );

  return (
    <div className="flex flex-col gap-3 p-3">
      {/* ticket type legend */}
      <div className="flex flex-wrap items-center gap-3 rounded-md bg-muted p-3">
        {ticketTypes.map((ticketType) => (
          <div key={ticketType.id} className="flex items-center gap-2">
            <span
              className="size-3 shrink-0 rounded-full"
              style={{
                backgroundColor: getTicketTypeColor(ticketType.id, ticketTypes),
              }}
            />
            <span className="text-xs font-medium text-foreground">
              {ticketType.name}
            </span>
            <span className="text-xs text-muted-foreground">
              {formatCurrency(ticketType.price, currencyIso, dateLocale)}
            </span>
          </div>
        ))}
      </div>

      <TransformWrapper
        initialScale={1}
        minScale={0.5}
        maxScale={3}
        centerOnInit
        doubleClick={{ disabled: true }}
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-end gap-1">
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => zoomOut()}
                aria-label={t("seatMap.zoomOut")}
              >
                <Minus />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => zoomIn()}
                aria-label={t("seatMap.zoomIn")}
              >
                <Plus />
              </Button>
              <Button
                variant="outline"
                size="icon-sm"
                onClick={() => resetTransform()}
                aria-label={t("seatMap.resetView")}
              >
                <RotateCcw />
              </Button>
            </div>

            <TransformComponent
              wrapperClass="!w-full !h-[50vh] md:!h-[60vh] rounded-md bg-card"
              contentClass="!w-full !h-full flex items-center justify-center"
            >
              <div className="flex flex-col gap-2 p-6">
                {sortedRows.map((row) => (
                  <div key={row.seatRow} className="flex items-center gap-3">
                    <span className="w-6 shrink-0 text-right text-xs font-medium text-muted-foreground">
                      {row.seatRow}
                    </span>
                    <div
                      className="grid gap-2"
                      style={{
                        gridTemplateColumns: `repeat(${maxPlace}, 2rem)`,
                      }}
                    >
                      {row.seats.map((seat) => {
                        const ticketType = ticketTypes.find(
                          (type) => type.id === seat.ticketTypeId,
                        );

                        return (
                          <Seat
                            key={seat.seatId}
                            seat={seat}
                            seatRow={row.seatRow}
                            ticketType={ticketType}
                            currencyIso={currencyIso}
                            color={getTicketTypeColor(
                              seat.ticketTypeId,
                              ticketTypes,
                            )}
                            isInCart={isInCart(seat.seatId)}
                            onSeatSelect={onSeatSelect}
                            style={{ gridColumn: seat.place }}
                          />
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </TransformComponent>
          </div>
        )}
      </TransformWrapper>
    </div>
  );
};
