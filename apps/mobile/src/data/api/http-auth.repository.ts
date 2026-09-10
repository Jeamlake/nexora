import { Resident } from "../../domain/entities/Resident";
import type { ResidentProfile } from "../../domain/entities/ResidentProfile";
import type { UserRole } from "../../domain/entities/User";
import type {
  AuthRepository,
  AuthTokens,
  Credentials,
} from "../../domain/repositories/AuthRepository";
import { ApiClient } from "./api-client";

interface SessionDto extends AuthTokens {
  user: {
    id: string;
    displayName: string;
    email: string;
    role: UserRole;
  };
}

interface ProfileDto {
  user: {
    id: string;
    displayName: string;
    email: string;
    phone: string | null;
    role: UserRole;
    isActive: boolean;
    createdAt: string;
    lastLoginAt: string | null;
  };
  residentId: string;
  status: "ACTIVE" | "INACTIVE";
  condominium: { id: string; name: string };
  unit: {
    id: string;
    code: string;
    tower: string | null;
    pavilion: string | null;
    block: string | null;
    floor: string | null;
    isActive: boolean;
  };
  emergencyContacts: {
    id: string;
    name: string;
    phone: string;
    relationship: string;
  }[];
}

export class HttpAuthRepository implements AuthRepository {
  public constructor(private readonly client: ApiClient) {}

  public async login(credentials: Credentials): Promise<AuthTokens> {
    return toTokens(
      await this.client.post<SessionDto>("/auth/login", credentials),
    );
  }

  public async refresh(refreshToken: string): Promise<AuthTokens> {
    return toTokens(
      await this.client.post<SessionDto>("/auth/refresh", { refreshToken }),
    );
  }

  public async logout(accessToken: string): Promise<void> {
    await this.client.post("/auth/logout", {}, accessToken);
  }

  public async getProfile(accessToken: string): Promise<ResidentProfile> {
    const dto = await this.client.get<ProfileDto>("/profile/me", accessToken);
    const contacts = dto.emergencyContacts.map((contact) => ({ ...contact }));
    return {
      user: {
        id: dto.user.id,
        displayName: dto.user.displayName,
        email: dto.user.email,
        phone: dto.user.phone ?? undefined,
        role: dto.user.role,
        isActive: dto.user.isActive,
        createdAt: dto.user.createdAt,
        lastLoginAt: dto.user.lastLoginAt ?? undefined,
      },
      resident: new Resident({
        id: dto.residentId,
        userId: dto.user.id,
        unitId: dto.unit.id,
        status: dto.status,
        emergencyContacts: contacts,
      }),
      condominium: dto.condominium,
      unit: {
        id: dto.unit.id,
        code: dto.unit.code,
        isActive: dto.unit.isActive,
        location: {
          tower: dto.unit.tower ?? undefined,
          pavilion: dto.unit.pavilion ?? undefined,
          block: dto.unit.block ?? undefined,
          floor: dto.unit.floor ?? undefined,
        },
      },
    };
  }
}

function toTokens(session: SessionDto): AuthTokens {
  return {
    accessToken: session.accessToken,
    refreshToken: session.refreshToken,
    expiresIn: session.expiresIn,
  };
}
