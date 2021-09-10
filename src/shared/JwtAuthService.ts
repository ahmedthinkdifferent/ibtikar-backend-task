import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UnAuthorizedAppException } from "../http/exceptions/UnAuthorizedAppException";
import EncryptService from "./EncryptService";
import { CacheService } from "./CacheService";
import { CacheKeyNames } from "../constant/CacheKeyNames";

export const EXPIRES_AFTER_ONE_WEEK = (60 * 60 * 24 * 7);
export const EXPIRES_AFTER_ONE_MONTH = (60 * 60 * 24 * 7 * 4);

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService, private encryptService: EncryptService, private cacheService: CacheService) {
  }


  async verifyUserToken(token: string, checkExistenceInRedisDb: boolean = true) {
    const userToken = await this.verify(token);
    if (checkExistenceInRedisDb) {
      const tokenInRedis = await this.cacheService.get(CacheKeyNames.USER_TOKEN_ + userToken.id);
      if (!tokenInRedis || token !== tokenInRedis) {
        throw new UnAuthorizedAppException("messages_unauthorized");
      }
    }
    return userToken;
  }

  async verifyUserRefreshToken(token: string, checkExistenceInRedisDb: boolean = true) {
    const userToken = await this.verify(token);
    if (checkExistenceInRedisDb) {
      const tokenInRedis = await this.cacheService.get(CacheKeyNames.USER_REFRESH_TOKEN_ + userToken.id);
      if (!tokenInRedis || token !== tokenInRedis) {
        throw new UnAuthorizedAppException("messages_unauthorized");
      }
    }
    return userToken;
  }

  async verifyAdminToken(token: string, checkExistenceInRedisDb: boolean = true) {
    const adminToken = await this.verify(token);
    if (checkExistenceInRedisDb) {
      const tokenInRedis = await this.cacheService.get(CacheKeyNames.ADMIN_TOKEN_ + adminToken.id);
      if (!tokenInRedis || token !== tokenInRedis) {
        throw new UnAuthorizedAppException("messages_unauthorized");
      }
    }
    return adminToken;
  }

  async verify(token): Promise<any> {
    try {
      const decryptedToken = this.encryptService.decrypt(token);
      return this.jwtService.verifyAsync(decryptedToken);
    } catch (e) {
      if (e.name === "TokenExpiredError") {
        throw new UnAuthorizedAppException("messages_unauthorized");
      } else if (e.name === "JsonWebTokenError") {
        throw new UnAuthorizedAppException("messages_unauthorized");
      }
    }
  }

  async generateRefreshToken(userData: any, expiresInSeconds = EXPIRES_AFTER_ONE_MONTH) {
    return this.sign(userData, expiresInSeconds);
  }

  async sign(payload: any, expiresInSeconds: number = EXPIRES_AFTER_ONE_WEEK) {
    const token = await this.jwtService.signAsync(payload, { expiresIn: expiresInSeconds, issuer: "mismar" });
    return this.encryptService.encrypt(token);
  }

  async decode(token) {
    return this.jwtService.decode(token);
  }
}