import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post) private postsRepository: Repository<Post>,
    private usersService: UsersService,
  ) {}

  async create(createPostDto: CreatePostDto, authorId: number) {
    return this.postsRepository.save({
      createPostDto,
      author: await this.usersService.findOne(authorId),
    });
  }

  findAll(limit: number, skip: number) {
    return this.postsRepository.find({ skip, take: limit });
  }

  findOne(id: number) {
    return this.postsRepository.findOneBy({ id });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.preload({ id, ...updatePostDto });
    return this.postsRepository.save(post);
  }

  async remove(id: number) {
    await this.postsRepository.delete(id);
  }
}
