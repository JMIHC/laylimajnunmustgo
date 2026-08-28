import type { City } from "../data/cities";
import type { Role } from "../data/types";
import { indeedJobsSearch, jobBankSearch, linkedinJobsSearch } from "./links";

function jobQuery(role: Role): string {
  return role.li;
}

function linkedInLocation(id: City["id"]): string {
  switch (id) {
    case "monterey":
      return "Monterey, California, United States";
    case "vancouver":
      return "Vancouver, British Columbia, Canada";
    case "victoria":
      return "Victoria, British Columbia, Canada";
  }
}

/** Indeed in Monterey; Job Bank (title query) in Vancouver / Victoria. */
export function primaryJobHref(role: Role, city: City): string {
  if (city.id === "monterey") {
    return indeedJobsSearch(role.title, "Monterey, CA");
  }
  const location = city.id === "vancouver" ? "Vancouver, BC" : "Victoria, BC";
  return jobBankSearch(role.title, location);
}

export function jobLinksFor(role: Role, city: City): { label: string; href: string }[] {
  const query = jobQuery(role);
  const linkedIn = {
    label: "LinkedIn jobs",
    href: linkedinJobsSearch(query, linkedInLocation(city.id)),
  };

  if (city.id === "monterey") {
    return [
      linkedIn,
      { label: "Indeed", href: indeedJobsSearch(query, "Monterey, CA") },
    ];
  }

  const location = city.id === "vancouver" ? "Vancouver, BC" : "Victoria, BC";
  return [
    linkedIn,
    { label: "Job Bank (outside Canada)", href: jobBankSearch(role.title, location) },
  ];
}
