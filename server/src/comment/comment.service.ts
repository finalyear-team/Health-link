import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCommentInput, CreateCommentReplyInput } from './dto/create-comment.input';

@Injectable()
export class CommentService {
    constructor(private readonly prisma: PrismaService) { }


  private async addCounts(comment: any) {
    return {
      ...comment,
      Views: comment.View.length,
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
            throw error;
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
            throw error;
        }
    }

    async getComments(ItemID: string) {
        try {
          const comments = await this.prisma.comments.findMany({
            where: {
              ItemID
            }, include: {
              Like: true,
              View:true,
              Replies: { orderBy: { CreatedAt: "desc" } }
            }
          })
          return await Promise.all(comments.map((comment)=>this.addCounts(comment)))
    
        } catch (error) {
            console.log(error)
          throw error
    
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

          return await Promise.all(comments.Replies.map((comment)=>this.addCounts(comment)))
    
        } catch (error) {
            console.log(error)
          throw error
    
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
            throw error

        }

    }
}
