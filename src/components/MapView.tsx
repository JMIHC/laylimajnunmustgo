import { useEffect, useRef } from "react";
import { CITIES } from "../data/cities";
import type { CityId } from "../data/types";

type LeafletMap = {
  remove: () => void;
  fitBounds: (bounds: unknown, opts?: { padding?: [number, number] }) => void;
  invalidateSize: () => void;
};

type LeafletMarker = {
  addTo: (map: LeafletMap) => LeafletMarker;
  on: (event: string, handler: () => void) => LeafletMarker;
  bindTooltip: (text: string, opts?: object) => LeafletMarker;
  setStyle: (opts: object) => void;
};

type LeafletStatic = {
  map: (el: HTMLElement, opts?: object) => LeafletMap;
  tileLayer: (url: string, opts?: object) => { addTo: (map: LeafletMap) => void };
  circleMarker: (latlng: [number, number], opts?: object) => LeafletMarker;
  featureGroup: (layers: LeafletMarker[]) => { getBounds: () => unknown };
};

function leaflet(): LeafletStatic | undefined {
  return (window as unknown as { L?: LeafletStatic }).L;
}

function cssVar(name: string, fallback: string): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  return value || fallback;
}

function project(lat: number, lng: number): { x: number; y: number } {
  const minLat = 35.2;
  const maxLat = 50.6;
  const minLng = -124.6;
  const maxLng = -120.4;
  return {
    x: ((lng - minLng) / (maxLng - minLng)) * 100,
    y: ((maxLat - lat) / (maxLat - minLat)) * 100,
  };
}

export function MapView(props: {
  selected: CityId | null;
  onSelect: (id: CityId) => void;
}) {
  const { selected, onSelect } = props;
  const hostRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markersRef = useRef<Partial<Record<CityId, LeafletMarker>>>({});
  const onSelectRef = useRef(onSelect);
  const selectedRef = useRef(selected);
  onSelectRef.current = onSelect;
  selectedRef.current = selected;

  useEffect(() => {
    const host = hostRef.current;
    const L = leaflet();
    if (!host || !L) return;

    const map = L.map(host, {
      zoomControl: true,
      attributionControl: true,
      scrollWheelZoom: false,
    });
    mapRef.current = map;

    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: "&copy; OpenStreetMap &copy; CARTO",
      subdomains: "abcd",
      maxZoom: 18,
    }).addTo(map);

    const ink = cssVar("--ink", "#16202b");
    const steno = cssVar("--steno", "#2e6b63");
    const legal = cssVar("--legal", "#3c5a86");
    const markers: LeafletMarker[] = [];

    for (const city of CITIES) {
      const marker = L.circleMarker([city.lat, city.lng], {
        radius: selectedRef.current === city.id ? 11 : 8,
        color: ink,
        weight: 2,
        fillColor: selectedRef.current === city.id ? legal : steno,
        fillOpacity: 0.95,
      });
      marker.bindTooltip(city.label, { direction: "top", offset: [0, -10], opacity: 0.95 });
      marker.on("click", () => onSelectRef.current(city.id));
      marker.addTo(map);
      markersRef.current[city.id] = marker;
      markers.push(marker);
    }

    map.fitBounds(L.featureGroup(markers).getBounds(), { padding: [36, 36] });
    const onResize = () => map.invalidateSize();
    window.addEventListener("resize", onResize);
    const frame = window.requestAnimationFrame(onResize);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", onResize);
      map.remove();
      mapRef.current = null;
      markersRef.current = {};
    };
  }, []);

  useEffect(() => {
    const ink = cssVar("--ink", "#16202b");
    const steno = cssVar("--steno", "#2e6b63");
    const legal = cssVar("--legal", "#3c5a86");
    for (const city of CITIES) {
      const marker = markersRef.current[city.id];
      if (!marker) continue;
      const active = selected === city.id;
      marker.setStyle({
        radius: active ? 11 : 8,
        color: ink,
        weight: 2,
        fillColor: active ? legal : steno,
        fillOpacity: 0.95,
      });
    }
  }, [selected]);

  const L = typeof window !== "undefined" ? leaflet() : undefined;

  return (
    <div className="map-canvas">
      <div ref={hostRef} className="map-leaflet" hidden={!L} />
      {!L ? (
        <svg className="map-svg" viewBox="0 0 100 100" role="img" aria-label="West-coast markets">
          <rect width="100" height="100" fill="#e4e8ec" />
          <path
            d="M42 6 C40 18 38 28 41 38 C43 48 40 58 44 70 C46 80 52 90 58 96"
            fill="none"
            stroke="#c9d0d8"
            strokeWidth="1.2"
          />
          {CITIES.map((city) => {
            const { x, y } = project(city.lat, city.lng);
            const active = selected === city.id;
            return (
              <g key={city.id}>
                <circle
                  cx={x}
                  cy={y}
                  r={active ? 3.2 : 2.4}
                  fill={active ? "var(--legal)" : "var(--steno)"}
                  stroke="var(--ink)"
                  strokeWidth="0.6"
                  role="button"
                  tabIndex={0}
                  aria-label={city.label}
                  aria-pressed={active}
                  style={{ cursor: "pointer" }}
                  onClick={() => onSelect(city.id)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      onSelect(city.id);
                    }
                  }}
                />
                <text
                  x={x + 3.4}
                  y={y + 1.1}
                  fontSize="3.2"
                  fontFamily="var(--font-mono)"
                  fill="var(--ink)"
                >
                  {city.label.replace(/,.*/, "")}
                </text>
              </g>
            );
          })}
        </svg>
      ) : null}
    </div>
  );
}
