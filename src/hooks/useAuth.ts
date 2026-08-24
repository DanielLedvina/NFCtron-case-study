import { useCallback, useState } from "react";
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
  const [user, setUser] = useState<AuthUser | undefined>(readStoredUser);

  const login = useCallback(async (credentials: LoginRequest) => {
    const response = await loginRequest(credentials);
    setCookie(AUTH_COOKIE_NAME, JSON.stringify(response.user));
    setUser(response.user);
    return response.user;
  }, []);

  const logout = useCallback(() => {
    removeCookie(AUTH_COOKIE_NAME);
    setUser(undefined);
  }, []);

  return { user, isLoggedIn: !!user, login, logout };
}
