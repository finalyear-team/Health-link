import { InputType ,Field} from "@nestjs/graphql";
import { BlogCategory } from "@prisma/client";
import { MediaInput } from "src/post/dto/create-post.input";

@InputType()
export class CreateBlogInput {
    @Field()
    DoctorID:string
    @Field()
    Title:string
    @Field()
    Content:string
    @Field()
    Thumbnail?:string
    @Field()
    Category:BlogCategory
    @Field()
    Publish?:boolean

    constructor(){

    }
}

