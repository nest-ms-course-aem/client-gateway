import { Controller, Get, Post, Body, Inject, Req, UseGuards} from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { NATS_SERVICE } from 'src/config';
import { LoginUserDto, RegisterUserDto } from './dto';
import { AuthGuard } from './guards/auth.guard';
import { GetUser } from './decorators/get-user.decorator';
import { GetUserInterface } from 'src/interfaces/get-user.interface';
import { GetToken } from './decorators/get-token.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    @Inject(NATS_SERVICE) private readonly natsClient: ClientProxy
  ) {}

  @Get('check')
  checkHealth(){
    return 'Im fine';
  }

  @Post('register')
  async registerUser(@Body() registerUserDto: RegisterUserDto) {
    try {
      return await firstValueFrom(this.natsClient.send('auth.register.user', registerUserDto));
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error
      }) ;
    }
  }

  @Post('login')
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    try {
      return await firstValueFrom(this.natsClient.send('auth.login.user', loginUserDto));
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error
      }) ;
    }
  }

  @UseGuards(AuthGuard)
  @Get('verify')
  async verifyUser(@GetUser() user: GetUserInterface, @GetToken() token: string ) {
    try {
      return {
        user,
        token
      }
      // return await firstValueFrom(this.natsClient.send('auth.verify.user', {}));
    } catch (error) {
      throw new RpcException(error) ;
    }
  }

}
