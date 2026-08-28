import { describe, expect, it } from "vitest";
import { CITIES, cityById } from "../data/cities";
import { ROLES } from "../data/roles";
import { jobLinksFor } from "./jobs";
import { indeedJobsSearch, jobBankSearch, linkedinJobsSearch } from "./links";

describe("job search urls", () => {
  it("builds https LinkedIn, Indeed, and Job Bank searches that include the city", () => {
    const li = linkedinJobsSearch("court reporter", "Monterey, California, United States");
    expect(li.startsWith("https://www.linkedin.com/jobs/search/")).toBe(true);
    expect(li).toContain("Monterey");
    expect(li).toContain("keywords=");
    expect(li).toContain("location=");

    const indeed = indeedJobsSearch("court reporter", "Monterey, CA");
    expect(indeed.startsWith("https://www.indeed.com/jobs")).toBe(true);
    expect(indeed).toContain("Monterey");

    const bank = jobBankSearch("court reporter", "Vancouver, BC");
    expect(bank.startsWith("https://www.jobbank.gc.ca/jobsearch/jobsearch")).toBe(true);
    expect(bank).toContain("Vancouver");
  });
});

describe("jobLinksFor", () => {
  const sample = ROLES.find((r) => r.title === "Freelance deposition reporter")!;
  const shop = ROLES.find((r) => r.title === "Court reporting agency owner")!;

  it("pairs Monterey with LinkedIn jobs and Indeed", () => {
    const links = jobLinksFor(sample, cityById("monterey"));
    expect(links.map((l) => l.label)).toEqual(["LinkedIn jobs", "Indeed"]);
    for (const link of links) {
      expect(link.href.startsWith("https://")).toBe(true);
      expect(link.href).toContain("Monterey");
    }
  });

  it("pairs Vancouver and Victoria with LinkedIn jobs and Job Bank", () => {
    for (const id of ["vancouver", "victoria"] as const) {
      const city = cityById(id);
      const links = jobLinksFor(sample, city);
      expect(links.map((l) => l.label)).toEqual(["LinkedIn jobs", "Job Bank"]);
      for (const link of links) {
        expect(link.href.startsWith("https://")).toBe(true);
        expect(link.href).toContain(city.label.split(",")[0]);
      }
    }
  });

  it("covers every remaining city and role with https city searches", () => {
    expect(CITIES.map((c) => c.id)).not.toContain("sf");
    for (const city of CITIES) {
      for (const role of ROLES.filter((r) => r.markets.includes(city.id))) {
        const links = jobLinksFor(role, city);
        expect(links.length).toBe(2);
        for (const link of links) {
          expect(link.href.startsWith("https://")).toBe(true);
          expect(link.href).toContain(city.label.split(",")[0]);
        }
      }
    }
    expect(shop.markets).toEqual(["vancouver"]);
  });
});
