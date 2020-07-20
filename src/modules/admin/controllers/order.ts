import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthRequired, CurrentUser } from 'modules/common/guards/token';
import { ICurrentUser } from 'modules/common/interfaces/currentUser';
import { PaginationValidator } from 'modules/common/validators/pagination';
import { Order } from 'modules/database/models/order';

import { OrderRepository } from '../repositories/order';
import { OrderService } from '../services/order';
import { SaveValidator } from '../validators/order/save';

@ApiTags('Admin: Order')
@Controller('/order')
@AuthRequired()
export class OrderController {
  constructor(private orderRepository: OrderRepository, private orderService: OrderService) {}

  @Get()
  @ApiResponse({ status: 200, type: [Order] })
  public async list(@Query() params: PaginationValidator, @CurrentUser() currentUser: ICurrentUser) {
    const orders = this.orderRepository.list(params, currentUser);
    if (!orders) throw new NotFoundException();

    return orders;
  }

  @Get(':id')
  @ApiResponse({ status: 200, type: Order })
  public async detail(@Param('id', ParseIntPipe) orderId: number) {
    const order = this.orderRepository.findById(orderId);
    if (!order) throw new NotFoundException();

    return order;
  }

  @Post()
  @ApiResponse({ status: 200, type: Order })
  public async insert(@Body() model: SaveValidator) {
    return this.orderService.save(model);
  }

  @Delete(':id')
  @ApiResponse({ status: 200, type: Order })
  public async delete(@Param('id', ParseIntPipe) orderId: number) {
    return this.orderService.remove(orderId);
  }
}
