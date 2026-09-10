import type { ApiClient } from "../api-client";
import { HttpAuthRepository } from "../http-auth.repository";

describe("HttpAuthRepository", () => {
  it("mapea el contrato HTTP a entidades del dominio", async () => {
    const client = {
      get: jest.fn().mockResolvedValue({
        user: {
          id: "user-1",
          displayName: "María Residente",
          email: "residente@nexora.local",
          phone: null,
          role: "RESIDENT",
          isActive: true,
          createdAt: "2026-09-01T12:00:00.000Z",
          lastLoginAt: "2026-09-09T12:00:00.000Z",
        },
        residentId: "resident-1",
        status: "ACTIVE",
        condominium: { id: "condo-1", name: "Los Jardines" },
        unit: {
          id: "unit-1",
          code: "A-301",
          tower: "A",
          pavilion: null,
          block: null,
          floor: "3",
          isActive: true,
        },
        emergencyContacts: [
          {
            id: "contact-1",
            name: "Carlos",
            phone: "+51 900 000 201",
            relationship: "Hermano",
          },
        ],
      }),
    } as unknown as ApiClient;

    const profile = await new HttpAuthRepository(client).getProfile("access");

    expect(profile.condominium.name).toBe("Los Jardines");
    expect(profile.unit.location.floor).toBe("3");
    expect(profile.resident.emergencyContacts).toHaveLength(1);
  });
});
