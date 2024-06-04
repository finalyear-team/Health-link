import { Field, InputType } from "@nestjs/graphql";
import { MediaInput } from "src/post/dto/create-post.input";

@InputType()
export class CreateForumInput {
    @Field()
    Question:string
    @Field()
    UserID:string

}

@InputType()
export class CreateForumAnswerInput {
    @Field()
    ForumPostID:string
    @Field()
    Answer:string
    @Field()
    UserID:string
    @Field()
    Medias?:MediaInput[]

}

