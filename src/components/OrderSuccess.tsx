import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/formatCurrency";
import { getTicketTypeColor } from "@/lib/ticketTypeColors";
import { useLocale } from "@/hooks/useLocale";
import type { CartItem } from "@/hooks/useCart";
import type { TicketType } from "@/types";

interface OrderSuccessProps {
  orderId: string;
  items: CartItem[];
  ticketTypes: TicketType[];
  currencyIso: string;
  onContinue: () => void;
}

export const OrderSuccess = ({
  orderId,
  items,
  ticketTypes,
  currencyIso,
  onContinue,
}: OrderSuccessProps) => {
  const { t, dateLocale } = useLocale();

  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex flex-col items-center gap-2 rounded-lg bg-emerald-500/10 p-6 text-center">
        <CheckCircle2 className="text-emerald-500" size={40} />
        <h2 className="text-lg font-semibold text-foreground">
          {t("success.title")}
        </h2>
        <p className="text-sm text-muted-foreground">
          {t("success.description", { orderId })}
        </p>
      </div>

      <ul className="flex flex-col gap-3">
        {items.map((item) => (
          <li
            key={item.seat.seatId}
            className="flex overflow-hidden rounded-lg border border-border bg-muted"
          >
            <div className="flex min-w-0 flex-1 flex-col gap-3 p-3">
              <span
                className="inline-flex w-fit items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold text-white"
                style={{
                  backgroundColor: getTicketTypeColor(
                    item.seat.ticketTypeId,
                    ticketTypes,
                  ),
                }}
              >
                {item.ticketType?.name}
              </span>

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

            <div
              className="my-3 mr-3 w-6 shrink-0 rounded-sm bg-[repeating-linear-gradient(0deg,var(--color-foreground)_0px,var(--color-foreground)_1px,transparent_1px,transparent_3px)] opacity-40"
              aria-hidden="true"
            />
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-end border-t border-border pt-4">
        <Button
          className="bg-primary-100 text-white hover:bg-primary-200"
          onClick={onContinue}
        >
          {t("success.continue")}
        </Button>
      </div>
    </div>
  );
};
