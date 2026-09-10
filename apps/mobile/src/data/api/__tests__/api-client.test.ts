import { ApiClient } from "../api-client";

describe("ApiClient", () => {
  const originalFetch = globalThis.fetch;

  afterEach(() => {
    globalThis.fetch = originalFetch;
    jest.restoreAllMocks();
  });

  it("envía el bearer token y devuelve JSON", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue({ id: "perfil-1" }),
    }) as jest.Mock;
    const client = new ApiClient("http://localhost:3000/api/v1/");

    await expect(client.get("/profile/me", "token-1")).resolves.toEqual({
      id: "perfil-1",
    });
    expect(globalThis.fetch).toHaveBeenCalledWith(
      "http://localhost:3000/api/v1/profile/me",
      expect.objectContaining({
        method: "GET",
        headers: expect.objectContaining({ Authorization: "Bearer token-1" }),
      }),
    );
  });

  it("convierte el error HTTP al tipo de dominio de red", async () => {
    globalThis.fetch = jest.fn().mockResolvedValue({
      ok: false,
      status: 401,
      json: jest.fn().mockResolvedValue({ message: "Sesión vencida." }),
    }) as jest.Mock;
    const client = new ApiClient("http://localhost:3000/api/v1");

    await expect(client.get("/profile/me")).rejects.toEqual(
      expect.objectContaining({
        name: "ApiError",
        message: "Sesión vencida.",
        status: 401,
      }),
    );
  });
});
