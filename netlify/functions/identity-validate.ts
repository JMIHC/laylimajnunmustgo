import { isAllowedEmail } from "../../src/lib/allowlist";

type IdentityBody = { user?: { email?: string } };

export async function handler(event: { body: string | null }) {
  const payload = JSON.parse(event.body ?? "{}") as IdentityBody;
  if (!isAllowedEmail(payload.user?.email)) {
    return {
      statusCode: 403,
      body: JSON.stringify({ error: "This account is not on the list." }),
    };
  }
  return { statusCode: 200, body: JSON.stringify({}) };
}
