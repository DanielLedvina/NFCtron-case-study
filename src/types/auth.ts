export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthUser {
  firstName: string;
  lastName: string;
  email: string;
}

export interface LoginResponse {
  message: string;
  user: AuthUser;
}
