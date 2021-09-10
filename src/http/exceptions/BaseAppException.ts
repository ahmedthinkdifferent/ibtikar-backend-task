import { HttpException } from '@nestjs/common';
import { ResponseStatusCodeConst } from '../../constant/ResponseStatusCodeConst';

export class BaseAppException extends HttpException {
  statusCode: ResponseStatusCodeConst;
  translateMessage: any;
  devMessage?: string;

  constructor(
    message,
    status,
    statusCode: ResponseStatusCodeConst,
    translateMessage,
    devMessage,
  ) {
    super(message, status);
    this.statusCode = statusCode;
    this.translateMessage = translateMessage;
    this.devMessage = devMessage;
  }
}
