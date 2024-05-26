import { Field, InputType } from '@nestjs/graphql';
import { PartialType } from '@nestjs/mapped-types';
import {  DoctorDetailInput, UserDetailsInput } from './create-user.input';
import { Gender, UserStatus } from '@prisma/client';


@InputType()
export class UpdateUserInput  {
  UserID:string
  FirstName?: string
  LastName?: string
  Username?: string
  Gender?: Gender
  Bio?: string
  DateOfBirth?:Date
  PhoneNumber?: string
  Address?: string 
  ProfilePicture?: string
  DoctorDetails?:{
  Speciality?: string
  LicenseNumber?: string
  ExperienceYears?:number
  EducationalBackground?:{
    Institution:string,
    Degree:string,
    Specialization:string,
    GraduationYear:number    
    AdditionalCertifications: string[]
  }  }
}

@InputType()
export class ResetInput{ 
    @Field()
    Id:string
    @Field()
    newPassword:string

}