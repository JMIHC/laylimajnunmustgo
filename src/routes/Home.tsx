import { useMemo, useState } from "react";
import { Caption } from "../components/Caption";
import { Filters } from "../components/Filters";
import { RoleCard } from "../components/RoleCard";
import { SiteFooter } from "../components/SiteFooter";
import { GROUP_ORDER, GROUPS } from "../data/groups";
import { ROLES } from "../data/roles";
import type { DeckId } from "../data/types";
import { filterRoles, type GroupFilter } from "../lib/filter";

export function Home() {
  const [deck, setDeck] = useState<DeckId>("next");
  const [group, setGroup] = useState<GroupFilter>("all");
  const [remoteOnly, setRemoteOnly] = useState(false);

  const deckRoles = useMemo(() => ROLES.filter((r) => r.deck === deck), [deck]);
  const shown = useMemo(
    () => filterRoles(ROLES, deck, group, remoteOnly),
    [deck, group, remoteOnly],
  );
  const shownSet = useMemo(() => new Set(shown), [shown]);

  function handleDeck(next: DeckId) {
    setDeck(next);
    setGroup("all");
  }

  return (
    <div className="wrap">
      <header>
        <Caption />
        <h1>
          What comes after <em>the courtroom.</em>
        </h1>
        <p className="lede">
          A federal court reporter with decades in the chair carries a rare combination:{" "}
          <b>225+ wpm at 99% accuracy</b>, realtime technology fluency, courtroom procedure, an
          enormous legal and medical vocabulary, and a record of absolute discretion. Every
          direction below builds on some of that. Some keep the machine; some leave it behind.
        </p>
        <p className="howto">
          Drop generated images into a <code>public/avatars/</code> folder (named by scene, see
          each card) and they replace the drawings automatically. Click any avatar to open a
          LinkedIn people search for that role, filtered to the United States. Sign in to LinkedIn
          first; then use &quot;Connect&quot; or &quot;Message&quot; on the profiles you find. Each card also has a
          plain web search.
        </p>
      </header>

      <Filters
        deck={deck}
        group={group}
        remoteOnly={remoteOnly}
        shown={shown.length}
        total={deckRoles.length}
        onDeck={handleDeck}
        onGroup={setGroup}
        onRemote={setRemoteOnly}
      />

      <main>
        {GROUP_ORDER.map((key) => {
          const meta = GROUPS[key];
          const roles = deckRoles.filter((r) => r.g === key && shownSet.has(r));
          if (roles.length === 0) return null;
          return (
            <section key={key}>
              <div className="sec-head">
                <span className="swatch" style={{ background: meta.color }} />
                <h2>{meta.name}</h2>
                <p>{meta.tag}</p>
              </div>
              <div className="grid">
                {roles.map((role) => (
                  <RoleCard key={role.title} role={role} />
                ))}
              </div>
            </section>
          );
        })}
        {shown.length === 0 ? <p className="empty">No directions match those filters.</p> : null}
      </main>

      <SiteFooter />
    </div>
  );
}
