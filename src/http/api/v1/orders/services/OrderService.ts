import { Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';
import { Product } from '../../../../../database/models/Product';
import { ValidationAppException } from '../../../../exceptions/ValidationAppException';
import { Order } from '../../../../../database/models/Order';
import { OrderStatus } from '../../../../../constant/OrderStatus';
import { OrderProducts } from '../../../../../database/models/OrderProducts';

@Injectable()
export class OrderService {

  constructor(private readonly sequelize: Sequelize) {
  }

  async create(data, userId: number) {
    const transaction = await this.sequelize.transaction();
    try {
      const productsIds: number[] = data.products.map((p) => p.id);
      const products = await Product.findAll({ where: { id: { [Op.in]: productsIds } }, raw: true });
      if (products.length != productsIds.length) {
        throw new ValidationAppException('check_order_products');
      }
      // 1- create order.
      const total = OrderService.calculateTotalOrderProducts(data.products, products);
      const order = await Order.create({
        userId, status: OrderStatus.PENDING, total: total.orderTotal,
        userPhone: data.userPhone, userEmail: data.userEmail, userAddress: data.userAddress,
      }, { transaction });
      //2-create order products.
      for (const p of total.products) {
        const orderProduct = Object.assign({}, p, { orderId: order.id });
        await OrderProducts.create(orderProduct, { transaction });
      }
      await transaction.commit();
      return order;
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  }

  private static calculateTotalOrderProducts(products: any[], dbProducts: Product[]): { orderTotal: 0, products: any[] } {
    const total: any = { orderTotal: 0, products: [] };
    for (const product of products) {
      const productId = product.id;
      const quantity = product.quantity;
      const productPrice = OrderService.getProductPrice(productId, dbProducts);
      const orderProductTotalPrice = (quantity * productPrice);
      total.orderTotal += orderProductTotalPrice;
      total.products.push({ quantity, price: productPrice, total: orderProductTotalPrice, productId });
    }
    return total;
  }

  private static getProductPrice(productId: number, dbProducts: Product[]) {
    const product = dbProducts.find(p => {
      return p.id == productId;
    });
    return product.price;
  }
}