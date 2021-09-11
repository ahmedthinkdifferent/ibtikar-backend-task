import { HttpStatus, Injectable, Scope } from '@nestjs/common';
import { AppLogger } from './AppLogger';
import { TranslatorService } from 'nestjs-translator';
import { ModuleRef } from '@nestjs/core';
import { ResponseStatusCodeConst } from '../constant/ResponseStatusCodeConst';
import { BaseAppException } from '../http/exceptions/BaseAppException';

@Injectable({ scope: Scope.TRANSIENT })
export class HttpResponse {
  private readonly appLogger: AppLogger;
  private readonly translator: TranslatorService;

  constructor(private readonly moduleRef: ModuleRef) {
    this.appLogger = this.moduleRef.get(AppLogger, { strict: false });
    this.translator = this.moduleRef.get(TranslatorService, { strict: false });
  }

  //Vars
  private serverCode: HttpStatus = HttpStatus.OK;
  private statusCode = ResponseStatusCodeConst.SUCCESS;
  private message = '';
  private devMessage = '';
  private data: any = null;
  private dataKey = 'data';
  private translateMessage = true;

  setMessage(message) {
    this.message = message;
    return this;
  }

  setData(data) {
    this.data = data;
    return this;
  }

  setDataKey(dataKey) {
    this.dataKey = dataKey;
    return this;
  }

  setDataWithKey(dataKey, data) {
    this.dataKey = dataKey;
    this.data = data;
    return this;
  }

  setServerCode(serverCode) {
    this.serverCode = serverCode;
    return this;
  }

  setStatusCode(statusCode) {
    this.statusCode = statusCode;
    return this;
  }

  send(req, res) {
    return res.status(this.serverCode).send(this.buildResponseBody(req));
  }

  sendResponseBody(res, body) {
    return res.status(this.serverCode).send(body);
  }

  getBody(req) {
    return this.buildResponseBody(req);
  }

  private buildResponseBody(req) {
    const response: any = { statusCode: this.statusCode };
    response[this.dataKey] = this.data;
    if (this.message && this.translateMessage) {
      const lang = HttpResponse.getLanguageFromReq(req);
      this.message = this.translator.translate(this.message, { lang: lang });
    }
    response['message'] = this.message;
    if (process.env.NODE_ENV !== 'production') {
      response['devMessage'] = this.devMessage;
    } else {
      response['devMessage'] = null;
    }
    return response;
  }

  sendException(exception: BaseAppException, req: any, res: any) {
    const response = { data: null, statusCode: exception.statusCode };
    if (exception.translateMessage) {
      const lang = HttpResponse.getLanguageFromReq(req);
      response['message'] = this.translator.translate(exception.message, {
        lang: lang,
      });
    } else {
      response['message'] = exception.message;
    }
    if (process.env.NODE_ENV !== 'production') {
      response['devMessage'] = exception.devMessage ?? exception.stack;
    } else {
      response['devMessage'] = null;
    }

    return res.status(exception.getStatus()).send(response);
  }

  sendNotHandledException(exception: Error, req: any, res: any) {
    const response = { data: null };
    const lang = HttpResponse.getLanguageFromReq(req);
    response['message'] = this.translator.translate('messages_server_error', {
      lang: lang,
    });
    if (process.env.NODE_ENV !== 'production') {
      response['devMessage'] = exception.stack ?? null;
    } else {
      response['devMessage'] = null;
    }
    const statusCode = exception['status'] || HttpStatus.INTERNAL_SERVER_ERROR;
    if (statusCode === HttpStatus.TOO_MANY_REQUESTS) {
      response['statusCode'] = ResponseStatusCodeConst.TOO_MANY_REQUESTS;
    } else if (statusCode == HttpStatus.NOT_FOUND) {
      response['statusCode'] = ResponseStatusCodeConst.PAGE_NOT_FOUND;
    } else {
      response['statusCode'] = ResponseStatusCodeConst.SERVER_ERROR;
    }
    return res.status(statusCode).send(response);
  }

  private static getLanguageFromReq(req: any) {
    const lang = req.headers['accept-language'];
    if (lang !== 'en' || lang !== 'ar') {
      return 'en';
    }
    return lang;
  }
}
