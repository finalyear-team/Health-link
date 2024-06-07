import { gql } from "@apollo/client";

export const GET_USER = gql`
  query GetUser($id: String!) {
    GetUser(id: $id) {
      UserID
      FirstName
      LastName
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
    }
  }
`;

export const SEARCH_USERS = gql`
  query SearchUsers($searchQuery: String) {
    SearchUsers(searchQuery: $searchQuery) {
      UserID
      FirstName
      LastName
    }
  }
`;
export const SEARCH_DOCTORS = gql`
  query SearchDoctors($searchQuery: String) {
    SearchDoctors(searchQuery: $searchQuery) {
      UserID
      FirstName
      LastName
    }
  }
`;
