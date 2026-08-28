import type { DeckId, GroupId } from "../data/types";
import type { GroupFilter } from "../lib/filter";

const CHIPS: { id: GroupFilter; label: string; dot?: string }[] = [
  { id: "all", label: "All" },
  { id: "steno", label: "Keep the machine", dot: "var(--steno)" },
  { id: "legal", label: "Stay near the law", dot: "var(--legal)" },
  { id: "beyond", label: "Leave the field", dot: "var(--beyond)" },
];

const DECKS: { id: DeckId; label: string }[] = [
  { id: "past", label: "Past records" },
  { id: "next", label: "New matters" },
];

export function Filters(props: {
  deck: DeckId;
  group: GroupFilter;
  remoteOnly: boolean;
  shown: number;
  total: number;
  onDeck: (deck: DeckId) => void;
  onGroup: (group: GroupFilter) => void;
  onRemote: (remoteOnly: boolean) => void;
}) {
  const { deck, group, remoteOnly, shown, total, onDeck, onGroup, onRemote } = props;
  return (
    <nav className="filters" aria-label="Filter roles">
      <div className="decks">
        {DECKS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className="deck"
            aria-pressed={deck === tab.id}
            onClick={() => onDeck(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {CHIPS.map((chip) => (
        <button
          key={chip.id}
          type="button"
          className="chip"
          aria-pressed={group === chip.id}
          onClick={() => onGroup(chip.id)}
        >
          {chip.dot ? <span className="dot" style={{ background: chip.dot }} /> : null}
          {chip.id === "all" ? `All ${total}` : chip.label}
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
