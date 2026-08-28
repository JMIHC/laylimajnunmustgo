import { describe, expect, it } from "vitest";
import { ROLES } from "../data/roles";
import { slugFromTitle } from "./slug";

describe("slugFromTitle", () => {
  it("slugs the example title", () => {
    expect(slugFromTitle("Freelance deposition reporter")).toBe(
      "freelance-deposition-reporter",
    );
  });

  it("gives every role a unique scene and unique slug", () => {
    const slugs = ROLES.map((role) => slugFromTitle(role.title));
    const scenes = ROLES.map((role) => role.scene);
    expect(slugs).toHaveLength(31);
    expect(new Set(slugs).size).toBe(31);
    expect(new Set(scenes).size).toBe(31);
  });
});
