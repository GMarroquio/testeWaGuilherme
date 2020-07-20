import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { PaginationValidator } from 'modules/common/validators/pagination';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';
import { SaveValidator } from '../validators/order/save';

@ApiTags('App: Order')
@Controller('/order')
@AuthRequired()
export class OrdersController {
  constructor(private orderRepository: OrderRepository) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() params: PaginationValidator, @CurrentUser() currentUser: ICurrentUser) {
    const orders = this.orderRepository.list(params, currentUser.id);
    if (!orders) throw new NotFoundException();

    return orders;
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Order })
  public async detail(@Param('id', ParseIntPipe) orderId: number, @CurrentUser() currentUser: ICurrentUser) {
    const orders = this.orderRepository.findById(orderId, currentUser.id);
    if (!orders) throw new NotFoundException();

    return orders;
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async insert(@Body() model: SaveValidator, @CurrentUser() currentUser: ICurrentUser) {
    return this.orderRepository.insert(model, currentUser.id);
  }
}
