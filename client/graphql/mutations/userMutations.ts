import { UserStatus, UserType } from '@/utils/types';
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
    }
  }
`

export const REGISTER_DOCTOR = gql`
  mutation DoctorRegister($DoctorDetailInput:DoctorRegisterInput!) {
    DoctorRegister(DoctorDetailInput:$DoctorDetailInput) {
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
        Speciality
        ExperienceYears
        ConsultationFee
      
    }     
    }
`;

export const UPDATE_USER = gql`
mutation UpdateUser($updateUserInput:updateUserInput) {
  UpdateUser(updateUserInput:$updateUserInput) {
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
          Speciality
          ExperienceYears
          ConsultationFee
          EducationalBackground
  }
}
`
export const SUSPEND_USER=gql`
  mutation SuspendUser($id:String!,
  $suspendType:SuspendType!) {
      SuspendUser(id:$id,suspendType:$suspendType) {
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
          Speciality
          ExperienceYears
          ConsultationFee
          EducationalBackground
  }
}
`