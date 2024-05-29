import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { ForumService } from './forum.service';
import { CreateForumInput } from './dto/create-forum.input';
import { UpdateForumInput } from './dto/update-forum.input';

@Resolver('Forum')
export class ForumResolver {
  constructor(private readonly forumService: ForumService) {}

  @Mutation('createForum')
  create(@Args('createForumInput') createForumInput: CreateForumInput) {
    return this.forumService.create(createForumInput);
  }

  @Query('forums')
  findAll() {
    return this.forumService.findAll();
  }

  @Query('forum')
  findOne(@Args('id') id: number) {
    return this.forumService.findOne(id);
  }

  @Mutation('updateForum')
  update(@Args('updateForumInput') updateForumInput: UpdateForumInput) {
    return this.forumService.update(updateForumInput.id, updateForumInput);
  }

  @Mutation('removeForum')
  remove(@Args('id') id: number) {
    return this.forumService.remove(id);
  }
}
