import { BaseAppException } from './BaseAppException';
import { HttpStatus } from '@nestjs/common';
import { ResponseStatusCodeConst } from '../../constant/ResponseStatusCodeConst';

export class BadRequestAppException extends BaseAppException {
  constructor(
    message,
    statusCode = ResponseStatusCodeConst.BAD_REQUEST,
    devMessage = null,
    translateMessage = true,
  ) {
    super(
      message,
      HttpStatus.BAD_REQUEST,
      statusCode,
      translateMessage,
      devMessage,
    );
  }
}
