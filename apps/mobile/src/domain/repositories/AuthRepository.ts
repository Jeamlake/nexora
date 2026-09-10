import type { ResidentProfile } from "../entities/ResidentProfile";

export interface Credentials {
  email: string;
  password: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

export interface AuthRepository {
  login(credentials: Credentials): Promise<AuthTokens>;
  refresh(refreshToken: string): Promise<AuthTokens>;
  logout(accessToken: string): Promise<void>;
  getProfile(accessToken: string): Promise<ResidentProfile>;
}
