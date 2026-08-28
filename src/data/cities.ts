import type { CityId } from "./types";

export type CityRegion = "California" | "British Columbia";

export interface City {
  id: CityId;
  label: string;
  region: CityRegion;
  lat: number;
  lng: number;
}

export const CITIES: City[] = [
  { id: "monterey", label: "Monterey, CA", region: "California", lat: 36.6002, lng: -121.8947 },
  { id: "vancouver", label: "Vancouver, BC", region: "British Columbia", lat: 49.2827, lng: -123.1207 },
  { id: "victoria", label: "Victoria, BC", region: "British Columbia", lat: 48.4284, lng: -123.3656 },
];

export function cityById(id: CityId): City {
  const city = CITIES.find((c) => c.id === id);
  if (!city) throw new Error(`Unknown city: ${id}`);
  return city;
}
