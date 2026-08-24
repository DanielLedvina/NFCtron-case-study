import { Avatar, AvatarFallback } from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import "./App.css";
import { Toaster, toast } from "@/components/ui/toast";
import { useEventDetail } from "./hooks/useEventDetail";
import { EventCard } from "./components/EventCard";
import { Footer } from "./components/Footer";
import { LoginDrawer } from "./components/LoginDrawer";
import { CheckoutFooter } from "./components/CheckoutFooter";
import { CheckoutStepper, type CheckoutStep } from "./components/CheckoutStepper";
import { OrderSummary } from "./components/OrderSummary";
import { PaymentStep } from "./components/PaymentStep";
import { ArrowRight, Globe, LogOut, Moon, Sun } from "lucide-react";
import { SeatMap } from "./components/SeatMap";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useAuth } from "./hooks/useAuth";
import { useCart } from "./hooks/useCart";
import { useLocale } from "./hooks/useLocale";
import { useTheme } from "./hooks/useTheme";
import { useState } from "react";
import type { CreateOrderResponse } from "@/types";

function App() {
  const auth = useAuth();
  const cart = useCart();
  const { locale, setLocale, t } = useLocale();
  const { theme, toggleTheme } = useTheme();
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [step, setStep] = useState<CheckoutStep>("seats");
  const isCheckoutFooterVisible =
    (step === "seats" || step === "summary") && cart.items.length > 0;

  const { event, ticket, isPending, error } = useEventDetail();

  function selectedTicket(seatId: string) {
    const seatRow = ticket?.seatRows.find((row) =>
      row.seats.some((seat) => seat.seatId === seatId),
    );
    const seat = seatRow?.seats.find((seat) => seat.seatId === seatId);
    if (!seat || !seatRow) return;

    const ticketType = ticket?.ticketTypes.find(
      (type) => type.id === seat.ticketTypeId,
    );

    cart.toggleItem({ seat, seatRow: seatRow.seatRow, ticketType });
  }

  function handleGoToSummary() {
    setStep("summary");
  }

  function handleGoToPayment() {
    setStep("payment");
  }

  function handleOrderCreated(order: CreateOrderResponse) {
    toast.add({
      description: t("app.orderPaid", { orderId: order.orderId }),
    });
    cart.clear();
    setStep("seats");
  }

  if (isPending) return t("app.loading");
  if (error) return t("app.error", { message: error.message });

  return (
    <div className="flex flex-col grow">
      {/* header (wrapper) */}
      <nav className="fixed top-0 left-0 right-0 z-10 flex justify-center md:mt-4 md:px-4">
        {/* inner content */}
        <div className="max-w-screen-lg md:mx-auto md:w-full w-full md:rounded-full bg-background/70 backdrop-blur-md shadow-sm border border-white/40 h-16 px-2 pl-4 grow flex items-center justify-between gap-3">
          {/* application/author image/logo */}
          <div className="max-w-[250px] w-full flex">
            <div className="flex h-10 items-center rounded-full bg-black-100 px-4">
              <img src="/nfctron-logo.png" alt="NFCtron" className="h-5" />
            </div>
          </div>
          {/* user menu */}
          <div className="max-w-[250px] w-full flex items-center justify-end gap-3">
            <Button
              variant="outline"
              size="icon-lg"
              className="h-11 w-11"
              onClick={toggleTheme}
              aria-label={t("nav.toggleTheme")}
            >
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="w-[4.5rem] px-3"
              onClick={() => setLocale(locale === "cs" ? "en" : "cs")}
              aria-label={t("nav.toggleLanguage")}
            >
              <Globe />
              <span className="text-xs font-semibold">
                {locale === "cs" ? "EN" : "CS"}
              </span>
            </Button>

            {auth.isLoggedIn && auth.user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={
                    <button
                      type="button"
                      className="flex items-center gap-2 rounded-full border border-transparent p-1 pr-3 transition-colors hover:border-primary-100/20 hover:bg-primary-50 data-popup-open:border-primary-100/20 data-popup-open:bg-primary-50"
                    >
                      <Avatar className="after:border-none">
                        <AvatarFallback className="bg-primary-100 text-white">
                          {auth.user.firstName[0]}
                          {auth.user.lastName[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col text-left">
                        <span className="text-sm font-medium text-foreground">
                          {auth.user.firstName} {auth.user.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {auth.user.email}
                        </span>
                      </div>
                    </button>
                  }
                />
                <DropdownMenuContent className="w-[260px] p-2">
                  <div className="flex items-center gap-3 p-2">
                    <Avatar className="after:border-none">
                      <AvatarFallback className="bg-primary-100 text-white">
                        {auth.user.firstName[0]}
                        {auth.user.lastName[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">
                        {auth.user.firstName} {auth.user.lastName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {auth.user.email}
                      </span>
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      variant="destructive"
                      onClick={auth.logout}
                      className="py-2 focus:bg-destructive/5"
                    >
                      <LogOut />
                      {t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginDrawer
                onLogin={auth.login}
                trigger={
                  <Button
                    size="lg"
                    className="min-w-[9.5rem] justify-center bg-primary-100 text-white hover:bg-primary-200"
                  >
                    {t("nav.login")}
                    <ArrowRight />
                  </Button>
                }
              />
            )}
          </div>
        </div>
      </nav>

      {/* main body (wrapper) */}
      <main className="grow flex flex-col justify-center pt-16 md:pt-20">
        {/* inner content */}
        <div className="max-w-screen-lg m-auto p-4 flex flex-col xl:flex-row items-stretch grow gap-3 w-full">
          {/* seating card / checkout flow */}
          <div className="bg-card rounded-md min-w-0 xl:w-0 grow shadow-sm flex flex-col overflow-hidden">
            <CheckoutStepper
              currentStep={step}
              onStepClick={(nextStep) => {
                if (nextStep === "payment" && cart.items.length === 0) return;
                setStep(nextStep);
              }}
              canReachSummary={cart.items.length > 0}
            />

            {step === "seats" && event && ticket && (
              <SeatMap
                seatRows={ticket.seatRows}
                ticketTypes={ticket.ticketTypes}
                currencyIso={event.currencyIso}
                isInCart={cart.isInCart}
                onSeatSelect={selectedTicket}
              />
            )}

            {step === "summary" && event && ticket && (
              <OrderSummary
                items={cart.items}
                ticketTypes={ticket.ticketTypes}
                currencyIso={event.currencyIso}
                onRemoveItem={(seatId) => {
                  cart.removeItem(seatId);
                  if (cart.items.length <= 1) setStep("seats");
                }}
              />
            )}

            {step === "payment" && event && (
              <PaymentStep
                eventId={event.eventId}
                currencyIso={event.currencyIso}
                user={auth.user}
                onLogin={auth.login}
                items={cart.items}
                totalAmount={cart.totalAmount}
                onBack={() => setStep("summary")}
                onOrderCreated={handleOrderCreated}
              />
            )}
          </div>

          {event &&
            (isDesktop ? (
              <aside className="w-full max-w-sm shrink-0">
                <EventCard event={event} className="h-full" />
              </aside>
            ) : (
              <div className="w-full">
                <EventCard event={event} />
              </div>
            ))}
        </div>
      </main>

      <Footer />

      {(step === "seats" || step === "summary") && event && (
        <CheckoutFooter
          isVisible={isCheckoutFooterVisible}
          itemCount={cart.items.length}
          totalAmount={cart.totalAmount}
          currencyIso={event.currencyIso}
          buttonLabel={step === "seats" ? t("seat.continue") : t("stepper.summary.title")}
          onCheckout={step === "seats" ? handleGoToSummary : handleGoToPayment}
        />
      )}

      <Toaster />
    </div>
  );
}

export default App;
