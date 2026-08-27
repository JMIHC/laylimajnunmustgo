import { describe, expect, it } from "vitest";
import { linkedinPeopleSearch, webSearch } from "./links";

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
