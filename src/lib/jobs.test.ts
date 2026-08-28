import { describe, expect, it } from "vitest";
import { CITIES, cityById } from "../data/cities";
import { ROLES } from "../data/roles";
import { canadaJobQuery, jobLinksFor, primaryJobHref } from "./jobs";
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
  const foia = ROLES.find((r) => r.title === "FOIA & public-records officer")!;
  const cart = ROLES.find((r) => r.title === "CART provider")!;
  const librarian = ROLES.find((r) => r.title === "Law librarian")!;

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
      expect(links[1]?.href).toContain("fna=1");
    }
  });

  it("uses a Canadian employer Job Bank query, not the US title or LinkedIn boolean", () => {
    for (const id of ["vancouver", "victoria"] as const) {
      const city = cityById(id);
      const bank = jobLinksFor(sample, cityById(id))[1]!.href;
      const decoded = decodeURIComponent(bank.replace(/\+/g, " "));
      expect(bank).toContain("jobbank.gc.ca");
      expect(bank).toContain("fna=1");
      expect(bank).toContain("fsrc=32");
      expect(bank).toContain(city.label.split(",")[0]);
      expect(new URL(bank).searchParams.get("searchstring")).toBe("court reporting agency");
      expect(decoded).toContain("court reporting agency");
      expect(bank).not.toContain("Freelance");
      expect(decoded).not.toContain("Freelance");
      expect(bank).not.toContain("OR");
      expect(sample.li).toContain("OR");
      expect(sample.li.toLowerCase()).toContain("court reporter");
    }
  });

  it("searches Job Bank for FOIA as Canadian access to information", () => {
    const bank = jobLinksFor(foia, cityById("vancouver"))[1]!.href;
    expect(new URL(bank).searchParams.get("searchstring")).toBe("access to information");
    expect(bank).not.toContain("FOIA");
  });

  it("searches Job Bank for CART as captioning in Victoria", () => {
    const bank = jobLinksFor(cart, cityById("victoria"))[1]!.href;
    expect(new URL(bank).searchParams.get("searchstring")).toBe("captioning");
    expect(bank).toContain("Victoria");
  });

  it("searches Job Bank for law librarian in Vancouver", () => {
    const bank = jobLinksFor(librarian, cityById("vancouver"))[1]!.href;
    expect(new URL(bank).searchParams.get("searchstring")).toBe("law librarian");
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
          const query = canadaJobQuery(role);
          expect(bank.startsWith("https://")).toBe(true);
          expect(bank).toContain("jobbank.gc.ca");
          expect(bank).toContain(city.label.split(",")[0]);
          expect(bank).toContain("fna=1");
          expect(new URL(bank).searchParams.get("searchstring")).toBe(query);
          if (role.title !== query) {
            expect(new URL(bank).searchParams.get("searchstring")).not.toBe(role.title);
          }
        }
      }
    }
    expect(shop.markets).toEqual(["vancouver"]);
  });
});

describe("primaryJobHref", () => {
  const sample = ROLES.find((r) => r.title === "Freelance deposition reporter")!;

  it("sends Monterey to Indeed with the US title and Canadian cities to Job Bank employers", () => {
    const monterey = primaryJobHref(sample, cityById("monterey"));
    const vancouver = primaryJobHref(sample, cityById("vancouver"));
    const victoria = primaryJobHref(sample, cityById("victoria"));

    expect(monterey).toContain("indeed.com");
    expect(monterey).toMatch(/Freelance(\+|%20)deposition(\+|%20)reporter/);
    expect(decodeURIComponent(monterey.replace(/\+/g, " "))).toContain(
      "Freelance deposition reporter",
    );

    expect(vancouver).toContain("jobbank.gc.ca");
    expect(victoria).toContain("jobbank.gc.ca");
    expect(new URL(vancouver).searchParams.get("searchstring")).toBe("court reporting agency");
    expect(new URL(victoria).searchParams.get("searchstring")).toBe("court reporting agency");
    expect(vancouver).not.toContain("Freelance");
    expect(vancouver).not.toContain("OR");
    expect(victoria).not.toContain("Freelance");
    expect(victoria).not.toContain("OR");
  });
});

describe("canadaJobQuery", () => {
  it("falls back to court reporting agency for an unknown scene", () => {
    const unknown = {
      ...ROLES[0]!,
      scene: "missing-scene",
      title: "Unmapped US title",
    };
    expect(canadaJobQuery(unknown)).toBe("court reporting agency");
    expect(canadaJobQuery(unknown)).not.toBe(unknown.title);
    expect(canadaJobQuery(unknown)).not.toBe(unknown.li);
  });
});
