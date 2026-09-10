import { Platform } from "react-native";
import { ApiError } from "./api-error";

interface RequestOptions {
  body?: unknown;
  token?: string;
}

interface ErrorBody {
  message?: string | string[];
}

const REQUEST_TIMEOUT_MS = 10_000;

export class ApiClient {
  private readonly baseUrl: string;

  public constructor(baseUrl = resolveApiUrl()) {
    this.baseUrl = baseUrl.replace(/\/$/, "");
  }

  public get<T>(path: string, token?: string): Promise<T> {
    return this.request<T>("GET", path, { token });
  }

  public post<T>(path: string, body: unknown, token?: string): Promise<T> {
    return this.request<T>("POST", path, { body, token });
  }

  private async request<T>(
    method: "GET" | "POST",
    path: string,
    options: RequestOptions,
  ): Promise<T> {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    try {
      const response = await fetch(`${this.baseUrl}${path}`, {
        method,
        headers: {
          Accept: "application/json",
          ...(options.body ? { "Content-Type": "application/json" } : {}),
          ...(options.token
            ? { Authorization: `Bearer ${options.token}` }
            : {}),
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        signal: controller.signal,
      });
      const body = (await response.json().catch(() => null)) as
        T | ErrorBody | null;
      if (!response.ok) {
        throw new ApiError(readErrorMessage(body), response.status);
      }
      return body as T;
    } catch (error: unknown) {
      if (error instanceof ApiError) {
        throw error;
      }
      if (error instanceof Error && error.name === "AbortError") {
        throw new ApiError("La API tardó demasiado en responder.", null);
      }
      throw new ApiError(
        "No se pudo conectar con la API. Comprueba la URL y que el servidor esté activo.",
        null,
      );
    } finally {
      clearTimeout(timeout);
    }
  }
}

function resolveApiUrl(): string {
  const configuredUrl =
    process.env.EXPO_PUBLIC_API_URL ?? "http://localhost:3000/api/v1";
  if (Platform.OS === "android") {
    return configuredUrl.replace("://localhost", "://10.0.2.2");
  }
  return configuredUrl;
}

function readErrorMessage(body: unknown): string {
  if (!body || typeof body !== "object" || !("message" in body)) {
    return "La API devolvió una respuesta inesperada.";
  }
  const message = (body as ErrorBody).message;
  return Array.isArray(message)
    ? message.join(" ")
    : (message ?? "Error de API.");
}
