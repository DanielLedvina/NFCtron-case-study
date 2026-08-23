export function formatEventDate(iso: string) {
  const date = new Date(iso);

  return {
    weekdayAndDate: new Intl.DateTimeFormat("cs-CZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(date),
    dayNumber: new Intl.DateTimeFormat("cs-CZ", { day: "numeric" }).format(
      date,
    ),
    monthShort: new Intl.DateTimeFormat("cs-CZ", { month: "short" })
      .format(date)
      .replace(".", "")
      .toUpperCase(),
    time: new Intl.DateTimeFormat("cs-CZ", {
      hour: "2-digit",
      minute: "2-digit",
    }).format(date),
  };
}
