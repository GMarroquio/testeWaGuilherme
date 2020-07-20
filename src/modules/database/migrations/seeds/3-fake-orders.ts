import * as faker from 'faker/locale/pt_BR';
import * as Knex from 'knex';
import { random } from 'lodash';
import { IOrder } from 'modules/database/interfaces/order';
import { IS_DEV } from 'settings';

export async function seed(knex: Knex): Promise<void> {
  if (!IS_DEV) return;

  const orders = await knex
    .count()
    .from('Orders')
    .first();

  if (Number(orders.count) !== 0) return;
  for (let x = 0; x < 100; x++) {
    const order: IOrder = {
      description: faker.commerce.productName(),
      amount: random(1, 10),
      price: Number(faker.commerce.price(10, 100, 2)),
      userId: random(2, 101),
      createdDate: new Date(),
      updatedDate: new Date()
    };

    await knex.insert(order).into('Orders');
  }
}
