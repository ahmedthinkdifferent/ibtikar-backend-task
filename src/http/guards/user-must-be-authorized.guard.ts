import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { UnAuthorizedAppException } from "../exceptions/UnAuthorizedAppException";
import { JwtAuthService } from "../../shared/JwtAuthService";

@Injectable()
export class UserMustBeAuthorizedGuard implements CanActivate {

  constructor(private jwtAuthService: JwtAuthService) {
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authToken = request.headers["authorization"];
    if (!authToken) {
      throw new UnAuthorizedAppException("messages_unauthorized");
    }
    request.user = await this.jwtAuthService.verifyUserToken(authToken);
    return true;
  }
}
