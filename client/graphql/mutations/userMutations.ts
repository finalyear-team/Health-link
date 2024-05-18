import { gql } from '@apollo/client';


export const REGISTER_USER = gql`
  mutation RegisterUser($RegisterInput: UserDetailsInput!) {
    RegisterUser(RegisterInput: $RegisterInput) {
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
`;
