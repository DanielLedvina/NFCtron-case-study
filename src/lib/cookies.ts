export function getCookie(name: string): string | undefined {
  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  return match ? decodeURIComponent(match.split("=").slice(1).join("=")) : undefined;
}

export function setCookie(name: string, value: string, maxAgeDays = 7) {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAgeDays * 24 * 60 * 60}; samesite=lax`;
}

export function removeCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
}
