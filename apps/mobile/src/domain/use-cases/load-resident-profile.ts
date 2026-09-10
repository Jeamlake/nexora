import type { ResidentProfile } from "../entities/ResidentProfile";
import type { AuthRepository } from "../repositories/AuthRepository";

export function loadResidentProfile(
  repository: AuthRepository,
  accessToken: string,
): Promise<ResidentProfile> {
  return repository.getProfile(accessToken);
}
