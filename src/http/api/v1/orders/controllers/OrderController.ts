import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserMustBeAuthorizedGuard } from '../../../../guards/user-must-be-authorized.guard';
import { BaseAppController } from '../../../base/BaseAppController';
import { CreateOrderPipe } from '../validators/create-order.pipe';
import { OrderService } from '../services/OrderService';
import { Order } from '../../../../../database/models/Order';

@Controller('/userApi/v1/orders')
@UseGuards(UserMustBeAuthorizedGuard)
export default class OrderController extends BaseAppController {

  constructor(private readonly orderService: OrderService) {
    super();
  }

  @Post('')
  async create(@Req() req, @Res() res, @Body(CreateOrderPipe) body) {
    const user = req.user;
    const order = await this.orderService.create(body, user.id);
    return this.getHttpResponse().setDataWithKey('order', order).setMessage('order_created').send(req, res);
  }

  @Get('/userOrders')
  async userOrders(@Req() req, @Res() res) {
    const user = req.user;
    const orders = await Order.findAll({
      where: { userId: user.id },
      include: [{ association: 'products', include: [{ association: 'product' }] }],
    });
    return this.getHttpResponse().setDataWithKey('orders', orders).send(req, res);
  }
}