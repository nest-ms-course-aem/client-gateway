import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ParseIntPipe } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ORDERS_SERVICE } from 'src/config/service';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(ORDERS_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(this.productsClient.send('createOrder', 
        createOrderDto
      ))
      
    } catch (error) {
      console.log(
        {error}
      );
      
    }
  }

  @Get()
  async findAll() {
    try {
      return await firstValueFrom(this.productsClient.send('findAllOrders', {}));
      
    } catch (error) {
      console.log(
        {error}
      );
      
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await firstValueFrom( this.productsClient.send('findOneOrder', {id}));
      
    } catch (error) {
      console.log(
        {error}
      );
      
    }
    
  }

}
