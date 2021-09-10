import { Injectable } from '@nestjs/common';
import * as simpleEncryptor from 'simple-encryptor';

@Injectable()
export default class EncryptService {
  encrypt(data: any) {
    return EncryptService.getEncryptor().encrypt(data);
  }

  decrypt(data: any) {
    return EncryptService.getEncryptor().decrypt(data);
  }

  private static getEncryptor(hmac = false) {
    return simpleEncryptor.createEncryptor({
      key: process.env.ENCRYPTION_KEY,
      hmac: hmac,
      debug: false,
    });
  }
}
