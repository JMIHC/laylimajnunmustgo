import { Link } from "react-router";
import { GROUPS } from "../data/groups";
import type { Role } from "../data/types";
import { linkedinPeopleSearch, webSearch } from "../lib/links";
import { slugFromTitle } from "../lib/slug";
import { Avatar } from "./Avatar";

export function RoleCard(props: { role: Role; full?: boolean }) {
  const { role, full } = props;
  const group = GROUPS[role.g];
  const slug = slugFromTitle(role.title);
  const li = linkedinPeopleSearch(role.li);
  const web = webSearch(role.web);

  return (
    <article className={full ? "card card-full" : "card"} style={{ ["--g" as string]: group.color }}>
      <Avatar role={role} color={group.color} />
      <div className="body">
        <div className="mode">{role.mode}</div>
        <h3>
          {full ? role.title : <Link to={`/role/${slug}`}>{role.title}</Link>}
        </h3>
        <div className="qa">
          <p>
            <b>Q.</b>
            <span>What carries over?</span>
          </p>
          <p>
            <b>A.</b>
            <span>{role.carry}</span>
          </p>
          <p>
            <b>Q.</b>
            <span>What&apos;s new?</span>
          </p>
          <p>
            <b>A.</b>
            <span>{role.fresh}</span>
          </p>
        </div>
        <div className="links">
          <a href={li} target="_blank" rel="noopener noreferrer">
            Find people on LinkedIn →
          </a>
          <a className="web" href={web} target="_blank" rel="noopener noreferrer">
            Search the web instead
          </a>
        </div>
      </div>
    </article>
  );
}
