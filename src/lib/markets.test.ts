import { describe, expect, it } from "vitest";
import { CITIES } from "../data/cities";
import { ROLES } from "../data/roles";
import type { CityId } from "../data/types";
import { citiesForRole, rolesForCity } from "./markets";

const CITY_IDS: CityId[] = ["sf", "monterey", "vancouver", "victoria"];

describe("cities", () => {
  it("lists the four west-coast markets", () => {
    expect(CITIES.map((c) => c.id)).toEqual(CITY_IDS);
    expect(CITIES.map((c) => c.region)).toEqual([
      "California",
      "California",
      "British Columbia",
      "British Columbia",
    ]);
  });
});

describe("role markets", () => {
  it("puts every role on at least one of sf or vancouver", () => {
    for (const role of ROLES) {
      expect(
        role.markets.includes("sf") || role.markets.includes("vancouver"),
        role.title,
      ).toBe(true);
    }
  });

  it("keeps agency-owner and trial-tech shops off Monterey and Victoria", () => {
    const shops = ROLES.filter((r) =>
      r.title === "Court reporting agency owner" ||
      r.title === "Trial presentation & litigation support",
    );
    expect(shops).toHaveLength(2);
    for (const role of shops) {
      expect(role.markets).toEqual(["sf", "vancouver"]);
    }
  });

  it("assigns coastal and remote-capable roles to Monterey", () => {
    const titles = rolesForCity(ROLES, "monterey").map((r) => r.title);
    expect(titles).toContain("Freelance deposition reporter");
    expect(titles).toContain("Hearing & legislative reporter");
    expect(titles).toContain("Court administrator / operations");
    expect(titles).toContain("Scopist & transcript proofreader");
    expect(titles).toContain("CART provider");
    expect(titles).toContain("Voice writer");
    expect(titles).toContain("Legal transcription & e-discovery");
    expect(titles).toContain("Court reporting instructor");
    expect(titles).toContain("Oral historian");
    expect(titles).toContain("Contract specialist");
    expect(titles).toContain("Insurance claims examiner");
    expect(titles).toContain("Grant writer");
    expect(titles).toContain("Records & information manager");
    expect(titles).not.toContain("Court reporting agency owner");
    expect(titles).not.toContain("Trial presentation & litigation support");
  });

  it("assigns capital-city and remote roles to Victoria", () => {
    const titles = rolesForCity(ROLES, "victoria").map((r) => r.title);
    expect(titles).toContain("Hearing & legislative reporter");
    expect(titles).toContain("Court administrator / operations");
    expect(titles).toContain("Litigation paralegal");
    expect(titles).toContain("Law librarian");
    expect(titles).toContain("FOIA & public-records officer");
    expect(titles).toContain("Grant writer");
    expect(titles).toContain("Contract specialist");
    expect(titles).toContain("Records & information manager");
    expect(titles).toContain("Legal operations manager");
    expect(titles).toContain("Legal transcription & e-discovery");
    expect(titles).toContain("Voice writer");
    expect(titles).not.toContain("Court reporting agency owner");
    expect(titles).not.toContain("Trial presentation & litigation support");
  });
});

describe("rolesForCity", () => {
  it("returns only roles assigned to that city", () => {
    for (const id of CITY_IDS) {
      const found = rolesForCity(ROLES, id);
      expect(found.length).toBeGreaterThan(0);
      expect(found.every((r) => r.markets.includes(id))).toBe(true);
    }
  });
});

describe("citiesForRole", () => {
  it("returns city records in CITIES order", () => {
    const role = ROLES.find((r) => r.title === "Freelance deposition reporter");
    expect(role).toBeTruthy();
    const cities = citiesForRole(role!);
    expect(cities.map((c) => c.id)).toEqual(
      CITIES.filter((c) => role!.markets.includes(c.id)).map((c) => c.id),
    );
  });

  it("returns only the large markets for shop roles", () => {
    const role = ROLES.find((r) => r.title === "Court reporting agency owner");
    expect(role).toBeTruthy();
    expect(citiesForRole(role!).map((c) => c.id)).toEqual(["sf", "vancouver"]);
  });
});
