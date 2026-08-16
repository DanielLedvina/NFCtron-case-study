import { fetchApi } from "./fetchApi";
import { eventSchema } from "@/lib/schema/event";
import type { Event } from "@/types";

export async function getEvent(): Promise<Event> {
  return fetchApi("/event", eventSchema, {}, "The event could not be loaded");
}
