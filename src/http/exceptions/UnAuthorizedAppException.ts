import { BaseAppException } from './BaseAppException';
import { HttpStatus } from '@nestjs/common';
import { ResponseStatusCodeConst } from '../../constant/ResponseStatusCodeConst';

export class UnAuthorizedAppException extends BaseAppException {
  constructor(message, devMessage = null, translateMessage = true) {
    super(
      message,
      HttpStatus.UNAUTHORIZED,
      ResponseStatusCodeConst.UNAUTHORIZED,
      translateMessage,
      devMessage,
    );
  }
}
