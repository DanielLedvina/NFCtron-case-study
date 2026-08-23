import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar.tsx";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import "./App.css";
import { Toaster } from "@/components/ui/toast";
import { useEventDetail } from "./hooks/useEventDetail";
import { EventCard } from "./components/EventCard";
import { LoginDrawer } from "./components/LoginDrawer";
import { CheckoutFooter } from "./components/CheckoutFooter";
import { ArrowRight } from "lucide-react";
import { Seat } from "./components/Seat";
import { useMediaQuery } from "./hooks/useMediaQuery";
import { useState } from "react";

function App() {
  const isLoggedIn = false;
  const isDesktop = useMediaQuery("(min-width: 1280px)");
  const [visible, setVisible] = useState(false);
  function selectedTicket(id: string) {
    console.log(id);
    setVisible(!visible);
  }

  const { event, ticket, isPending, error } = useEventDetail();

  if (isPending) return "Loading...";
  if (error) return "An error has occurred: " + error.message;

  return (
    <div className="flex flex-col grow">
      {/* header (wrapper) */}
      <nav className="fixed top-0 left-0 right-0 z-10 flex justify-center md:mt-4 md:px-4">
        {/* inner content */}
        <div className="max-w-screen-lg md:mx-auto md:w-full w-full md:rounded-full bg-white/70 backdrop-blur-md shadow-sm border border-white/40 p-2 pl-4 grow flex items-center justify-between gap-3">
          {/* application/author image/logo */}
          <div className="max-w-[250px] w-full flex">
            <img src="/nfctron-logo.png" alt="NFCtron" className="h-8" />
          </div>
          {/* user menu */}
          <div className="max-w-[250px] w-full flex justify-end">
            {isLoggedIn ? (
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <Button variant="ghost">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage
                          src={`https://source.boringavatars.com/marble/120/<user-email>?colors=25106C,7F46DB`}
                        />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div className="flex flex-col text-left">
                        <span className="text-sm font-medium">John Doe</span>
                        <span className="text-xs text-zinc-500">
                          john.doe@nfctron.com
                        </span>
                      </div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[250px]">
                  <DropdownMenuLabel>John Doe</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuGroup>
                    <DropdownMenuItem disabled>Logout</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <LoginDrawer
                trigger={
                  <Button
                    size="lg"
                    className="rounded-full bg-primary-100 text-white hover:bg-primary-200 px-5 py-5 text-sm"
                  >
                    Přihlásit se
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
        <div className="max-w-screen-lg m-auto p-4 flex flex-col xl:flex-row items-start grow gap-3 w-full">
          {/* seating card */}
          <div
            className="bg-white rounded-md grow grid p-3 self-stretch shadow-sm"
            style={{
              gridTemplateColumns: "repeat(auto-fill, minmax(40px, 1fr))",
              gridAutoRows: "40px",
            }}
          >
            {/*	seating map */}
            {ticket?.seatRows.flatMap((seatRow) =>
              seatRow.seats.map((seat) => (
                <Seat
                  key={seat.seatId}
                  seat={seat}
                  ticketType={ticket.ticketTypes.find(
                    (ticketType) => ticketType.id === seat.ticketTypeId,
                  )}
                  isInCart={false}
                  onSeatSelect={selectedTicket}
                />
              )),
            )}
          </div>

          {event &&
            (isDesktop ? (
              <aside className="w-full max-w-sm">
                <EventCard event={event} />
              </aside>
            ) : (
              <div className="w-full">
                <EventCard event={event} />
              </div>
            ))}
        </div>
      </main>

      <CheckoutFooter isVisible={visible} />

      <Toaster />
    </div>
  );
}

export default App;
