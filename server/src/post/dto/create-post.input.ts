import { Field, InputType } from "@nestjs/graphql";
import { ContentType } from "@prisma/client";
import { MediaType } from "src/utils/types";




@InputType()
export class MediaInput{
    @Field()
    ContentType?:ContentType
    @Field()
    MediaType:MediaType
    @Field()
    URL:string
}

@InputType()
export class CreatePostInput {
    @Field()
    Content:string
    @Field()
    DoctorID:string
    @Field()
    Medias?: MediaInput[];    
}


