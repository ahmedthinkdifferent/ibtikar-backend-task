import { BaseAppException } from './BaseAppException';
import { HttpStatus } from '@nestjs/common';
import { ResponseStatusCodeConst } from '../../constant/ResponseStatusCodeConst';

export class ForbiddenAppException extends BaseAppException {
  constructor(message, devMessage = null, translateMessage = true) {
    super(
      message,
      HttpStatus.FORBIDDEN,
      ResponseStatusCodeConst.FORBIDDEN,
      translateMessage,
      devMessage,
    );
  }
}
