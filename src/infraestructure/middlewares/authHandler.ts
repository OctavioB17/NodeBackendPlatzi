import { NextFunction, Request, Response } from "express";
import { UserRoles } from "../../domain/interfaces/user/UserRoles";
import { checkRole } from "../../utils/functions";
import UserJwtPayload from "../dtos/users/UserJwtPayloadDTO";
import Boom from "@hapi/boom"

export const checkRoleMiddelware = (requiredRole: keyof UserRoles) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const user = req.user as UserJwtPayload
      const hasAccess = checkRole(user.role as keyof UserRoles, requiredRole);

      if (!hasAccess) {
        throw Boom.unauthorized("Access forbidden: insufficient privileges");
      }

      next()
    } catch (error) {
      next(error)
    }
  }
}