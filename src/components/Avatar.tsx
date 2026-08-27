import type { SyntheticEvent } from "react";
import type { Role } from "../data/types";
import { avatarSVG } from "../lib/avatars";
import { linkedinPeopleSearch } from "../lib/links";

export function Avatar(props: { role: Role; color: string }) {
  const { role, color } = props;
  const href = linkedinPeopleSearch(role.li);

  function hidePhoto(event: SyntheticEvent<HTMLImageElement>) {
    event.currentTarget.style.display = "none";
  }

  return (
    <a
      className="avatar"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Find people working as ${role.title} on LinkedIn`}
    >
      <span dangerouslySetInnerHTML={{ __html: avatarSVG(role, color) }} />
      <img
        className="photo"
        src={`/avatars/${role.scene}.png`}
        alt=""
        loading="lazy"
        onError={hidePhoto}
      />
      <span className="cue">Open LinkedIn search →</span>
    </a>
  );
}
