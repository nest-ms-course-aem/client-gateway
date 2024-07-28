import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enums/order.enum";


export class ValidStatusDto {

    @IsOptional()
    @IsEnum(OrderStatus, {
        message: `Valid status are ${OrderStatusList}`,
    })
    status: OrderStatus
}