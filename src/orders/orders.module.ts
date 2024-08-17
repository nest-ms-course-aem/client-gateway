import { Module } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ORDERS_SERVICE } from 'src/config/service';
import { envs } from 'src/config';
import { NatsModule } from 'src/transport/nats.module';

@Module({
  controllers: [OrdersController],
  providers: [],
  imports: [
    // ClientsModule.register([
    //   {
    //     name: ORDERS_SERVICE,
    //     transport: Transport.TCP,
    //     options: {
    //       // host: envs.ordersHost,
    //       // port: envs.ordersPort
    //     }
    //   }
    // ])
    NatsModule
  ]
})
export class OrdersModule {}
