import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ForumService } from './forum.service';
import { CreateForumAnswerInput, CreateForumInput } from './dto/create-forum.input';
import { UpdateForumAnswerInput, UpdateForumInput } from './dto/update-forum.input';

@Resolver('Forum')
export class ForumResolver {
  constructor(private readonly forumService: ForumService) {}

  @Mutation('createForumPost')
  async create(@Args('createForumInput') createForumInput: CreateForumInput) {
    return this.forumService.createForumPost(createForumInput);
  }
  @Mutation('createForumAnswer')
  async createForumAnswer(@Args('createForumAnswerInput') createForumAnswerInput: CreateForumAnswerInput) {
    return this.forumService.createForumAnswer(createForumAnswerInput);
  }

  @Query('getForumPosts')
  async getForumPosts() {
    return this.forumService.getForumPosts();
  }

  @Query('getForumPost')
  async getForumPost(@Args('ForumPostID') ForumPostID: string) {
    return this.forumService.getForumPost(ForumPostID);
  }

 @Query('getForumAnswers')
  async getForumPostAnswers(@Args("ForumPostID") ForumPostID:string) {
    return this.forumService.getForumPostAnswers(ForumPostID);
  }

  @Query('getForumAnswer')
  async getForumAnswer(@Args('ForumAnswerID') ForumAnswerID: string) {
    return this.forumService.getForumAnswer(ForumAnswerID);
  }

  @Mutation('updateForum')
  async updateForumPost(@Args('updateForumInput') updateForumInput: UpdateForumInput) {
    return this.forumService.updateForumPost(updateForumInput.ForumID, updateForumInput);
  }

  @Mutation('updateForumAnswer')
  async updateForumAnswer(@Args('updateForumAnswerInput') updateForumAnswerInput: UpdateForumAnswerInput) {
    return this.forumService.updateForumAnswer(updateForumAnswerInput.ForumAnswerID, updateForumAnswerInput);
  }


  @Mutation('removeForumPost')
  async remove(@Args('ForumPostID') ForumPostID: string) {
    const forumPost=await this.forumService.removeForumPost(ForumPostID)
    return forumPost
  

  }
}
