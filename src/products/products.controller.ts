import { Controller, Post, Get, Param, Delete, Patch, Body, Inject, Query, BadRequestException, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { CreateProductDto } from 'src/common/dto/create-product.dto';
import { UpdateProductDto } from 'src/common/dto/update-product.dto';
import { NATS_SERVICE } from 'src/config/service';



@Controller('products')
export class ProductsController {
  constructor(
    //For TCP Direct Cx @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) { }

  @Post()
  async createProduct(
    @Body() createProductDto: CreateProductDto
  ) {
    return this.natsClient
      .send(
        { cmd: 'createProduct' },  createProductDto 
      ).pipe(
        catchError(err => { throw new RpcException(err) })
      )

    //  try {
    //   //Observable
    //   const product = await firstValueFrom(
    //       this.productsClient.send({ cmd: 'createProduct' }, { //send is an observable
    //         createProductDto,
    //       })
    //   );

    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.natsClient.send({ cmd: 'findAllProducts' }, {
      ...paginationDto
    }) //The object we need to match with the products ms controller
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    //* Way 1
    //? Another way to catch the errors using absorvables

    return this.natsClient.
      send({ cmd: 'findProduct' }, { id })
      .pipe(catchError(err => { throw new RpcException(err) }))
      ;


    //* Way 2
    // try {
    //   //Observable
    //   const product = await firstValueFrom(
    //       this.productsClient.send({ cmd: 'findProduct' }, { //send is an observable
    //         id,
    //       })
    //   );

    //   return product;
    // } catch (error) {
    //   throw new RpcException(error);
    // }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return this.natsClient.send(
      { cmd: 'removeProduct' }, {id}
    ).pipe(catchError(err => { console.log("hola");
     throw new RpcException(err) }))
  }

  // @Patch(':id')
  // updateProduct(
  //   @Param('id',ParseIntPipe) id: number,
  //   @Body() updateProductDto: UpdateProductDto) {
  //   return this.productsClient.send(
  //     { cmd: 'updateProduct' },
  //     {...updateProductDto, id}
  //   ).pipe(catchError(err => { throw new RpcException(err) }))
    
  // }

  @Patch(':id')
  patchProduct(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.natsClient
      .send(
        { cmd: 'update_product' },
        {
          id,
          ...updateProductDto,
        },
      )
      .pipe(
        catchError((err) => {
          throw new RpcException(err);
        }),
      );
  }
}
