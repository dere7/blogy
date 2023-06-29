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
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request } from 'express';

@Controller('users')
@UseInterceptors(ClassSerializerInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('me')
  findOne(@Req() req: Request) {
    return this.usersService.findOneByEmail(req['user'].email);
  }

  @Patch('me')
  update(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+req['user'].sub, updateUserDto);
  }

  @Delete('me')
  remove(@Req() req: Request) {
    return this.usersService.remove(+req['user'].sub);
  }
}
