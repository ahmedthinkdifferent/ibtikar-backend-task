import { Injectable } from "@nestjs/common";
import * as simpleEncryptor from "simple-encryptor";
import { configLoader } from "../configLoader";

@Injectable()
export default class EncryptService {


  encrypt(data: any) {
    return this.getEncryptor().encrypt(data);
  }

  decrypt(data: any) {
    return this.getEncryptor().decrypt(data);
  }


  private getEncryptor(hmac: boolean = false) {
    return simpleEncryptor.createEncryptor({
      key: configLoader.config.encryptionKey,
      hmac: hmac,
      debug: false
    });
  }
}