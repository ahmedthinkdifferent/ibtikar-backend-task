import { BaseAppException } from './BaseAppException';
import { HttpStatus } from '@nestjs/common';
import { ResponseStatusCodeConst } from '../../constant/ResponseStatusCodeConst';

export class NotFoundAppException extends BaseAppException {
  constructor(message, devMessage = null, translateMessage = true) {
    super(
      message,
      HttpStatus.NOT_FOUND,
      ResponseStatusCodeConst.NOT_FOUND,
      translateMessage,
      devMessage,
    );
  }
}
