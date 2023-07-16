import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Credentials } from './dto/credentials.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * get JWT token if the credentials are correct
   */
  @HttpCode(HttpStatus.OK)
  @Post('login')
  login(@Body() credentials: Credentials) {
    return this.authService.login(credentials);
  }
}
