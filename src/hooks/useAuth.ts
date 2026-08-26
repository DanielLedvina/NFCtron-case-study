import { useState } from "react";
import { login as loginRequest } from "@/api/auth";
import { getCookie, removeCookie, setCookie } from "@/lib/cookies";
import type { AuthUser, LoginRequest } from "@/types";

const AUTH_COOKIE_NAME = "nfctron_user";

function readStoredUser(): AuthUser | undefined {
  const raw = getCookie(AUTH_COOKIE_NAME);
  if (!raw) return undefined;

  try {
    return JSON.parse(raw) as AuthUser;
  } catch {
    return undefined;
  }
}

export function useAuth() {
  // Lazy initializer reads the cookie once on mount so login survives a page reload.
  const [user, setUser] = useState<AuthUser | undefined>(readStoredUser);

  const login = async (credentials: LoginRequest) => {
    const response = await loginRequest(credentials);
    setCookie(AUTH_COOKIE_NAME, JSON.stringify(response.user));
    setUser(response.user);
    return response.user;
  };

  const logout = () => {
    removeCookie(AUTH_COOKIE_NAME);
    setUser(undefined);
  };

  return { user, isLoggedIn: !!user, login, logout };
}
