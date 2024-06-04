import { Resolver, Query, Mutation, Args, Context } from '@nestjs/graphql';
import { PostService } from './post.service';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { NextFunction, Request } from 'express';
import { ClerkMiddleware } from 'src/clerk.middleware';
import { LikeType } from '@prisma/client';
import { Post } from '@nestjs/common';

@Resolver('Post')
export class PostResolver {
  constructor(private readonly postService: PostService) {}

  @Mutation('CreatePost')
  async create(@Args('createPostInput') createPostInput: CreatePostInput,@Context() context:{Req:Request,Res:Response,next:NextFunction}) {
    return await this.postService.createPost(createPostInput);
  }

  @Query('GetPosts')
  async findAll() {
    return await this.postService.getAllPosts();
  }

  @Query('GetPost')
  async findOne(@Args('PostID') PostID: string) {
    return await this.postService.getPost(PostID);
  }

  @Query('GetPostByDoctorID')
 async  getPostByDoctorID(@Args('DoctorID') DoctorID: string) {
    return await this.postService.getDoctorPost(DoctorID);
  }

  
  @Query('GetMedias')
  async getMedias(@Args('PostID') PostID: string) {
    return await this.postService.getPost(PostID);
  }


  @Query('GetLikes')
  async getLikes(@Args('UserID') UserID: string) {
    return await this.postService.getLikes(UserID);
  }


  @Query('SearchPost')
 async  searchPost(@Args('Query') Query: string) {
    return await this.postService.searchPost(Query);
  }


 
  @Mutation('UpdatePost')
  async update(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
    return this.postService.updatePost(updatePostInput);
  }
  

  @Mutation('LikeContent')
 async  LikePost(@Args('ItemID') PostID:string,@Args('UserID') UserID:string, @Args('LikeType') LikeType:LikeType) {
     return this.postService.LikePost(PostID,UserID,LikeType)
  }

  @Mutation('RemovePost')
 async  remove(@Args('PostID') PostID: string) {
    return this.postService.removePost(PostID);
  }
}
