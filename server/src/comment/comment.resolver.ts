import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput, CreateCommentReplyInput } from './dto/create-comment.input';
import { ContentType } from '@prisma/client';
import { UpdateCommentInput } from './dto/update-comment.input';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) { }

  @Query('GetComments')
  async getComments(@Args('ItemID') ItemID: string) {
    return await this.commentService.getComments(ItemID);
  }


  @Query('GetCommentReplies')
  async getCommentReplies(@Args('CommentID') CommentID: string) {
    return await this.commentService.getCommentReplies(CommentID);
  }

  @Mutation("CreateComment")
  async createComment(@Args("createCommentInput") createCommentInput: CreateCommentInput) {
    return this.commentService.createComment(createCommentInput)
  }


  @Mutation("LikeContent")
  async LikeContent(@Args("ItemID") ItemID: string, @Args("UserID") UserID: string, @Args("ItemType") ItemType: ContentType) {
    return this.commentService.likeContent(ItemID, UserID, ItemType)
  }

  @Mutation("DislikeContent")
  async DislikeContent(@Args("ItemID") ItemID: string, @Args("UserID") UserID: string) {
    return this.commentService.dislikeContent(ItemID, UserID)
  }

  @Mutation("CreateCommentReply")
  async CreateCommentReply(@Args("CreateCommentReply") createCommentReply: CreateCommentReplyInput) {
    return this.commentService.createCommentReply(createCommentReply)
  }


  @Mutation("UpdateComment")
  async updateComment(@Args("updateCommentInput") updateCommentInput: UpdateCommentInput) {
    return this.commentService.updateComment(updateCommentInput.CommentID, updateCommentInput)
  }

  @Mutation("RemoveComment")
  async removeComment(@Args("CommentID") CommentID: string) {
    return this.commentService.deleteComment(CommentID)
  }


}
