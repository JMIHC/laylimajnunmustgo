import { describe, expect, it } from "vitest";
import { GROUPS } from "../data/groups";
import { ROLES } from "../data/roles";
import { filterRoles } from "./filter";

describe("roles and groups", () => {
  it("has 19 past and 12 next roles in 3 groups", () => {
    expect(ROLES).toHaveLength(31);
    expect(Object.keys(GROUPS)).toEqual(["steno", "legal", "beyond"]);
    const past = ROLES.filter((r) => r.deck === "past");
    const next = ROLES.filter((r) => r.deck === "next");
    expect(past).toHaveLength(19);
    expect(next).toHaveLength(12);
    expect(past.filter((r) => r.g === "steno")).toHaveLength(7);
    expect(past.filter((r) => r.g === "legal")).toHaveLength(5);
    expect(past.filter((r) => r.g === "beyond")).toHaveLength(7);
    expect(next.filter((r) => r.g === "steno")).toHaveLength(4);
    expect(next.filter((r) => r.g === "legal")).toHaveLength(4);
    expect(next.filter((r) => r.g === "beyond")).toHaveLength(4);
  });
});

describe("filterRoles", () => {
  it("filters by deck", () => {
    expect(filterRoles(ROLES, "past", "all", false)).toHaveLength(19);
    expect(filterRoles(ROLES, "next", "all", false)).toHaveLength(12);
    expect(filterRoles(ROLES, "past", "all", false).every((r) => r.deck === "past")).toBe(true);
    expect(filterRoles(ROLES, "next", "all", false).every((r) => r.deck === "next")).toBe(true);
  });

  it("filters a group within a deck", () => {
    expect(filterRoles(ROLES, "past", "legal", false)).toHaveLength(5);
    expect(filterRoles(ROLES, "next", "legal", false)).toHaveLength(4);
  });

  it("keeps remote-friendly roles in the active deck", () => {
    const pastRemote = ROLES.filter((r) => r.deck === "past" && r.remote).length;
    const nextRemote = ROLES.filter((r) => r.deck === "next" && r.remote).length;
    const past = filterRoles(ROLES, "past", "all", true);
    const next = filterRoles(ROLES, "next", "all", true);
    expect(past.every((r) => r.remote && r.deck === "past")).toBe(true);
    expect(next.every((r) => r.remote && r.deck === "next")).toBe(true);
    expect(past).toHaveLength(pastRemote);
    expect(next).toHaveLength(nextRemote);
  });
});
