import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'ProductsCategories' })
export class ProductsCategories extends Model<ProductsCategories> {
  @Column
  name: string;
}
