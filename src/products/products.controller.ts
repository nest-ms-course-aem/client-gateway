import { Controller, Post, Get, Param, Delete, Patch, Body, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { PRODUCTS_SERVICE } from 'src/config';


@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCTS_SERVICE) private readonly productsClient: ClientProxy
  ) {}

  @Post()
  createProduc(){
    return "Crea un producto";
  }

  @Get()
  findAllProducts(){
    return this.productsClient.send({ cmd: 'findAllProducts' }, {})
  }

  @Get(':id')
  findOne(@Param('id') id: string){
    return "Esta funcion regresa el producto " + id;
  }

  @Delete(':id')
  deleteProduct(@Param('id') id: string){
    return "Esta funcion elimina el producto " + id;
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body() body: any){
    return "Esta funcion se encarga de actualizar un producto " + id;
  }
}
