import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostResolver } from './post.resolver';
import { BlogResolver } from './blog.resolver ';

@Module({
  providers: [PostResolver, PostService,BlogResolver],
})
export class PostModule {}
