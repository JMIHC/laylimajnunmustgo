import { useMemo, useState } from "react";
import { MapView } from "../components/MapView";
import { SiteFooter } from "../components/SiteFooter";
import { SiteNav } from "../components/SiteNav";
import { CITIES } from "../data/cities";
import { ROLES } from "../data/roles";
import type { CityId } from "../data/types";
import { jobLinksFor } from "../lib/jobs";
import { rolesForCity } from "../lib/markets";

export function MapPage() {
  const [cityId, setCityId] = useState<CityId | null>(null);
  const city = CITIES.find((c) => c.id === cityId) ?? null;
  const roles = useMemo(() => (cityId ? rolesForCity(ROLES, cityId) : []), [cityId]);

  return (
    <>
      <SiteNav />
      <div className="wrap">
        <header className="map-header">
          <p className="map-kicker">Typical markets we assign</p>
          <h1>Three cities on the coast.</h1>
          <p className="lede">
            Not live job listings. These are the markets we usually cover: one in California, two
            in British Columbia. Click a pin or a city to see the roles we assign there.
          </p>
        </header>
        <div className="map-layout">
          <MapView selected={cityId} onSelect={setCityId} />
          <aside className="map-panel">
            <p className="map-panel-kicker">Cities</p>
            <ul className="map-cities">
              {CITIES.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    className="map-city"
                    aria-pressed={cityId === item.id}
                    onClick={() => setCityId(item.id)}
                  >
                    <span className="map-city-label">{item.label}</span>
                    <span className="map-city-region">{item.region}</span>
                  </button>
                </li>
              ))}
            </ul>
            {city ? (
              <div className="map-roles-block">
                <p className="map-panel-kicker">
                  {roles.length} {roles.length === 1 ? "role" : "roles"} in {city.label}
                </p>
                <ul className="map-roles">
                  {roles.map((role) => (
                    <li key={role.title}>
                      <span>{role.title}</span>
                      <span>{role.mode}</span>
                      <p className="map-jobs">
                        {jobLinksFor(role, city).map((job) => (
                          <a
                            key={job.href}
                            href={job.href}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {job.label}
                          </a>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <p className="map-hint">Choose a city on the map or in this list.</p>
            )}
          </aside>
        </div>
        <SiteFooter />
      </div>
    </>
  );
}
