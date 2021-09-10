import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import ValidateUtil from '../../../../../utils/ValidateUtil';

@Injectable()
export class RegisterPipe implements PipeTransform {
  private rules = {
    email: 'email', password: {
      type: 'string',
      pattern: '^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&])([a-zA-Z0-9@$!%*?&]{8,})$',
    },
    name: {
      type: 'string',
      pattern: '^[a-zA-Z0-9]+$',
    },
  };

  transform(value: any, metadata: ArgumentMetadata) {
    return ValidateUtil.validate(value, this.rules);
  }
}
