import { useState } from "react";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/formatCurrency";
import { getTicketTypeColor } from "@/lib/ticketTypeColors";
import { useLocale } from "@/hooks/useLocale";
import type { CartItem } from "@/hooks/useCart";
import type { TicketType } from "@/types";

interface OrderSummaryProps {
  items: CartItem[];
  ticketTypes: TicketType[];
  currencyIso: string;
  onRemoveItem: (seatId: string) => void;
}

export const OrderSummary = ({
  items,
  ticketTypes,
  currencyIso,
  onRemoveItem,
}: OrderSummaryProps) => {
  const { t, dateLocale } = useLocale();
  const [holderName, setHolderName] = useState("");

  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-lg font-semibold text-foreground">
        {t("summary.title")}
      </h2>

      {items.length === 0 ? (
        <p className="text-sm text-muted-foreground">{t("summary.empty")}</p>
      ) : (
        <>
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="ticket-holder">{t("summary.holderLabel")}</Label>
            <Input
              id="ticket-holder"
              placeholder={t("summary.holderPlaceholder")}
              value={holderName}
              onChange={(event) => setHolderName(event.target.value)}
            />
          </div>

          <ul className="flex flex-col gap-3">
            {items.map((item) => (
              <li
                key={item.seat.seatId}
                className="flex overflow-hidden rounded-lg border border-border bg-muted"
              >
                <div className="flex min-w-0 flex-1 flex-col gap-3 p-3">
                  <div className="flex items-center justify-between gap-3">
                    <span
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                      style={{
                        backgroundColor: getTicketTypeColor(
                          item.seat.ticketTypeId,
                          ticketTypes,
                        ),
                      }}
                    >
                      {item.ticketType?.name}
                    </span>

                    <Dialog>
                      <DialogTrigger
                        nativeButton={false}
                        render={
                          <button
                            type="button"
                            aria-label={t("summary.removeTicket")}
                            className="flex size-8 items-center justify-center rounded-full text-destructive hover:bg-destructive/10"
                          />
                        }
                      >
                        <Trash2 size={16} />
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{t("summary.removeTitle")}</DialogTitle>
                          <DialogDescription>
                            {t("summary.removeDescription", {
                              row: item.seatRow,
                              seat: item.seat.place,
                              ticketType: item.ticketType?.name ?? "",
                            })}
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose render={<Button variant="outline" />}>
                            {t("summary.removeCancel")}
                          </DialogClose>
                          <DialogClose
                            render={
                              <Button
                                variant="destructive"
                                onClick={() => onRemoveItem(item.seat.seatId)}
                              />
                            }
                          >
                            {t("summary.removeConfirm")}
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-6">
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {t("summary.row")}
                      </span>
                      <span className="text-lg font-bold text-foreground sm:text-2xl">
                        {item.seatRow}
                      </span>
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {t("summary.seat")}
                      </span>
                      <span className="text-lg font-bold text-foreground sm:text-2xl">
                        {item.seat.place}
                      </span>
                    </div>
                    <div className="flex min-w-0 flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground uppercase">
                        {t("summary.price")}
                      </span>
                      <span className="truncate text-lg font-bold text-foreground sm:text-2xl">
                        {item.ticketType &&
                          formatCurrency(
                            item.ticketType.price,
                            currencyIso,
                            dateLocale,
                          )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* decorative barcode strip */}
                <div
                  className="my-3 mr-3 w-6 shrink-0 rounded-sm bg-[repeating-linear-gradient(0deg,var(--color-foreground)_0px,var(--color-foreground)_1px,transparent_1px,transparent_3px)] opacity-40"
                  aria-hidden="true"
                />
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
};
