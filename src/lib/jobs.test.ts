import { describe, expect, it } from "vitest";
import { agenciesForCity, OFFICIAL_REPORTERS_HREF } from "../data/agencies";
import { CITIES, cityById } from "../data/cities";
import { ROLES } from "../data/roles";
import { canadaJobQuery, isReportingRole, jobLinksFor, primaryJobHref } from "./jobs";
import { indeedCanadaJobsSearch, indeedJobsSearch, jobBankSearch, linkedinJobsSearch } from "./links";

describe("job search urls", () => {
  it("builds https LinkedIn, Indeed, Indeed Canada, and Job Bank searches that include the city", () => {
    const li = linkedinJobsSearch("court reporter", "Monterey, California, United States");
    expect(li.startsWith("https://www.linkedin.com/jobs/search/")).toBe(true);
    expect(li).toContain("Monterey");
    expect(li).toContain("keywords=");
    expect(li).toContain("location=");

    const indeed = indeedJobsSearch("court reporter", "Monterey, CA");
    expect(indeed.startsWith("https://www.indeed.com/jobs")).toBe(true);
    expect(indeed).toContain("Monterey");

    const ca = indeedCanadaJobsSearch("paralegal", "Vancouver, BC");
    expect(ca.startsWith("https://ca.indeed.com/jobs")).toBe(true);
    expect(ca).toContain("Vancouver");
    expect(new URL(ca).searchParams.get("q")).toBe("paralegal");

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
  const paralegal = ROLES.find((r) => r.title === "Litigation paralegal")!;

  it("pairs Monterey freelance deposition with LinkedIn and Indeed US", () => {
    const links = jobLinksFor(sample, cityById("monterey"));
    expect(links.map((l) => l.label)).toEqual(["LinkedIn jobs", "Indeed"]);
    expect(links[1]!.href).toContain("indeed.com");
    expect(links[1]!.href).not.toContain("ca.indeed.com");
    for (const link of links) {
      expect(link.href.startsWith("https://")).toBe(true);
      expect(link.href).toContain("Monterey");
    }
  });

  it("lists verified Vancouver agencies for a freelance deposition reporter", () => {
    const city = cityById("vancouver");
    const links = jobLinksFor(sample, city);
    expect(isReportingRole(sample)).toBe(true);
    expect(links.map((l) => l.label)).toEqual([
      "Veritext",
      "Collos & Company",
      "Pacific Court Reporting",
      "Accurate Realtime",
      "BCSRA",
    ]);
    expect(links).toEqual(agenciesForCity("vancouver"));
    expect(links.map((l) => l.href).join(" ")).not.toContain("jobbank.gc.ca");
    expect(links.map((l) => l.label).join(" ")).not.toContain("22Keys");
  });

  it("lists verified Victoria agencies for a freelance deposition reporter", () => {
    const links = jobLinksFor(sample, cityById("victoria"));
    expect(links.map((l) => l.label)).toEqual(["Veritext", "JML Court Reporters", "BCSRA"]);
    expect(links.map((l) => l.label)).not.toContain("22Keys");
    expect(links.map((l) => l.href).join(" ")).not.toContain("jobbank.gc.ca");
  });

  it("pairs FOIA in Vancouver with LinkedIn and Indeed Canada", () => {
    const links = jobLinksFor(foia, cityById("vancouver"));
    expect(links.map((l) => l.label)).toEqual(["LinkedIn jobs", "Indeed"]);
    expect(links[1]!.href.startsWith("https://ca.indeed.com/jobs")).toBe(true);
    expect(new URL(links[1]!.href).searchParams.get("q")).toBe("access to information");
    expect(links[0]!.href).toContain("linkedin.com");
    expect(links.map((l) => l.href).join(" ")).not.toContain("jobbank.gc.ca");
  });

  it("keeps CART in Victoria on the official-reporter and agency path, not Indeed", () => {
    const city = cityById("victoria");
    expect(isReportingRole(cart)).toBe(true);
    expect(primaryJobHref(cart, city)).toBe(OFFICIAL_REPORTERS_HREF);
    const links = jobLinksFor(cart, city);
    expect(links.map((l) => l.label)).toEqual(["Veritext", "JML Court Reporters", "BCSRA"]);
    expect(links.map((l) => l.href).join(" ")).not.toContain("indeed.com");
    expect(links.map((l) => l.href).join(" ")).not.toContain("jobbank.gc.ca");
  });

  it("pairs a Vancouver litigation paralegal with Indeed Canada and LinkedIn, not agencies", () => {
    const links = jobLinksFor(paralegal, cityById("vancouver"));
    expect(isReportingRole(paralegal)).toBe(false);
    expect(links.map((l) => l.label)).toEqual(["LinkedIn jobs", "Indeed"]);
    expect(links[1]!.href.startsWith("https://ca.indeed.com/jobs")).toBe(true);
    expect(new URL(links[1]!.href).searchParams.get("q")).toBe("paralegal");
    expect(links.map((l) => l.label)).not.toContain("Veritext");
    expect(links.map((l) => l.href).join(" ")).not.toContain("jobbank.gc.ca");
  });

  it("covers every city and role with http(s) links and no Job Bank on Canada rows", () => {
    expect(CITIES.map((c) => c.id)).not.toContain("sf");
    for (const city of CITIES) {
      for (const role of ROLES.filter((r) => r.markets.includes(city.id))) {
        const primary = primaryJobHref(role, city);
        const links = jobLinksFor(role, city);
        expect(links.length).toBeGreaterThan(0);
        expect(primary.startsWith("https://")).toBe(true);
        for (const link of links) {
          expect(link.href.startsWith("http://") || link.href.startsWith("https://")).toBe(true);
          if (link.href.startsWith("http://")) {
            expect(link.href).toBe("http://pacificreporting.ca/");
          }
        }
        if (city.id !== "monterey") {
          expect(primary).not.toContain("jobbank.gc.ca");
          for (const link of links) {
            expect(link.href).not.toContain("jobbank.gc.ca");
          }
        }
      }
    }
    expect(shop.markets).toEqual(["vancouver"]);
  });
});

describe("primaryJobHref", () => {
  const sample = ROLES.find((r) => r.title === "Freelance deposition reporter")!;
  const foia = ROLES.find((r) => r.title === "FOIA & public-records officer")!;

  it("sends Monterey freelance deposition to Indeed US", () => {
    const monterey = primaryJobHref(sample, cityById("monterey"));
    expect(monterey).toContain("indeed.com");
    expect(monterey).not.toContain("ca.indeed.com");
    expect(monterey).toMatch(/Freelance(\+|%20)deposition(\+|%20)reporter/);
    expect(decodeURIComponent(monterey.replace(/\+/g, " "))).toContain(
      "Freelance deposition reporter",
    );
  });

  it("sends Canadian reporting roles to the official-reporter path", () => {
    expect(primaryJobHref(sample, cityById("vancouver"))).toBe(OFFICIAL_REPORTERS_HREF);
    expect(primaryJobHref(sample, cityById("victoria"))).toBe(OFFICIAL_REPORTERS_HREF);
  });

  it("sends FOIA in Vancouver to Indeed Canada with access to information", () => {
    const href = primaryJobHref(foia, cityById("vancouver"));
    expect(href.startsWith("https://ca.indeed.com/jobs")).toBe(true);
    expect(new URL(href).searchParams.get("q")).toBe("access to information");
    expect(href).toContain("Vancouver");
    expect(href).not.toContain("jobbank.gc.ca");
    expect(href).not.toContain("FOIA");
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
