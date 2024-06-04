import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput, CreateCommentReplyInput } from './dto/create-comment.input';

@Resolver('Comment')
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query('GetComments')
  async  getComments(@Args('ItemID') ItemID: string) {
     return await this.commentService.getComments(ItemID);
   }
   

  @Query('GetCommentReplies')
  async  getCommentReplies(@Args('CommentID') CommentID: string) {
     return await this.commentService.getCommentReplies(CommentID);
   }

  @Mutation("CreateComment")
  async createComment(@Args("createCommentInput") createCommentInput:CreateCommentInput){
    return this.commentService.createComment(createCommentInput)
  }  
  @Mutation("CreateCommentReply")
  async CreateCommentReply(@Args("CreateCommentReply") createCommentReply:CreateCommentReplyInput){
    return this.commentService.createCommentReply(createCommentReply)
  }


}
