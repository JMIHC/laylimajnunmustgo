import { describe, expect, it } from "vitest";
import { ROLES } from "../data/roles";
import { slugFromTitle } from "./slug";

describe("slugFromTitle", () => {
  it("slugs the example title", () => {
    expect(slugFromTitle("Freelance deposition reporter")).toBe(
      "freelance-deposition-reporter",
    );
  });

  it("gives every role a unique slug", () => {
    const slugs = ROLES.map((role) => slugFromTitle(role.title));
    expect(slugs).toHaveLength(19);
    expect(new Set(slugs).size).toBe(19);
  });
});
