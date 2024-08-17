import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/config';
import { NATS_SERVICE } from 'src/config/service';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [ProductsController],
  providers: [],
  imports: [
    // ClientsModule.register([
    //   // { //For tcp connection
    //   //   name: PRODUCTS_SERVICE, //Injection token
    //   //   transport: Transport.TCP,
    //   //   options: {
    //   //     host: envs.productsHost,
    //   //     port: envs.productsPort
    //   //   }, //Inject this micro in the controllers or other parts  
    //   // }
    //   {
    //     name: NATS_SERVICE,
    //     transport: Transport.NATS,
    //     options: {
    //       servers: envs.natsServers
    //     }
    //   }
    // ]),
    NatsModule
  ]
})
export class ProductsModule { }
