export function formatEventDate(iso: string, locale: string) {
  const date = new Date(iso);

  return {
    weekdayAndDate: new Intl.DateTimeFormat(locale, {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date),
    dayNumber: new Intl.DateTimeFormat(locale, { day: "numeric" }).format(
      date,
    ),
    monthShort: new Intl.DateTimeFormat(locale, { month: "short" })
      .format(date)
      .replace(".", "")
      .toUpperCase(),
    time: new Intl.DateTimeFormat(locale, {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
}
