import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router";
import { resolveSession } from "../lib/auth";

export function RequireAuth() {
  const [state, setState] = useState<"loading" | "in" | "out">("loading");

  useEffect(() => {
    let live = true;
    void (async () => {
      const session = await resolveSession();
      if (!live) return;
      setState(session === "allowed" ? "in" : "out");
    })();
    return () => {
      live = false;
    };
  }, []);

  if (state === "loading") {
    return (
      <div className="wrap login-page">
        <p className="login-status">Checking the record…</p>
      </div>
    );
  }

  if (state === "out") return <Navigate to="/login" replace />;
  return <Outlet />;
}
