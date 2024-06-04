import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { BlogService } from './blog.service';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';

@Resolver('Blog')
export class BlogResolver {
  constructor(private readonly blogService: BlogService) {}

  @Mutation('CreateBlog')
 async create(@Args('createBlogInput') createBlogInput: CreateBlogInput) {
    return this.blogService.createBlog(createBlogInput);
  }

  @Query('GetBlog')
 async  getBlogs() {
    return await this.blogService.getBlogs();
  }

  @Query('GetDoctorBlog')
 async getDoctorBlogs(@Args('DoctorID') DoctorID: string) {
    return await this.blogService.getDoctorBlogs(DoctorID);
  }
   @Query('SearchBlog')
 async searchBlog(@Args('Query') Query: string) {
    return await this.blogService.searchBlogs(Query);
  }

  @Mutation('UpdateBlog')
  async update(@Args('updateBlogInput') updateBlogInput: UpdateBlogInput) {
    return await this.blogService.updateBlog(updateBlogInput.BlogID, updateBlogInput);
  }

  @Mutation('RemoveBlog')
 async remove(@Args('BlogID') BlogID: string) {
    return await this.blogService.remove(BlogID);
  }
}
