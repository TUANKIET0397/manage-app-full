import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './passport/local-auth.guard';
import { Public, ResponseMessage } from '@/decorator/customize';
import { CodeAuthDto, CreateAuthDto } from './dto/create-auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly mailerService: MailerService,
  ) {}

  @Post('login')
  @Public() // có nghĩa là route này sẽ không bị bảo vệ bởi JwtAuthGuard, bất kỳ ai cũng có thể truy cập vào route này mà không cần phải cung cấp token hợp lệ trong header của request.
  @UseGuards(LocalAuthGuard)
  @ResponseMessage('Fetch login') // nó sẽ gắn metadata có key là "response_message" và value là "Fetch login" vào route handler này, sau đó mình sẽ lấy message này trong TransformInterceptor để gắn vào response trả về cho client
  handleLogin(@Request() req) {
    return this.authService.login(req.user);
  }

  @Post('register')
  @Public()
  register(@Body() registerDto: CreateAuthDto) {
    return this.authService.handleRegister(registerDto);
  }

  @Post('check-code')
  @Public()
  checkCode(@Body() registerDto: CodeAuthDto) {
    return this.authService.checkCode(registerDto);
  }

  // @Post('retry-active')
  // @Public()
  // retryActive(@Body("email") email: string) {
  //   return this.authService.retryActive(email);
  // }

  // @Post('retry-password')
  // @Public()
  // retryPassword(@Body("email") email: string) {
  //   return this.authService.retryPassword(email);
  // }

  // @Post('change-password')
  // @Public()
  // changePassword(@Body() data: ChangePasswordAuthDto) {
  //   return this.authService.changePassword(data);
  // }

  @Get('mail')
  @Public()
  async testMail() {
    await this.mailerService.sendMail({
      to: 'kiet8103@gmail.com',
      subject: 'Testing Nest MailerModule ✔',
      text: 'Welcome',
      // html: '<b>hello world with TuanKietCoder</b>',
      template: 'register',
      context: {
        name: 'TuanKietCoder',
        activationCode: 123456,
      },
    });
    return 'ok';
  }

  // @UseGuards(JwtAuthGuard)
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  // @Post('login')
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.signIn(
  //     createAuthDto.username,
  //     createAuthDto.password,
  //   );
  // }
}
