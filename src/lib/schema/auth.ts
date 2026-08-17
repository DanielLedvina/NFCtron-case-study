import * as z from "zod";

export const loginRequest = z.object({
  email: z.string(),
  password: z.string(),
});

export const authUser = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string(),
});

export const loginResponse = z.object({
  message: z.string(),
  user: authUser,
});

export type LoginRequest = z.infer<typeof loginRequest>;
export type AuthUser = z.infer<typeof authUser>;
export type LoginResponse = z.infer<typeof loginResponse>;
