import type { LoginRequest, LoginResponse } from "@/types";
import { fetchApi } from "./fetchApi";
import { loginRequest, loginResponse } from "@/lib/schema/auth";

export async function login(requestBody: LoginRequest) {
  const parsed = loginRequest.parse(requestBody);

  return await fetchApi<LoginResponse>(
    "/login",
    loginResponse,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(parsed),
    },
    "Unknown user",
  );
}
