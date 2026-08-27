import { describe, expect, it } from "vitest";
import { ROLES } from "../data/roles";
import { avatarSVG, knownScenes } from "./avatars";

describe("avatarSVG", () => {
  it("draws an svg scene for every role", () => {
    const scenes = new Set(knownScenes());
    expect(scenes.size).toBe(19);
    for (const role of ROLES) {
      expect(scenes.has(role.scene)).toBe(true);
      const svg = avatarSVG(role, "var(--steno)");
      expect(svg).toContain("<svg");
      expect(svg).toContain("</svg>");
    }
  });
});
