export type GroupId = "steno" | "legal" | "beyond";

export type DeckId = "past" | "next";

export type WorkMode = "Remote" | "Hybrid" | "On-site";

export type HairStyle = "crop" | "short" | "bob" | "wave" | "bun" | "gray";

export interface AvatarSpec {
  hair: HairStyle;
  skin: string;
  top: string;
}

export interface Role {
  g: GroupId;
  deck: DeckId;
  title: string;
  mode: WorkMode;
  remote: boolean;
  carry: string;
  fresh: string;
  li: string;
  web: string;
  scene: string;
  av: AvatarSpec;
}

export interface GroupMeta {
  name: string;
  tag: string;
  color: string;
}

export type GroupMap = Record<GroupId, GroupMeta>;
