import { CanActivate, ExecutionContext, mixin } from "@nestjs/common";
import { ForbiddenAppException } from "../exceptions/ForbiddenAppException";
import { AdminRoles } from "../../constant/AdminRoles";

export const AdminRoleGuard = (...acceptedRules: AdminRoles[]) => {
  class RoleGuardMixin implements CanActivate {

    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const admin = request.admin;
      if (!acceptedRules.includes(admin.role)) {
        throw new ForbiddenAppException("messages_forbidden");
      }
      return true;
    }

  }

  return mixin(RoleGuardMixin);
};

