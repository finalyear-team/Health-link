import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { ContentType } from 'src/utils/types';
import { LikeType } from '@prisma/client';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) { }


  private async addCounts(post: any) {
    return {
      ...post,
      Views: post.View.length,
      Comments: post.Comment.length,
      Likes: post.Like.length,
    };
  }


  async createPost(createPostInput: CreatePostInput) {
    const { Medias, ...postData } = createPostInput;

    try {
      const post = await this.prisma.post.create({
        data: {
          ...postData,
          Medias: Medias ? { createMany: { data: Medias } } : undefined,
        },
      });
      return post;
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to  ", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async getAllPosts() {
    try {
      const posts = await this.prisma.post.findMany({
        include: {
          Comment: { orderBy: { CreatedAt: "desc" } },
          Like: true
        },
        orderBy: {
          CreatedAt: "desc"
        }
      });
      return Promise.all(posts.map(async (post) => await this.addCounts(post)));
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to fetch posts", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getPost(PostID: string) {
    try {
      const post = await this.prisma.post.findUnique({
        where: { PostID },
        include: { Comment: { orderBy: { CreatedAt: "desc" } }, Like: true, Medias: true },

      });
      return this.addCounts(post);
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to fetch the post ", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getMedias(DoctorID: string) {
    try {
      const Medias = await this.prisma.postMedia.findMany({
        where: {
          ContentType: "post",
          Post: {
            DoctorID
          }

        },
        include: {
          Post: {
            include: {
              Comment: { orderBy: { CreatedAt: "desc" } },
              Like: true
            }
          }
        }

      });
      return Medias
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to retrieve posted medias", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async getLikes(UserID: string) {
    try {
      const posts = await this.prisma.post.findMany({
        where: {
          Like: {
            some: {
              UserID
            }
          }
        },
        include: {

          Comment: { orderBy: { CreatedAt: "desc" } },
          Like: true
        },
        orderBy: {
          CreatedAt: "desc"
        }
      });


      return Promise.all(posts.map(async (post) => await this.addCounts(post)));
    } catch (error) {
      console.log(error)
      throw new HttpException("Faild to fetch likes", HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }


  async increaseView(PostID: string) {
    try {
      const post = await this.prisma.post.update({
        where: { PostID },
        data: {
          View: {
            increment: 1
          }
        }
      })
      return post
    } catch (error) {
      throw new HttpException("faild to increase view", HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }


  async searchPost(Query: string) {
    try {
      const posts = await this.prisma.post.findMany({
        where: { Content: { contains: Query } },
        include: { Comment: { orderBy: { CreatedAt: "desc" } }, Like: true },
        orderBy: {
          CreatedAt: "desc"
        }
      });
      return await Promise.all(posts.map((post) => this.addCounts(post)));
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to fetch posts", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }



  async getDoctorPost(DoctorID: string) {
    try {
      const posts = await this.prisma.post.findMany({
        where: { DoctorID },
        include: {

          Comment: { orderBy: { CreatedAt: "desc" } },
          Like: true
        },
        orderBy: {
          CreatedAt: "desc"
        }
      });
      return await Promise.all(posts.map((post) => this.addCounts(post)));
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to fetch user posts", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async LikePost(ItemID: string, UserID: string, LikeType: LikeType) {
    try {
      const likes = await this.prisma.likes.create({
        data: {
          ItemID,
          ItemType: "post",
          LikeType,
          UserID,
        }

      })
      return likes
    } catch (error) {
      console.log(error)
      throw new HttpException("Unable to like the post", HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async updatePost(updatePostInput: UpdatePostInput) {
    const { PostID, Content, Medias, DoctorID } = updatePostInput;
    try {
      const post = await this.prisma.post.update({
        where: { PostID, DoctorID },
        data: {
          Content,
          Medias: Medias.length > 0 ? { createMany: { data: Medias } } : undefined,
        },
      });
      return post;
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to update post", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removePost(PostID: string) {
    try {
      const post = await this.prisma.post.delete({ where: { PostID } });
      return post;
    } catch (error) {
      console.log(error);
      throw new HttpException("Faild to delete post", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
