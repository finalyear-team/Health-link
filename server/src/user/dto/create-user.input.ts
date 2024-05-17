import { Field, InputType } from "@nestjs/graphql";
import { UserType ,Gender} from "@prisma/client";
import { nullable, z} from "zod"

const RoleValues=Object.values(UserType) as [string,...string[]]

export const RegisterSchema=z.object({
    FirstName:z.string(),
    LastName:z.string(),
    Username:z.string(),
    Email:z.string().email(),    
    Role:z.enum(RoleValues)
})

export const LoginSchema=z.object({
    UsernameOrEmail:z.string(),   
    Password:z.string()
})


@InputType()
export class LoginInput{
    @Field()
    UsernameOrEmail:string
    @Field()
    Password:string

}




@InputType()
export class UserDetailsInput {
    @Field()
    UserID:string;
    @Field({nullable:true}) 
    FirstName: string;

    @Field({nullable:true}) 
    LastName: string;

    @Field({nullable:true})
    Username:string;
    
    @Field({nullable:false})
    Email:string;

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

    @Field()
    Role:UserType
}




@InputType()
export class DoctorDetailInput {
    @Field({nullable:true}) 
    UserDetails:UserDetailsInput

    @Field({nullable:true}) 
    Speciality : string;

    @Field({nullable:true}) 
    LicenseNumber: string;

    @Field({nullable:true}) 
    ExperienceYears : number;    
}

