import {
  createContext,
  type PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { ApiClient } from "../../data/api/api-client";
import { ApiError } from "../../data/api/api-error";
import { HttpAuthRepository } from "../../data/api/http-auth.repository";
import {
  clearStoredSession,
  readStoredSession,
  saveStoredSession,
} from "../../data/storage/session-storage";
import type { ResidentProfile } from "../../domain/entities/ResidentProfile";
import type {
  AuthTokens,
  Credentials,
} from "../../domain/repositories/AuthRepository";
import { authenticateResident } from "../../domain/use-cases/authenticate-resident";
import { loadResidentProfile } from "../../domain/use-cases/load-resident-profile";

interface SessionContextValue {
  isAuthenticated: boolean;
  isRestoring: boolean;
  isBusy: boolean;
  profile: ResidentProfile | null;
  error: string | null;
  signIn(credentials: Credentials): Promise<void>;
  signOut(): Promise<void>;
  retry(): Promise<void>;
}

const SessionContext = createContext<SessionContextValue | null>(null);
const repository = new HttpAuthRepository(new ApiClient());

export function SessionProvider({ children }: PropsWithChildren) {
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [profile, setProfile] = useState<ResidentProfile | null>(null);
  const [isRestoring, setIsRestoring] = useState(true);
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProfile = useCallback(async (currentTokens: AuthTokens) => {
    try {
      const loadedProfile = await loadResidentProfile(
        repository,
        currentTokens.accessToken,
      );
      setProfile(loadedProfile);
      setError(null);
      return currentTokens;
    } catch (loadError: unknown) {
      if (!(loadError instanceof ApiError) || !loadError.isUnauthorized) {
        throw loadError;
      }
      const renewedTokens = await repository.refresh(
        currentTokens.refreshToken,
      );
      await saveStoredSession(renewedTokens);
      setTokens(renewedTokens);
      const loadedProfile = await loadResidentProfile(
        repository,
        renewedTokens.accessToken,
      );
      setProfile(loadedProfile);
      setError(null);
      return renewedTokens;
    }
  }, []);

  useEffect(() => {
    let active = true;
    async function restore(): Promise<void> {
      const storedTokens = await readStoredSession();
      if (!active) return;
      if (!storedTokens) {
        setIsRestoring(false);
        return;
      }
      setTokens(storedTokens);
      try {
        await loadProfile(storedTokens);
      } catch (restoreError: unknown) {
        if (restoreError instanceof ApiError && restoreError.isUnauthorized) {
          await clearStoredSession();
          if (active) setTokens(null);
        }
        if (active) setError(readMessage(restoreError));
      } finally {
        if (active) setIsRestoring(false);
      }
    }
    void restore();
    return () => {
      active = false;
    };
  }, [loadProfile]);

  const signIn = useCallback(
    async (credentials: Credentials) => {
      setIsBusy(true);
      setError(null);
      try {
        const nextTokens = await authenticateResident(repository, credentials);
        await saveStoredSession(nextTokens);
        setTokens(nextTokens);
        await loadProfile(nextTokens);
      } catch (signInError: unknown) {
        if (signInError instanceof ApiError && signInError.isUnauthorized) {
          await clearStoredSession();
          setTokens(null);
          setProfile(null);
        }
        setError(readMessage(signInError));
        throw signInError;
      } finally {
        setIsBusy(false);
      }
    },
    [loadProfile],
  );

  const signOut = useCallback(async () => {
    setIsBusy(true);
    const currentTokens = tokens;
    try {
      if (currentTokens) await repository.logout(currentTokens.accessToken);
    } catch {
      // El cierre local siempre debe completarse aunque la API no esté disponible.
    } finally {
      await clearStoredSession();
      setTokens(null);
      setProfile(null);
      setError(null);
      setIsBusy(false);
    }
  }, [tokens]);

  const retry = useCallback(async () => {
    if (!tokens) return;
    setIsBusy(true);
    try {
      await loadProfile(tokens);
    } catch (retryError: unknown) {
      if (retryError instanceof ApiError && retryError.isUnauthorized) {
        await clearStoredSession();
        setTokens(null);
        setProfile(null);
      }
      setError(readMessage(retryError));
    } finally {
      setIsBusy(false);
    }
  }, [loadProfile, tokens]);

  const value = useMemo<SessionContextValue>(
    () => ({
      isAuthenticated: Boolean(tokens),
      isRestoring,
      isBusy,
      profile,
      error,
      signIn,
      signOut,
      retry,
    }),
    [error, isBusy, isRestoring, profile, retry, signIn, signOut, tokens],
  );

  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}

export function useSession(): SessionContextValue {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSession debe utilizarse dentro de SessionProvider.");
  }
  return context;
}

function readMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Ocurrió un error inesperado. Inténtalo nuevamente.";
}
