import { Body, Controller, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { IsPublicEndpoint } from '../../commons/decorators/is-public.endpoint';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/login.dto';

@Controller('/auth/')
@ApiTags('/auth/')
@ApiBearerAuth('JWT')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  @IsPublicEndpoint()
  public async signIn(@Body() payload: SignInDto) {
    return {
      type: 'signIn',
      data: await this.authService.signIn(payload),
    };
  }
}
