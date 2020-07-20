import { ApiProperty } from '@nestjs/swagger';
import { Model } from 'objection';

import { IOrder } from '../interfaces/order';

export class Order extends Model implements IOrder {
  @ApiProperty({ type: 'integer' })
  public id?: number;
  @ApiProperty({ type: 'integer' })
  public userId?: number;
  @ApiProperty({ type: 'string' })
  public description: string;
  @ApiProperty({ type: 'string' })
  public price: number;
  @ApiProperty({ type: 'string' })
  public amount: number;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public createdDate: Date;
  @ApiProperty({ type: 'string', format: 'date-time' })
  public updatedDate: Date;

  public static get tableName(): string {
    return 'Orders';
  }
  public $beforeInsert(): void {
    this.createdDate = this.updatedDate = new Date();
  }

  public $beforeUpdate(): void {
    this.updatedDate = new Date();
  }

  public $formatJson(data: IOrder): IOrder {
    return data;
  }
}
