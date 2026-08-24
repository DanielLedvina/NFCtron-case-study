import { Button } from "@/components/ui/button.tsx";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer.tsx";
import { cn } from "@/lib/utils.ts";
import { formatCurrency } from "@/lib/formatCurrency.ts";
import { useLocale } from "@/hooks/useLocale.tsx";
import { Check, Info } from "lucide-react";
import React from "react";
import type { Seat as SeatData, TicketType } from "@/types";

interface SeatProps extends React.HTMLAttributes<HTMLElement> {
  seat: SeatData;
  seatRow: number;
  ticketType: TicketType | undefined;
  currencyIso: string;
  color: string;
  isInCart: boolean;
  onSeatSelect: (seatId: string) => void;
}

export const Seat = React.forwardRef<HTMLDivElement, SeatProps>(
  (
    {
      seat,
      seatRow,
      ticketType,
      currencyIso,
      color,
      isInCart,
      onSeatSelect,
      style,
      ...props
    },
    ref,
  ) => {
    const { t, dateLocale } = useLocale();

    return (
      <Drawer>
        <DrawerTrigger
          nativeButton={false}
          render={
            <div
              className={cn(
                "size-8 rounded-full flex items-center justify-center transition-all",
                isInCart && "ring-2 ring-offset-2 ring-foreground",
                props.className,
              )}
              style={{ ...style, backgroundColor: color }}
              ref={ref}
            >
              {isInCart ? (
                <Check className="text-white" size={14} />
              ) : (
                <span className="text-xs font-medium text-white">
                  {seat.place}
                </span>
              )}
            </div>
          }
        />
        <DrawerContent className="mx-auto mb-4 flex max-w-lg flex-col gap-2 rounded-2xl bg-transparent [--drawer-bleed-background:transparent]">
          {/* ticket card */}
          <div className="flex rounded-2xl bg-card shadow-lg">
            <div className="flex min-w-0 flex-1 flex-col">
              <div className="flex flex-col gap-4 p-4 pt-6">
                <div className="flex items-center justify-between gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {t("seat.row")}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {seatRow}
                    </span>
                  </div>

                  <div className="flex flex-col gap-1">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {t("seat.seat")}
                    </span>
                    <span className="text-2xl font-bold text-foreground">
                      {seat.place}
                    </span>
                  </div>

                  <div className="flex flex-col items-end gap-1 text-right">
                    <span className="text-xs font-medium text-muted-foreground uppercase">
                      {t("seat.ticketType")}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <span
                        className="size-2.5 shrink-0 rounded-full"
                        style={{ backgroundColor: color }}
                      />
                      <span className="text-xl font-bold text-foreground">
                        {ticketType?.name}
                      </span>
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-2 rounded-lg bg-muted p-3">
                  <Info
                    className="mt-0.5 text-primary-100 shrink-0"
                    size={16}
                  />
                  <p className="text-xs text-muted-foreground">
                    {t("seat.info")}
                  </p>
                </div>
              </div>

              {/* perforation notch */}
              <div
                className="relative h-6"
                style={{
                  WebkitMaskImage:
                    "radial-gradient(circle 12px at 0 50%, transparent 99%, black 100%), radial-gradient(circle 12px at 100% 50%, transparent 99%, black 100%)",
                  WebkitMaskComposite: "source-in, source-in",
                  maskImage:
                    "radial-gradient(circle 12px at 0 50%, transparent 99%, black 100%), radial-gradient(circle 12px at 100% 50%, transparent 99%, black 100%)",
                  maskComposite: "intersect",
                }}
              >
                <div className="absolute inset-x-4 top-1/2 border-t border-dashed border-border" />
              </div>

              <div className="flex items-center justify-between gap-4 p-4">
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-medium text-muted-foreground uppercase">
                    {t("seat.totalPrice")}
                  </span>
                  <span className="text-2xl font-bold text-foreground">
                    {ticketType &&
                      formatCurrency(ticketType.price, currencyIso, dateLocale)}
                  </span>
                </div>

                {!isInCart && (
                  <Button
                    size="sm"
                    className="bg-primary-100 text-white hover:bg-primary-200"
                    onClick={() => onSeatSelect(seat.seatId)}
                  >
                    {t("seat.reserve")}
                  </Button>
                )}
              </div>
            </div>

            {/* vertical perforation */}
            <div
              className="relative w-6"
              style={{
                WebkitMaskImage:
                  "radial-gradient(circle 12px at 50% 0, transparent 99%, black 100%), radial-gradient(circle 12px at 50% 100%, transparent 99%, black 100%)",
                WebkitMaskComposite: "source-in, source-in",
                maskImage:
                  "radial-gradient(circle 12px at 50% 0, transparent 99%, black 100%), radial-gradient(circle 12px at 50% 100%, transparent 99%, black 100%)",
                maskComposite: "intersect",
              }}
            >
              <div className="absolute inset-y-4 left-1/2 border-l border-dashed border-border" />
            </div>

            {/* decorative barcode strip */}
            <div
              className="my-4 mr-4 w-8 shrink-0 rounded-sm bg-[repeating-linear-gradient(0deg,var(--color-foreground)_0px,var(--color-foreground)_1px,transparent_1px,transparent_3px)] opacity-40"
              aria-hidden="true"
            />
          </div>

          {/* primary action */}
          <DrawerClose
            className="mt-4"
            render={
              <Button
                size="lg"
                className="bg-primary-100 text-white hover:bg-primary-200"
              >
                {isInCart ? t("seat.continue") : t("seat.close")}
              </Button>
            }
          />
        </DrawerContent>
      </Drawer>
    );
  },
);
