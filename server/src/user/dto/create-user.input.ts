import { PhoneNumber } from "@clerk/clerk-sdk-node";
import { Field, InputType } from "@nestjs/graphql";
import { Gender, UserType } from "@prisma/client";
import { format } from "date-fns";
import { parseDate } from "src/utils/parseDate";
import { nullable, z} from "zod"

const RoleValues=Object.values(UserType) as [string,...string[]]
const GenderValues=Object.values(Gender) as [string,...string[]]

export const RegisterSchema=z.object({
    UserID:z.string(),
    FirstName:z.string(),
    LastName:z.string(),
    Username:z.string(),
    Email:z.string().email(),    
    Role:z.enum(RoleValues),
    Gender:z.enum(GenderValues),
    DateOfBirth:z.string(),
    PhoneNumber:z.string().optional()
}).refine(({DateOfBirth})=>{
    const today = new Date();
  const birthDate = new Date(DateOfBirth);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if(age<18)
    throw new Error("age is not acceptable")

})

@InputType()
export class UserDetailsInput {
    @Field()
    UserID:string;
    @Field() 
    FirstName: string;

    @Field() 
    LastName: string;

    @Field()
    Username:string;
    
    @Field()
    Email:string;

    @Field() 
    DateOfBirth: Date;

    @Field() 
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

    constructor(input:any){
         Object.assign(this,input)
         this.FirstName=input.FirstName.toLowerCase()
         this.LastName=input.LastName.toLowerCase()
         this.DateOfBirth=new Date(format(parseDate(input.DateOfBirth),"yyyy-MM-dd"))
    }
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

    constructor(input:DoctorDetailInput){
        const validatedData=RegisterSchema.parse(input.UserDetails)
        Object.assign(this,validatedData)
        this.UserDetails.FirstName=validatedData.FirstName.toLowerCase()
        this.UserDetails.LastName=validatedData.FirstName.toLowerCase()
        this.LicenseNumber=input.LicenseNumber.toString()
        this.Speciality=input.Speciality.toLowerCase()
        this.UserDetails.DateOfBirth=new Date(format(parseDate(validatedData.DateOfBirth),"yyyy-MM-dd"))
    }
}



