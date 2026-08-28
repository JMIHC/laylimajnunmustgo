import { describe, expect, it } from "vitest";
import { CITIES, cityById } from "../data/cities";
import { ROLES } from "../data/roles";
import { jobLinksFor, primaryJobHref } from "./jobs";
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
    expect(bank).toContain("fsrc=32");
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

  it("pairs Vancouver and Victoria with LinkedIn jobs and Job Bank for foreign candidates", () => {
    for (const id of ["vancouver", "victoria"] as const) {
      const city = cityById(id);
      const links = jobLinksFor(sample, city);
      expect(links.map((l) => l.label)).toEqual(["LinkedIn jobs", "Job Bank (outside Canada)"]);
      for (const link of links) {
        expect(link.href.startsWith("https://")).toBe(true);
        expect(link.href).toContain(city.label.split(",")[0]);
      }
      expect(links[1]?.href).toContain("fsrc=32");
    }
  });

  it("uses a Job Bank title query, not the LinkedIn boolean", () => {
    const bank = jobLinksFor(sample, cityById("vancouver"))[1]!.href;
    const decoded = decodeURIComponent(bank.replace(/\+/g, " "));
    expect(bank).toMatch(/Freelance(\+|%20)deposition(\+|%20)reporter/);
    expect(decoded).toContain("Freelance deposition reporter");
    expect(bank).not.toContain("OR");
    expect(decoded.toLowerCase()).not.toContain("court reporter");
    expect(sample.li).toContain("OR");
    expect(sample.li.toLowerCase()).toContain("court reporter");
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
        if (city.id !== "monterey") {
          const bank = links[1]!.href;
          expect(bank).toContain("jobbank.gc.ca");
          expect(decodeURIComponent(bank.replace(/\+/g, " "))).toContain(role.title);
          expect(new URL(bank).searchParams.get("searchstring")).toBe(role.title);
        }
      }
    }
    expect(shop.markets).toEqual(["vancouver"]);
  });
});

describe("primaryJobHref", () => {
  const sample = ROLES.find((r) => r.title === "Freelance deposition reporter")!;

  it("sends Monterey to Indeed and Canadian cities to Job Bank", () => {
    const monterey = primaryJobHref(sample, cityById("monterey"));
    const vancouver = primaryJobHref(sample, cityById("vancouver"));
    const victoria = primaryJobHref(sample, cityById("victoria"));

    expect(monterey).toContain("indeed.com");
    expect(vancouver).toContain("jobbank.gc.ca");
    expect(victoria).toContain("jobbank.gc.ca");
    expect(vancouver).toMatch(/Freelance(\+|%20)deposition(\+|%20)reporter/);
    expect(decodeURIComponent(vancouver.replace(/\+/g, " "))).toContain(
      "Freelance deposition reporter",
    );
    expect(vancouver).not.toContain("OR");
  });
});
