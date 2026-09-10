import type {
  AuthRepository,
  AuthTokens,
  Credentials,
} from "../repositories/AuthRepository";

export async function authenticateResident(
  repository: AuthRepository,
  credentials: Credentials,
): Promise<AuthTokens> {
  return repository.login({
    email: credentials.email.trim().toLowerCase(),
    password: credentials.password,
  });
}
