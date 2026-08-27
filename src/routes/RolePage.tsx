import { Link, useParams } from "react-router";
import { RoleCard } from "../components/RoleCard";
import { SiteFooter } from "../components/SiteFooter";
import { ROLES } from "../data/roles";
import { slugFromTitle } from "../lib/slug";

export function RolePage() {
  const { slug } = useParams();
  const role = ROLES.find((r) => slugFromTitle(r.title) === slug);

  return (
    <div className="wrap">
      <Link className="back" to="/">
        ← Back to the map
      </Link>
      {role ? (
        <main>
          <RoleCard role={role} full />
        </main>
      ) : (
        <main>
          <p className="empty">That direction is not on this map.</p>
        </main>
      )}
      <SiteFooter />
    </div>
  );
}
