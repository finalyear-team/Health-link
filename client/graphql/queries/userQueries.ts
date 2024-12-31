import { gql } from "@apollo/client";

export const GET_SIGNEDIN_USER = gql`
    query getSignedInUser{
      GetSignedInUser{
          UserID,
          FirstName,
          LastName
          Username,
          Rating,
          Email,
          PhoneNumber,
          ProfilePicture,
          Address,
          Followers,
          Following,
          ConsultationFee,
          Role,
          Verified, 
          Speciality,
          ExperienceYears,
          LicenseNumber,
          EducationalBackground         
       }
    }
  `

export const GET_USER_BY_EMAIL = gql`
  query getUserByEmail($Email:String!){
    GetUserByEmail(Email:$Email){
       UserID,
       Username,
       Email,
       Role,
       Verified,
       isSocialAccount
    }

  }
`

export const GET_USER = gql`
  query GetUser($UserID: String!) {
    GetUser(UserID: $UserID) {
      UserID,
          FirstName,
          LastName
          Username,
          Rating,
          Email,
          Bio,
          PhoneNumber,
          Address,
          Followers,
          Following,
          ConsultationFee,
          Role,
          Verified, 
          Speciality,
          ExperienceYears,
          LicenseNumber,
          EducationalBackground         
    }
  }
`;

export const GET_DOCTORS = gql`
  query GetDoctors {
    GetDoctors {
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
      Followers
      Following
      Rating
    }
  }
`;

export const GET_FOLLOWERS = gql`
query GetFollowers($userID: String) {
  GetFollowers(UserID: $userID) {
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
      Followers
      Following
      Rating
  }
}
`;

export const GET_FOLLOWING = gql`
  query GetFollowing($userID: String) {
    GetFollowing(UserID: $userID) {
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
      Followers
      Following
      Rating
    }
  }
`;

