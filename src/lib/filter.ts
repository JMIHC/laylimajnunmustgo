import type { GroupId, Role } from "../data/types";

export type GroupFilter = "all" | GroupId;

export function roleMatches(role: Role, group: GroupFilter, remoteOnly: boolean): boolean {
  const groupOk = group === "all" || role.g === group;
  const remoteOk = !remoteOnly || role.remote;
  return groupOk && remoteOk;
}

export function filterRoles(roles: Role[], group: GroupFilter, remoteOnly: boolean): Role[] {
  return roles.filter((role) => roleMatches(role, group, remoteOnly));
}
