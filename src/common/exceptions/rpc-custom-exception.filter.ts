import { Catch, RpcExceptionFilter, ArgumentsHost, UnauthorizedException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException)
export class RpcCustomExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: RpcException, host: ArgumentsHost): Observable<any> {
    console.log("entre al rpc filter");
    throw new UnauthorizedException('SIUU')
  }
}