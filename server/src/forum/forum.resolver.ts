import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ForumService } from './forum.service';
import { CreateForumAnswerInput, CreateForumInput } from './dto/create-forum.input';
import { UpdateForumAnswerInput, UpdateForumInput } from './dto/update-forum.input';

@Resolver('Forum')
export class ForumResolver {
  constructor(private readonly forumService: ForumService) { }

  @Mutation('CreateForumPost')
  async create(@Args('createForumInput') createForumInput: CreateForumInput) {
    return this.forumService.createForumPost(createForumInput);
  }
  @Mutation('CreateForumAnswer')
  async createForumAnswer(@Args('createForumAnswerInput') createForumAnswerInput: CreateForumAnswerInput) {
    return this.forumService.createForumAnswer(createForumAnswerInput);
  }

  @Query('GetForumPosts')
  async getForumPosts(@Args("Query") query: string) {
    const forum = this.forumService.getForumPosts(query);
    console.log(await forum)
    return forum
  }

  @Query('GetForumPost')
  async getForumPost(@Args('ForumPostID') ForumPostID: string) {
    const forumpost = await this.forumService.getForumPost(ForumPostID)
    console.log(forumpost)
    return this.forumService.getForumPost(ForumPostID);
  }

  @Query('GetForumAnswers')
  async getForumPostAnswers(@Args("ForumPostID") ForumPostID: string) {
    console.log("forum answers")
    return this.forumService.getForumPostAnswers(ForumPostID);
  }

  @Query('GetForumAnswer')
  async getForumAnswer(@Args('ForumAnswerID') ForumAnswerID: string) {
    return this.forumService.getForumAnswer(ForumAnswerID);
  }

  @Mutation('UpdateForum')
  async updateForumPost(@Args('updateForumInput') updateForumInput: UpdateForumInput) {
    return this.forumService.updateForumPost(updateForumInput.ForumID, updateForumInput);
  }

  @Mutation('UpdateForumAnswer')
  async updateForumAnswer(@Args('updateForumAnswerInput') updateForumAnswerInput: UpdateForumAnswerInput) {
    console.log("first")
    return this.forumService.updateForumAnswer(updateForumAnswerInput.ForumAnswerID, updateForumAnswerInput);
  }

  @Mutation('IncreaseForumAnswerView')
  async IncreaseForumAnswerView(@Args('ForumAnswerID') ForumAnswerID: string) {
    return this.forumService.increaseView(ForumAnswerID);
  }

  @Mutation('RemoveForumPost')
  async remove(@Args('ForumPostID') ForumPostID: string) {
    const forumPost = await this.forumService.removeForumPost(ForumPostID)
    return forumPost
  }


}
