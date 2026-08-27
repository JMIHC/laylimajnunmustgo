import { describe, expect, it } from "vitest";
import { GROUPS } from "../data/groups";
import { ROLES } from "../data/roles";
import { filterRoles } from "./filter";

describe("roles and groups", () => {
  it("has 19 roles in 3 groups", () => {
    expect(ROLES).toHaveLength(19);
    expect(Object.keys(GROUPS)).toEqual(["steno", "legal", "beyond"]);
    expect(ROLES.filter((r) => r.g === "steno")).toHaveLength(7);
    expect(ROLES.filter((r) => r.g === "legal")).toHaveLength(5);
    expect(ROLES.filter((r) => r.g === "beyond")).toHaveLength(7);
  });
});

describe("filterRoles", () => {
  it("returns all roles by default", () => {
    expect(filterRoles(ROLES, "all", false)).toHaveLength(19);
  });

  it("filters a group", () => {
    expect(filterRoles(ROLES, "legal", false)).toHaveLength(5);
  });

  it("keeps remote-friendly roles", () => {
    const remote = filterRoles(ROLES, "all", true);
    expect(remote.every((r) => r.remote)).toBe(true);
    expect(remote.length).toBe(17);
  });
});
