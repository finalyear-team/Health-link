import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { CreateForumAnswerInput, CreateForumInput } from './dto/create-forum.input';
import { UpdateForumAnswerInput, UpdateForumInput } from './dto/update-forum.input';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ForumService {
  constructor(private readonly prisma: PrismaService) { }


  private async addCounts(answer: any) {
    return {
      ...answer,
      Comments: answer.Comment.length,
      Likes: answer.Like.length,
    };
  }

  async createForumPost(createForumInput: CreateForumInput) {
    try {
      console.log("first")
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
        },
      });
      return forum;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to create forum answer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getForumPosts(query: string) {
    let orderByCondition = {}
    switch (query) {
      case "Latest":
        orderByCondition = {
          CreatedAt: "desc",

        }
        break;

      case "Recent":
        orderByCondition = {
          CreatedAt: "desc",
        }
        break;

      case "Popular":
        orderByCondition = {
          Like: {
            _count: "desc"
          }
        }
        break;

      case "Trending":
        orderByCondition = {
          Like: {
            _count: "desc",
            CreatedAt: "desc"
          }
        }

    }


    try {
      const forums = await this.prisma.forumPost.findMany({
        include: {
          User: {
            select: {
              UserID: true,
              Username: true,
              FirstName: true,
              LastName: true,
              ProfilePicture: true,
              Role: true,
              Verified: true
            }
          },
          Answers: {
            include: {
              Like: true,

            },
            orderBy: {
              ...orderByCondition
            },
          },
        },
        orderBy: {
          CreatedAt: "desc",

        }
      });
      return forums.map(({ UserID, User, Answers, ...others }) => ({ Author: { ...User }, ForumAnswer: { ...Answers }, ...others }));
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to get forum posts', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getForumPost(ForumPostID: string) {
    try {
      const { User, Answers, UserID, ...others } = await this.prisma.forumPost.findUnique({
        where: { ForumPostID },
        include: {
          Answers: true,
          User: {
            select: {
              UserID: true,
              Username: true,
              FirstName: true,
              LastName: true,
              ProfilePicture: true,
              Role: true,
              Verified: true
            }
          }
        },
      });

      return { Author: User, ForumAnswer: Answers, ...others };
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
        include: {
          User: {
            select: {
              UserID: true,
              Username: true,
              FirstName: true,
              LastName: true,
              ProfilePicture: true,
              Role: true,
              Verified: true
            }
          },
          Like: true,
          Comment: true

        },
        orderBy: {
          CreatedAt: 'desc',
        },
      });

      console.log(forums)
      return Promise.all(forums.map(async (post) => await this.addCounts(post)));
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
        include: {
          Like: true
        }
      });
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
        },
      });
      return forum;
    } catch (error) {
      console.error(error);
      throw new HttpException('Failed to update forum answer', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async increaseView(ForumAnswerID: string) {
    try {
      const post = await this.prisma.forumAnswer.update({
        where: { ForumAnswerID },
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
