import type { GroupId, GroupMap } from "./types";

export const GROUP_ORDER: GroupId[] = ["steno", "legal", "beyond"];

export const GROUPS: GroupMap = {
  steno: {
    name: "Keep the machine",
    tag: "Same skill, different room. Your steno speed and realtime setup are the product.",
    color: "var(--steno)",
  },
  legal: {
    name: "Stay near the law",
    tag: "Set the machine down; keep the courtroom, the procedure, the vocabulary.",
    color: "var(--legal)",
  },
  beyond: {
    name: "Leave the field",
    tag: "Where speed, accuracy, discretion, and composure under pressure are worth money elsewhere.",
    color: "var(--beyond)",
  },
};
