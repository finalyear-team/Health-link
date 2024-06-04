import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateForumAnswerInput, CreateForumInput } from './dto/create-forum.input';
import { UpdateForumAnswerInput, UpdateForumInput } from './dto/update-forum.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ForumService {
  constructor(private readonly prisma: PrismaService) {}


  private async addCounts(answer: any) {
    return {
      ...answer,
      Views: answer.View.length,
      Comments: answer.Comment.length,
      Likes: answer.Like.length,
    };
  }

  async createForumPost(createForumInput: CreateForumInput) {
    try {
      const forum = await this.prisma.forumPost.create({
        data: { ...createForumInput },
      });
      return forum;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create forum post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createForumAnswer(createForumAnswerInput: CreateForumAnswerInput) {
    const { Medias, ForumPostID, ...others } = createForumAnswerInput;
    try {
      const forum = await this.prisma.forumAnswer.create({
        data: {
          ForumPostID,
          ...others,
          Medias: Medias.length > 0 ? { createMany: { data: Medias } } : undefined,
        },
      });
      return forum;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create forum answer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getForumPosts() {
    try {
      const forums = await this.prisma.forumPost.findMany({
        include: {
          Answers: {
            include: {
              Like: true,
            },
            orderBy: {
              Like: {
                _count: 'desc',
              },
            },
          },
        },
      });
      return forums;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to get forum posts', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getForumPost(ForumPostID: string) {
    try {
      const forumPost = await this.prisma.forumPost.findUnique({
        where: { ForumPostID },
        include: {
          Answers: true,
          
        },
      });
      if (!forumPost) {
        throw new HttpException('Forum post not found', HttpStatus.NOT_FOUND);
      }
      return forumPost;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to get forum post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getForumPostAnswers(ForumPostID: string) {
    try {
      const forums = await this.prisma.forumAnswer.findMany({
        where: {
          ForumPostID,
        },
        include:{
          Like:true,
          View:true,
          Comment:true

        },
        orderBy: {
          CreatedAt: 'desc',
        },
      });
     return Promise.all(forums.map( async(post)=>await this.addCounts(post)));
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to get forum post answers', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getForumAnswer(ForumAnswerID: string) {
    try {
      const forumAnswer = await this.prisma.forumAnswer.findUnique({
        where: {
          ForumAnswerID,
        },
        include:{
          Like:true
    }});
      if (!forumAnswer) {
        throw new HttpException('Forum answer not found', HttpStatus.NOT_FOUND);
      }
      return forumAnswer;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to get forum answer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateForumPost(ForumPostID: string, updateForumInput: UpdateForumInput) {
    try {
      const forum = await this.prisma.forumPost.update({
        where: {
          ForumPostID,
        },
        data: { ...updateForumInput },
        include: {
          Answers: {
            orderBy: {
              CreatedAt: 'desc',
            },
          },
        },
      });
      return forum;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to update forum post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async updateForumAnswer(ForumAnswerID: string, updateForumInput: UpdateForumAnswerInput) {
    const { Medias, ...others } = updateForumInput;
    try {
      const forum = await this.prisma.forumAnswer.update({
        where: {
          ForumAnswerID,
        },
        data: {
          ...others,
          Medias: Medias.length > 0 ? { createMany: { data: Medias } } : undefined,
        },
        include: {
          Like: true,
          View: true,
        },
      });
      return forum;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to update forum answer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeForumPost(ForumPostID: string) {
    try {
      const forumPost = await this.prisma.forumPost.delete({
        where: {
          ForumPostID,
        },
      });
      return forumPost;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to remove forum post', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async removeForumAnswer(ForumAnswerID: string) {
    try {
      const forumAnswer = await this.prisma.forumAnswer.delete({
        where: {
          ForumAnswerID,
        },
      });
      return forumAnswer;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to remove forum answer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
