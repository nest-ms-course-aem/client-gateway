import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetToken = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if(!request?.token){
        throw new InternalServerErrorException("Token not found on the request");
    }

    return request.token;
  },
);