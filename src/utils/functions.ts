import os from 'os'
import { RoleHierarchy, UserRoles } from '../domain/interfaces/user/UserRoles'

export const obtainIp = (): string | null => {
  const interfaces = os.networkInterfaces()
  for(const interfaceName in interfaces) {
    for(const iFace of interfaces[interfaceName]!) {
      if (iFace.family === "IPv4" && !iFace.internal) {
        return iFace.address
      }
    }
  }
  return null
}

export const checkRole = (userRole: keyof UserRoles, requiredRole: keyof UserRoles): boolean => {
  const accessibleRoles = RoleHierarchy[userRole];
  if (!accessibleRoles) {
    console.log(`Role "${userRole}" is not defined in RoleHierarchy`);
  }

  return accessibleRoles.includes(requiredRole);
};
