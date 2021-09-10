import { BaseAppException } from './BaseAppException';
import { HttpStatus } from '@nestjs/common';
import { ResponseStatusCodeConst } from '../../constant/ResponseStatusCodeConst';

export class ServerAppException extends BaseAppException {
  constructor(message, devMessage = null, translateMessage = true) {
    super(
      message,
      HttpStatus.INTERNAL_SERVER_ERROR,
      ResponseStatusCodeConst.SERVER_ERROR,
      translateMessage,
      devMessage,
    );
  }
}
