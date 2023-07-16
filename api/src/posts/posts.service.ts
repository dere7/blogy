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

  async create(createPostDto: CreatePostDto, authorId: string) {
    return this.postsRepository.save({
      createPostDto,
      author: await this.usersService.findOne(authorId),
    });
  }

  countAll() {
    return this.postsRepository.count();
  }

  async findAll(limit: number, page: number) {
    const skip = limit * (page - 1);
    const total = await this.countAll();
    const pages = Math.ceil(total / limit);
    const posts = await this.postsRepository.find({ skip, take: limit });
    return { page, limit, pages, total, posts };
  }

  findOne(id: string) {
    return this.postsRepository.findOneBy({ id });
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.postsRepository.preload({ id, ...updatePostDto });
    return this.postsRepository.save(post);
  }

  async remove(id: string) {
    await this.postsRepository.delete(id);
  }
}
