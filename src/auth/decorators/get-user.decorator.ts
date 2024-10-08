import { createParamDecorator, ExecutionContext, InternalServerErrorException } from '@nestjs/common';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    if(!request?.user){
        throw new InternalServerErrorException("User not found on the request");
    }

    return request.user;
  },
);