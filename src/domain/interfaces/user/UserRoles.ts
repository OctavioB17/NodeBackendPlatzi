export type UserRoles = {
  USER: 'USER',
  ADMIN: 'ADMIN',
  SUPER_ADMIN: 'SUPER_ADMIN',
  MODERATOR: 'MODERATOR'
}

export const UserRolesEnum: UserRoles = {
  USER: "USER",
  ADMIN: "ADMIN",
  SUPER_ADMIN: "SUPER_ADMIN",
  MODERATOR: "MODERATOR"
}

export const RoleHierarchy: Record<keyof UserRoles, (keyof UserRoles)[]> = {
  SUPER_ADMIN: ["SUPER_ADMIN", "ADMIN", "MODERATOR", "USER"],
  ADMIN: ["ADMIN", "MODERATOR", "USER"],
  MODERATOR: ["MODERATOR", "USER"],
  USER: ["USER"],
};
