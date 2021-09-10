import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Order } from './Order';
import { Product } from './Product';

@Table({ tableName: 'OrderProducts' })
export class OrderProducts extends Model<OrderProducts> {

  @Column
  orderId: number;

  @Column
  productId: number;

  @Column
  quantity: number;

  @Column
  price: number;

  @Column
  total: number;


  @BelongsTo(() => Order, { foreignKey: 'orderId', targetKey: 'id' })
  order: Order;

  @BelongsTo(() => Product, { foreignKey: 'productId', targetKey: 'id' })
  product: Product;
}