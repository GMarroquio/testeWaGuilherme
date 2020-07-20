import { Injectable } from '@nestjs/common';
import { IPaginationParams } from 'modules/common/interfaces/pagination';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';
import { Page, Transaction } from 'objection';

@Injectable()
export class OrderRepository {
  public async list(params: IPaginationParams, id: number, transaction?: Transaction): Promise<Page<Order>> {
    return Order.query(transaction)
      .select('*')
      .where({ userId: id })
      .page(params.page, params.pageSize);
  }

  public async findById(id: number, currentUserId: number, transaction?: Transaction): Promise<Order> {
    return Order.query(transaction)
      .where({ id, userId: currentUserId })
      .first();
  }

  public async insert(model: IOrder, userId: number, transaction?: Transaction): Promise<Order> {
    const { id, updatedDate, amount, description, price, createdDate } = model;
    return Order.query(transaction).insert({ id, updatedDate, amount, description, price, createdDate, userId });
  }
}
