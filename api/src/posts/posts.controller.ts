import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
  Req,
  ParseUUIDPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { CheckPostOwnershipGuard } from './posts.guard';
import { ApiTags } from '@nestjs/swagger';
import { PaginationQueryDto } from './dto/pagination-query.dto';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    return this.postsService.create(createPostDto, req['user'].sub);
  }

  @Get()
  findAll(@Query() { limit, page }: PaginationQueryDto) {
    return this.postsService.findAll(limit, page);
  }

  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.findOne(id);
  }

  @UseGuards(AuthGuard, CheckPostOwnershipGuard)
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updatePostDto: UpdatePostDto,
  ) {
    return this.postsService.update(id, updatePostDto);
  }

  @UseGuards(AuthGuard, CheckPostOwnershipGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.postsService.remove(id);
  }
}
