import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import EncryptService from './EncryptService';
import { UnAuthorizedAppException } from '../http/exceptions/UnAuthorizedAppException';
import { AppConstant } from '../constant/AppConstant';

@Injectable()
export class JwtAuthService {
  constructor(
    private readonly jwtService: JwtService,
    private encryptService: EncryptService,
  ) {}

  async verifyUserToken(token: string) {
    return this.verify(token);
  }

  async verify(token): Promise<any> {
    try {
      const decryptedToken = this.encryptService.decrypt(token);
      return this.jwtService.verifyAsync(decryptedToken);
    } catch (e) {
      if (e.name === 'TokenExpiredError') {
        throw new UnAuthorizedAppException('messages_unauthorized');
      } else if (e.name === 'JsonWebTokenError') {
        throw new UnAuthorizedAppException('messages_unauthorized');
      }
    }
  }

  async sign(
    payload: any,
    expiresInSeconds: number = AppConstant.EXPIRES_AFTER_ONE_WEEK,
  ) {
    const token = await this.jwtService.signAsync(payload, {
      expiresIn: expiresInSeconds,
      issuer: 'ibtikar',
    });
    return this.encryptService.encrypt(token);
  }

  async decode(token) {
    return this.jwtService.decode(token);
  }
}
