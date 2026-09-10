import type { AuthRepository } from "../../repositories/AuthRepository";
import { authenticateResident } from "../authenticate-resident";

describe("authenticateResident", () => {
  it("normaliza el correo antes de enviarlo al repositorio", async () => {
    const login = jest.fn().mockResolvedValue({
      accessToken: "access",
      refreshToken: "refresh",
      expiresIn: 900,
    });
    const repository = { login } as unknown as AuthRepository;

    await authenticateResident(repository, {
      email: "  Residente@Nexora.Local ",
      password: "Nexora2026!",
    });

    expect(login).toHaveBeenCalledWith({
      email: "residente@nexora.local",
      password: "Nexora2026!",
    });
  });
});
