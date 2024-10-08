import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
  import { Request } from 'express';
import { NATS_SERVICE } from 'src/config';
import { firstValueFrom } from 'rxjs';
  
  @Injectable()
  export class AuthGuard implements CanActivate {

    constructor(
      @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
    ){}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const tokenFromReq = this.extractTokenFromHeader(request);
      if (!tokenFromReq) {
        throw new UnauthorizedException('Token not found on the request');
      }
      try {

        const {user, token} =  await firstValueFrom(this.natsClient.send('auth.verify.user', tokenFromReq));

        request['user'] = user

        request['token'] = token;
      } catch {
        throw new UnauthorizedException();
      }
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }