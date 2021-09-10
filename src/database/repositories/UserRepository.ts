import { Injectable } from '@nestjs/common';
import { BaseRepository } from './BaseRepository';
import { User } from '../models/User';
import { NotFoundAppException } from '../../http/exceptions/NotFoundAppException';

@Injectable()
export class UserRepository implements BaseRepository<User> {

  async findOne(whereClause: Record<string, unknown>, columns: string[] = [], raw = true): Promise<User | null> {
    const attrs = columns.length === 0 ? null : columns;
    return User.findOne({ where: whereClause, attributes: attrs, raw });
  }

  async findOneOrThrowException(whereClause: Record<string, unknown>, columns: string[], raw: boolean): Promise<User> {
    const user = await this.findOne(whereClause, columns, raw);
    if (!user) {
      throw new NotFoundAppException('messages_item_not_found');
    }
    return user;
  }

  async create(userData: any, options: any = null): Promise<User> {
    return User.create(userData, options);
  }

}