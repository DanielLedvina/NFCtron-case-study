import { Event } from "@/types";
import { Button } from "@/components/ui/button";
import { formatEventDate } from "@/lib/formatEventDate";
import { generateGoogleCalendarUrl } from "@/lib/generateCalendarLink";
import { cn } from "@/lib/utils";
import { useLocale } from "@/hooks/useLocale";
import {
  Building2,
  Calendar,
  CalendarPlus,
  Clock,
  FileText,
  Globe,
  MapPin,
  MessageCircle,
  Send,
  Share2,
} from "lucide-react";

interface EventCardProps {
  event: Event;
  className?: string;
}

export const EventCard = ({ event, className }: EventCardProps) => {
  const { t, dateLocale } = useLocale();
  const { eventId, namePub, description, dateFrom, headerImageUrl, place } =
    event;
  const { weekdayAndDate, time } = formatEventDate(dateFrom, dateLocale);
  const venueName = place.split(",")[0];

  return (
    <div
      className={cn(
        "w-full bg-card rounded-md shadow-sm p-3 flex flex-col gap-3",
        className,
      )}
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
          <span className="text-foreground">
            {t("event.from")} {time}
          </span>
        </div>
      </div>

      <Button
        variant="secondary"
        nativeButton={false}
        render={
          <a
            href={generateGoogleCalendarUrl(event)}
            target="_blank"
            rel="noopener noreferrer"
          />
        }
      >
        <CalendarPlus />
        {t("event.addToCalendar")}
      </Button>

      <iframe
        title={t("event.mapTitle")}
        className="h-32 w-full rounded-md border-0"
        loading="lazy"
        src={`https://www.google.com/maps?q=${encodeURIComponent(place)}&output=embed`}
      />

      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground bg-muted rounded-md px-2 py-1">
          <FileText className="text-primary-100 shrink-0" size={14} />
          {t("event.descriptionTitle")}
        </h2>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground bg-muted rounded-md px-2 py-1">
          <Share2 className="text-primary-100 shrink-0" size={14} />
          {t("event.shareTitle")}
        </h2>
        <div className="flex items-center gap-2">
          {[Globe, MessageCircle, Send].map((Icon, index) => (
            <button
              key={index}
              type="button"
              aria-label={t("event.share")}
              className="flex size-8 items-center justify-center rounded-full bg-muted text-muted-foreground hover:bg-primary-50 hover:text-primary-100"
            >
              <Icon size={16} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <h2 className="flex items-center gap-1.5 text-sm font-semibold text-foreground bg-muted rounded-md px-2 py-1">
          <Building2 className="text-primary-100 shrink-0" size={14} />
          {t("event.organizerTitle")}
        </h2>
        <a
          href="https://www.nfctron.com/cs/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-3 rounded-md border border-border p-2 transition-colors hover:bg-muted"
        >
          <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-primary-100">
            <img src="/nfctron-logo.png" alt="NFCtron" className="h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-foreground">
              NFCtron
            </span>
            <span className="text-xs text-muted-foreground">
              {t("event.organizerSubtitle")}
            </span>
          </div>
        </a>
      </div>
    </div>
  );
};
