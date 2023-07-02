import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Req,
  ClassSerializerInterceptor,
  UseInterceptors,
  UseGuards,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  findOne(@Req() req: Request) {
    return this.usersService.findOneByEmail(req['user'].email);
  }

  @UseGuards(AuthGuard)
  @Patch('me')
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+req['user'].sub, updateUserDto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @UseGuards(AuthGuard)
  @Delete('me')
  remove(@Req() req: Request) {
    return this.usersService.remove(+req['user'].sub);
  }
}
