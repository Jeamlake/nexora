import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";
import type { AuthTokens } from "../../domain/repositories/AuthRepository";

const SESSION_KEY = "nexora.session.v1";

export async function readStoredSession(): Promise<AuthTokens | null> {
  const value =
    Platform.OS === "web"
      ? globalThis.localStorage?.getItem(SESSION_KEY)
      : await SecureStore.getItemAsync(SESSION_KEY);
  if (!value) {
    return null;
  }
  try {
    return JSON.parse(value) as AuthTokens;
  } catch {
    await clearStoredSession();
    return null;
  }
}

export async function saveStoredSession(tokens: AuthTokens): Promise<void> {
  const value = JSON.stringify(tokens);
  if (Platform.OS === "web") {
    globalThis.localStorage?.setItem(SESSION_KEY, value);
    return;
  }
  await SecureStore.setItemAsync(SESSION_KEY, value);
}

export async function clearStoredSession(): Promise<void> {
  if (Platform.OS === "web") {
    globalThis.localStorage?.removeItem(SESSION_KEY);
    return;
  }
  await SecureStore.deleteItemAsync(SESSION_KEY);
}
