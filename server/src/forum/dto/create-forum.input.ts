import { Field, InputType } from "@nestjs/graphql";
import { MediaInput } from "src/post/dto/create-post.input";
import { z } from "zod"

const CreateForumSchema = z.object({
    Title: z.string({ message: "Title is required" }),
    Question: z.string({ message: "Question description required" }),
    UserID: z.string({ message: "User is required" })
})

@InputType()
export class CreateForumInput {
    @Field()
    Title: string
    @Field()
    Question: string
    @Field()
    UserID: string

    constructor(input) {
        const validatedInput = CreateForumSchema.parse(input)
        Object.assign(this, validatedInput)
    }


}

@InputType()
export class CreateForumAnswerInput {
    @Field()
    ForumPostID: string
    @Field()
    Answer: string
    @Field()
    UserID: string
    @Field()
    Medias?: MediaInput[]

}

