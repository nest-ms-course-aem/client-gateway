import { Controller, Get, Post, Body, Patch, Param,Inject, ParseUUIDPipe, Query } from '@nestjs/common';
import { NATS_SERVICE } from 'src/config/service';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { PaginationDto } from 'src/common';
import { ValidStatusDto } from './dto/valid-status.dto';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) { }

  @Post()
  async create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return await firstValueFrom(this.natsClient.send('createOrder',
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
      return await firstValueFrom(this.natsClient.send('findAllOrders', orderPaginationDto));

    } catch (error) {
      throw new RpcException(error);
      }
    }

  @Get('/id/:id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.natsClient.send('findOneOrder', { id }).pipe(
      catchError(
        (err => { 
          throw new RpcException(err) 
        })
      )
    );
  }

  @Get(':status')
  async findOneByStatus(
      @Param() validStatusDto: ValidStatusDto,
      @Query() paginationDto: PaginationDto
  ) {
    // return { validStatusDto , paginationDto};
    return this.natsClient.send('findAllOrders', { ...paginationDto, status: validStatusDto.status}).pipe(
      catchError(
        (err => { 
          throw new RpcException(err) 
        })
      )
    );
  }

  @Patch(':id')
  changeStatus(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() status: ValidStatusDto
  ){
    return this.natsClient.send('changeOrderStatus', { id, ...status}).pipe(
      catchError(
        (err => { 
          throw new RpcException(err) 
        })
      )
    );
  }

}
