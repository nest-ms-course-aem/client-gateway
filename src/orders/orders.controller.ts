import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe, ParseUUIDPipe, Query } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { ORDERS_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly productsClient: ClientProxy
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(this.productsClient.send('createOrder',
        createOrderDto
      ))

    } catch (error) {
      throw new RpcException(error) 
    }
  }

  @Get()
  async findAll(
    @Query() orderPaginationDto: OrderPaginationDto
  ) {
    
    try {
      return await firstValueFrom(this.productsClient.send('findAllOrders', orderPaginationDto));

    } catch (error) {
      throw new RpcException(error);
      }
    }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.productsClient.send('findOneOrder', { id }).pipe(
      catchError(
        (err => { 
          throw new RpcException(err) 
        })
      )
    );
  }

}
