import { Injectable } from '@nestjs/common';
import { IOrder } from 'modules/database/interfaces/order';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';

@Injectable()
export class OrderService {
  constructor(
    private orderRepository: OrderRepository,
  ) { }

  public async save(model: IOrder): Promise<Order> {
    console.log(model)
    if (model.id) return this.update(model);
    return this.create(model);
  }

  public async remove(orderId: number): Promise<void> {
    await this.orderRepository.findById(orderId);

    return this.orderRepository.remove(orderId);
  }

  private async create(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.insert(model);
    return order;
  }

  private async update(model: IOrder): Promise<Order> {
    const order = await this.orderRepository.findById(model.id);
    return this.orderRepository.update({ ...order, ...model });
  }
}
