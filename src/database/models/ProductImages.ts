import { BelongsTo, Column, Model, Table } from 'sequelize-typescript';
import { Product } from './Product';

@Table({ tableName: 'ProductImages' })
export class ProductImages extends Model<ProductImages> {
  @Column
  image: string;

  @Column
  productId: number;

  @BelongsTo(() => Product, { foreignKey: 'productId', targetKey: 'id' })
  product: Product;
}