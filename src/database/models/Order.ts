import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { User } from './User';
import { OrderProducts } from './OrderProducts';

@Table({ tableName: 'Orders' })
export class Order extends Model<Order> {

  @Column
  userId: number;

  @Column
  status: number;

  @Column
  total: number;

  @Column
  userPhone: string;

  @Column
  userEmail: string;

  @Column
  userAddress: number;

  @BelongsTo(() => User, { foreignKey: 'userId', targetKey: 'id' })
  user: User;

  @HasMany(() => OrderProducts, { foreignKey: 'orderId' })
  products: OrderProducts[];
}