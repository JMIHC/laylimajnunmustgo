import { isAllowedEmail } from "../../src/lib/allowlist";

type IdentityBody = {
  user?: { email?: string; app_metadata?: Record<string, unknown> };
};

export async function handler(event: { body: string | null }) {
  const payload = JSON.parse(event.body ?? "{}") as IdentityBody;
  const user = payload.user;
  if (!isAllowedEmail(user?.email)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "This account is not on the list." }),
    };
  }
  return {
    statusCode: 200,
    body: JSON.stringify({
      app_metadata: {
        ...(user?.app_metadata ?? {}),
        roles: ["allowed"],
      },
    }),
  };
}
