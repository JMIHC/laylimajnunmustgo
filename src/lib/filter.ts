import type { DeckId, GroupId, Role } from "../data/types";

export type GroupFilter = "all" | GroupId;

export function roleMatches(role: Role, group: GroupFilter, remoteOnly: boolean): boolean {
  const groupOk = group === "all" || role.g === group;
  const remoteOk = !remoteOnly || role.remote;
  return groupOk && remoteOk;
}

export function filterRoles(
  roles: Role[],
  deck: DeckId,
  group: GroupFilter,
  remoteOnly: boolean,
): Role[] {
  return roles.filter((role) => role.deck === deck && roleMatches(role, group, remoteOnly));
}
