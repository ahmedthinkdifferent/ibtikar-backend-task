import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { UserMustBeAuthorizedGuard } from '../../../../guards/user-must-be-authorized.guard';
import { BaseAppController } from '../../../base/BaseAppController';
import { Product } from '../../../../../database/models/Product';

@Controller('/userApi/v1/products')
@UseGuards(UserMustBeAuthorizedGuard)
export default class ProductController extends BaseAppController {


  @Get('')
  async index(@Req() req, @Res() res) {
    const products = await Product.findAll({
      include: [{
        association: 'images',
      }, {
        association: 'category',
      }]
    });

    return this.getHttpResponse().setDataWithKey('products', products).send(req, res);
  }
}