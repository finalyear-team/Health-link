import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput, CreateCommentReplyInput } from './dto/create-comment.input';
import { ContentType } from '@prisma/client';
import { UpdateCommentInput } from './dto/update-comment.input';

@Injectable()
export class CommentService {
  constructor(private readonly prisma: PrismaService) { }

  async likeContent(ItemID: string, UserID: string, ItemType: ContentType) {
    try {
      const like = await this.prisma.likes.create({
        data: {
          ItemID,
          UserID,
          ItemType,
        }

      })
      return like

    } catch (error) {
      console.log(error)
      throw new HttpException(`Failed to like content: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }

  async dislikeContent(ItemID: string, UserID: string) {
    try {
      const isForumAnswer = await this.prisma.likes.findFirst({
        where: {
          ForumAnswer: {
            ForumAnswerID: ItemID
          }
        }
      })
      const likedContent = await this.prisma.likes.findFirst({
        where: {
          ItemID,
          UserID
        }
      })

      if (isForumAnswer) {
        const dislike = await this.prisma.likes.update({
          where: {
            LikeID: isForumAnswer.LikeID,
            ItemID,
            UserID
          },
          data: {
            LikeType: "dislike"
          },
          include: {
            ForumAnswer: true
          }
        })
        return dislike
      }

      const deletedLike = await this.prisma.likes.delete({
        where: {
          LikeID: likedContent.LikeID,
          ItemID,
          UserID
        }
      })
      return deletedLike


    } catch (error) {
      throw new HttpException(`Failed to dislike content: ${error.message}`, HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }



  private async addCounts(comment: any) {
    return {
      ...comment,
      Comments: comment.Replies.length,
      Likes: comment.Like.length,
    };
  }


  async createComment(createCommentInput: CreateCommentInput) {
    const { ItemID, ItemType, Medias, ...others } = createCommentInput;
    try {
      const comment = await this.prisma.comments.create({
        data: {
          ...others,
          ItemID,
          ItemType: ItemType,
          Medias: Medias.length > 0 ? { createMany: { data: Medias } } : undefined,
        },
        include: {
          Medias: true
        },
      });
      return comment;
    } catch (error) {
      console.log(error);
      throw new HttpException("faild to create comment", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async createCommentReply(createCommentReply: CreateCommentReplyInput) {
    const { CommentID, CommentInput: { Content, Medias, UserID } } = createCommentReply;
    try {
      const reply = await this.prisma.comments.update({
        where: { CommentID },
        data: {
          Replies: {
            create: {
              Content,
              UserID,
              ItemID: CommentID,
              ItemType: 'comment',
              Medias: Medias.length > 0 ? { createMany: { data: Medias } } : undefined,
            },
          },
        },
        include: {
          Replies: { orderBy: { CreatedAt: "desc" } },
          Medias: true
        },
      });
      return reply;
    } catch (error) {
      console.log(error);
      throw new HttpException("faild to get comment", HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async getComments(ItemID: string) {
    try {
      const comments = await this.prisma.comments.findMany({
        where: {
          ItemID
        }, include: {
          Like: {
            where: {
              LikeType: "like"
            }
          },
          Replies: { orderBy: { CreatedAt: "desc" } }
        }
      })
      return await Promise.all(comments.map((comment) => this.addCounts(comment)))

    } catch (error) {
      console.log(error)
      throw new HttpException("faild to fetch comments", HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }


  async getCommentReplies(CommentID: string) {
    try {
      const comments = await this.prisma.comments.findUnique({
        where: {
          CommentID
        }, include: {
          Like: true,
          Replies: { orderBy: { CreatedAt: "desc" } }
        }
      })

      return await Promise.all(comments.Replies.map((comment) => this.addCounts(comment)))

    } catch (error) {
      console.log(error)
      throw new HttpException("faild to get replies", HttpStatus.INTERNAL_SERVER_ERROR)

    }
  }


  async updateComment(CommentID: string, updateCommentInput: UpdateCommentInput) {
    try {
      const comment = await this.prisma.comments.update({
        where: {
          CommentID
        },
        data: {
          Content: updateCommentInput.Content,
          Edited: true
        }

      })
    } catch (error) {
      throw new HttpException("faild to update comment", HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }
  async deleteComment(CommentID: string) {
    try {
      const comment = await this.prisma.comments.delete({
        where: {
          CommentID
        }

      })
      return comment

    } catch (error) {
      console.log(error)
      throw new HttpException("faild to remove comment", HttpStatus.INTERNAL_SERVER_ERROR)

    }

  }
}
