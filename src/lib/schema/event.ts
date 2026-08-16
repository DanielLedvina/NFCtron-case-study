import * as z from "zod";

export const eventSchema = z.object({
  eventId: z.uuid(),
  namePub: z.string(),
  description: z.string(),
  currencyIso: z.string(),
  dateFrom: z.iso.datetime(),
  dateTo: z.iso.datetime(),
  headerImageUrl: z.string(),
  place: z.string(),
});

export type Event = z.infer<typeof eventSchema>;
