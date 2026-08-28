import { CITIES, type City } from "../data/cities";
import type { CityId, Role } from "../data/types";

export function rolesForCity(roles: Role[], cityId: CityId): Role[] {
  return roles.filter((role) => role.markets.includes(cityId));
}

export function citiesForRole(role: Role): City[] {
  return CITIES.filter((city) => role.markets.includes(city.id));
}
