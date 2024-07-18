import { IsBoolean, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus, OrderStatusList } from '../enums/order.enum';

export class CreateOrderDto {
    
    @IsNumber()
    @IsPositive()
    totalAmount: number

    @IsNumber()
    @IsPositive()
    totalItems: number;

    @IsEnum(OrderStatusList, {
        message: `Possible status values are: ${OrderStatusList}`
    })
    @IsOptional()
    status: OrderStatus = OrderStatus.PENDING; s

    @IsBoolean()
    @IsOptional()
    paid: boolean  = false;


}
