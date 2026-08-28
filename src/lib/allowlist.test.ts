import { describe, expect, it } from "vitest";
import { isAllowedEmail } from "./allowlist";

describe("isAllowedEmail", () => {
  it("allows the two listed Gmail accounts, case-insensitive", () => {
    expect(isAllowedEmail("jcornyn@gmail.com")).toBe(true);
    expect(isAllowedEmail("laylielena@gmail.com")).toBe(true);
    expect(isAllowedEmail("JCornyn@Gmail.com")).toBe(true);
  });

  it("rejects everyone else", () => {
    expect(isAllowedEmail("johnnycornyn@gmail.com")).toBe(false);
    expect(isAllowedEmail("someone@example.com")).toBe(false);
    expect(isAllowedEmail("")).toBe(false);
    expect(isAllowedEmail(undefined)).toBe(false);
  });
});
