import { describe, expect, it } from "vitest";
import { agenciesForCity, OFFICIAL_REPORTERS_HREF } from "./agencies";

describe("agenciesForCity", () => {
  it("lists the verified Vancouver shops plus BCSRA", () => {
    const labels = agenciesForCity("vancouver").map((a) => a.label);
    expect(labels).toEqual([
      "Veritext",
      "Collos & Company",
      "Pacific Court Reporting",
      "Accurate Realtime",
      "BCSRA",
    ]);
    expect(labels).not.toContain("22Keys");
  });

  it("lists the verified Victoria shops plus BCSRA", () => {
    const labels = agenciesForCity("victoria").map((a) => a.label);
    expect(labels).toEqual(["Veritext", "JML Court Reporters", "BCSRA"]);
    expect(labels).not.toContain("22Keys");
  });

  it("does not invent Monterey agencies", () => {
    expect(agenciesForCity("monterey")).toEqual([]);
  });

  it("uses the BC official-reporter path", () => {
    expect(OFFICIAL_REPORTERS_HREF).toBe(
      "https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-reporters",
    );
  });
});
