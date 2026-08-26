import type { ZodType } from "zod";
import { ApiError } from "./errors";
import { API_BASE_URL, DEFAULT_TIMEOUT_MS } from "./config";

export async function fetchApi<T>(
  path: string,
  schema: ZodType<T>,
  init: RequestInit = {},
  errorMessage = "The request could not be completed",
): Promise<T> {
  const abortController = new AbortController();
  const timeoutId = setTimeout(() => {
    abortController.abort();
  }, DEFAULT_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      signal: abortController.signal,
    });

    if (!response.ok) {
      const errorBody = await response.json().catch(() => null);
      throw new ApiError(
        errorBody?.message ?? `${errorMessage}. Status: ${response.status}`,
        response.status,
      );
    }

    const data = await response.json();
    const result = schema.safeParse(data);

    if (!result.success) {
      throw new ApiError("Server returned unexpected data", response.status);
    }

    return result.data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof Error && error.name === "AbortError") {
      // Distinguish an explicit timeout (408) from other network failures (status 0),
      // since callers may want to react differently (e.g. offer a retry).
      throw new ApiError(`${errorMessage}: request timed out`, 408);
    }
    throw new ApiError(`${errorMessage}: network error`, 0);
  } finally {
    clearTimeout(timeoutId);
  }
}
