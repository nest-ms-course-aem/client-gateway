import { PaginationDto } from "../../common";
import { IsEnum, IsOptional } from "class-validator";
import { OrderStatus, OrderStatusList } from "../enums/order.enum";


export class OrderPaginationDto extends PaginationDto {

    @IsOptional()
    @IsEnum(OrderStatusList, { message: `Valid status are: ${OrderStatusList}` })
    status?: OrderStatus;
}