import { NavLink } from "react-router";

const links = [
  { to: "/", label: "Directions", end: true },
  { to: "/map", label: "Markets", end: true },
] as const;

export function SiteNav() {
  return (
    <nav className="site-nav" aria-label="Site">
      <div className="wrap site-nav-inner">
        <span className="site-nav-kicker">After the courtroom</span>
        <div className="site-nav-links">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              className={({ isActive }) => (isActive ? "active" : undefined)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </div>
    </nav>
  );
}
