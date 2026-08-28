export const ALLOWED_EMAILS = [
  "jcornyn@gmail.com",
  "laylielena@gmail.com",
] as const;

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return (ALLOWED_EMAILS as readonly string[]).includes(email.trim().toLowerCase());
}
