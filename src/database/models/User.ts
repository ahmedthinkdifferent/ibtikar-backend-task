import { Column, Model, Table } from 'sequelize-typescript';

@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @Column
  name: string;

  @Column
  email: string;

  @Column
  password: string;


  toJSON(): object {
    const user = super.toJSON();
    delete user['password'];
    return user;
  }
}
