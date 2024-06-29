
import { Gender, UserType } from '@prisma/client';
import { format } from 'date-fns';
import { parseDate } from 'src/utils/parseDate';
import { z } from 'zod';


const RoleValues = Object.values(UserType) as [string, ...string[]]
const GenderValues = Object.values(Gender) as [string, ...string[]]

export const LoginSchema = z.object({
    Email: z.string().email({ message: "Invalid email address" }),
    Password: z.string({
        message: "Password is required"
    }),
});

export class SignInDto {
    Email: any;
    Password: string;

    constructor(input: any) {
        const validatedInput = LoginSchema.parse(input)
        Object.assign(this, validatedInput)
    }
}



export const RegisterSchema = z.object({
    FirstName: z.string({ message: "First name is not correct" }),
    LastName: z.string({ message: "Last name is not correct" }),
    Username: z.string({ message: "Username is not correct" }),
    Email: z.string().email({ message: "Email is not correct" }),
    Role: z.enum(RoleValues, { message: "Role error" }),
    Password: z.string({ message: "password required" }),
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



export class SignUpDto {
    Username: string
    Password: string
    Email: string
    FirstName: string
    LastName: string
    Address?: string
    PhoneNumber?: string
    DateOfBirth: Date
    Role: UserType

    constructor(input: any) {
        const validatedInput = RegisterSchema.parse(input)
        Object.assign(this, validatedInput)
        this.FirstName = input.FirstName.toLowerCase()
        this.LastName = input.LastName.toLowerCase()
        this.DateOfBirth = new Date(format(parseDate(input.DateOfBirth), "yyyy-MM-dd"))


    }
}






export class DoctorDetailsInputs {
    UserID: string;
    Speciality: string;
    ConsultationFee: number;
    LicenseNumber: string;
    ExperienceYears: number;
    EducationalBackground?: {
        Institution: string
        Degree: string
        Specialization: string
        GraduationYear: string
        AdditionalCertifications?: string[]
    }

    constructor(input: any) {
        Object.assign(this, input)
        this.LicenseNumber = input.LicenseNumber.toString()

    }

}

