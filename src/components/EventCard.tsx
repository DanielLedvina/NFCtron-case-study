import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/formatEventDate";
import { Calendar, Clock, MapPin, Share2 } from "lucide-react";

interface EventCardProps {
  event: Event;
}

export const EventCard = ({ event }: EventCardProps) => {
  const { eventId, namePub, description, dateFrom, headerImageUrl, place } =
    event;
  const { weekdayAndDate, time } = formatEventDate(dateFrom);
  const venueName = place.split(",")[0];

  return (
    <div
      className="w-full bg-white rounded-md shadow-sm p-3 flex flex-col gap-3"
      data-event-id={eventId}
    >
      <img
        src={headerImageUrl}
        alt={namePub}
        className="bg-muted rounded-md aspect-3/1 object-cover object-bottom"
      />

      <h1 className="text-xl text-foreground font-semibold">{namePub}</h1>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-sm min-w-0">
          <MapPin className="text-primary-100 shrink-0" size={16} />
          <span className="text-foreground truncate" title={place}>
            {venueName}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="text-primary-100 shrink-0" size={16} />
          <span className="text-foreground capitalize">
            {weekdayAndDate}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Clock className="text-primary-100 shrink-0" size={16} />
          <span className="text-foreground">od {time}</span>
        </div>
      </div>

      <div className="bg-muted rounded-md h-32" />

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-foreground bg-muted rounded-md px-2 py-1">
          Popis akce
        </h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="text-sm font-semibold text-foreground bg-muted rounded-md px-2 py-1">
          Sdílení
        </h2>
        <div className="flex items-center gap-2">
          <Share2 className="text-muted-foreground shrink-0" size={16} />
          <div className="flex gap-2">
            <span className="bg-muted rounded-full size-8" />
            <span className="bg-muted rounded-full size-8" />
            <span className="bg-muted rounded-full size-8" />
          </div>
        </div>
      </div>

      <Button variant="secondary" disabled>
        Add to calendar
      </Button>
    </div>
  );
};
