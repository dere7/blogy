import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { Request } from 'express';

@Injectable()
export class CheckPostOwnershipGuard implements CanActivate {
  constructor(private postsService: PostsService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const post = await this.postsService.findOne(request.params?.id);
    if (request['user']?.sub !== post.author.id)
      throw new ForbiddenException("the post doesn't belong to you");
    return true;
  }
}
