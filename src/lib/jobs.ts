import type { City } from "../data/cities";
import { agenciesForCity, OFFICIAL_REPORTERS_HREF, type AgencyLink } from "../data/agencies";
import type { Role } from "../data/types";
import { indeedCanadaJobsSearch, indeedJobsSearch, linkedinJobsSearch } from "./links";

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

const CANADA_JOB_QUERY: Record<string, string> = {
  depo: "court reporting agency",
  agency: "court reporting agency",
  scopist: "court reporting agency",
  voice: "court reporting agency",
  expert: "court reporting agency",
  catsoft: "court reporting agency",
  instructor: "court reporting college",
  cart: "captioning",
  broadcast: "captioning",
  event: "captioning",
  access: "captioning",
  hearing: "Hansard",
  video: "legal videographer",
  legaltrans: "court transcription",
  health: "medical transcription",
  trial: "litigation support",
  courtadmin: "court services",
  paralegal: "paralegal",
  legalops: "legal operations",
  lawlib: "law librarian",
  foia: "access to information",
  contract: "contract specialist",
  cs: "legal technology",
  asr: "speech recognition",
  techwriter: "technical writer",
  ea: "executive assistant",
  speaker: "court reporting",
  rim: "records management",
  oralhist: "oral history",
  claims: "claims examiner",
  grant: "grant writer",
};

const CANADA_JOB_FALLBACK = "court reporting agency";

/** Canadian employer / place phrase for Indeed Canada — never the US title. */
export function canadaJobQuery(role: Role): string {
  return CANADA_JOB_QUERY[role.scene] ?? CANADA_JOB_FALLBACK;
}

function canadaLocation(id: City["id"]): string {
  return id === "vancouver" ? "Vancouver, BC" : "Victoria, BC";
}

export function isReportingRole(role: Role): boolean {
  return role.g === "steno";
}

/** Indeed US in Monterey; official reporters or Indeed Canada in Vancouver / Victoria. */
export function primaryJobHref(role: Role, city: City): string {
  if (city.id === "monterey") {
    return indeedJobsSearch(role.title, "Monterey, CA");
  }
  if (isReportingRole(role)) {
    return OFFICIAL_REPORTERS_HREF;
  }
  return indeedCanadaJobsSearch(canadaJobQuery(role), canadaLocation(city.id));
}

export function jobLinksFor(role: Role, city: City): AgencyLink[] {
  if (city.id === "monterey") {
    const query = jobQuery(role);
    return [
      { label: "LinkedIn jobs", href: linkedinJobsSearch(query, linkedInLocation(city.id)) },
      { label: "Indeed", href: indeedJobsSearch(query, "Monterey, CA") },
    ];
  }

  if (isReportingRole(role)) {
    return agenciesForCity(city.id);
  }

  return [
    {
      label: "LinkedIn jobs",
      href: linkedinJobsSearch(jobQuery(role), linkedInLocation(city.id)),
    },
    {
      label: "Indeed",
      href: indeedCanadaJobsSearch(canadaJobQuery(role), canadaLocation(city.id)),
    },
  ];
}
