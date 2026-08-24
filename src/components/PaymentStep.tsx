import { useState } from "react";
import { Button } from "@/components/ui/button";
import { LoginDrawer } from "@/components/LoginDrawer";
import { GuestCheckoutForm } from "@/components/GuestCheckoutForm";
import { createOrder } from "@/api/order";
import { ApiError } from "@/api/errors";
import { toast } from "@/components/ui/toast";
import { formatCurrency } from "@/lib/formatCurrency";
import { useLocale } from "@/hooks/useLocale";
import { Loader2 } from "lucide-react";
import type {
  AuthUser,
  CreateOrderResponse,
  LoginRequest,
  OrderUser,
} from "@/types";
import type { CartItem } from "@/hooks/useCart";

interface PaymentStepProps {
  eventId: string;
  currencyIso: string;
  user: AuthUser | undefined;
  onLogin: (credentials: LoginRequest) => Promise<AuthUser>;
  items: CartItem[];
  totalAmount: number;
  onBack: () => void;
  onOrderCreated: (order: CreateOrderResponse) => void;
}

export const PaymentStep = ({
  eventId,
  currencyIso,
  user,
  onLogin,
  items,
  totalAmount,
  onBack,
  onOrderCreated,
}: PaymentStepProps) => {
  const { t, dateLocale } = useLocale();
  const [guestUser, setGuestUser] = useState<OrderUser | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const contact = user ?? guestUser;

  const handlePay = async () => {
    if (!contact) return;
    setIsSubmitting(true);

    try {
      const order = await createOrder({
        eventId,
        tickets: items.map((item) => ({
          seatId: item.seat.seatId,
          ticketTypeId: item.seat.ticketTypeId,
        })),
        user: {
          email: contact.email,
          firstName: contact.firstName,
          lastName: contact.lastName,
        },
      });

      onOrderCreated(order);
    } catch (error) {
      const message =
        error instanceof ApiError ? error.message : t("payment.error");
      toast.add({ description: message });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-md bg-card p-4 shadow-sm">
      <h2 className="text-lg font-semibold text-foreground">
        {t("payment.title")}
      </h2>

      {contact ? (
        <div className="flex flex-col gap-1 rounded-lg bg-muted p-3">
          <span className="text-xs text-muted-foreground">
            {t("payment.contact")}
          </span>
          <span className="text-sm font-semibold text-foreground">
            {contact.firstName} {contact.lastName} ({contact.email})
          </span>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2 rounded-lg bg-muted p-3">
            <span className="text-sm font-medium text-foreground">
              {t("payment.hasAccount")}
            </span>
            <LoginDrawer
              onLogin={onLogin}
              trigger={
                <Button className="bg-primary-100 text-white hover:bg-primary-200">
                  {t("payment.login")}
                </Button>
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <div className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">
              {t("payment.or")}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-foreground">
              {t("payment.continueAsGuest")}
            </span>
            <GuestCheckoutForm onSubmit={setGuestUser} />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between border-t border-border pt-4">
        <span className="text-sm font-medium text-muted-foreground">
          {t("payment.totalDue")}
        </span>
        <span className="text-xl font-bold text-foreground">
          {formatCurrency(totalAmount, currencyIso, dateLocale)}
        </span>
      </div>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
        <Button
          variant="outline"
          onClick={onBack}
          disabled={isSubmitting}
          className="sm:w-auto"
        >
          {t("payment.backToSummary")}
        </Button>
        <Button
          className="bg-primary-100 text-white hover:bg-primary-200 sm:w-auto"
          onClick={handlePay}
          disabled={isSubmitting || !contact}
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          {isSubmitting ? t("payment.processing") : t("payment.pay")}
        </Button>
      </div>
    </div>
  );
};
