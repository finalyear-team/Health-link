import { InputType ,Field} from "@nestjs/graphql";
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
    Publish?:boolean
}

@InputType()
export class CreateCommentInput {
    @Field()
    Content:string
    @Field()
    PostID:string
    @Field()
    UserID:string
    @Field()
    Medias?: MediaInput[];    
}