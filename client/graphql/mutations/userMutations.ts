import { gql } from '@apollo/client';


type UserDetail = {
    UserID: string,
    Username: string,
    Email: string,
    FirstName: string,
    LastName: string,
    Bio: string,
    PhoneNumber: string,
    Address?: string
    ProfilePicture?: string,
    Role:string,
    Status:string,
    Verified:string

}

export const REGISTER_USER = gql`
  mutation RegisterUser($RegisterInput: UserDetailsInput!) {
    RegisterUser(RegisterInput: $RegisterInput) {
        UserID: string,
    Username: string,
    Email: string,
    FirstName: string,
    LastName: string,
    Bio: string,
    PhoneNumber: string,
    Address?: string
    ProfilePicture?: string,
    Role:string,
    Status:string,
    Verified:string
        
    }
  }
`;


export const REGISTER_DOCTOR = gql`
  mutation DoctorRegister(DoctorDetailInput:DoctorDetailInput!) {
    DoctorRegister(DoctorDetailInput:$DoctorDetailInput) {
        User {
        UserID
        Username
        Email
        FirstName
        LastName
        Bio
        PhoneNumber
        Address
        ProfilePicture
        Role
        Status
        Verified
      }
      Speciality
      ExperienceYears
      ConsultationFee
      Education
    }
     
    }
  }
`;
