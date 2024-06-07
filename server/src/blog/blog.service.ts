import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { Blog } from './entities/blog.entity';

@Injectable()
export class BlogService {
  constructor(private readonly prisma:PrismaService){}

  async createBlog(createBlogInput: CreateBlogInput) {
    try {
      const blog=await this.prisma.blogPost.create({
        data:{
          ...createBlogInput,
        }
      })
    } catch (error) {
      console.log(error)
      throw new HttpException("faild to create blog",HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  async getBlogs() {
    try {
      const blogs=await this.prisma.blogPost.findMany({
        where:{IsPublished:true},
        orderBy:{CreatedAt:"desc"}
      })
      console.log(blogs)
      return blogs

    } catch (error) {
      console.log(error)
      throw new HttpException("faild to fetch blogs",HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async getDoctorBlogs(DoctorID: string) {
    try {
      const blogs=await this.prisma.blogPost.findMany({
        where:{
          IsPublished:true,
          DoctorID
        }
      })
      console.log(blogs)
      return blogs
    } catch (error) {
      console.log(error)
      throw new HttpException("faild to fetch blogs",HttpStatus.INTERNAL_SERVER_ERROR)     
    }
  }

  async getMyBlogs(DoctorID: string) {
    try {
      const blogs=await this.prisma.blogPost.findMany({
        where:{
          DoctorID
        }
      })
      console.log(blogs)
      return blogs
    } catch (error) {
      console.log(error)
      throw new HttpException("faild to fetch blogs",HttpStatus.INTERNAL_SERVER_ERROR)     
    }
  }



  async searchBlogs(Query: string) {
    try {
      const blogs=await this.prisma.blogPost.findMany({
        where:{
          OR:[{Content:{contains:Query }},
              {Title:{contains:Query}}
          ]         
        }
      })
      return blogs
      
    } catch (error) {
      throw new HttpException("faild to fetch blogs",HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  async incrementView(BlogID:string){
    try {      
      const blog=await this.prisma.blogPost.update({
        where:{BlogID},
        data:{
          View:{
            increment:1
          }
        }
      })
      return blog
    } catch (error) {
      throw new HttpException("faild to increase view",HttpStatus.INTERNAL_SERVER_ERROR)     
    }

  }
  async updateBlog(BlogID: string, updateBlogInput: UpdateBlogInput) {
    try {
      const blogs=await this.prisma.blogPost.update({
        where:{
          BlogID
        },
        data:{
        ...updateBlogInput
        }

      })
      return blogs
    } catch (error) {
      console.log(error)
      throw new HttpException("faild to update blog",HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }

  async removeBlog(BlogID: string) {
    try {
      const blogs=await this.prisma.blogPost.delete({
        where:{BlogID}
      })
      return blogs
      
    } catch (error) {
      console.log(error)
      throw new HttpException("faild to delete blog",HttpStatus.INTERNAL_SERVER_ERROR)
      
    }
  }
}
