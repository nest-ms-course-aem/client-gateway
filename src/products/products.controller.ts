import { Controller, Post, Get, Param, Delete, Patch, Body, Inject, Query, BadRequestException } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCTS_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
  ) { }

  @Post()
  createProduc() {
    return "Crea un producto";
  }

  @Get()
  findAllProducts(@Query() paginationDto: PaginationDto) {
    return this.productsClient.send({ cmd: 'findAllProducts' }, {
      ...paginationDto
    }) //The object we need to match with the products ms controller
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    try {
      //Observable
      const product = await firstValueFrom(
          this.productsClient.send({ cmd: 'findProduct' }, { //send is an observable
            id,
          })
      );

      return product;
    } catch (error) {
      throw new RpcException(error);
    }
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string) {
    return "Esta funcion elimina el producto " + id;
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: any) {
    return "Esta funcion se encarga de actualizar un producto " + id;
  }
}
