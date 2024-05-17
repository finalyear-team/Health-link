import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { NextFunction, Request } from 'express';
import { ClerkMiddleware } from 'src/clerk.middleware';

@Resolver('blog')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation('createBlog')
  create(@Args('createPostInput') createPostInput: CreatePostInput,@Context() context:{Req:Request,Res:Response,next:NextFunction}) {
    return this.postService.create(createPostInput);
  }

  @Query('blog')
  findAll() {
    return this.postService.findAll();
  }

  @Query('blog')
  findOne(@Args('id') id: number) {
    return this.postService.findOne(id);
  }

  @Mutation('updateBlog')
  update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.update(updatePostInput.id, updatePostInput);
  }

  @Mutation('removeBlog')
  remove(@Args('id') id: number) {
    return this.postService.remove(id);
  }
}
