import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, PRODUCTS_SERVICE } from 'src/config';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    ClientsModule.register([
      {
        name: PRODUCTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: envs.productsHost,
          port: envs.productsPort
        }, //Inject this micro in the controllers or other parts  
      }
    ]),
  ]
})
export class ProductsModule { }