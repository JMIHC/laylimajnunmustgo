import { describe, expect, it } from "vitest";
import { indeedCanadaJobsSearch, indeedJobsSearch, jobBankSearch, linkedinJobsSearch, linkedinPeopleSearch, webSearch } from "./links";

describe("search links", () => {
  it("uses LinkedIn people search with US geoUrn", () => {
    const url = linkedinPeopleSearch('"deposition reporter"');
    expect(url.startsWith("https://www.linkedin.com/search/results/people/")).toBe(true);
    expect(url).toContain("geoUrn=");
    expect(url).toContain(encodeURIComponent('["103644278"]'));
    expect(url).toContain("keywords=");
  });

  it("builds a Google web search", () => {
    const url = webSearch("freelance deposition reporter remote");
    expect(url.startsWith("https://www.google.com/search?q=")).toBe(true);
    expect(url).toContain(encodeURIComponent("freelance deposition reporter remote"));
  });
});

describe("job board searches", () => {
  it("builds https job searches that include the city", () => {
    const li = linkedinJobsSearch('"deposition reporter"', "Victoria, British Columbia, Canada");
    expect(li.startsWith("https://www.linkedin.com/jobs/search/")).toBe(true);
    expect(li).toContain("Victoria");

    const indeed = indeedJobsSearch('"deposition reporter"', "Monterey, CA");
    expect(indeed.startsWith("https://www.indeed.com/jobs")).toBe(true);
    expect(indeed).toContain("Monterey");

    const bank = jobBankSearch('"deposition reporter"', "Victoria, BC");
    expect(bank.startsWith("https://www.jobbank.gc.ca/jobsearch/jobsearch")).toBe(true);
    expect(bank).toContain("Victoria");
    expect(bank).toContain("fsrc=32");

    const ca = indeedCanadaJobsSearch("access to information", "Vancouver, BC");
    expect(ca.startsWith("https://ca.indeed.com/jobs")).toBe(true);
    expect(ca).toContain("Vancouver");
    expect(new URL(ca).searchParams.get("q")).toBe("access to information");
  });
});
