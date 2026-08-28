import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { resolveSession, signInWithGoogle } from "../lib/auth";

export function Login() {
  const navigate = useNavigate();
  const [phase, setPhase] = useState<"checking" | "ready" | "denied" | "error">("checking");
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    let live = true;
    void (async () => {
      const state = await resolveSession();
      if (!live) return;
      if (state === "allowed") {
        navigate("/", { replace: true });
        return;
      }
      if (state === "denied") {
        setPhase("denied");
        setMessage("That Google account is not on the list.");
        return;
      }
      setPhase("ready");
    })();
    return () => {
      live = false;
    };
  }, [navigate]);

  function onGoogle() {
    try {
      signInWithGoogle();
    } catch (error) {
      setPhase("error");
      setMessage(
        error instanceof Error ? error.message : "Google sign-in is not available yet.",
      );
    }
  }

  return (
    <div className="wrap login-page">
      <header>
        <p className="login-kicker">After the Courtroom</p>
        <h1>
          The record is <em>sealed.</em>
        </h1>
        <p className="lede">
          Sign in with a Google account on the list. Anyone else is turned away.
        </p>
      </header>
      {phase === "checking" ? (
        <p className="login-status">Checking the record…</p>
      ) : (
        <>
          <button type="button" className="google-btn" onClick={onGoogle}>
            Continue with Google
          </button>
          {message ? <p className="login-msg">{message}</p> : null}
        </>
      )}
    </div>
  );
}
