import { Injectable } from '@nestjs/common';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Page, Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  public async list(params: IPaginationParams, user: ICurrentUser, transaction?: Transaction): Promise<Page<Order>> {
    let query;
    if (!(user.roles.includes('admin') || user.roles.includes('sysAdmin'))) {
      query = Order.query(transaction)
        .select('*')
        .where({ userId: user.id })
        .page(params.page, params.pageSize);
    } else {
      query = Order.query(transaction)
        .select('*')
        .page(params.page, params.pageSize);
    }
    if (params.orderBy) {
      if (params.orderBy === 'price') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      }
      if (params.orderBy === 'description') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      }
      if (params.orderBy === 'id') {
        query = query.orderBy(params.orderBy, params.orderDirection);
      }
    }

    if (params.term) {
      query = query.where(query => {
        return query.where('description', 'ilike', `%${params.term}%`);
      });
    }

    return query;
  }

  public async findById(id: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction)
      .where({ id })
      .first();
  }

  public async insert(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).insert(model);
  }

  public async update(model: IOrder, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction).updateAndFetchById(model.id, <Order>model);
  }

  public async remove(id: number, transaction?: Transaction): Promise<void> {
    await Order.query(transaction)
      .del()
      .where({ id });
  }
}
