import { BelongsTo, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { ProductsCategories } from './ProductsCategories';
import { ProductImages } from './ProductImages';

@Table({ tableName: 'Products' })
export class Product extends Model<Product> {
  @Column
  name: string;

  @Column
  price: number;

  @Column
  categoryId: number;

  @BelongsTo(() => ProductsCategories, {
    foreignKey: 'categoryId',
    targetKey: 'id',
  })
  category: ProductsCategories;

  @HasMany(() => ProductImages, {
    foreignKey: 'productId',
  })
  images: ProductImages[];
}
