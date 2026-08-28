import { useState } from "react";
import { logout } from "../lib/auth";

export function SignOut() {
  const [busy, setBusy] = useState(false);

  async function onClick() {
    setBusy(true);
    try {
      await logout();
    } catch {
      // Still leave the gated pages.
    }
    window.location.assign("/login");
  }

  return (
    <button type="button" className="sign-out" onClick={() => void onClick()} disabled={busy}>
      {busy ? "Signing out…" : "Sign out"}
    </button>
  );
}
