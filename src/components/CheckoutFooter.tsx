import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { formatCurrency } from "@/lib/formatCurrency";
import { useLocale } from "@/hooks/useLocale";

interface CheckoutFooterProps {
  isVisible?: boolean;
  itemCount: number;
  totalAmount: number;
  currencyIso: string;
  buttonLabel?: string;
  onCheckout: () => void;
}

export const CheckoutFooter = ({
  isVisible = false,
  itemCount,
  totalAmount,
  currencyIso,
  buttonLabel,
  onCheckout,
}: CheckoutFooterProps) => {
  const { t, dateLocale } = useLocale();

  return (
    <footer
      className={cn(
        "fixed bottom-0 left-0 right-0 bg-card border-t border-border flex justify-center transition-transform duration-300",
        isVisible ? "translate-y-0" : "translate-y-full",
      )}
    >
      {/* inner content */}
      <div className="max-w-screen-lg p-4 sm:p-6 flex justify-between items-center gap-3 grow">
        {/* total in cart state */}
        <div className="flex min-w-0 flex-col gap-0.5">
          <span className="truncate text-sm font-medium text-muted-foreground">
            {t(
              itemCount === 1 ? "footer.itemsSingle" : "footer.itemsPlural",
              { count: itemCount },
            )}
          </span>
          <span className="truncate text-lg font-bold text-foreground sm:text-2xl">
            {formatCurrency(totalAmount, currencyIso, dateLocale)}
          </span>
        </div>

        {/* checkout button */}
        <Button
          size="lg"
          className="shrink-0 bg-primary-100 text-white hover:bg-primary-200"
          onClick={onCheckout}
        >
          {buttonLabel ?? t("seat.continue")}
        </Button>
      </div>
    </footer>
  );
};
