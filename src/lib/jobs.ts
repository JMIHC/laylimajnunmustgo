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

/** Canadian employer / place phrase for Job Bank — never the US title. */
export function canadaJobQuery(role: Role): string {
  return CANADA_JOB_QUERY[role.scene] ?? CANADA_JOB_FALLBACK;
}

function canadaLocation(id: City["id"]): string {
  return id === "vancouver" ? "Vancouver, BC" : "Victoria, BC";
}

/** Indeed in Monterey; Job Bank (Canadian employer query) in Vancouver / Victoria. */
export function primaryJobHref(role: Role, city: City): string {
  if (city.id === "monterey") {
    return indeedJobsSearch(role.title, "Monterey, CA");
  }
  return jobBankSearch(canadaJobQuery(role), canadaLocation(city.id));
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

  return [
    linkedIn,
    {
      label: "Job Bank (outside Canada)",
      href: jobBankSearch(canadaJobQuery(role), canadaLocation(city.id)),
    },
  ];
}
