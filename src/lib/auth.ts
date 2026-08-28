import { getUser, handleAuthCallback, logout, oauthLogin, type User } from "@netlify/identity";
import { isAllowedEmail } from "./allowlist";

export type SessionState = "allowed" | "denied" | "none";

export { getUser, logout };

export function isAllowedUser(user: User | null | undefined): boolean {
  return isAllowedEmail(user?.email);
}

export async function resolveSession(): Promise<SessionState> {
  let sawOAuth = false;
  try {
    const result = await handleAuthCallback();
    sawOAuth = result?.type === "oauth";
  } catch {
    // No hash, or the token exchange failed.
  }

  const user = await getUser();
  if (!user) return sawOAuth ? "denied" : "none";

  if (!isAllowedUser(user)) {
    try {
      await logout();
    } catch {
      // Identity may be missing in local Vite; still treat as denied.
    }
    return "denied";
  }

  return "allowed";
}

export function signInWithGoogle(): void {
  oauthLogin("google");
}
