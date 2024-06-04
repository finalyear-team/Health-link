import { Field, InputType } from "@nestjs/graphql";
import { ContentType } from "@prisma/client";
import { MediaInput } from "src/post/dto/create-post.input";



@InputType()
export class CreateCommentInput {
    @Field()
    Content:string
    @Field()
    ItemID:string
    @Field()
    ItemType:ContentType
    @Field()
    UserID:string
    @Field()
    Medias?: MediaInput[];    
}

@InputType()
export class CreateCommentReplyInput {
   @Field()
    CommentInput:CreateCommentInput
    @Field()
    CommentID:string   
}