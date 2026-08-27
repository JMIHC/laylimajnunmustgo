import type { GroupId } from "../data/types";
import type { GroupFilter } from "../lib/filter";

const CHIPS: { id: GroupFilter; label: string; dot?: string }[] = [
  { id: "all", label: "All 19" },
  { id: "steno", label: "Keep the machine", dot: "var(--steno)" },
  { id: "legal", label: "Stay near the law", dot: "var(--legal)" },
  { id: "beyond", label: "Leave the field", dot: "var(--beyond)" },
];

export function Filters(props: {
  group: GroupFilter;
  remoteOnly: boolean;
  shown: number;
  total: number;
  onGroup: (group: GroupFilter) => void;
  onRemote: (remoteOnly: boolean) => void;
}) {
  const { group, remoteOnly, shown, total, onGroup, onRemote } = props;
  return (
    <nav className="filters" aria-label="Filter roles">
      {CHIPS.map((chip) => (
        <button
          key={chip.id}
          type="button"
          className="chip"
          aria-pressed={group === chip.id}
          onClick={() => onGroup(chip.id)}
        >
          {chip.dot ? <span className="dot" style={{ background: chip.dot }} /> : null}
          {chip.label}
        </button>
      ))}
      <span className="sep" aria-hidden="true" />
      <label className="remote">
        <input
          type="checkbox"
          checked={remoteOnly}
          onChange={(e) => onRemote(e.target.checked)}
        />
        Remote-friendly only
      </label>
      <span className="count">
        {shown} of {total} directions shown
      </span>
    </nav>
  );
}

export type { GroupId };
