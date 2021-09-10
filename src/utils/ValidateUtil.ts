import Validator from 'fastest-validator';
import { ValidationAppException } from '../http/exceptions/ValidationAppException';

export default class ValidateUtil {

  static async validate(dataToValidate: any, schema: Record<string, unknown>) {
    const data = dataToValidate || {};
    const check = new Validator({}).compile(schema);
    const validation: any = await check(data);
    if (validation === true) {
      return data;
    } else {
      // has errors.
      throw new ValidationAppException(
        'messages_validation_error',
        ValidateUtil.getErrorsAsStringMsg(validation),
      );
    }
  }

  private static getErrorsAsStringMsg(validationErrors) {
    let errorString = '';
    for (const error of validationErrors) {
      errorString += error.message + ' \n ';
    }
    return errorString;
  }
}
