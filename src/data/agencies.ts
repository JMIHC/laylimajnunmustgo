import type { CityId } from "./types";

export type AgencyLink = { label: string; href: string };

export const OFFICIAL_REPORTERS_HREF =
  "https://www2.gov.bc.ca/gov/content/justice/courthouse-services/documents-forms-records/court-reporters";

const BCSRA: AgencyLink = { label: "BCSRA", href: "https://www.bcsra.net/" };

const VERITEXT: AgencyLink = {
  label: "Veritext",
  href: "https://veritext.ca/about/careers-with-veritext/",
};

const VANCOUVER: AgencyLink[] = [
  VERITEXT,
  { label: "Collos & Company", href: "https://collosandcompany.com/" },
  { label: "Pacific Court Reporting", href: "http://pacificreporting.ca/" },
  { label: "Accurate Realtime", href: "https://accuraterealtime.com/" },
  BCSRA,
];

const VICTORIA: AgencyLink[] = [
  VERITEXT,
  { label: "JML Court Reporters", href: "https://courtreporterservices.ca/court-reporter-victoria/" },
  BCSRA,
];

export function agenciesForCity(id: CityId): AgencyLink[] {
  switch (id) {
    case "vancouver":
      return VANCOUVER;
    case "victoria":
      return VICTORIA;
    case "monterey":
      return [];
  }
}
