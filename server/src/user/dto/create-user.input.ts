import { PhoneNumber } from "@clerk/clerk-sdk-node";
import { Field, InputType } from "@nestjs/graphql";
import { Gender, UserType } from "@prisma/client";
import { format } from "date-fns";
import { parseDate } from "src/utils/parseDate";
import { nullable, z } from "zod"

const RoleValues = Object.values(UserType) as [string, ...string[]]
const GenderValues = Object.values(Gender) as [string, ...string[]]

export const RegisterSchema = z.object({
    FirstName: z.string({ message: "First name is not correct" }),
    LastName: z.string({ message: "Last name is not correct" }),
    Username: z.string({ message: "Username is not correct" }),
    Email: z.string().email({ message: "Email is not correct" }),
    Role: z.enum(RoleValues, { message: "Role error" }),
    Gender: z.enum(GenderValues, { message: "Gender is error" }),
    DateOfBirth: z.string({ message: "Date of birth error" }),
    PhoneNumber: z.string().optional()
}).refine(({ DateOfBirth }) => {
    console.log(DateOfBirth)
    const today = new Date();
    const birthDate = new Date(DateOfBirth);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    return age >= 18;
}, {
    message: "Age not acceptable, must be at least 18 years old",
    path: ["DateOfBirth"]
});

@InputType()
export class UserDetailsInput {
    @Field()
    UserID: string;
    @Field()
    FirstName: string;

    @Field()
    LastName: string;

    @Field()
    Username: string;

    @Field()
    Email: string;

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
    Role: UserType

    constructor(input: any) {
        console.log(input)
        Object.assign(this, input)
        this.FirstName = input.FirstName.toLowerCase()
        this.LastName = input.LastName.toLowerCase()
        this.DateOfBirth = new Date(format(parseDate(input.DateOfBirth), "yyyy-MM-dd"))
    }
}




@InputType()
export class DoctorDetailInput {
    @Field({ nullable: true })
    UserDetails: UserDetailsInput

    @Field({ nullable: true })
    Speciality: string;

    @Field({ nullable: true })
    LicenseNumber: string;

    @Field({ nullable: true })
    ExperienceYears: number;

    constructor(input: any) {
        console.log(input.UserDetails.FirstName.toLowerCase())
        Object.assign(this, input)
        this.UserDetails.FirstName = input.UserDetails.FirstName.toLowerCase()
        this.UserDetails.LastName = input.UserDetails.LastName.toLowerCase()
        this.LicenseNumber = input.LicenseNumber.toString()
        console.log(typeof this.LicenseNumber)
        this.Speciality = input.Speciality.toLowerCase()
        this.UserDetails.DateOfBirth = new Date(format(parseDate(input.UserDetails.DateOfBirth), "yyyy-MM-dd"))
    }
}



