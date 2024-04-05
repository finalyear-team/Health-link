import { Field, InputType } from "@nestjs/graphql";
import { Prisma } from "@prisma/client";
import { UserType ,Gender} from "@prisma/client";
import { nullable, z} from "zod"

const RoleValues=Object.values(UserType) as [string,...string[]]

export const RegisterSchema=z.object({
    Username:z.string(),
    Email:z.string().email(),
    Password:z.string(),
    Role:z.enum(RoleValues)

})

export const LoginSchema=z.object({
    UsernameOrEmail:z.string(),   
    Password:z.string()
})

@InputType()
export class UserDetailsInput {
    @Field({nullable:true}) 
    FirstName: string;

    @Field({nullable:true}) 
    LastName: string;

    @Field({nullable:true}) 
    DateOfBirth: Date;

    @Field({nullable:true}) 
    Gender: Gender;

    @Field({ nullable: true }) 
    Bio?: string;

    @Field({ nullable: true }) 
    PhoneNumber?: string;

    @Field({ nullable: true }) 
    Address?: string;

    @Field({ nullable: true }) 
    ProfilePicture?: string;
}

@InputType()
export class RegisterInput{ 
    @Field()
    Username:string
    @Field()
    Email:string
    @Field()
    Password:string
    @Field()
    Role:UserType
    @Field(() => UserDetailsInput, { nullable: true }) 
    UserDetails?: UserDetailsInput;


}

@InputType()
export class LoginInput{
    @Field()
    UsernameOrEmail:string

    @Field()
    Password:string


}