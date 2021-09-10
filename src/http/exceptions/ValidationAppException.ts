import { BaseAppException } from './BaseAppException';
import { HttpStatus } from '@nestjs/common';
import { ResponseStatusCodeConst } from '../../constant/ResponseStatusCodeConst';

export class ValidationAppException extends BaseAppException {
  constructor(message, devMessage = null, translateMessage = true) {
    super(
      message,
      HttpStatus.PRECONDITION_FAILED,
      ResponseStatusCodeConst.VALIDATION_FAILED,
      translateMessage,
      devMessage,
    );
  }
}
