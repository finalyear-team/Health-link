import { Injectable } from '@nestjs/common';
import { CreateBlogInput } from './dto/create-blog.input';
import { UpdateBlogInput } from './dto/update-blog.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BlogService {
  constructor(private readonly prisma:PrismaService){}

  async createBlog(createBlogInput: CreateBlogInput) {
    try {
      const blog=await this.prisma.blogPost.create({
        data:{
          ...createBlogInput
        }
      })
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

  async getBlogs() {
    try {
      const blogs=await this.prisma.blogPost.findMany({
        orderBy:{
          CreatedAt:"desc"
        }
      })
      console.log(blogs)
      return blogs

    } catch (error) {
      console.log(error)
      throw error
      
    }
  }

  async getDoctorBlogs(DoctorID: string) {
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
      throw error      
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
      console.log("first")
      console.log(error)
      throw error
      
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
      throw error
      
    }
  }

  async remove(BlogID: string) {
    try {
      const blogs=await this.prisma.blogPost.delete({
        where:{BlogID}
      })
      return blogs
      
    } catch (error) {
      console.log(error)
      throw error
      
    }
  }
}
