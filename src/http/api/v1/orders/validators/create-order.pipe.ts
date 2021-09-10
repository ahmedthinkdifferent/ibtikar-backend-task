import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import ValidateUtil from '../../../../../utils/ValidateUtil';

@Injectable()
export class CreateOrderPipe implements PipeTransform {
  private rules = {
    userPhone: 'string|min:6',
    userEmail: 'email',
    userAddress: 'string',
    products: {
      type: 'array', items: [{
        type: 'object', props: {
          id: 'number',
          quantity: 'number',
        },
      }], min: 1,
    },
  };

  transform(value: any, metadata: ArgumentMetadata) {
    return ValidateUtil.validate(value, this.rules);
  }
}
